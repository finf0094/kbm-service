import React, {useEffect, useState} from 'react';

import {useAppDispatch, useAppSelector} from "../../hooks/useAppDispatch.ts";

import ExperienceRequestModal from "../modal/application/ExperienceRequestModal.tsx";

import {IExperienceWithoutId} from "../../models/application/IExperience.ts";

import './UI/ExperienceTable.css';
import {useDeleteExperienceMutation, useSetExperienceMutation} from "../../redux/api/applicationApi.ts";
import {setApplicationData} from "../../redux/slices/applicationSlice.ts";
import {toast} from "react-toastify";



const ExperienceTable: React.FC<{isChangble: boolean}> = ({ isChangble }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const dispatch = useAppDispatch();
    const {id: applicationId, experiences} = useAppSelector(state => state.application)

    const [setExperienceQuery, {
        data: applicationData,
        isSuccess: isSetExperienceSuccess,
        isError: isSetExperienceError,
        error: setExperienceError,
    }] = useSetExperienceMutation();

    const [deleteExperienceQuery, {
        data: afterDeletedExperienceMessage,
        isSuccess: isDeleteExperienceSuccess,
        isError: isDeleteExperienceError,
        error: deleteExperienceError,
    }] = useDeleteExperienceMutation();

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleExperienceSubmit = async (applicationId: string, experience: IExperienceWithoutId) => {
        await setExperienceQuery({applicationId, body: experience})
    };

    const deleteExperience = async (experienceId: number) => {
        await deleteExperienceQuery({experienceId})
    };

    useEffect(() => {
        if (isSetExperienceSuccess && applicationData) {
            dispatch(setApplicationData(applicationData))
        }
        if (isSetExperienceError && setExperienceError && 'data' in setExperienceError && setExperienceError.data) {
            toast.error(`error: ${setExperienceError.data.message}`);
            console.log(setExperienceError);
        }
    }, [isSetExperienceSuccess, isSetExperienceError]);

    useEffect(() => {
        if (isDeleteExperienceSuccess && afterDeletedExperienceMessage) {
            toast.success(afterDeletedExperienceMessage.message)
        }
        if (isDeleteExperienceError && deleteExperienceError && 'data' in deleteExperienceError && deleteExperienceError.data) {
            toast.error(`error: ${deleteExperienceError.data.message}`);
            console.log(deleteExperienceError);
        }
    }, [isDeleteExperienceSuccess, isDeleteExperienceError]);

    return (
        <div className="experience-table">
            <div className="experience-table__wrapper">
                <form className="experience-table__form">
                    <div className="experience-table__content">
                        <table>
                            <thead>
                            <tr>
                                <th>Компания</th>
                                <th>Должность</th>
                                <th>Обязанности</th>
                                <th>Дата начало работы</th>
                                <th>Дата окончания работы</th>
                                {isChangble ? <th>Удалить</th> : null}
                            </tr>
                            </thead>
                            <tbody>
                            {experiences &&
                                experiences.map((experience, index) => (
                                    <tr key={index}>
                                        <td>{experience.company}</td>
                                        <td>{experience.position}</td>
                                        <td>{experience.jobResponsibilities}</td>
                                        <td>{experience.workStart}</td>
                                        <td>{experience.workEnd}</td>
                                        {isChangble ? <td>
                                            <button
                                                type="button"
                                                onClick={() => deleteExperience(experience.id)}
                                                className="experience-table__delete"
                                            >
                                                <svg
                                                    width="14"
                                                    height="18"
                                                    viewBox="0 0 14 18"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M14 1H10.5L9.5 0H4.5L3.5 1H0V3H14M1 16C1 16.5304 1.21071 17.0391 1.58579 17.4142C1.96086 17.7893 2.46957 18 3 18H11C11.5304 18 12.0391 17.7893 12.4142 17.4142C12.7893 17.0391 13 16.5304 13 16V4H1V16Z"
                                                        fill="#393939"
                                                    />
                                                </svg>
                                            </button>
                                        </td> : null}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="experience-table__button">
                            {isChangble ? <button type="button" onClick={openModal}>
                                Добавить <i className="uil uil-plus"></i>
                            </button> : null}
                        </div>
                    </div>
                </form>
                <ExperienceRequestModal isOpen={isModalOpen} onClose={closeModal} onSubmit={(experience) => handleExperienceSubmit(applicationId, experience)} />
            </div>
        </div>
    );
};

export default ExperienceTable;
