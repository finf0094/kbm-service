import React from 'react';
import {useAppDispatch, useAppSelector} from "../../hooks/useAppDispatch.ts";
import {addOpenQuestion, removeOpenQuestion, updateOpenQuestion} from "../../redux/slices/quizCreateSlice.ts";

import "./UI/OpenQuestionsSection.css"

const OpenQuestionsSection: React.FC = () => {
    const dispatch = useAppDispatch();
    const quizData = useAppSelector(state => state.quizCreate);

    const handleAddOpenQuestion = () => {
        dispatch(addOpenQuestion());
    };

    const handleRemoveOpenQuestion = (index: number) => {
        dispatch(removeOpenQuestion(index));
    };

    return (
        <div className="openQuestionSection">
            {quizData.openQuestions.map((openQuestion, questionIndex) => (
                <div className="openQuestionSection__item" key={questionIndex}>
                    <div className="openQuestion-header">
                        <h2>Открытый вопрос {questionIndex + 1}</h2>
                        <button className="remove-question-button" onClick={() => handleRemoveOpenQuestion(questionIndex)}>×</button>
                    </div>
                    <input
                        type="text"
                        name={`openQuestions[${questionIndex}].name`}
                        placeholder="Open Question"
                        value={openQuestion.name}
                        onChange={(event) => {
                            dispatch(updateOpenQuestion({ index: questionIndex, name: event.target.value }));
                        }}
                    />
                </div>
            ))}
            <button onClick={handleAddOpenQuestion}>Add Open Question</button>
        </div>
    );
};

export default OpenQuestionsSection;