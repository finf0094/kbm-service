import React from 'react';

import {useAppDispatch, useAppSelector} from "../../hooks/useAppDispatch.ts";
import {
    addAnswer,
    addQuestion,
    removeAnswer,
    removeQuestion,
    updateQuestion,
    updateAnswer, updateAnswerWeight
} from "../../redux/slices/quizCreateSlice.ts";

import "./UI/QuestionsSection.css"

const QuestionsSection: React.FC = () => {
    const dispatch = useAppDispatch();
    const quizData = useAppSelector(state => state.quizCreate);

    const handleAddQuestion = () => {
        dispatch(addQuestion());
    };

    const handleRemoveQuestion = (index: number) => {
        dispatch(removeQuestion(index));
    };

    const handleAddAnswer = (questionIndex: number) => {
        dispatch(addAnswer(questionIndex));
    };

    const handleRemoveAnswer = (questionIndex: number, answerIndex: number) => {
        dispatch(removeAnswer({questionIndex, answerIndex}));
    };

    const handleAnswerWeightChange = (questionIndex: number, answerIndex: number, weight: number) => {
        dispatch(updateAnswerWeight({questionIndex, answerIndex, weight}));
    };

    return (
        <div className="questionSection">
            {quizData.questions.map((question, questionIndex) => (
                <div className="questionSection__item" key={questionIndex}>
                    <div className="question-header">
                        <h2>Вопрос {questionIndex + 1}</h2>
                        <button className="remove-question-button" onClick={() => handleRemoveQuestion(questionIndex)}>×</button>
                    </div>
                    <input
                        type="text"
                        name={`questions[${questionIndex}].text`}
                        placeholder="Question"
                        value={question.text}
                        onChange={(event) => {
                            dispatch(updateQuestion({index: questionIndex, text: event.target.value}));
                        }}
                    />
                    {question.answers.map((answer, answerIndex) => (
                        <div className="input-group" key={answerIndex}>
                            <input
                                type="text"
                                id={`questions[${questionIndex}].answers[${answerIndex}].text`}
                                className="input-group__input"
                                placeholder="Answer"
                                value={answer.text}
                                onChange={(event) => {
                                    dispatch(updateAnswer({questionIndex, answerIndex, text: event.target.value}));
                                }}
                            />
                            <input
                                type="number"
                                min="0"
                                max="3"
                                id={`questions[${questionIndex}].answers[${answerIndex}].weight`}
                                className="input-group__input input-group__input--weight"
                                value={answer.answerWeight}
                                onChange={(event) => {
                                    handleAnswerWeightChange(questionIndex, answerIndex, Number(event.target.value));
                                }}
                            />
                            <button className="remove-answer-button" onClick={() => handleRemoveAnswer(questionIndex, answerIndex)}>×</button>
                        </div>
                    ))}
                    <button onClick={() => handleAddAnswer(questionIndex)}>Добавить ответ</button>
                </div>
            ))}
            <button onClick={handleAddQuestion}>Добавить вопрос</button>
        </div>
    );
};

export default QuestionsSection;