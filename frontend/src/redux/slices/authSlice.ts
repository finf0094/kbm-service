// authSlice.js

import Cookies from 'js-cookie';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {IUser} from "../../models/user/IUser.ts";
import {IAuthResponse} from "../../models/auth/IAuthResponse.ts";

// Define a function to initialize the authentication state from cookies
const initializeAuthStateFromCookies = () => {
    const isAuthenticated: boolean = Cookies.get('isAuthenticated') === 'true';
    const access_token: string = JSON.parse(Cookies.get('access_token') || '{}');
    const refresh_token: string = JSON.parse(Cookies.get('refresh_token') || '{}');
    const user: IUser = JSON.parse(Cookies.get('user') || '{}');

    return { isAuthenticated, access_token, refresh_token, user };
};

// Load the initial state from cookies
const initialState = initializeAuthStateFromCookies();

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess: (state, action: PayloadAction<IAuthResponse>) => {
            state.isAuthenticated = true;
            state.access_token = action.payload.access_token;
            state.refresh_token = action.payload.refresh_token;
            state.user = action.payload.user;

            // Set a cookie after a successful login
            Cookies.set('isAuthenticated', 'true', { expires: 1 });
            Cookies.set('access_token', JSON.stringify(action.payload.access_token))
            Cookies.set('refresh_token', JSON.stringify(action.payload.refresh_token))
            Cookies.set('user', JSON.stringify(action.payload.user))
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.access_token = {} as string;
            state.refresh_token = {} as string;
            state.user = {} as IUser;

            // Remove the cookies on logout
            Cookies.remove('isAuthenticated');
            Cookies.remove('access_token');
            Cookies.remove('refresh_token')
            Cookies.remove('user')
        },
    },
});

export default authSlice.reducer;
export const { loginSuccess, logout } = authSlice.actions;

