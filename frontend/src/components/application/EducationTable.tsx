import React, {useEffect, useState} from 'react';
import {toast} from "react-toastify";

import {useDeleteEducationMutation, useSetEducationMutation} from "../../redux/api/applicationApi.ts";
import {setApplicationData} from "../../redux/slices/applicationSlice.ts";

import {useAppDispatch, useAppSelector} from "../../hooks/useAppDispatch.ts";
import EducationRequestModal from "../modal/application/EducationRequestModal.tsx";

import {IEducationWithoutId} from "../../models/application/IEducation.ts";

import './UI/EducationTable.css';
const EducationTable: React.FC<{
    isChangble: boolean,
}> = ({isChangble}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const dispatch = useAppDispatch();
    const { id: applicationId, educations } = useAppSelector(state => state.application);

    const [setEducationQuery, {
        data: applicationData,
        isSuccess: isSetEducationSuccess,
        isError: isSetEducationError,
        error: setEducationError,
    }] = useSetEducationMutation();

    const [deleteEducationQuery, {
        data: afterDeletedEducationMessage,
        isSuccess: isDeleteEducationSuccess,
        isError: isDeleteEducationError,
        error: deleteEducationError,
    }] = useDeleteEducationMutation()

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleEducationSubmit = async (applicationId: string, education: IEducationWithoutId) => {
        await setEducationQuery({applicationId, body: education})
    };

    const deleteEducation = async (educationId: number) => {
        await deleteEducationQuery({educationId});
    }

    useEffect(() => {
        if (isSetEducationSuccess && applicationData) {
            dispatch(setApplicationData(applicationData))
        }
        if (isSetEducationError && setEducationError && 'data' in setEducationError && setEducationError.data) {
            toast.error(`error: ${setEducationError.data.message}`);
            console.log(setEducationError);
        }
    }, [isSetEducationSuccess, isSetEducationError]);

    useEffect(() => {
        if (isDeleteEducationSuccess && afterDeletedEducationMessage) {
            toast.success(afterDeletedEducationMessage.message)
        }
        if (isDeleteEducationError && deleteEducationError && 'data' in deleteEducationError && deleteEducationError.data) {
            toast.error(`error: ${deleteEducationError.data.message}`);
            console.log(deleteEducationError);
        }
    }, [isDeleteEducationSuccess, isDeleteEducationError]);

    return (
        <div className="educationtable">
            <div className="educationtable__wrapper">
                <form className="educationtable__form">
                    <div className="educationtable__content">
                        <table>
                            <thead>
                            <tr>
                                <th>Дата выпуска</th>
                                <th>Учебное заведение</th>
                                <th>Специализация</th>
                                <th>Степень/Диплом</th>
                                {isChangble ? <th>Удалить</th> : null}
                            </tr>
                            </thead>
                            <tbody>
                            {educations &&
                                educations.map((education, index) => (
                                    <tr key={index}>
                                        <td>{education.dateIssued}</td>
                                        <td>{education.educationalInstitution}</td>
                                        <td>{education.specialization}</td>
                                        <td>{education.degreeDiploma}</td>
                                        {isChangble ? <td>
                                            <button
                                                type="button"
                                                onClick={() => deleteEducation(education.id)}
                                                className="educationtable__delete"
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
                        {isChangble ? <div className="educationtable__button">
                            <button type="button" onClick={openModal}>
                                Добавить <i className="uil uil-plus"></i>
                            </button>
                        </div> : null}
                    </div>
                </form>
                <EducationRequestModal isOpen={isModalOpen} onClose={closeModal} onSubmit={(education) => handleEducationSubmit(applicationId, education)}/>
            </div>
        </div>
    );
};

export default EducationTable;
