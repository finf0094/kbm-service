import {BaseQueryFn, createApi, FetchArgs} from "@reduxjs/toolkit/query/react";

import {baseQueryWithReauth} from "./baseQuery.ts";

import { IPage } from '../../models/IPage.ts';
import {CustomError} from "../../models/error/CustomError.ts";
import { IApplicationSummary } from '../../models/application/IApplicationSummary.ts';
import {IApplication} from "../../models/application/IApplication.ts";

export const moderatorApi = createApi({
    reducerPath: 'moderatorApi',
    baseQuery: baseQueryWithReauth as BaseQueryFn<
        string | FetchArgs,
        unknown,
        CustomError>,
    endpoints: (builder) => ({
        getApplications: builder.query<IPage<IApplicationSummary>, { status: string, offset: number, pageSize: number, search: string }>({
            query: ({ status, offset = 0, pageSize = 10, search = "" }) => ({
                url: `/applications?status=${status}&offset=${offset}&pageSize=${pageSize}&search=${search}`,
                method: 'GET',
            }),
        }),
        getApplication: builder.query<IApplication, string>({
            query: (applicationId) => ({
                url: `/applications/getApplication?applicationId=${applicationId}`,
                method: 'GET',
            })
        })
    }),
});

export const {
    useGetApplicationsQuery,
    useGetApplicationQuery,
} = moderatorApi;