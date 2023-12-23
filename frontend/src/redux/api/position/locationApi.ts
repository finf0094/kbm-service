import {BaseQueryFn, createApi, FetchArgs} from "@reduxjs/toolkit/query/react";
import {baseQueryWithReauth} from "../baseQuery.ts";
import {CustomError} from "../../../models/error/CustomError.ts";
import {ILocation} from "../../../models/position/ILocation.ts";
import {IPage} from "../../../models/IPage.ts";

export const locationApi = createApi({
    reducerPath: 'locationApi',
    baseQuery: baseQueryWithReauth as BaseQueryFn<
        string | FetchArgs,
        unknown,
        CustomError>,
    endpoints: (builder) => ({
        getAllLocations: builder.query<ILocation[], void>({
            query: () => '/locations?pageSize=100',
            transformResponse: (response: IPage<ILocation>) => response.content,
        }),
    }),
});

export const { useGetAllLocationsQuery } = locationApi;