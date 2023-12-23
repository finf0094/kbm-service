import {BaseQueryFn, createApi, FetchArgs} from "@reduxjs/toolkit/query/react";
import {CustomError} from "../../models/error/CustomError.ts";

import {baseQueryWithReauth} from "./baseQuery.ts";
import {IQuizSession} from "../../models/quizSession/IQuizSession.ts";
import {ISubmitAnswerRequest} from "../../models/quizSession/request/ISubmitAnswerRequest.ts";
import {IEndQuizSessionRequest} from "../../models/quizSession/request/IEndQuizSessionRequest.ts";

export const quizSessionApi = createApi({
    reducerPath: 'quizSessionApi',
    baseQuery: baseQueryWithReauth as BaseQueryFn<
        string | FetchArgs,
        unknown,
        CustomError>,
    endpoints: (builder) => ({
        getQuizSessionById: builder.query<IQuizSession, string>({
            query: (id) => `quizSessions/getSession?id=${id}`,
        }),
        getAllQuizSessionsByUserId: builder.query<IQuizSession[], number>({
            query: (userId) => `quizSessions/getSessions?userId=${userId}`,
        }),
        startQuiz: builder.mutation<IQuizSession, string>({
            query: (sessionId) => ({
                url: `quizSessions/${sessionId}/start`,
                method: 'POST',
            }),
        }),
        submitAnswer: builder.mutation<IQuizSession, ISubmitAnswerRequest>({
            query: (request) => ({
                url: `quizSessions/submitAnswer`,
                method: 'POST',
                body: request,
            }),
        }),
        endQuiz: builder.mutation<IQuizSession, IEndQuizSessionRequest>({
            query: (request) => ({
                url: `quizSessions/end`,
                method: 'POST',
                body: request,
            }),
        }),
    }),
});

export const {
    useGetQuizSessionByIdQuery,
    useGetAllQuizSessionsByUserIdQuery,
    useStartQuizMutation,
    useSubmitAnswerMutation,
    useEndQuizMutation,
} = quizSessionApi;