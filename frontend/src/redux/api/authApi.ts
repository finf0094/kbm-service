import {BaseQueryFn, createApi, FetchArgs, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import { IUserLogin } from "../../models/auth/IUserLogin.ts";
import {baseUrl} from "./baseQuery.ts";
import {IUserRegister} from "../../models/auth/IUserRegister.ts";
import {CustomError} from "../../models/error/CustomError.ts";

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: baseUrl,
    }) as BaseQueryFn<
        string | FetchArgs,
        unknown,
        CustomError>,
    endpoints: (builder) => ({
        loginUser: builder.mutation({
            query: (body: IUserLogin) => ({
                url: '/auth/login',
                method: 'POST',
                body
            }),
        }),
        registerUser: builder.mutation({
            query: (body: IUserRegister)=> ({
                url: '/auth/register',
                method: 'POST',
                body
            })
        })
    })
});

export const { useLoginUserMutation, useRegisterUserMutation } = authApi;
