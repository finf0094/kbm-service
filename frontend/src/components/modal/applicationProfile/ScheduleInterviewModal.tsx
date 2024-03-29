import React, {useState} from 'react';
import {useScheduleAnInterviewMutation} from "../../../redux/api/applicationApi.ts";
import {IScheduleInterviewDetailsDTO} from "../../../models/application/IScheduleInterviewDetails.ts";
import Modal from "../Modal.tsx";
import {closeModal} from "../../../redux/slices/modalSlice.ts";
import {useAppDispatch, useAppSelector} from "../../../hooks/useAppDispatch.ts";
import { useGetAllCuratorsQuery } from '../../../redux/api/curatorApi';

interface IScheduleInterviewModalProps {
    id: string;
    applicationId: string;
}

const ScheduleInterviewModal: React.FC<IScheduleInterviewModalProps> = ({id, applicationId}) => {
    const dispatch = useAppDispatch();
    const { data: curators } = useGetAllCuratorsQuery();
    const isOpen = useAppSelector((state) =>
        state.modal.modals.some(modal => modal.id === id && modal.isOpen)
    );
    const [scheduleDetails, setScheduleDetails] = useState<IScheduleInterviewDetailsDTO>({
        time: new Date(),
        format: '',
        venue: '',
        position: '',
        curatorId: 0,
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
                <select name="curatorId" className='modal__input' value={scheduleDetails.curatorId} onChange={handleChange} required>
                    <option value="">Выберите куратора</option>
                    {curators && curators.content.map(curator => (
                        <option key={curator.id} value={curator.id}>{curator.fullName}</option>
                    ))}
                </select>
            </div>
        </Modal>
    );
};

export default ScheduleInterviewModal;