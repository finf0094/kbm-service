import { createApi, FetchArgs, BaseQueryFn } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQuery.ts";
import { CustomError } from "../../models/error/CustomError.ts";
import { IItem } from "../../models/position/IItem.ts";
import { IPage } from "../../models/IPage.ts";

export const locationApi = createApi({
    reducerPath: 'locationApi',
    baseQuery: baseQueryWithReauth as BaseQueryFn<string | FetchArgs, unknown, CustomError>,
    endpoints: (builder) => ({
        getLocationById: builder.query<IItem, number>({
            query: (id) => `/locations/${id}`
        }),
        getAllLocations: builder.query<IPage<IItem>, { search: string, offset: number, pageSize: number }>({
            query: ({ search, offset, pageSize }) => ({
                url: '/locations',
                params: {
                    search,
                    offset,
                    pageSize
                }
            }),
        }),
        createLocation: builder.mutation<IItem, string>({
            query: (name) => ({
                url: `/locations/${name}`,
                method: 'POST',
            }),
        }),
        updateLocation: builder.mutation<IItem, { id: number, newName: string }>({
            query: ({ id, newName }) => ({
                url: `/locations/${id}`,
                method: 'PUT',
                body: newName
            }),
        }),
        deleteLocation: builder.mutation<{ success: boolean }, number>({
            query: (id) => ({
                url: `/locations/${id}`,
                method: 'DELETE',
            }),
        }),
    }),
});

export const {
    useGetLocationByIdQuery,
    useGetAllLocationsQuery,
    useCreateLocationMutation,
    useUpdateLocationMutation,
    useDeleteLocationMutation
} = locationApi;