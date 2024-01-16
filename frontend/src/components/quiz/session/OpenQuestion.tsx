import { ChangeEvent, FC } from 'react';
import "../UI/OpenQuestion.css"
import {IOpenQuestion} from "../../../models/quiz/IOpenQuestion.ts";

interface OpenQuestionProps {
    question: IOpenQuestion;
    selectedAnswers: { [key: string]: string };
    onAnswerSelect: (questionId: string, answer: string) => void;
}

const OpenQuestion: FC<OpenQuestionProps> = ({ question, selectedAnswers, onAnswerSelect }) => {
    const handleAnswerChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        onAnswerSelect(question.id || '', event.target.value);
    };

    return (
        <div className='open-question'>
            <h2 className='open-question__title'>{question.name}</h2>
            <textarea className='open-question__textarea' rows={10} cols={50} value={selectedAnswers[question.id || ''] || ''} onChange={handleAnswerChange} />
        </div>
    );
};

export default OpenQuestion;