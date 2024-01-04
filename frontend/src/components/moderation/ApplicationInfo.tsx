import React from "react";
import {IApplicationSummary} from "../../models/application/IApplicationSummary.ts";


interface ApprovalRequestInfoProps {
    application: IApplicationSummary;
}

const ApprovalRequestInfo: React.FC<ApprovalRequestInfoProps> = ({application}) => {
    const interviewDetails = application.interviewDetails;
    console.log(application.status);
    const isInterview = application.status === "INTERVIEW_SCHEDULED"

    const formattedDate = interviewDetails?.time
        ? new Date(interviewDetails.time).toLocaleString()
        : 'No date provided';

    return (
        <div className="admin__claims-info">
            {isInterview 
                ? <h3 className="admin__claims-name">{application.user.email}</h3> 
                : <h3 className="admin__claims-name">{application.user.firstname} {application.user.lastname}</h3>}
            <div className="admin__claims-info_items">
                
                {isInterview 
                    ? <h3 className="admin__claims-info_item admin__claims-job">{interviewDetails?.position}</h3>
                    : <h3 className="admin__claims-info_item admin__claims-job">{application.user.position?.name}</h3>}
                {isInterview 
                    ? <h3 className="admin__claims-info_item admin__claims-phone">{formattedDate}</h3>
                    : <h3 className="admin__claims-info_item admin__claims-phone">{application.user.phoneNumber}</h3>}
                {isInterview 
                    ? <h3 className="admin__claims-info_item admin__claims-email">{interviewDetails?.venue}</h3>
                    : <h3 className="admin__claims-info_item admin__claims-email">{application.user.phoneNumber}</h3>}
            </div>
        </div>
    );
};

export default ApprovalRequestInfo;

