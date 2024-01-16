import React, {ChangeEvent, useCallback, useEffect, useState} from "react";

// ANOTHER LIBRARIES
import InputMask from "react-input-mask";
import { toast } from "react-toastify";

// REDUX
import {useAppDispatch, useAppSelector} from "../../../hooks/useAppDispatch.ts";
import {closeModal} from "../../../redux/slices/modalSlice.ts";

// COMPONENTS
import Modal from "../Modal.tsx";
import {useRegisterUserMutation} from "../../../redux/api/authApi.ts";

const RegisterModal: React.FC<{ id: string }> = ({ id }) => {
    const isOpen = useAppSelector((state) =>
        state.modal.modals.some((modal) => modal.id === id && modal.isOpen)
    );

    const [registerUser, {
        data: registerData,
        isSuccess: isRegisterSuccess,
        isLoading: isRegisterLoading,
        error: errorData
    }] = useRegisterUserMutation()

    const dispatch = useAppDispatch();

    const handleCloseModal = useCallback(() => {
        dispatch(closeModal({ id }));
    }, [dispatch, id]);

    const [itin, setITIN] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [passwordsMatch, setPasswordsMatch] = useState(true);

    const validateEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validateIIN = (iin: string): boolean => {
        return iin.length === 12 && !isNaN(Number(iin));
    };

    const validatePassword = (password: string): boolean => {
        return password.length >= 8;
    };

    const handleIINChange = (event: ChangeEvent<HTMLInputElement>) => {
        setITIN(event.target.value);
    };

    const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        setPasswordsMatch(newPassword === repeatPassword);
    };

    const handleRepeatPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newRepeatPassword = e.target.value;
        setRepeatPassword(newRepeatPassword);
        setPasswordsMatch(newRepeatPassword === password);
    };

    const isFormValid = () => {
        return (
            validateIIN(itin) &&
            validateEmail(email) &&
            validatePassword(password) &&
            passwordsMatch
        );
    };
    const handleRegister = async () => {
        if (itin && password && email) {
            await registerUser({itin, password, email})
        } else {
            toast.error("Please fill all input")
        }
    };

    useEffect(() => {
        if (isRegisterSuccess) {
            handleCloseModal();
            toast.success("Регистрация прошла успешно!")
        }
        if (errorData && 'data' in errorData && errorData.data) {
            toast.error(`error: ${errorData.data.message}`);
            console.log(`Ошибка: ${errorData}. Покажите эту ошибку разработчикам!`)
        }
    }, [registerData, isRegisterLoading ,isRegisterSuccess, errorData, handleCloseModal]);

    return (
        <Modal
            id={id}
            title="Регистрация"
            button={true}
            buttonText="Зарегистрироваться"
            buttonDisabled={!isFormValid()}
            isOpen={isOpen}
            onClose={handleCloseModal}
            onConfirm={handleRegister}
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
                    type="email"
                    className="modal__input"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={handleEmailChange}
                />
                <input
                    type="password"
                    className="modal__input"
                    name="password"
                    value={password}
                    onChange={handlePasswordChange}
                    placeholder="Пароль"
                />
                <input
                    type="password"
                    className="modal__input"
                    name="repeatPassword"
                    value={repeatPassword}
                    onChange={handleRepeatPasswordChange}
                    placeholder="Повторите пароль"
                />
            </div>
            {!passwordsMatch && <p className="error-message">Пароли не совпадают</p>}

            {itin.length > 0 && !validateIIN(itin) && (
                <p className="error-message">Неверный ИИН (12 цифр)</p>
            )}

            {email.length > 0 && !validateEmail(email) && (
                <p className="error-message">Неверный формат Email</p>
            )}

            {password.length > 0 && !validatePassword(password) && (
                <p className="error-message">
                    Пароль должен содержать минимум 8 символов
                </p>
            )}

            <p className="modal__responsibility">
                Ответственность за достоверность предоставленных данных лежит на Вас.
            </p>
        </Modal>
    );
};

export default RegisterModal;
