import React, { useState, useEffect } from 'react';
import './UI/modal.css';
import { useDispatch } from 'react-redux';
import {closeModal} from "../../redux/slices/modalSlice.ts";

interface ModalProps {
    id: string;
    title: string;
    button: boolean;
    buttonText: string;
    buttonDisabled: boolean;
    children: React.ReactNode;
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

const Modal: React.FC<ModalProps> = ({ id, title, button, buttonText, buttonDisabled, children, isOpen, onClose, onConfirm }) => {

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onConfirm();
    }

    const [isModalVisible, setIsModalVisible] = useState<boolean>(isOpen);
    const [animationClass, setAnimationClass] = useState("");

    const handleToggleModal = () => {
        if (isOpen) {
            // Closing animation
            setAnimationClass("modal-closing-animation");
            setTimeout(() => {
                setAnimationClass("");
                onClose();
            }, 300);
        } else {
            // Opening animation
            setAnimationClass("modal-opening-animation");
            onClose();
        }
    };

    const modalClass = isOpen ? "modal-open" : "modal-closed";
    const dispatch = useDispatch();

    useEffect(() => {
        setIsModalVisible(isOpen);
    }, [isOpen]);

    const handleEscapeKey = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
            dispatch(closeModal({ id }));
        }
    };

    useEffect(() => {
        setIsModalVisible(isOpen);

        // Add the event listener when the modal is open
        if (isOpen) {
            document.addEventListener('keydown', handleEscapeKey);
        }

        // Clean up the event listener when the modal is closed
        return () => {
            document.removeEventListener('keydown', handleEscapeKey);
        };
    }, [isOpen, id]);

    return (
        isModalVisible ? (
            <div className={`modal ${modalClass} ${animationClass}`}>
                <div className={`modal__wrapper ${modalClass} ${animationClass}`} onClick={e => e.stopPropagation()}>
                    <button className="modal__close" onClick={handleToggleModal}>&times;</button>

                    <form onSubmit={(e) => onSubmit(e)} className="modal__form">
                        <h1 className="modal__title">{title}</h1>

                        {children}

                        {button && <button className="modal__button" disabled={buttonDisabled}>{buttonText}</button>}
                    </form>
                </div>
            </div>
        ) : null
    );
};

export default Modal;
