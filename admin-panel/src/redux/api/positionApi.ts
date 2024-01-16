import { createApi, FetchArgs, BaseQueryFn } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQuery.ts";

import { CustomError } from "../../models/error/CustomError.ts";
import { IPosition } from "../../models/position/IPosition.ts";
import { IPage } from "../../models/IPage.ts";

export const positionApi = createApi({
    reducerPath: 'positionApi',
    baseQuery: baseQueryWithReauth as BaseQueryFn<string | FetchArgs, unknown, CustomError>,
    tagTypes: ['Item'],
    endpoints: (builder) => ({
        getPositionById: builder.query<IPosition, number>({
            query: (id) => `/positions/getPosition?id=${id}`
        }),
        getAllPositions: builder.query<IPage<IPosition>, { id?: number, search: string, offset: number, pageSize: number }>({
            query: ({ id, search, offset, pageSize }) => ({
                url: '/positions',
                params: {
                    departmentId: id,
                    search,
                    offset,
                    pageSize
                }
            }),
        }),
        createPosition: builder.mutation<IPosition, { name: string, departmentId: number }>({
            query: ({ name, departmentId }) => ({
                url: '/positions',
                method: 'POST',
                body: { name, departmentId }
            }),
            // invalidate cache
            invalidatesTags: [{ type: 'Item' }],
        }),
        updatePosition: builder.mutation<IPosition, { id: number, newName: string }>({
            query: ({ id, newName }) => ({
                url: `/positions/${id}`,
                method: 'PUT',
                body: newName
            }),
            // invalidate cache
            invalidatesTags: [{ type: 'Item' }],
        }),
        deletePosition: builder.mutation<{ success: boolean }, number>({
            query: (id) => ({
                url: `/positions/${id}`,
                method: 'DELETE',
            }),
            // invalidate cache
            invalidatesTags: [{ type: 'Item' }],
        }),
    }),
});

export const {
    useGetPositionByIdQuery,
    useGetAllPositionsQuery,
    useCreatePositionMutation,
    useUpdatePositionMutation,
    useDeletePositionMutation
} = positionApi;

export const {
    util
} = positionApi;