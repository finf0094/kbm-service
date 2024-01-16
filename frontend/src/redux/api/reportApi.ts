import {IReportPosition} from "../../models/report/IReportPosition.ts";
import {CustomError} from "../../models/error/CustomError.ts";
import {BaseQueryFn, createApi, FetchArgs, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {baseUrl} from "./baseQuery.ts";

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
    getReport: builder.query<IReportPosition, number>({
      query: (positionId) => `report/${positionId}`,
    }),
  }),
});

export const { useGetReportQuery } = reportApi;