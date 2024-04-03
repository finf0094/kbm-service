import { createApi, FetchArgs, BaseQueryFn } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth, CustomError } from '@/shared/api'
import { IPolicy } from '../model/IPolicy'

export const policyApi = createApi({
	reducerPath: 'policyApi',
	baseQuery: baseQueryWithReauth as BaseQueryFn<string | FetchArgs, unknown, CustomError>,
	endpoints: (builder) => ({
		getAllPolicies: builder.query<IPolicy[], void>({
			query: () => 'policies'
		})
	}),
})

export const { useGetAllPoliciesQuery } = policyApi