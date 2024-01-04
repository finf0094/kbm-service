import { createApi, FetchArgs, BaseQueryFn } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQuery";
import { CustomError } from "../../models/error/CustomError";
import { ICuratorDetail } from "../../models/curator/ICuratorDetail";
import { IPage } from "../../models/IPage";

export const curatorApi = createApi({
    reducerPath: 'curatorApi',
    baseQuery: baseQueryWithReauth as BaseQueryFn<string | FetchArgs, unknown, CustomError>,
    endpoints: (builder) => ({
        getCurator: builder.query<ICuratorDetail, number>({
            query: (id) => `curators/${id}`,
        }),
        getAllCurators: builder.query<IPage<ICuratorDetail>, void>({
            query: () => 'curators'
        }),
    }),
});

export const {
    useGetCuratorQuery,
    useGetAllCuratorsQuery
} = curatorApi;