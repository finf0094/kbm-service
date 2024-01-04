import React from "react";
import {ApplicationStatus} from "../../models/application/ApplicationStatus.ts";


interface NavigationButtonProps {
    currentStatus: ApplicationStatus;
    status: ApplicationStatus;
    onClick: (status: ApplicationStatus) => void;
    children: React.ReactNode;
}

const NavigationButton: React.FC<NavigationButtonProps> = ({ currentStatus, status, onClick, children }) => (
    <li className="admin__nav-item">
        <button
            className="admin__nav-button"
            onClick={() => onClick(status)}
        >
            <span
                className={
                    currentStatus == status
                        ? "admin__nav-navbar active-nav"
                        : "admin__nav-navbar"
                }
            ></span>
            <p className="admin__nav-name">{children}</p>
        </button>
    </li>
);

export default NavigationButton;