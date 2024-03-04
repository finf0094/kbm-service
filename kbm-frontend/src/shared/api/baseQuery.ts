import { RootState } from '@/app/store'
import { refreshToken } from '@/features/auth/by-itin'
import { logout } from '@/features/auth/by-itin'
import { BaseQueryApi, FetchArgs, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseUrl = import.meta.env.VITE_API_URL

export interface CustomError {
    data: {
        status: number;
        message: string;
        timestamp: string;
    };
    status: string;
}

export const baseQuery = fetchBaseQuery({
    baseUrl,
    credentials: 'include',
    prepareHeaders: (headers: Headers, { getState }) => {
        const state = getState() as RootState;

        const accessToken = state.auth.accessToken
        if (accessToken) {
            headers.set('Authorization', `${accessToken}`)
        }
        return headers;
    }
})

export const baseQueryWithReauth = async (
    args: string | FetchArgs,
    api: BaseQueryApi,
    extraOptions: object,
) => {
    let result = await baseQuery(args, api, extraOptions);

    if (result?.error?.status === 401) {
        // Attempt to refresh tokens
        const refreshResult = await api.dispatch(refreshToken());
        if (refreshToken.fulfilled.match(refreshResult)) {
            // If the refresh was successful, retry the original request
            result = await baseQuery(args, api, extraOptions);
        } else {
            // If the refresh failed, possibly dispatch logout or handle accordingly
            api.dispatch(logout());
        }
    }

    return result;
};