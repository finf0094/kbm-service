import React, {ReactNode} from "react";

import ApprovalRequestInfo from "./ApplicationInfo.tsx";

import {IApplicationSummary} from "../../models/application/IApplicationSummary.ts";

interface ApplicaitonWrapperProps {
    application: IApplicationSummary;
    children: ReactNode;
}

const ApplicationWrapper: React.FC<ApplicaitonWrapperProps> = ({application, children,}) => {
    return (
        <div>
            <ApprovalRequestInfo application={application}/>
            {children}
        </div>
    );
};


export default ApplicationWrapper;