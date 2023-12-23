import React from 'react';

import {IApplication} from "../../models/application/IApplication.ts";
import {useGetAllQuizSessionsByUserIdQuery} from "../../redux/api/quizSessionApi.ts";

type QuizResultProps = {
    application: IApplication;
};

const QuizResult: React.FC<QuizResultProps> = ({application}) => {
    const {data: quizSessionsData} = useGetAllQuizSessionsByUserIdQuery(application.user.id)

    return (
        <div>
            <h2>Результаты теста</h2>
            {quizSessionsData?.map((quizSession) => (
                <div key={quizSession.sessionId}>
                    <p>Позиция: {quizSession.quiz.position.name}</p>
                    <p>
                        Счет: <span style={{color: 'green'}}>{quizSession.scorePercentage}</span>
                    </p>
                </div>
            ))}
        </div>
    );
};

export default QuizResult;
