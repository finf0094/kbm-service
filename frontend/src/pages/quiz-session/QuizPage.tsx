import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { differenceInSeconds } from 'date-fns';
import { useAppSelector, useAppDispatch } from "../../hooks/useAppDispatch";
import {
    fetchQuizSessionById,
    startQuizSession,
    submitQuizAnswer,
    submitOpenQuizAnswer,
    finishQuizSession,
    resetSession,
} from '../../redux/slices/quizSessionSlice';
import useCurrentUser from '../../hooks/useCurrentUser';
import Loader from '../../components/utils/Loader';
import QuizStartModal from '../../components/modal/quiz/QuizStartModal';
import Question from '../../components/quiz/session/Question';
import './UI/QuizPage.css';
import QuizFinishModal from "../../components/modal/quiz/QuizFinishModal";
import { QuizSessionStatus } from "../../models/quizSession/IQuizSession";
import OpenQuestion from "../../components/quiz/session/OpenQuestion.tsx";
import {IQuestion} from "../../models/quiz/IQuestion.ts";
import {IOpenQuestion} from "../../models/quiz/IOpenQuestion.ts";

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
    const [remainingTime, setRemainingTime] = useState<number>(0);

    const totalQuestions = (quizSession?.quiz?.questions?.length || 0) + (quizSession?.quiz?.openQuestions?.length || 0);
    const isCurrentQuestionOpen = currentQuestionIndex >= (quizSession?.quiz?.questions?.length || 0);
    const currentQuestion = isCurrentQuestionOpen
        ? quizSession?.quiz?.openQuestions[currentQuestionIndex - (quizSession?.quiz?.questions?.length || 0)]
        : quizSession?.quiz?.questions[currentQuestionIndex];

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

    useEffect(() => {
        let intervalId: number;

        if (quizSession?.status === QuizSessionStatus.IN_PROGRESS) {
            intervalId = setInterval(() => {
                const now = new Date();
                const endTime = new Date(quizSession.endTime);
                const startTime = new Date(quizSession.startTime);
                const totalSeconds = Math.max(differenceInSeconds(endTime, startTime), 0);
                const secondsElapsed = Math.min(differenceInSeconds(now, startTime), totalSeconds);
                const secondsLeft = totalSeconds - secondsElapsed;

                setRemainingTime(secondsLeft);

                if (secondsLeft <= 0) {
                    clearInterval(intervalId);
                    dispatch(finishQuizSession({ userId, quizId: quizSession?.quiz?.quizId || '' }));
                }
            }, 1000);
        }

        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, [quizSession, dispatch, userId]);

    const handleAnswerSelect = useCallback((questionId: string, answerId: string) => {
        setSelectedAnswers((prev) => ({ ...prev, [questionId]: answerId }));
    }, []);

    const handleAnswerSubmit = useCallback(async () => {
        for (const questionId in selectedAnswers) {
            await dispatch(submitQuizAnswer({ userId, quizId: quizSession?.quiz?.quizId || '', questionId, answerId: selectedAnswers[questionId] }));
        }
        if (currentQuestionIndex === totalQuestions - 1) {
            await dispatch(finishQuizSession({ userId, quizId: quizSession?.quiz?.quizId || '' }));
        }
    }, [dispatch, userId, quizSession?.quiz?.quizId, selectedAnswers, currentQuestionIndex, totalQuestions]);

    const handleOpenAnswerSubmit = useCallback(async () => {
        if (currentQuestion && 'id' in currentQuestion) {
            const openQuestionId = currentQuestion.id;
            if (openQuestionId) {
                const openQuestionText = selectedAnswers[openQuestionId];
                if (openQuestionText) {
                    await dispatch(submitOpenQuizAnswer({ userId, quizId: quizSession?.quiz?.quizId || '', openQuestionId, openQuestionText }));
                }
            }
        }
        if (currentQuestionIndex === totalQuestions - 1) {
            await dispatch(finishQuizSession({ userId, quizId: quizSession?.quiz?.quizId || '' }));
        }
    }, [dispatch, userId, quizSession?.quiz?.quizId, selectedAnswers, currentQuestion, currentQuestionIndex, totalQuestions]);

    const handleNextQuestion = useCallback(() => {
        setCurrentQuestionIndex((prev) => prev + 1);
        if (isCurrentQuestionOpen) {
            handleOpenAnswerSubmit();
        } else {
            handleAnswerSubmit();
        }
    }, [handleAnswerSubmit, handleOpenAnswerSubmit, isCurrentQuestionOpen]);

    const handleStartTest = useCallback(async () => {
        if (sessionId) {
            await dispatch(startQuizSession(sessionId));
        }
        setIsModalOpen(false);
    }, [dispatch, sessionId]);

    if (status === 'loading') return <Loader />;
    if (status === 'failed') return <div>{error}</div>;

    // Helper function to format the remaining time
    const formatTime = (totalSeconds: number) => {
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    return (
        <div className="page">
            <div className="quiz">
                <div className="test">
                    {quizSession?.status === QuizSessionStatus.IN_PROGRESS && remainingTime !== null && (
                        <div className="timer">
                            Time remaining: {formatTime(remainingTime)}
                        </div>
                    )}
                    <div className="test__content">
                        {currentQuestion && (
                            <div className="test__item">
                                <div className="test__item-content">
                                    {isCurrentQuestionOpen ? (
                                        <OpenQuestion
                                            question={currentQuestion as IOpenQuestion}
                                            selectedAnswers={selectedAnswers}
                                            onAnswerSelect={handleAnswerSelect}
                                        />
                                    ) : (
                                        <Question
                                            question={currentQuestion as IQuestion}
                                            selectedAnswers={selectedAnswers}
                                            onAnswerSelect={handleAnswerSelect}
                                        />
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="double-arrow">
                        {currentQuestionIndex < totalQuestions - 1 && (
                            <i className="uil uil-angle-down test__arrow" onClick={handleNextQuestion}></i>
                        )}
                        {currentQuestionIndex === totalQuestions - 1 && (
                            <button className="test__button" onClick={isCurrentQuestionOpen ? handleOpenAnswerSubmit : handleAnswerSubmit}>Отправить</button>
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