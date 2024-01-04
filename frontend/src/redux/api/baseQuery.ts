import {BaseQueryApi, FetchArgs, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {RootState} from "../store.ts";
import {loginSuccess, logout} from "../slices/authSlice.ts";

export const baseUrl = import.meta.env.VITE_API_URL + "/api"

export const baseQuery = fetchBaseQuery({
    baseUrl,
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
    args: string | FetchArgs,
    api: BaseQueryApi,
    extraOptions: object,
) => {
    let result = await baseQuery(args, api, extraOptions)

    if (result?.error?.status === 401) {
        // send refresh token to get accessToken
        const refreshResult = await baseQuery('/auth/refresh', api, extraOptions)
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

