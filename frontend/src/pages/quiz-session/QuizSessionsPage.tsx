import {useGetAllQuizSessionsByUserIdQuery} from "../../redux/api/quizSessionApi.ts";
import './UI/QuizSessionsPage.css';
import Loader from "../../components/utils/Loader.tsx";
import {formatDuration} from "../../components/utils/formatDuration.ts";
import {Link} from "react-router-dom";
import useCurrentUser from "../../hooks/useCurrentUser.ts";

const QuizSessionsPage = () => {
    const {id: userId} = useCurrentUser();
    const {data: quizSessions, isSuccess, error, isLoading} = useGetAllQuizSessionsByUserIdQuery(userId);

    if (isLoading) {
        return <div className="page">
            <Loader/>
        </div>;
    }

    if (error && 'data' in error && error.data) {
        return <div className="page">Error: {error.data.message}</div>;
    }

    const calculateDuration = (startTime: string, endTime: string): number => {
        const start = new Date(startTime).getTime();
        const end = new Date(endTime).getTime();

        const durationInMilliseconds = end - start;
        const durationInMinutes = Math.round(durationInMilliseconds / 1000 / 60);

        return durationInMinutes;
    };

    return (
        <div className="page">
            <div className="quiz-sessions">
                <h1 className="quiz-sessions-title">Тесты</h1>
                {isSuccess && quizSessions.map((session, index) => (
                    <div key={index} className="quiz-session">
                        <h2>{session.quiz.title}</h2>
                        <p>Status: {session.status}</p>
                        <p>Score: {session.scorePercentage}</p>
                        <p>Time: {calculateDuration(session.startTime, session.endTime)} минуты</p>
                        <p style={{marginBottom: '20px'}}>Duration: {formatDuration(session.quiz.duration)}</p>
                        <Link className="go-button" to={`/quiz/${session.sessionId}`}>Перейти</Link>
                        <hr/>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default QuizSessionsPage;