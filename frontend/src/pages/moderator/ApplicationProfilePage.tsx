import React, {useEffect} from "react";
import { useParams } from "react-router-dom";

import {useGetApplicationQuery} from "../../redux/api/moderatorApi.ts";
import {setApplicationData} from "../../redux/slices/applicationSlice.ts";

import {useAppDispatch} from "../../hooks/useAppDispatch.ts";

import Loader from "../../components/utils/Loader.tsx";
import UserInfo from "../../components/applicationProfile/UserInfo.tsx";

import Status from "../../components/userProfile/Status.tsx";
import QuizResult from "../../components/applicationProfile/QuizResult.tsx";
import ApplicationProfileResume from "../../components/applicationProfile/ApplicationProfileResume.tsx";
import ApplicationProfileVideo from "../../components/applicationProfile/ApplicationProfileVideo.tsx";
import ApplicationTable from "../../components/application/ApplicationTable.tsx";
import EducationTable from "../../components/application/EducationTable.tsx";
import ExperienceTable from "../../components/application/ExperienceTable.tsx";
import ApplicationForm from "../../components/application/ApplicationForm.tsx";

import "./UI/ApplicationProfilePage.css";



const ApplicationPage: React.FC = () => {
    const { applicationId = '' } = useParams();
    const dispatch = useAppDispatch();
    const { data: applicationData, isLoading, isSuccess, isError, error } = useGetApplicationQuery(applicationId);

    useEffect(() => {
        if (isSuccess) {
            dispatch(setApplicationData(applicationData));
        }
    }, [isSuccess, applicationData, dispatch]);

    if (isLoading) return <div className="page"><Loader/></div>
    if (isError && error && 'data' in error && error.data) return <div className="page">{error.data.message}</div>
    if (!isSuccess) return <div className="page">Error...</div>


    return (
        <div>
            <div className="page">
                <div className="approval-request-page" style={{ marginBottom: "50px" }}>
                    <UserInfo user={applicationData.user} status={applicationData.status} />
                    <div className="user-uploads">
                        <Status status={applicationData.status} />
                        <QuizResult application={applicationData} />
                        <ApplicationProfileResume resumeUrl={applicationData.user.resumeUrl} />
                        <ApplicationProfileVideo videoUrl={applicationData.videoUrl}/>
                        {/* <WatchTest /> */}
                    </div>
                </div>
                <ApplicationTable isChangble={false} />
                <EducationTable isChangble={false}  />
                <ExperienceTable isChangble={false} />
                <ApplicationForm isChangble={false}  />
            </div>
        </div>
    );
};

export default ApplicationPage;
