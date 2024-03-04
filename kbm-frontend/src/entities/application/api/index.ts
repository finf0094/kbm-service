import {BaseQueryFn, createApi, FetchArgs} from "@reduxjs/toolkit/query/react";

import { IApplication } from "../model/application/IApplication.ts";
import { baseQueryWithReauth, CustomError } from '@/shared/api/index.ts'
import { IEmployee } from '../model/IEmployee.ts'

export const applicationApi = createApi({
    reducerPath: 'applicationApi',
    baseQuery: baseQueryWithReauth as BaseQueryFn<
        string | FetchArgs,
        unknown,
        CustomError>,
    endpoints: (builder) => ({
        getApplicationById: builder.query<IApplication, string>({
            query: (applicationId: string) => ({
                url: `/applications/getApplication?applicationId=${applicationId}`,
                method: 'GET',
            }),
        }),
        getApplicationByUserId: builder.query<IApplication, number>({
            query: (userId: number) => ({
                url: `/applications/getApplication?userId=${userId}`,
                method: 'GET',
            }),
        }),

        createApplication: builder.mutation<IApplication, number>({
            query: (userId: number) => ({
                url: `/applications/${userId}`,
                method: 'POST',
            }),
        }),

        // EMPLOYEE
        setEmployee: builder.mutation<IApplication, { applicationId: string, body: IEmployee }>({
            query: ({applicationId, body}) => ({
                url: `/applications/${applicationId}/setEmployee`,
                method: 'POST',
                body
            }),
        }),

        // DESIRED POSITION
        setDesiredPosition: builder.mutation<IApplication, { applicationId: string, positionId: number }>({
            query: ({applicationId, positionId}) => ({
                url: `/applications/${applicationId}/setDesiredPosition/${positionId}`,
                method: 'POST',
            }),
        }),
        deleteDesiredPosition: builder.mutation<IApplication, { applicationId: string, positionId: number }>({
            query: ({applicationId, positionId}) => ({
                url: `/applications/${applicationId}/deleteDesiredPosition/${positionId}`,
                method: 'DELETE',
            }),
        }),

        approve: builder.mutation<IApplication, string>({
            query: (applicationId: string) => ({
                url: `/applications/${applicationId}/approve`,
                method: 'POST',
            }),
        }),
        reject: builder.mutation<IApplication, string>({
            query: (applicationId: string) => ({
                url: `/applications/${applicationId}/reject`,
                method: 'POST',
            }),
        }),
    }),
});

export const {
	useGetApplicationByUserIdQuery,
    useGetApplicationByIdQuery,
    
    useCreateApplicationMutation,

    useSetEmployeeMutation,

    useSetDesiredPositionMutation,
    useDeleteDesiredPositionMutation,

    useApproveMutation,
    useRejectMutation
} = applicationApi;


