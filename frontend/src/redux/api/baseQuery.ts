import {BaseQueryApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {RootState} from "../store.ts";
import {loginSuccess, logout} from "../slices/authSlice.ts";

export const baseUrl = 'http://185.125.91.161:3002/api'

export const baseQuery = fetchBaseQuery({
    baseUrl,
    credentials: 'include',
    prepareHeaders: (headers: Headers, { getState }) => {
        const state = getState() as RootState;

        const accessToken = state.auth.access_token
        if (accessToken) {
            headers.set('Authorization', `Bearer ${accessToken}`)
        }
        return headers;
    }
})

export const baseQueryWithReauth = async (
    args: any,
    api: BaseQueryApi,
    extraOptions: any,
) => {
    let result = await baseQuery(args, api, extraOptions)
    console.log(result)

    if (result?.error?.status === 401) {
        console.log("sending refresh token")
        // send refresh token to get accessToken
        const refreshResult = await baseQuery('/auth/refresh', api, extraOptions)
        console.log(refreshResult);
        if (refreshResult?.data) {
            const state = api.getState() as RootState
            const user = state.auth
            // store to the new token
            api.dispatch(loginSuccess({...refreshResult.data, ...user}))

            result = await baseQuery(args, api, extraOptions)
        } else {
            api.dispatch(logout())
        }
    }
    return result;
}

