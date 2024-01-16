import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import { toast } from 'react-toastify';

import {initialState, setQuizData} from "../../redux/slices/quizCreateSlice.ts";
import {useCreateOrUpdateQuizMutation, useGetQuizByIdQuery} from "../../redux/api/quizApi.ts";

import {useAppSelector, useAppDispatch} from "../../hooks/useAppDispatch.ts";

import QuizForm from "../../components/quiz/QuizForm.tsx";
import QuestionsSection from "../../components/quiz/QuestionsSection.tsx";
import OpenQuestionsSection from "../../components/quiz/OpenQuestionsSection.tsx";



const QuizCreateOrUpdatePage: React.FC = () => {
    const { quizId } = useParams();
    const quizData = useAppSelector(state => state.quizCreate)
    const [createOrUpdateQuiz, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useCreateOrUpdateQuizMutation();
    const { data: existingQuiz } = useGetQuizByIdQuery(quizId || "", { skip: !quizId });
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (existingQuiz) {
            dispatch(setQuizData(existingQuiz));
        } else {
            dispatch(setQuizData(initialState));
        }
    }, [existingQuiz, dispatch]);

    const handleCreateOrUpdateClick = async () => {
        await createOrUpdateQuiz(quizData)
    };

    useEffect(() => {
        if (isSuccess) {
            toast.success(`Тест успешно ${quizId ? 'обновлён' : 'создан'}!`)
        }
        if (isError && error && 'data' in error && error.data) {
            toast.error(`Ошибка: ${error.data.message}`);
            console.log(`Ошибка: ${error}. Покажите эту ошибку разработчикам!`);
        }

    }, [isSuccess, isError, quizId, error]);

    return (
        <div className="page">
            <QuizForm />
            <QuestionsSection />
            <OpenQuestionsSection />
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
                <button onClick={handleCreateOrUpdateClick} disabled={isLoading}>{isLoading ? 'Загрузка...' : quizId ? 'Сохранить' : 'Создать'}</button>
            </div>
        </div>
    );
};

export default QuizCreateOrUpdatePage;