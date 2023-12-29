import { createApi, FetchArgs, BaseQueryFn } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQuery.ts";
import { CustomError } from "../../models/error/CustomError.ts";
import {IUserDetail, IUserSummary} from "../../models/user/IUserDetail.ts";
import {IPage} from "../../models/IPage.ts";
import {IUpdateUser} from "../../models/user/IUpdateUser.ts";

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: baseQueryWithReauth as BaseQueryFn<string | FetchArgs, unknown, CustomError>,
    endpoints: (builder) => ({
        getUser: builder.query<IUserDetail, { id?: number, itin?: string }>({
            query: ({ id, itin }) => ({
                url: `/users/getUser`,
                params: {id, itin },
            }),
        }),
        getAllUsers: builder.query<IPage<IUserSummary>, { search?: string, offset: number, pageSize: number }>({
            query: ({ search, offset, pageSize }) => ({
                url: `/users`,
                params: { search, offset, pageSize },
            }),
        }),
        updateUser: builder.mutation<IUserDetail, { userId: number, user: IUpdateUser }>({
            query: ({ userId, user }) => ({
                url: `/users/${userId}`,
                method: 'PUT',
                body: user,
            }),
        }),
        deleteUser: builder.mutation<{ success: boolean }, number>({
            query: (userId) => ({
                url: `/users/${userId}`,
                method: 'DELETE',
            }),
        }),
    }),
});

export const {
    useGetUserQuery,
    useGetAllUsersQuery,
    useUpdateUserMutation,
    useDeleteUserMutation,
} = userApi;