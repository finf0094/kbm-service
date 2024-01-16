import React, { useEffect, useState } from 'react';
import { useDeleteCuratorMutation, useGetCuratorQuery, useUpdateCuratorMutation } from '../../redux/api/curatorApi';
import { useNavigate, useParams } from 'react-router-dom';
import { IUpdateCurator } from '../../models/curator/IUpdateCurator';
import Loader from '../../components/utils/Loader';

const CuratorEditPage: React.FC = () => {
    const { id } = useParams();
    const [updateCurator] = useUpdateCuratorMutation();
    const [deleteCurator, { isLoading: deleteLoading, isError: deleteError, error: deleteErrorData }] = useDeleteCuratorMutation();
    const { data: existingCurator } = useGetCuratorQuery(Number(id), {
        skip: id === undefined, // Skip the query if id is not defined
    });
    const [curatorData, setCuratorData] = useState<IUpdateCurator>({
        id: 0,
        fullName: '',
        birthDate: existingCurator ? existingCurator.birthDate : new Date().toISOString(),
        itin: '',
        curatorNumber: '',
        personalPhoneNumber: '',
        workPhoneNumber: '',
        email: '',
        education: '',
        certificateNumber: '',
        totalWorkExperience: 0,
        curatorWorkExperience: 0,
        workExperienceInCurrentPosition: 0,
        academicDegree: '',
        academicTitle: '',
    });
    const navigate = useNavigate();

    if (deleteLoading) return <div className="center"><Loader /></div>
    if (deleteErrorData) console.log(deleteErrorData);
    if (deleteError) return <div>Ошибка с загрузкой информации о элементе.</div>
    
    useEffect(() => {
        // Update the local state with existing curator data when available
        if (existingCurator) {
            setCuratorData(existingCurator);
        }
    }, [existingCurator]);

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            // Check if id is defined
            if (id !== undefined) {
                const result = await updateCurator({ curatorId: Number(id), curator: curatorData }).unwrap();
                console.log('Curator updated successfully:', result);
                navigate('/integration/curators', { replace: true });
            } else {
                console.error('Error updating curator: ID is undefined');
            }
        } catch (error) {
            // Handle the error, e.g., display an error message
            console.error('Error updating curator:', error);
        }
    };

    const handleDelete = async () => {
        if (deleteCurator) {
            deleteCurator(Number(id));
            navigate('/integration/curators', { replace: true });
        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCuratorData((prevData) => ({
            ...prevData,
            [name]: name === 'personalPhoneNumber' || name === 'workPhoneNumber' ? formatPhoneNumber(value) : name === 'itin' ? value.slice(0, 12) : value,
        }));
    };
    const formatPhoneNumber = (input: string) => {
        // Remove non-numeric characters from input
        const numericInput = input.replace(/\D/g, '');

        // Check if the numeric input is not empty
        if (numericInput.length > 0) {
            // Format the phone number
            return `+7 (${numericInput.slice(1, 4)}) ${numericInput.slice(4, 7)} ${numericInput.slice(7, 9)} ${numericInput.slice(9, 11)}`;
        }

        // If input is empty, return an empty string
        return '';
    };

    console.log(curatorData)


    return (
        <form onSubmit={onSubmit} className="user-edit">
            <div className="user-edit__row">
                <label className="user-edit__item">
                    Имя Фамилия:
                    <input type="text" name="fullName" value={curatorData.fullName} onChange={handleInputChange} />
                </label>
                <label className="user-edit__item">
                    Дата рождения:
                    <input type="date" name="birthDate" value={curatorData.birthDate} onChange={handleInputChange} />
                </label>
            </div>
            <div className="user-edit__row">
                <label className="user-edit__item">
                    ИИН:
                    <input type="text" name="itin" value={curatorData.itin} onChange={handleInputChange} />
                </label>
                <label className="user-edit__item">
                    Номер куратора:
                    <input type="number" name="curatorNumber" value={curatorData.curatorNumber} onChange={handleInputChange} />
                </label>
            </div>
            <div className="user-edit__row">
                <label className="user-edit__item">
                    Личный номер телефона:
                    <input type="text" name="personalPhoneNumber" value={curatorData.personalPhoneNumber} onChange={handleInputChange} />
                </label>
                <label className="user-edit__item">
                    Рабочий номер телефона:
                    <input type="text" name="workPhoneNumber" value={curatorData.workPhoneNumber} onChange={handleInputChange} />
                </label>
            </div>
            <div className="user-edit__row">
                <label className="user-edit__item">
                    Email:
                    <input type="email" name="email" value={curatorData.email} onChange={handleInputChange} />
                </label>
                <label className="user-edit__item">
                    Образование:
                    <input type="text" name="education" value={curatorData.education} onChange={handleInputChange} />
                </label>
            </div>
            <div className="user-edit__row">
                <label className="user-edit__item">
                    Номер сертификата:
                    <input type="number" name="certificateNumber" value={curatorData.certificateNumber} onChange={handleInputChange} />
                </label>
                <label className="user-edit__item">
                    Общий опыт работы (в годах):
                    <input type="number" name="totalWorkExperience" value={curatorData.totalWorkExperience} onChange={handleInputChange} />
                </label>
            </div>
            <div className="user-edit__row">
                <label className="user-edit__item">
                    Опыт работы куратором (в годах):
                    <input type="number" name="curatorWorkExperience" value={curatorData.curatorWorkExperience} onChange={handleInputChange} />
                </label>
                <label className="user-edit__item">
                    Опыт работы в текущей должности (в годах):
                    <input type="number" name="workExperienceInCurrentPosition" value={curatorData.workExperienceInCurrentPosition} onChange={handleInputChange} />
                </label>
            </div>
            <div className="user-edit__row">
                <label className="user-edit__item">
                    Ученая степень:
                    <input type="text" name="academicDegree" value={curatorData.academicDegree} onChange={handleInputChange} />
                </label>
                <label className="user-edit__item">
                    Ученое звание:
                    <input type="text" name="academicTitle" value={curatorData.academicTitle} onChange={handleInputChange} />
                </label>
            </div>
            <div className="user-edit__buttons">
                <button type="submit" className="user-edit__button">Сохранить</button>
                <button type="button" onClick={handleDelete} className="user-edit__button delete-button">Удалить</button>
            </div>
        </form>
    );
};

export default CuratorEditPage;
