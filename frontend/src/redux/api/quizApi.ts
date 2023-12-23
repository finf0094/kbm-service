import {BaseQueryFn, createApi, FetchArgs} from "@reduxjs/toolkit/query/react";
import {baseQueryWithReauth} from "./baseQuery.ts";
import {IQuiz} from "../../models/quiz/IQuiz.ts";
import {CustomError} from "../../models/error/CustomError.ts";
import {IQuizSummary} from "../../models/quiz/IQuizSummary.ts";
import {IPage} from "../../models/IPage.ts";
import {IMessageResponse} from "../../models/information/IMessageResponse.ts";

export const quizApi = createApi({
    reducerPath: 'quizApi',
    baseQuery: baseQueryWithReauth as BaseQueryFn<
        string | FetchArgs,
        unknown,
        CustomError>,
    endpoints: (builder) => ({
        getAllQuizWithPagination: builder.query<IPage<IQuizSummary>, number>({
            query: (page = 1) => `quizzes?offset=${page}&pageSize=10`
        }),
        GetQuizById: builder.query<IQuiz, string>({
           query: (quizId: string) =>  `quizzes/${quizId}`
        }),
        deleteQuiz: builder.mutation<IMessageResponse, string>({
            query: (quizId) => ({
                url: `quizzes/${quizId}`,
                method: 'DELETE',
            }),
        }),
        createOrUpdateQuiz: builder.mutation<IQuiz, IQuiz>({
            query: (quiz) => ({
                url: 'quizzes',
                method: 'PUT',
                body: quiz,
            }),
        }),

    }),
});

export const {
    useGetAllQuizWithPaginationQuery,
    useGetQuizByIdQuery,
    useDeleteQuizMutation,
    useCreateOrUpdateQuizMutation,
} = quizApi;