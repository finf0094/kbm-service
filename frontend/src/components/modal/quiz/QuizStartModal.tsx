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
            title="Start Test"
            button={true}
            buttonText="Start Test"
            buttonDisabled={false}
            isOpen={isOpen}
            onClose={onClose}
            onConfirm={onConfirm}
        >
            <h1>Are you ready to start the test?</h1>
        </Modal>
    );
};

export default QuizModal;