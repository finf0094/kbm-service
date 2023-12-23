import React, { useEffect } from "react";
import "./UI/ProfilePage.css";
import useCurrentUser from "../hooks/useCurrentUser";
import { useGetUserWithItinQuery } from "../redux/api/userApi";

// COMPONENTS
import UserCard from "../components/userProfile/UserCard";
import Loader from "../components/utils/Loader";
import Status from "../components/userProfile/Status.tsx";
import UserResume from "../components/userProfile/UserResume.tsx";
import {ApplicationStatus} from "../models/application/ApplicationStatus.ts";

const ProfilePage: React.FC = () => {
    const { itin, roles } = useCurrentUser();


    const {
        data: userData,
        isSuccess: isUserSuccess,
        isLoading: isUserLoading,
        isError: isUserError,
        error: userError,
    } = useGetUserWithItinQuery(itin);

    useEffect(() => {
        if (userData) console.log("user data", userData);
        if (isUserSuccess) console.log("success");
        if (isUserLoading) console.log("Loading...");
        if (isUserError) console.log(isUserError);
        if (userError) console.log(userError);
    }, [userData, isUserSuccess, isUserLoading, isUserError, userError]);

    if (isUserLoading) {
        return <div className="page"><Loader/></div>;
    }


    if (isUserError && userError && 'data' in userError && userError.data) {
        return <div className="page">{userError.data.message}</div>;
    }

    if (!isUserSuccess) return <div className="page">Error</div>

    return (
        <div className="page">
            <div className="profile">
                <div className="user-profile">
                    <UserCard data={userData} />
                </div>
                {roles.includes("ROLE_USER") && (
                    <div className="profile-info">
                        <Status status={ApplicationStatus.IN_PROCESS} />
                        <UserResume resumeUrl={userData.resumeUrl}/>
                        {/*<TestLink testStatus={userData.testStatus} />*/}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProfilePage;
