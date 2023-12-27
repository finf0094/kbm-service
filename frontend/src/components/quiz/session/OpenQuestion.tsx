import { ChangeEvent, FC } from 'react';
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
        <div>
            <h2>{question.name}</h2>
            <textarea
                value={selectedAnswers[question.id || ''] || ''}
                onChange={handleAnswerChange}
            />
        </div>
    );
};

export default OpenQuestion;