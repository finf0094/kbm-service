import { createApi, FetchArgs, BaseQueryFn } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQuery.ts";

import { CustomError } from "../../models/error/CustomError.ts";
import { IPosition } from "../../models/position/IPosition.ts";
import { IPage } from "../../models/IPage.ts";

export const positionApi = createApi({
    reducerPath: 'positionApi',
    baseQuery: baseQueryWithReauth as BaseQueryFn<string | FetchArgs, unknown, CustomError>,
    endpoints: (builder) => ({
        getPositionById: builder.query<IPosition, number>({
            query: (id) => `/positions/${id}`
        }),
        getAllPositions: builder.query<IPage<IPosition>, { positionId: number, search: string, offset: number, pageSize: number }>({
            query: ({ positionId, search, offset, pageSize }) => ({
                url: '/positions',
                params: {
                    positionId,
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
        }),
        updatePosition: builder.mutation<IPosition, { id: number, newName: string }>({
            query: ({ id, newName }) => ({
                url: `/positions/${id}`,
                method: 'PUT',
                body: { name: newName }
            }),
        }),
        deletePosition: builder.mutation<{ success: boolean }, number>({
            query: (id) => ({
                url: `/positions/${id}`,
                method: 'DELETE',
            }),
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