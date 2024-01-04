import React, { useState, ChangeEvent } from "react";
import { useTranslation } from "react-i18next";

import { useAppDispatch, useAppSelector } from "../../hooks/useAppDispatch";
import { openModal } from "../../redux/slices/modalSlice";
import ConfidentModal from "../modal/applicationProfile/ConfidentModal";
import { IUserDetail } from "../../models/user/IUserDetail";

import "./UI/UserInfo.css";
import ScheduleInterviewModal from "../modal/applicationProfile/ScheduleInterviewModal";

interface IUserInfoProps {
    user: IUserDetail;
    status: string;
}

const UserInfo: React.FC<IUserInfoProps> = React.memo(({ user, status }) => {
    const { t } = useTranslation();
    const { id: applicationId } = useAppSelector((state) => state.application);
    const dispatch = useAppDispatch();
    

    const formattedTime = new Date(user.createdAt).toLocaleString();

    const [selectedOption, setSelectedOption] = useState<string>("");

    const handleConfidentModal = (e: ChangeEvent<HTMLSelectElement>) => {
        const selectedOptionValue = e.target.value;
        setSelectedOption(selectedOptionValue);
        if (selectedOptionValue === "INTERVIEW_SCHEDULED") {
            dispatch(openModal({ id: 'scheduleInterviewModal' }));
        } else {
            dispatch(openModal({ id: 'confidentModal' }));
        }
    };
    

    const resetSelectedOption = () => {
        setSelectedOption("");
    };

    return (
        <div>
            <div className="user-info">
                <div className="user-info__wrapper">
                    <div className="user-info__head">
                    {user.firstname && user.lastname
                        ? <span className="user-info__name">{user.firstname} {user.lastname}</span>
                        : <span className="user-info__name" style={{color: 'gray'}}>Пусто</span>}
                    <span className="user-info__job">{user.position?.name}</span>
                    </div>
                    <div className="user-info__info">
                        {user.position?.name ? <span>{user.position?.name}</span> : <span style={{color: 'gray'}}>Пусто</span>}
                        {user.phoneNumber ? <span>{user.phoneNumber}</span> : <span style={{color: 'gray'}}>Пусто</span>}
                        {user.email ? <span>{user.email}</span> : <span style={{color: 'gray'}}>Пусто</span>}
                    </div>
                    <div className="user-info__aboutMe">
                        <div className="user-info__aboutMe_title">{t("About_me")}</div>
                        {user.aboutMe 
                            ? <p className="user-info__aboutMe_desc">{user.aboutMe}</p>
                            : <p className="user-info__aboutMe_desc">Добавьте информацию о себе в редактировании профиля.</p>}
                    </div>
                    <div className="user-info__status">
                        <span className="user-info__status-text">{t("user_info_status")}</span>
                        <select
                            className="user-info__status-select"
                            value={status.toLowerCase()}
                            onChange={(e) => handleConfidentModal(e)}
                        >
                            <option value="">{t("user_info_status_select")}</option>
                            <option value="APPROVED">{t("user_info_status_approve")}</option>
                            <option value="REJECTED">{t("user_info_status_reject")}</option>
                            <option value="PENDING">{t("user_info_status_pending")}</option>
                            <option value="INTERVIEW_SCHEDULED">{t("user_info_status_interview_scheduled")}</option>
                            <option value="NOT-REQUESTED">{t("user_info_status_not_requested")}</option>
                        </select>
                    </div>
                    <span className="user-info__date">
                        Дата регистрации: {formattedTime}
                    </span>
                </div>
                <ConfidentModal id="confidentModal" selectedOption={selectedOption} resetSelectedOption={resetSelectedOption} />
                <ScheduleInterviewModal id="scheduleInterviewModal" applicationId={applicationId} />
            </div>
        </div>
    );
});

export default UserInfo;
