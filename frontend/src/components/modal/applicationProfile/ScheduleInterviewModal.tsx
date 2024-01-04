import React, {useState} from 'react';
import {useScheduleAnInterviewMutation} from "../../../redux/api/applicationApi.ts";
import {IScheduleInterviewDetails} from "../../../models/application/IScheduleInterviewDetails.ts";
import Modal from "../Modal.tsx";
import {closeModal} from "../../../redux/slices/modalSlice.ts";
import {useAppDispatch, useAppSelector} from "../../../hooks/useAppDispatch.ts";

interface IScheduleInterviewModalProps {
    id: string;
    applicationId: string;
}

const ScheduleInterviewModal: React.FC<IScheduleInterviewModalProps> = ({id, applicationId}) => {
    const dispatch = useAppDispatch();
    const isOpen = useAppSelector((state) =>
        state.modal.modals.some(modal => modal.id === id && modal.isOpen)
    );
    const [scheduleDetails, setScheduleDetails] = useState<IScheduleInterviewDetails>({
        time: new Date(),
        format: '',
        venue: '',
        position: '',
        curator: {
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
        }
    });

    const [scheduleInterview, {isLoading}] = useScheduleAnInterviewMutation();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        if (e.target.name === 'time') {
            setScheduleDetails({
                ...scheduleDetails,
                [e.target.name]: new Date(e.target.value),
            });
        } else {
            setScheduleDetails({
                ...scheduleDetails,
                [e.target.name]: e.target.value,
            });
        }
    };

    const handleClose = () => {
        dispatch(closeModal({ id }))
    }
    console.log(scheduleDetails.time)

    const handleSubmit = () => {
        scheduleInterview({applicationId, scheduleInterviewDetails: scheduleDetails});
    };

    return (
        <Modal
            id={id}
            title="Собеседование"
            button={true}
            buttonText="Запланировать"
            buttonDisabled={isLoading}
            isOpen={isOpen}
            onClose={handleClose}
            onConfirm={handleSubmit}
        >
            <div className="modal__inputs">
                <input
                    type="datetime-local"
                    className='modal__input'
                    name="time"
                    value={scheduleDetails.time.toISOString().substring(0,16)}
                    onChange={handleChange}
                    required
                />
                <select name="format" className='modal__input' value={scheduleDetails.format} onChange={handleChange} required>
                    <option value="">Выберите формат</option>
                    <option value="online">Онлайн</option>
                    <option value="offline">Оффлайн</option>
                </select>
                <input
                    type="text"
                    className='modal__input'
                    name="venue"
                    placeholder='Город проведения'
                    value={scheduleDetails.venue}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    className='modal__input'
                    name="position"
                    placeholder='Позиция'
                    value={scheduleDetails.position}
                    onChange={handleChange}
                    required
                />
            </div>
        </Modal>
    );
};

export default ScheduleInterviewModal;