import React, {useEffect} from 'react'
import LoginModal from '../components/modal/auth/LoginModal.tsx'
import { Outlet } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import { useDispatch } from 'react-redux'
import { closeModal, openModal } from '../redux/slices/modalSlice.ts'
import RegisterModal from "../components/modal/auth/RegisterModal.tsx";
import ApplicationModal from "../components/modal/application/ApplicationModal.tsx";


const ModalProvider: React.FC = () => {
    const dispatch = useDispatch();
    const { isAuthenticated } = useAuth();

    useEffect(() => {
        // Use the useEffect hook to dispatch actions after the component has been rendered
        if (!isAuthenticated) {
            dispatch(openModal({ id: 'loginModal' }));
        } else {
            dispatch(closeModal({ id: 'loginModal' }));
        }
    }, [isAuthenticated, dispatch]);

    return (
        <div>
            <RegisterModal id="registerModal"/>
            <LoginModal id="loginModal" />
            <ApplicationModal id="infoModal"/>
            <Outlet />
        </div>
    );
};

export default ModalProvider;