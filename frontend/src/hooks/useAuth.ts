import { useSelector } from 'react-redux';
import { RootState } from '../redux/store'
const useAuth = () => {
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    const accessToken = useSelector((state: RootState) => state.auth.access_token);
    const refreshToken = useSelector((state: RootState) => state.auth.refresh_token);
    const user = useSelector((state: RootState)=> state.auth.user)
    return { isAuthenticated, accessToken, user, refreshToken };
};

export default useAuth;