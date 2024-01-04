import React, {ChangeEvent, useCallback, useEffect, useState} from "react";


// ANOTHER LIBRARIES
import InputMask from "react-input-mask";
import { toast } from "react-toastify";

// COMPONENTS
import Modal from "../Modal.tsx";

// REDUX
import {loginSuccess} from "../../../redux/slices/authSlice.ts";
import {useLoginUserMutation} from "../../../redux/api/authApi.ts";
import { closeModal, openModal } from "../../../redux/slices/modalSlice.ts";

// HOOKS
import {useAppDispatch, useAppSelector} from "../../../hooks/useAppDispatch.ts";


const LoginModal: React.FC<{ id: string }> = ({ id }) => {
    const isOpen = useAppSelector((state) =>
        state.modal.modals.some(modal => modal.id === id && modal.isOpen)
    );

    const [itin, setITIN] = useState<string>("");
    const [password, setPassword] = useState("");

    const dispatch = useAppDispatch();

    const [loginUser,
        {
            data: userData,
            isSuccess: isLoginSuccess,
            isError: isLoginError,
            error: errorData
        }] = useLoginUserMutation();

    const validateIIN = (iin: string): boolean => {
        // Basic IIN validation for 12 digits
        return iin.length === 12 && !isNaN(Number(iin));
    };

    const handleCloseModal = useCallback(() => {
        dispatch(closeModal({ id }));
    }, [dispatch, id]);

    const handleIINChange = (event: ChangeEvent<HTMLInputElement>) => {
        setITIN(event.target.value);
    };

    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
    };

    const handleRoute = () => {
        handleCloseModal();
        dispatch(openModal({ id: "registerModal" }));
    }

    const isFormValid = () => {
        return (
            validateIIN(itin)
        );
    };
    const handleLogin = async () => {
        if (itin && password) {
            await loginUser({itin, password})
        } else {
            toast.error("Please fill all input")
        }
    };

    useEffect(() => {
        if (isLoginSuccess) {
            dispatch(loginSuccess(userData))
            handleCloseModal();
            toast.success("Авторизация успешно пройдена!")
        }
        if (isLoginError) {
            toast.error("Произошла ошибка при авторизации...")
        }
        if (errorData && 'data' in errorData && errorData.data) {
            toast.error(`Ошибка: ${errorData.data.message}`);
            console.log(`Ошибка: ${errorData}. Покажите эту ошибку разработчикам!`)
        }
    }, [userData, isLoginSuccess, isLoginError, dispatch, errorData, handleCloseModal])


    return (
        <Modal
            id={id}
            title="Вход"
            button={true}
            buttonText="Войти"
            buttonDisabled={!isFormValid}
            isOpen={isOpen}
            onClose={handleCloseModal}
            onConfirm={handleLogin}
        >
            <div className="modal__inputs">
                <InputMask
                    mask="999999999999"
                    value={itin}
                    onChange={handleIINChange}
                    className="modal__input"
                    name="iin"
                    type="text"
                    placeholder="Введите ИИН"
                />
                <input
                    type="password"
                    className="modal__input"
                    name="password"
                    value={password}
                    onChange={handlePasswordChange}
                    placeholder="Пароль"
                />
            </div>

            {itin.length > 0 && !validateIIN(itin) && (
                <p className="error-message">
                    Неверный ИИН (12 цифр)
                </p>
            )}

            <p className="modal__route">Ещё не зарегистрированы? <button type="button" className="modal__route-link" onClick={handleRoute}>Зарегистрироваться</button></p>
        </Modal>
    );
};

export default LoginModal;
