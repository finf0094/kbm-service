import { createApi, FetchArgs, BaseQueryFn } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQuery.ts";
import { CustomError } from "../../models/error/CustomError.ts";
import { IPage } from "../../models/IPage.ts";
import {ILocation} from "../../models/position/ILocation.ts";

export const locationApi = createApi({
    reducerPath: 'locationApi',
    baseQuery: baseQueryWithReauth as BaseQueryFn<string | FetchArgs, unknown, CustomError>,
    tagTypes: ['Item'],
    endpoints: (builder) => ({
        getLocationById: builder.query<ILocation, number>({
            query: (id) => `/locations/getLocation?id=${id}`
        }),
        getAllLocations: builder.query<IPage<ILocation>, { search: string, offset: number, pageSize: number }>({
            query: ({ search, offset, pageSize }) => ({
                url: '/locations',
                params: {
                    search,
                    offset,
                    pageSize
                }
            }),
        }),
        createLocation: builder.mutation<ILocation, string>({
            query: (name) => ({
                url: `/locations/${name}`,
                method: 'POST',
            }),
            // invalidate cache
            invalidatesTags: [{ type: 'Item' }],
        }),
        updateLocation: builder.mutation<ILocation, { id: number, newName: string }>({
            query: ({ id, newName }) => ({
                url: `/locations/${id}`,
                method: 'PUT',
                body: newName
            }),
            // invalidate cache
            invalidatesTags: [{ type: 'Item' }],
        }),
        deleteLocation: builder.mutation<{ success: boolean }, number>({
            query: (id) => ({
                url: `/locations/${id}`,
                method: 'DELETE',
            }),
            // invalidate cache
            invalidatesTags: [{ type: 'Item' }],
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

export const {
    util
} = locationApi;