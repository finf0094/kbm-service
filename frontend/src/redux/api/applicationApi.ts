import {BaseQueryFn, createApi, FetchArgs} from "@reduxjs/toolkit/query/react";
import {baseQueryWithReauth} from "./baseQuery.ts";

import {IApplication} from "../../models/application/IApplication.ts";
import {CustomError} from "../../models/error/CustomError.ts";
import {IEmployee} from "../../models/employee/IEmployee.ts";
import {IMessageResponse} from "../../models/information/IMessageResponse.ts";
import {IEducationWithoutId} from "../../models/application/IEducation.ts";
import {IExperienceWithoutId} from "../../models/application/IExperience.ts";
import {IScheduleInterviewDetails} from "../../models/application/IScheduleInterviewDetails.ts";


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
        setEmployee: builder.mutation<IApplication, { applicationId: string, body: IEmployee }>({
            query: ({applicationId, body}) => ({
                url: `/applications/${applicationId}/setEmployee`,
                method: 'POST',
                body
            }),
        }),
        setDesiredPosition: builder.mutation<IApplication, { applicationId: string, positionId: number }>({
            query: ({applicationId, positionId}) => ({
                url: `/applications/${applicationId}/setDesiredPosition/${positionId}`,
                method: 'POST',
            }),
        }),
        deleteDesiredPosition: builder.mutation<IMessageResponse, { applicationId: string, positionId: number }>({
            query: ({applicationId, positionId}) => ({
                url: `/applications/${applicationId}/deleteDesiredPosition/${positionId}`,
                method: 'DELETE',
            }),
        }),
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
        uploadVideo: builder.mutation<{ videoUrl: string }, { applicationId: string, videoFile: File }>({
            query: ({applicationId, videoFile}) => {
                const formData = new FormData();
                formData.append('video', videoFile);
                return {
                    url: `/applications/${applicationId}/uploadVideo`,
                    method: 'POST',
                    body: formData,
                };
            },
        }),
        startTesting: builder.mutation<IApplication, number>({
            query: (userId: number) => ({
                url: `/applications/${userId}/startTesting`,
                method: 'POST',
            }),
        }),
        scheduleAnInterview: builder.mutation<IApplication, { applicationId: string, scheduleInterviewDetails: IScheduleInterviewDetails }>({
            query: ({applicationId, scheduleInterviewDetails}) => ({
                url: `/applications/${applicationId}/scheduleAnInterview`,
                method: 'POST',
                body: scheduleInterviewDetails
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
    useCreateApplicationMutation,
    useGetApplicationByUserIdQuery,
    useGetApplicationByIdQuery,
    useSetEmployeeMutation,
    useSetDesiredPositionMutation,
    useDeleteDesiredPositionMutation,
    useSetEducationMutation,
    useSetExperienceMutation,
    useDeleteEducationMutation,
    useDeleteExperienceMutation,
    useUploadVideoMutation,
    useStartTestingMutation,
    useScheduleAnInterviewMutation,
    useApproveMutation,
    useRejectMutation
} = applicationApi;


