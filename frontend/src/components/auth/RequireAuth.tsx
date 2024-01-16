import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../../hooks/useAuth.ts';

const RequireAuth: React.FC<{ allowedRoles: string[] }> = ({ allowedRoles }) => {

    const auth = useAuth()
    return (
        auth?.user?.roles?.find((role: string) => allowedRoles?.includes(role))
            ? <Outlet /> :
            <Navigate to="/" />)
}





export default RequireAuth