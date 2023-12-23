import React from 'react'
import {Navigate, Outlet} from 'react-router-dom';
import useAuth from '../../hooks/useAuth.ts';

type AllowedRolesType = string[]; // Assuming allowedRoles is an array of strings

type RequireAuthProps = {
    allowedRoles: AllowedRolesType;
};

const RequireAuth: React.FC<RequireAuthProps> = ({allowedRoles}) => {

    const auth = useAuth()
    return (
        auth?.user?.roles?.find((role: string) => allowedRoles?.includes(role)) ? <Outlet/> : <Navigate to="/auth"/>)
}


export default RequireAuth