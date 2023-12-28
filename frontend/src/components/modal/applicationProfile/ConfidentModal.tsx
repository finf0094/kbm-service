import React, { useState } from "react";

import {useAppDispatch, useAppSelector} from "../../../hooks/useAppDispatch.ts";
import {closeModal} from "../../../redux/slices/modalSlice.ts";

import ConfidentModalElement from "./ConfidentModalElement";

import "./UI/ConfidentModal.css";

const ConfidentModal: React.FC<{ id: string, selectedOption: string, resetSelectedOption: () => void}> = ({ id, selectedOption, resetSelectedOption }) => {
    const isOpen = useAppSelector(state =>
        state.modal.modals.some((modal) => modal.id === id && modal.isOpen)
    );
    const dispatch = useAppDispatch();

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

    const send = (selectedOption: string) => {
        console.log(selectedOption)
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
