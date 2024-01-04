import React, { useState } from "react";

import {useAppDispatch, useAppSelector} from "../../../hooks/useAppDispatch.ts";
import {closeModal} from "../../../redux/slices/modalSlice.ts";

import ConfidentModalElement from "./ConfidentModalElement";

import "./UI/ConfidentModal.css";
import {useApproveMutation, useRejectMutation} from "../../../redux/api/applicationApi.ts";
import {toast} from "react-toastify";

const ConfidentModal: React.FC<{applicationId: string, id: string, selectedOption: string, resetSelectedOption: () => void}> = ({applicationId , id, selectedOption, resetSelectedOption }) => {
    const isOpen = useAppSelector(state =>
        state.modal.modals.some((modal) => modal.id === id && modal.isOpen)
    );
    const dispatch = useAppDispatch();

    const [approveApplication] = useApproveMutation();
    const [rejectApplication] = useRejectMutation();

    const [animationClass, setAnimationClass] = useState("");

    const handleToggleList = () => {
        if (isOpen) {
            // Closing animation
            setAnimationClass("confidentModal-closing-animation");
            setTimeout(() => {
                setAnimationClass("");
                handleCloseModal();
            }, 300);
        } else {
            // Opening animation
            setAnimationClass("confidentModal-opening-animation");
            handleCloseModal();
        }

        // Reset the selected option when opening/closing the modal
        resetSelectedOption();
    };

    const handleCloseModal = () => {
        dispatch(closeModal({ id }))
    }

    const send = async (selectedOption: string) => {
        if (selectedOption === "APPROVED") {
            try {
                const result = await approveApplication(applicationId);
                if ('error' in result) {
                    const errorData = result.error;
                    if ('data' in errorData && errorData.data) {
                        toast.error(`Error: ${errorData.data.message}`);
                    }
                } else {
                    console.log(result.data);
                    toast.success("Application approved successfully!");
                }
            } catch (error) {
                console.error(error);
                toast.error(`Error: ${error}`);
            }
        } else if (selectedOption === "REJECTED") {
            try {
                const result = await rejectApplication(applicationId);
                if ('error' in result) {
                    const errorData = result.error;
                    if ('data' in errorData && errorData.data) {
                        toast.error(`Error: ${errorData.data.message}`);
                    }
                } else {
                    console.log(result.data);
                    toast.success("Application rejected successfully!");
                }
            } catch (error) {
                console.error(error);
                toast.error(`Error: ${error}`);
            }
        }
    }

    return (
        <div>
            <ConfidentModalElement title="Вы уверены?" isOpen={isOpen} animationClass={animationClass}>
                <div className="confident-modal__buttons">
                    <button className="confident-modal__button" onClick={() => send(selectedOption)}>Да</button>
                    <button className="confident-modal__button" onClick={handleToggleList}>Нет</button>
                </div>
            </ConfidentModalElement>
        </div>
    );
};

export default ConfidentModal;
