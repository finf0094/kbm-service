import React from "react";
import {IApplicationSummary} from "../../models/application/IApplicationSummary.ts";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store.ts";


interface ApprovalRequestInfoProps {
    application: IApplicationSummary;
}

const ApprovalRequestInfo: React.FC<ApprovalRequestInfoProps> = ({application}) => {

    const applicationState = useSelector((state: RootState) => state.application);
    const { interviewDetails } = applicationState;
    console.log(application.status);
    console.log(applicationState);
    const isInterview = application.status === "INTERVIEW_SCHEDULED"

    const formattedDate = new Date(interviewDetails.time).toLocaleString();

    return (
        <div className="admin__claims-info">
            {isInterview 
                ? <h3 className="admin__claims-name">{application.user.email}</h3> 
                : <h3 className="admin__claims-name">{application.user.firstname} {application.user.lastname}</h3>}
            <div className="admin__claims-info_items">
                
                {isInterview 
                    ? <h3 className="admin__claims-info_item admin__claims-job">{interviewDetails.position}</h3>
                    : <h3 className="admin__claims-info_item admin__claims-job">{application.user.position?.name}</h3>}
                {isInterview 
                    ? <h3 className="admin__claims-info_item admin__claims-phone">{formattedDate}</h3>
                    : <h3 className="admin__claims-info_item admin__claims-phone">{application.user.phoneNumber}</h3>}
                {isInterview 
                    ? <h3 className="admin__claims-info_item admin__claims-email">{interviewDetails.venue}</h3>
                    : <h3 className="admin__claims-info_item admin__claims-email">{application.user.phoneNumber}</h3>}
            </div>
        </div>
    );
};

export default ApprovalRequestInfo;

