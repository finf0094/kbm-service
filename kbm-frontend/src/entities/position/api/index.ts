import { BaseQueryFn, createApi, FetchArgs } from '@reduxjs/toolkit/query/react'
import { IDepartment, IPosition, ILocation } from '..'
import { IPage } from '@/entities/response/model/IPage'
import { baseQueryWithReauth, CustomError } from '@/shared/api'

export const positionApi = createApi({
	reducerPath: 'positionApi',
	baseQuery: baseQueryWithReauth as BaseQueryFn<
		string | FetchArgs,
		unknown,
		CustomError>,
	endpoints: (builder) => ({
		getPositionsByDepartment: builder.query<IPosition[], number>({
			query: (departmentId: number) => `/positions?departmentId=${departmentId}&pageSize=100`,
			transformResponse: (response: IPage<IPosition>) => response.content,
		}),
		getAllLocations: builder.query<ILocation[], void>({
			query: () => '/locations?pageSize=100',
			transformResponse: (response: IPage<ILocation>) => response.content,
		}),
		getDepartmentsByLocation: builder.query<IDepartment[], number>({
			query: (locationId) => `/departments?locationId=${locationId}&pageSize=100`,
			transformResponse: (response: IPage<IDepartment>) => response.content,
		}),
	}),
})

export const { useGetPositionsByDepartmentQuery, useGetAllLocationsQuery, useGetDepartmentsByLocationQuery } = positionApi