import {BaseQueryFn, createApi, FetchArgs} from '@reduxjs/toolkit/query/react';

import { IApplication } from '../model/application/IApplication.ts';
import { baseQueryWithReauth, CustomError } from '@/shared/api/index.ts'
import { IEmployee } from '../model/IEmployee.ts'
import { IMessageResponse } from '@/entities/response/index.ts'
import { IEducationWithoutId } from '../model/IEducation.ts'
import { IExperienceWithoutId } from '../model/IExperience.ts'

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

        // EDUCATION
        setEducation: builder.mutation<IApplication, { applicationId: string, body: IEducationWithoutId }>({
            query: ({applicationId, body}) => ({
                url: `/applications/${applicationId}/setEducation`,
                method: 'POST',
                body
            })
        }),
        deleteEducation: builder.mutation<IMessageResponse, {educationId: number}>({
            query: ({educationId}) => ({
                url: `/applications/${educationId}/deleteEducation`,
                method: 'DELETE'
            })
        }),

        // EXPERIENCE
        setExperience: builder.mutation<IApplication, { applicationId: string, body: IExperienceWithoutId }>({
            query: ({applicationId, body}) => ({
                url: `/applications/${applicationId}/setExperience`,
                method: 'POST',
                body
            })
        }),
        deleteExperience: builder.mutation<IMessageResponse, {experienceId: number}>({
            query: ({experienceId}) => ({
                url: `/applications/${experienceId}/deleteExperience`,
                method: 'DELETE',
            })
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

    useSetEducationMutation,
    useDeleteEducationMutation,

    useSetExperienceMutation,
    useDeleteExperienceMutation,

    useApproveMutation,
    useRejectMutation
} = applicationApi;


