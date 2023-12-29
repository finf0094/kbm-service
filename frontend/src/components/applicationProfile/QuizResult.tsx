import React from 'react';

import {IApplication} from "../../models/application/IApplication.ts";
import {useGetAllQuizSessionsByUserIdQuery} from "../../redux/api/quizSessionApi.ts";

type QuizResultProps = {
    application: IApplication;
};

const QuizResult: React.FC<QuizResultProps> = ({application}) => {
    const {data: quizSessionsData} = useGetAllQuizSessionsByUserIdQuery(application.user.id)

    return (
        <div className='status'>
            <h2 className='status__title' style={{marginBottom: '10px'}}>Результаты теста</h2>
            {quizSessionsData?.map((quizSession) => (
                <div key={quizSession.sessionId} style={{display: 'grid', gridGap: "5px"}}>
                    <p>Позиция: <span style={{fontWeight: '600', fontSize: '17px'}}>{quizSession.quiz.position.name}</span></p>
                    <p>Счет: <span style={{color: '#1EC91A', fontWeight: '700', fontSize: '17px'}}>{quizSession.scorePercentage}</span></p>
                </div>
            ))}
        </div>
    );
};

export default QuizResult;
