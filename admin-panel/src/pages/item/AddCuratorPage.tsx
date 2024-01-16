import React, { useState } from 'react';
import { useCreateCuratorMutation } from '../../redux/api/curatorApi';
import { useNavigate } from 'react-router-dom';
import { ICuratorDetail } from '../../models/curator/ICuratorDetail';

const AddCuratorPage: React.FC = () => {
    const [createCurator] = useCreateCuratorMutation();
    const [curatorData, setCuratorData] = useState<ICuratorDetail>({
        id: 0, // Set default or appropriate initial values for the properties
        fullName: '',
        birthDate: '',
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

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const result = await createCurator(curatorData).unwrap();
            console.log('Curator created successfully:', result);
            setCuratorData({
                id: 0,
                fullName: '',
                birthDate: '',
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
            navigate('/integration/curators', { replace: true });
        } catch (error) {
            // Handle the error, e.g., display an error message
            console.error('Error creating curator:', error);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCuratorData((prevData: any) => ({
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

    console.log(curatorData.birthDate);
    

    return (
        <form onSubmit={onSubmit} className="user-edit">
            <label className="user-edit__item">
                Имя Фамилия:
                <input type="text" name="fullName" value={curatorData.fullName} onChange={handleInputChange} />
            </label>
            <label className="user-edit__item">
                Дата рождения:
                <input type="date" name="birthDate" value={curatorData.birthDate} onChange={handleInputChange} />
            </label>
            <label className="user-edit__item">
                ИИН:
                <input type="text" name="itin" value={curatorData.itin} onChange={handleInputChange} />
            </label>
            <label className="user-edit__item">
                Номер куратора:
                <input type="number" name="curatorNumber" value={curatorData.curatorNumber} onChange={handleInputChange} />
            </label>
            <label className="user-edit__item">
                Личный номер телефона:
                <input type="text" name="personalPhoneNumber" value={curatorData.personalPhoneNumber} onChange={handleInputChange} />
            </label>
            <label className="user-edit__item">
                Рабочий номер телефона:
                <input type="text" name="workPhoneNumber" value={curatorData.workPhoneNumber} onChange={handleInputChange} />
            </label>
            <label className="user-edit__item">
                Email:
                <input type="email" name="email" value={curatorData.email} onChange={handleInputChange} />
            </label>
            <label className="user-edit__item">
                Образование:
                <input type="text" name="education" value={curatorData.education} onChange={handleInputChange} />
            </label>
            <label className="user-edit__item">
                Номер сертификата:
                <input type="number" name="certificateNumber" value={curatorData.certificateNumber} onChange={handleInputChange} />
            </label>
            <label className="user-edit__item">
                Общий опыт работы (в годах):
                <input type="number" name="totalWorkExperience" value={curatorData.totalWorkExperience} onChange={handleInputChange} />
            </label>
            <label className="user-edit__item">
                Опыт работы куратором (в годах):
                <input type="number" name="curatorWorkExperience" value={curatorData.curatorWorkExperience} onChange={handleInputChange} />
            </label>
            <label className="user-edit__item">
                Опыт работы в текущей должности (в годах):
                <input type="number" name="workExperienceInCurrentPosition" value={curatorData.workExperienceInCurrentPosition} onChange={handleInputChange} />
            </label>
            <label className="user-edit__item">
                Ученая степень:
                <input type="text" name="academicDegree" value={curatorData.academicDegree} onChange={handleInputChange} />
            </label>
            <label className="user-edit__item">
                Ученое звание:
                <input type="text" name="academicTitle" value={curatorData.academicTitle} onChange={handleInputChange} />
            </label>
            <button type="submit" className="user-edit__button">Сохранить</button>
        </form>
    );
};

export default AddCuratorPage;
