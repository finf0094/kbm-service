import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {useGetAllQuizWithPaginationQuery, useDeleteQuizMutation} from "../../redux/api/quizApi.ts";

import Loader from '../../components/utils/Loader.tsx';

import './UI/QuizListPage.css'
import { toast } from 'react-toastify';
import QuizItem from "../../components/quiz/list/QuizItem.tsx";
import Pagination from "../../components/utils/Pagination.tsx";

const QuizListPage: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const {
        data: quizzes,
        isLoading,
        isSuccess,
        isError,
        error,
        refetch} = useGetAllQuizWithPaginationQuery(currentPage);

    const [deleteQuiz, {
        isError: isDeleteError,
        isSuccess: isDeleteSuccess,
        error: deleteError
    }] = useDeleteQuizMutation();

    useEffect(() => {
        if (isError && error) {
            console.log(error);
        }
    }, [isError]);


    useEffect(() => {
        if (isDeleteSuccess) {
            refetch();
            toast.success("Тест успешно удален!");
        }
        if (isDeleteError && deleteError && 'data' in deleteError && deleteError.data) {
            toast.error(`Ошибка: ${deleteError.data.message}`);
            console.log(`Ошибка: ${deleteError}. Покажите эту ошибку разработчикам!`)
        }
    }, [isDeleteSuccess, isDeleteError, deleteError, refetch]);

    useEffect(() => {
        if (isSuccess && quizzes) {
            setTotalPages(quizzes.totalPages);
        }
    }, [isSuccess, quizzes]);

    const handleDelete = async (quizId: string) => {
        await deleteQuiz(quizId);
    };

    if (isLoading) {
        return <Loader/>;
    }

        

    return (
        <div className="page">
            <div className="quizList">
                <div className="quizList__wrapper">
                    <ul className="quizList__list">
                        <div className="quizList__item quizList__create">
                            <span className="text">Создать тест</span> <Link to="/quiz/create" className="plus">+</Link>
                        </div>
                        {isError ? <span>Не удалось получить тесты</span> : ""}
                        {isSuccess && quizzes ? quizzes.content.map(quiz => (
                            <QuizItem key={quiz.quizId} quiz={quiz} handleDelete={handleDelete} />
                        )) : <span>Ошибка с получением теста</span>}
                    </ul>
                    <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={setCurrentPage} />
                </div>
            </div>
        </div>
    );
};

export default QuizListPage;