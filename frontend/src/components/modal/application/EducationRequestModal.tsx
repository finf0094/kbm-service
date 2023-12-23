import React from 'react';
import { useForm, SubmitHandler, useWatch } from 'react-hook-form';

import Modal from '../Modal';

import './UI/EducationRequestModal.css';
import {EducationDegrees, IEducationWithoutId} from "../../../models/application/IEducation.ts";


interface EducationRequestModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (educationRequest: IEducationWithoutId) => void;
}

const EducationRequestModal: React.FC<EducationRequestModalProps> = ({ isOpen, onClose, onSubmit }) => {
    const { register, handleSubmit, control} = useForm<IEducationWithoutId>();
    const dateIssued = useWatch({ control, name: 'dateIssued', defaultValue: '' });
    const educationalInstitution = useWatch({ control, name: 'educationalInstitution', defaultValue: '' });
    const specialization = useWatch({ control, name: 'specialization', defaultValue: '' });
    const degreeDiploma = useWatch({ control, name: 'degreeDiploma', defaultValue: EducationDegrees.BACHELOR });

    const handleFormSubmit: SubmitHandler<IEducationWithoutId> = (data) => {
        onSubmit(data);
        onClose();
    };

    return (
        <div className="education-request-modal">
            {isOpen && (
                <Modal
                    id=""
                    title="Введите данные об образовании"
                    button={true}
                    buttonText="Добавить"
                    buttonDisabled={!dateIssued || !educationalInstitution || !specialization || !degreeDiploma}
                    isOpen={isOpen}
                    onClose={onClose}
                    onConfirm={handleSubmit(handleFormSubmit)}
                >
                    <form>
                        <div className="education-request-modal__content">
                            <div className="input-box">
                                <label>Дата выпуска:</label>
                                <input type="date" {...register('dateIssued')} placeholder="Введите дату выпуска" />
                            </div>
                            <div className="input-box">
                                <label>Учебное заведение:</label>
                                <input type="text" {...register('educationalInstitution')} placeholder="Введите полное название учебного заведение" />
                            </div>
                            <div className="input-box">
                                <label>Специализация:</label>
                                <input type="text" {...register('specialization')} placeholder="Введите специализацию" />
                            </div>
                            <div className="input-box">
                                <label>Степень/Диплом:</label>
                                <select {...register('degreeDiploma')} defaultValue="">
                                    <option value="" disabled hidden>Выберите степень/диплом</option>
                                    <option value="BACHELOR">Бакалавр</option>
                                    <option value="MASTER">Магистр</option>
                                    <option value="DOCTORAL">Докторантура</option>
                                </select>
                            </div>
                        </div>
                    </form>
                </Modal>
            )}
        </div>
    );
};

export default EducationRequestModal;
