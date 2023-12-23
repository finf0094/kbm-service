import {IQuestion} from "../../../models/quiz/IQuestion.ts";
import React from "react";

interface QuestionProps {
    question: IQuestion;
    selectedAnswers: { [questionId: string]: string };
    onAnswerSelect: (questionId: string, answerId: string) => void;
}

const Question: React.FC<QuestionProps> = ({ question, selectedAnswers, onAnswerSelect }) => {
    return (
        <div className="question">
            <h2 className="question__text">
                {question.text}
            </h2>
            <ul className="question__list">
                {question.answers.map((answer) => {
                    const questionId = question.questionId;
                    const answerId = answer.answerId;
                    const isVisible = questionId && answerId;
                    return (
                        <button
                            key={answerId || 'missing-key'}
                            className={`question__button ${isVisible && selectedAnswers[questionId || ''] === answerId ? 'question__selected' : ''}`}
                            onClick={() => onAnswerSelect(questionId || '', answerId || '')}
                            disabled={!isVisible}
                            style={{ display: 'block' }}
                        >
                            {answer.text}
                        </button>
                    );
                })}
            </ul>
        </div>
    );
};

export default Question;