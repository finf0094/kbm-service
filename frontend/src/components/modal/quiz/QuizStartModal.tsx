import React from "react";
import Modal from "../Modal.tsx";

interface QuizModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

const QuizModal: React.FC<QuizModalProps> = ({ isOpen, onClose, onConfirm }) => {
    return (
        <Modal
            id="startTestModal"
            title="Начать тест"
            button={true}
            buttonText="Готов"
            buttonDisabled={false}
            isOpen={isOpen}
            onClose={onClose}
            onConfirm={onConfirm}
        >
            <h1>Вы готовы начать нест?</h1>
        </Modal>
    );
};

export default QuizModal;