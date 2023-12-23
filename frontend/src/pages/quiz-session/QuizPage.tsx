import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from "../../hooks/useAppDispatch.ts";
import {
    fetchQuizSessionById,
    startQuizSession,
    submitQuizAnswer,
    finishQuizSession,
    resetSession,
} from '../../redux/slices/quizSessionSlice';
import useCurrentUser from '../../hooks/useCurrentUser';

import Loader from '../../components/utils/Loader';
import QuizStartModal from '../../components/modal/quiz/QuizStartModal';
import Question from '../../components/quiz/session/Question';

import './UI/QuizPage.css';
import QuizFinishModal from "../../components/modal/quiz/QuizFinishModal.tsx";
import {QuizSessionStatus} from "../../models/quizSession/IQuizSession.ts";

const QuizPage = () => {
    const { sessionId = '' } = useParams();
    const dispatch = useAppDispatch();
    const quizSession = useAppSelector((state) => state.quizSession.session);
    const status = useAppSelector((state) => state.quizSession.status);
    const error = useAppSelector((state) => state.quizSession.error);
    const { id: userId } = useCurrentUser();

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState<{ [key: string]: string }>({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isFinishModalOpen, setIsFinishModalOpen] = useState(false);
    const [scorePercentage, setScorePercentage] = useState(0);

    useEffect(() => {
        if (quizSession?.status === QuizSessionStatus.NOT_STARTED) {
            setIsModalOpen(true);
        }
        if (quizSession?.status === QuizSessionStatus.COMPLETED) {
            setIsFinishModalOpen(true);
            setScorePercentage(quizSession.scorePercentage);
        }
    }, [quizSession?.status, quizSession?.scorePercentage]);

    useEffect(() => {
        if (sessionId) {
            dispatch(fetchQuizSessionById(sessionId));
        }
        return () => {
            dispatch(resetSession());
        };
    }, [dispatch, sessionId]);


    const handleAnswerSelect = useCallback((questionId: string, answerId: string) => {
        setSelectedAnswers((prev) => ({ ...prev, [questionId]: answerId }));
    }, []);

    const handleAnswerSubmit = useCallback(async () => {
        for (const questionId in selectedAnswers) {
            await dispatch(submitQuizAnswer({ userId, quizId: quizSession?.quiz?.quizId || '', questionId, answerId: selectedAnswers[questionId] }));
        }
        if (currentQuestionIndex === (quizSession?.quiz?.questions?.length || 0) - 1) {
            await dispatch(finishQuizSession({ userId, quizId: quizSession?.quiz?.quizId || '' }));
        }
    }, [dispatch, userId, quizSession?.quiz?.quizId, selectedAnswers, currentQuestionIndex]);

    const handleNextQuestion = useCallback(() => {
        setCurrentQuestionIndex((prev) => prev + 1);
        handleAnswerSubmit();
    }, [handleAnswerSubmit]);

    const handleStartTest = useCallback(async () => {
        if (sessionId) {
            await dispatch(startQuizSession(sessionId));
        }
        setIsModalOpen(false);
    }, [dispatch, sessionId]);

    if (status === 'loading') return <Loader />;
    if (status === 'failed') return <div>{error}</div>;

    const currentQuestion = quizSession?.quiz?.questions[currentQuestionIndex];

    return (
        <div className="page">
            <div className="quiz">
                <div className="test">
                    <div className="test__content">
                        {currentQuestion && (
                            <div className="test__item">
                                <div className="test__item-content">
                                    <Question
                                        question={currentQuestion}
                                        selectedAnswers={selectedAnswers}
                                        onAnswerSelect={handleAnswerSelect}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="double-arrow">
                        {currentQuestionIndex < (quizSession?.quiz?.questions?.length || 0) - 1 && (
                            <i className="uil uil-angle-down test__arrow" onClick={handleNextQuestion}></i>
                        )}
                        {currentQuestionIndex === (quizSession?.quiz?.questions?.length || 0) - 1 && (
                            <button className="test__button" onClick={handleAnswerSubmit}>Отправить</button>
                        )}
                    </div>
                </div>
                <QuizFinishModal isOpen={isFinishModalOpen} onClose={() => setIsFinishModalOpen(false)} score={scorePercentage} />
                <QuizStartModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onConfirm={handleStartTest} />
            </div>
        </div>
    );
};

export default QuizPage;