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

    const handleSubmit = () => {
        console.log(scheduleDetails.time.toISOString())
            // @ts-ignore
        scheduleInterview({applicationId, scheduleInterviewDetails: {...scheduleDetails, time: scheduleDetails.time.toISOString()}});
    };

    return (
        <Modal
            id={id}
            title="Schedule an Interview"
            button={true}
            buttonText="Schedule"
            buttonDisabled={isLoading}
            isOpen={isOpen}
            onClose={handleClose}
            onConfirm={handleSubmit}
        >
            <input
                type="datetime-local"
                name="time"
                value={scheduleDetails.time.toISOString().substring(0,16)}
                onChange={handleChange}
                required
            />
            <select name="format" value={scheduleDetails.format} onChange={handleChange} required>
                <option value="">Select format</option>
                <option value="online">Online</option>
                <option value="offline">Offline</option>
            </select>
            <input
                type="text"
                name="venue"
                value={scheduleDetails.venue}
                onChange={handleChange}
                required
            />
            <input
                type="text"
                name="position"
                value={scheduleDetails.position}
                onChange={handleChange}
                required
            />
        </Modal>
    );
};

export default ScheduleInterviewModal;