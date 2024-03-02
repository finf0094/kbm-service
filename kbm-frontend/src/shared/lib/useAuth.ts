import { RootState } from '@/app/store'
import { useSelector } from 'react-redux';

const useAuth = () => {
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    const accessToken = useSelector((state: RootState) => state.auth.accessToken);
    const user = useSelector((state: RootState) => state.auth.user)
    return { isAuthenticated, accessToken, user };
};

export default useAuth;