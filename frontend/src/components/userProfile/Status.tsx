import React from 'react';
import './UI/Status.css'
import { useTranslation } from 'react-i18next';
import {ApplicationStatus} from "../../models/application/ApplicationStatus.ts";

interface StatusProps {
    status: ApplicationStatus
}

const Status: React.FC<StatusProps> = ({ status }) => {
    let statusClass = '';
    const { t } = useTranslation();

    switch (status) {
        case ApplicationStatus.APPROVED:
            statusClass = 'status-approved';
            status = t("profile_status_approved");
            break;
        case ApplicationStatus.PENDING:
            statusClass = 'status-pending';
            status = t("profile_status_pending");
            break;
        case ApplicationStatus.REJECTED:
            statusClass = 'status-rejected';
            status = t("profile_status_rejected");
            break;
        case ApplicationStatus.IN_PROCESS:
            statusClass = 'status-in_process';
            status = t("profile_status_pending");
            break
        default:
            statusClass = 'status-unknown';
            break;
    }

    return (
        <div>
            <div className="status">
                <h3 className="status__title">{t("profile_status")}</h3>
                {status && (
                    <div className={`status__text ${statusClass}`}>{status}</div>
                )}
            </div>
        </div>
    );
};

export default Status;
