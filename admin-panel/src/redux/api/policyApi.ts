import { createApi, FetchArgs, BaseQueryFn } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQuery";
import { CustomError } from "../../models/error/CustomError";

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
        }),
        deletePolicy: builder.mutation<{ success: boolean }, number>({
            query: (policyId) => ({
                url: `policies/${policyId}`,
                method: 'DELETE',
            }),
        }),
        uploadPolicy: builder.mutation<void, { file: File }>({
            query: ({ file }) => {
                const formData = new FormData();
                formData.append('file', file);
                return {
                    url: `/policies`,
                    method: 'POST',
                    body: formData,
                };
            },
        }),
    }),
});

export const {
    useGetAllPoliciesQuery,
    useDeletePolicyMutation,
    useUploadPolicyMutation,
} = policyApi;