import useAuth from './useAuth.ts';

const useCurrentUser = () => {
    const auth = useAuth()
    return auth.user;
};

export default useCurrentUser;