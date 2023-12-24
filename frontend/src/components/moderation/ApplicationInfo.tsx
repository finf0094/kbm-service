import React from "react";
import {IApplicationSummary} from "../../models/application/IApplicationSummary.ts";


interface ApprovalRequestInfoProps {
    application: IApplicationSummary;
}

const ApprovalRequestInfo: React.FC<ApprovalRequestInfoProps> = ({application,}) => {

    return (
        <div className="admin__claims-info">
            <h3 className="admin__claims-name">
                {application.user.firstname} {application.user.lastname}
            </h3>
            <div className="admin__claims-info_items">
                <h3 className="admin__claims-info_item admin__claims-job">
                    {application.user.position.name}
                </h3>
                <h3 className="admin__claims-info_item admin__claims-phone">
                    {application.user.phoneNumber}
                </h3>
                <h3 className="admin__claims-info_item admin__claims-email">
                    {application.user.email}
                </h3>
            </div>
        </div>
    );
};

export default ApprovalRequestInfo;

