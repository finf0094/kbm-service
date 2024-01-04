import React, {useEffect, useState} from "react";

import {useAppDispatch, useAppSelector} from "../../../hooks/useAppDispatch.ts";

import {useCreateApplicationMutation} from "../../../redux/api/applicationApi.ts";
import {setApplicationData} from "../../../redux/slices/applicationSlice.ts";
import {closeModal} from "../../../redux/slices/modalSlice.ts";

import Modal from "../Modal.tsx";

import {toast} from "react-toastify";
import useCurrentUser from "../../../hooks/useCurrentUser.ts";

const ApplicationModal: React.FC<{ id: string }> = ({id}) => {
    const [isChecked, setIsChecked] = useState(false);
    const {id: userId} = useCurrentUser();

    const [createApplication, {
        data: applicationData,
        isSuccess: isApplicationSuccess,
        isLoading: isApplicationLoading,
        isError: isApplicationError,
        error: applicationError
    }] = useCreateApplicationMutation();

    function navigate(route: string) {
        window.location.href = route;
    }

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };


    const isOpen = useAppSelector((state) =>
        state.modal.modals.some((modal) => modal.id === id && modal.isOpen)
    );

    const dispatch = useAppDispatch();

    const handleCloseModal = () => {
        dispatch(closeModal({id}));
    };

    const handleCreateApplication = async () => {
        if (isChecked) {
            await createApplication(userId)
        } else {
            toast.error("Please fill checkbox")
        }
    };

    useEffect(() => {
        if (isApplicationSuccess && applicationData) {
            dispatch(setApplicationData(applicationData))
            dispatch(closeModal)
            navigate("/application-page")
            toast.success("application successfully created")
        }
        if (isApplicationError) {
            toast.error("Произошла ошибка...")
        }
        if (applicationError && 'data' in applicationError && applicationError.data) {
            toast.error(`Ошибка: ${applicationError.data.message}`);
            console.log(`Ошибка: ${applicationError}. Покажите эту ошибку разработчикам!`)
        }
    }, [applicationData, isApplicationSuccess, isApplicationLoading, isApplicationError, applicationError, dispatch]);

    return (
        <Modal
            id={id}
            title="Это текст о проекте"
            button={true}
            buttonText="Принять участие"
            buttonDisabled={!isChecked}
            isOpen={isOpen}
            onClose={handleCloseModal}
            onConfirm={handleCreateApplication}
        >
            <p className="modal__desc">
                Это текст о проекте. Он необходим для дальнейшего продвижения Вашего
                сайта. Вам будет необходимо предоставить исходные данные, по которым
                наши копирайтеры составят правильный текст, который будет содержать в
                себе основную информацию. Вам будет необходимо предоставить исходные
                данные. Это текст о проекте. Это текст о компании.
            </p>
            <div className="modal__check">
                <input
                    type="checkbox"
                    name="check"
                    required
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                />
                <label htmlFor="check">
                    Я ознакомлен с целью проекта и согласен предоставить свои данные
                </label>
            </div>
        </Modal>
    );
};

export default ApplicationModal;
