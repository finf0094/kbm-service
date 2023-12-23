import React, {useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../hooks/useAppDispatch.ts";
import {handleQuizDataChange, setPosition} from "../../redux/slices/quizCreateSlice.ts";

import PositionSelectModal from "../modal/position/PositionSelectModal.tsx";

import {IPosition} from "../../models/position/IPosition.ts";

import "./UI/QuizForm.css"



const QuizForm: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const dispatch = useAppDispatch();
    const quizData = useAppSelector(state => state.quizCreate);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleDataChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        dispatch(handleQuizDataChange({ name, value }));
    };

    const handlePositionSelect = (position: IPosition) => {
        dispatch(setPosition(position))
        closeModal();
    };

    return (
        <div className="quizForm">
            <div className="quizForm__item">
                <h2>Для позиций: {quizData.position.name}</h2>
                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={quizData.title}
                    onChange={handleDataChange}
                />
                <textarea
                    name="description"
                    placeholder="Description"
                    value={quizData.description}
                    onChange={handleDataChange}
                />
                <input
                    type="number"
                    name="duration"
                    placeholder="Duration"
                    value={quizData.duration}
                    onChange={handleDataChange}
                />
                <button onClick={openModal}>Выбрать позицию</button>
            </div>
            <PositionSelectModal isOpen={isModalOpen} onClose={closeModal} onSubmit={(handlePositionSelect)}/>
        </div>
    );
};

export default QuizForm;