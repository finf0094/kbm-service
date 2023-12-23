import {BaseQueryFn, createApi, FetchArgs} from "@reduxjs/toolkit/query/react";

import {baseQueryWithReauth} from "../baseQuery.ts";

import {CustomError} from "../../../models/error/CustomError.ts";
import {IDepartment} from "../../../models/position/IDepartment.ts";

export const departmentApi = createApi({
    reducerPath: 'departmentApi',
    baseQuery: baseQueryWithReauth as BaseQueryFn<
        string | FetchArgs,
        unknown,
        CustomError>,
    endpoints: (builder) => ({
        getDepartmentsByLocation: builder.query<IDepartment[], number>({
            query: (locationId) => `/departments?locationId=${locationId}`,
        }),
    }),
});

export const { useGetDepartmentsByLocationQuery } = departmentApi;