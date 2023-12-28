import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";

import {useAppDispatch, useAppSelector} from "../../hooks/useAppDispatch.ts";
import {openModal} from "../../redux/slices/modalSlice.ts";
import ConfidentModal from "../modal/applicationProfile/ConfidentModal.tsx";
import {IUserDetail} from "../../models/user/IUserDetail.ts";

import "./UI/UserInfo.css";
import ScheduleInterviewModal from "../modal/applicationProfile/ScheduleInterviewModal.tsx";

interface IUserInfoProps {
    user: IUserDetail,
    status: string
}

const UserInfo: React.FC<IUserInfoProps> = React.memo(({user, status}) => {
    const {t} = useTranslation();
    const {id: applicationId} = useAppSelector(state => state.application);
    const dispatch = useAppDispatch();

    const [selectedOption, setSelectedOption] = useState("");


    useEffect(() => {
        handleConfidentModal();
    }, [selectedOption]);

    const handleConfidentModal = () => {
        console.log(selectedOption)
        if (selectedOption.toUpperCase() === "INTERVIEW_SCHEDULED") {
            dispatch(openModal({id: 'scheduleInterviewModal'}));
        } else {
            dispatch(openModal({id: 'confidentModal'}));
        }
    }

    const resetSelectedOption = () => {
        setSelectedOption("");
    }

    return (
        <div>
            <div className="user-info">
                <div className="user-info__wrapper">
                    <div className="user-info__head">
        <span className="user-info__name">
            {user.firstname} {user.lastname}
    </span>
                        <span className="user-info__job">{user.position?.name}</span>
                    </div>
                    <div className="user-info__info">
                        <span>{user.position?.name}</span>
                        <span>{user.phoneNumber}</span>
                        <span>{user.email}</span>
                    </div>
                    <div className="user-info__aboutMe">
                        <div className="user-info__aboutMe_title">{t("About_me")}</div>
                        <p className="user-info__aboutMe_desc">{user.aboutMe}</p>
                    </div>
                    <div className="user-info__status">
                        <span className="user-info__status-text">{t("user_info_status")}</span>
                        <select
                            className="user-info__status-select"
                            value={status.toLowerCase()}
                            onChange={(e) => setSelectedOption(e.target.value)}
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
        Дата регистрации: {user.createdAt}
    </span>
                </div>
                <ConfidentModal id="confidentModal" selectedOption={selectedOption}
                                resetSelectedOption={resetSelectedOption}/>
                <ScheduleInterviewModal id="scheduleInterviewModal" applicationId={applicationId}/>
            </div>
        </div>
    );
});

export default UserInfo;
