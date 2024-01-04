import { BaseQueryFn, createApi, FetchArgs, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "./baseQuery.ts";
import { CustomError } from "../../models/error/CustomError.ts";
import { IReportPosition } from "../../models/report/IReportPosition.ts";
import { ICandidates } from "../../models/report/ICandidates.ts";

export const reportApi = createApi({
  reducerPath: 'reportApi',
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
  }) as BaseQueryFn<
    string | FetchArgs,
    unknown,
    CustomError
  >,
  endpoints: (builder) => ({
    getPositions: builder.query<IReportPosition[], void>({
      query: () => 'report/position',
    }),
    getCandidates: builder.query<ICandidates[], void>({
      query: () => 'report/candidates',
    }),
  }),
});

export const { useGetPositionsQuery, useGetCandidatesQuery } = reportApi;
