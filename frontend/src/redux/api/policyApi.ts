import { createApi, FetchArgs, BaseQueryFn } from "@reduxjs/toolkit/query/react";
import { CustomError } from "../../models/error/CustomError";
import { baseQueryWithReauth } from "./baseQuery";

export interface IPolicy {
    id: number,
    policyUrl: string
}

export const policyApi = createApi({
    reducerPath: 'policyApi',
    baseQuery: baseQueryWithReauth as BaseQueryFn<string | FetchArgs, unknown, CustomError>,
    endpoints: (builder) => ({
        getAllPolicies: builder.query<IPolicy[], void>({
            query: () => 'policies'
        })
    }),
});

export const {
    useGetAllPoliciesQuery
} = policyApi;