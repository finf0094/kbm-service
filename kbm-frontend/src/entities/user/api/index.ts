import { BaseQueryFn, createApi, FetchArgs } from '@reduxjs/toolkit/query/react'
import { IUserDetail } from '../model/IUserDetail.ts'
import { baseQueryWithReauth, CustomError } from '@/shared/api/baseQuery.ts'

export const userApi = createApi({
	reducerPath: 'userApi',
	baseQuery: baseQueryWithReauth as BaseQueryFn<string | FetchArgs, unknown,	CustomError>,
	endpoints: (builder) => ({
		getUserByItin: builder.query<IUserDetail, string>({
			query: (itin: string) => ({
				url: `/users/getUser?itin=${itin}`,
				method: 'GET',
			}),
		}),
		// eslint-disable-next-line
		updateUser: builder.mutation<IUserDetail, any>({
			query: (body) => ({
				url: `/users/${body.id}`,
				method: 'PUT',
				body,
			}),
		}),
		uploadResume: builder.mutation<void, { userId: number, file: File }>({
			query: ({ userId, file }) => {
				const formData = new FormData()
				formData.append('file', file)
				return {
					url: `/users/${userId}/uploadResume`,
					method: 'POST',
					body: formData,
				}
			},
		}),
		deleteResume: builder.mutation<void, number>({
			query: (userId) => ({
				url: `/users/${userId}/deleteResume`,
				method: 'DELETE',
			}),
		}),
	}),
})

export const { useGetUserByItinQuery, useUpdateUserMutation, useUploadResumeMutation, useDeleteResumeMutation } = userApi;


