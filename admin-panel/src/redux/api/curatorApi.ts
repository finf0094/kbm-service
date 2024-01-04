import { createApi, FetchArgs, BaseQueryFn } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQuery";
import { CustomError } from "../../models/error/CustomError";
import { ICuratorDetail } from "../../models/curator/ICuratorDetail";
import { IPage } from "../../models/IPage";
import { IUpdateCurator } from "../../models/curator/IUpdateCurator";

export const curatorApi = createApi({
    reducerPath: 'curatorApi',
    baseQuery: baseQueryWithReauth as BaseQueryFn<string | FetchArgs, unknown, CustomError>,
    endpoints: (builder) => ({
        getCurator: builder.query<ICuratorDetail, number>({
            query: (id) => `curators/${id}`,
        }),
        getAllCurators: builder.query<IPage<ICuratorDetail>, { search?: string, offset: number, pageSize: number }>({
            query: ({ search, offset, pageSize }) => ({
                url: 'curators',
                params: { search, offset, pageSize },
            }),
        }),
        updateCurator: builder.mutation<ICuratorDetail, { curatorId: number, curator: IUpdateCurator }>({
            query: ({ curatorId, curator }) => ({
                url: `curators/${curatorId}`,
                method: 'PUT',
                body: curator,
            }),
        }),
        deleteCurator: builder.mutation<{ success: boolean }, number>({
            query: (curatorId) => ({
                url: `curators/${curatorId}`,
                method: 'DELETE',
            }),
        }),
        createCurator: builder.mutation<ICuratorDetail, IUpdateCurator>({
            query: (curator) => ({
                url: 'curators',
                method: 'POST',
                body: curator,
            }),
        }),
    }),
});

export const {
    useGetCuratorQuery,
    useGetAllCuratorsQuery,
    useUpdateCuratorMutation,
    useDeleteCuratorMutation,
    useCreateCuratorMutation,
} = curatorApi;