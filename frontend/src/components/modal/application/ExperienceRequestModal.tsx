import React from 'react';
import { useForm, SubmitHandler, useWatch } from 'react-hook-form';

import Modal from '../Modal';
import './UI/ExperienceRequestModal.css';
import {IExperienceWithoutId} from "../../../models/application/IExperience.ts";

interface ExperienceRequestModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (experienceRequest: IExperienceWithoutId) => void;
}

const ExperienceRequestModal: React.FC<ExperienceRequestModalProps> = ({ isOpen, onClose, onSubmit }) => {
    const { register, handleSubmit, control } = useForm<IExperienceWithoutId>();
    const company = useWatch({ control, name: 'company', defaultValue: '' });
    const position = useWatch({ control, name: 'position', defaultValue: '' });
    const jobResponsibilities = useWatch({ control, name: 'jobResponsibilities', defaultValue: '' });
    const workStart = useWatch({ control, name: 'workStart', defaultValue: '' });
    const workEnd = useWatch({ control, name: 'workEnd', defaultValue: '' });

    const handleFormSubmit: SubmitHandler<IExperienceWithoutId> = (data) => {
        onSubmit(data);
        onClose();
    };

    return (
        <div className="experience-request-modal">
            {isOpen && (
                <Modal
                    id=""
                    title="Введите данные об опыте работы"
                    button={true}
                    buttonText="Добавить"
                    buttonDisabled={!company || !position || !jobResponsibilities || !workEnd || !workStart}
                    isOpen={isOpen}
                    onClose={onClose}
                    onConfirm={handleSubmit(handleFormSubmit)}
                >
                    <form>
                        <div className="experience-request-modal__content">
                            <div className="input-box">
                                <label>Компания:</label>
                                <input type="text" {...register('company')} placeholder="Введите название компании" />
                            </div>
                            <div className="input-box">
                                <label>Должность:</label>
                                <input type="text" {...register('position')} placeholder="Введите вашу должность" />
                            </div>
                            <div className="input-box">
                                <label>Обязанности:</label>
                                <input type="text" {...register('jobResponsibilities')} placeholder="Введите ваши обязанности" />
                            </div>
                            <div className="input-box">
                                <label>Начало работы:</label>
                                <input type="date" {...register('workStart')} />
                            </div>
                            <div className="input-box">
                                <label>Конец работы:</label>
                                <input type="date" {...register('workEnd')} />
                            </div>
                        </div>
                    </form>
                </Modal>
            )}
        </div>
    );
};

export default ExperienceRequestModal;
