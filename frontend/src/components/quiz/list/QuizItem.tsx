import {FC} from "react";
import {Link} from 'react-router-dom';

import {IQuizSummary} from "../../../models/quiz/IQuizSummary.ts";
import {formatDuration} from "../../utils/formatDuration.ts";


interface QuizItemProps {
    quiz: IQuizSummary;
    handleDelete: (quizId: string) => void;
}

const QuizItem: FC<QuizItemProps>= ({ quiz, handleDelete }) => {
    return (
        <li key={quiz.quizId} className="quizList__item">
            <div className="quizList__item-info">
                <Link to={`/quiz/${quiz.quizId}/update`} className="quizList__link">
                    <h2 className="quizList__name">{quiz.title}</h2>
                    <p className="quizList__desc">{quiz.description}</p>
                    <p className="quizList__duration">Duration: {formatDuration(quiz.duration)}</p>
                    <p className="quizList__position">Position: {quiz.position.name}</p>
                </Link>
            </div>
            <button className="quizList__delete" onClick={() => handleDelete(quiz.quizId)}>
                <svg width="14" height="18" viewBox="0 0 14 18" fill="none"
                     xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M14 1H10.5L9.5 0H4.5L3.5 1H0V3H14M1 16C1 16.5304 1.21071 17.0391 1.58579 17.4142C1.96086 17.7893 2.46957 18 3 18H11C11.5304 18 12.0391 17.7893 12.4142 17.4142C12.7893 17.0391 13 16.5304 13 16V4H1V16Z"
                        fill="#393939"/>
                </svg>
            </button>
        </li>
    );
};

export default QuizItem;