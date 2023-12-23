import {BaseQueryFn, createApi, FetchArgs} from "@reduxjs/toolkit/query/react";

import {baseQueryWithReauth} from "../baseQuery.ts";

import {IPosition} from "../../../models/position/IPosition.ts";
import {CustomError} from "../../../models/error/CustomError.ts";
import {IPage} from "../../../models/IPage.ts";

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
    }),
});

export const { useGetPositionsByDepartmentQuery } = positionApi;