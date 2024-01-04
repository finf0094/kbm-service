import { BaseQueryFn, createApi, FetchArgs, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "./baseQuery.ts";
import { CustomError } from "../../models/error/CustomError.ts";
import { IReportPosition } from "../../models/report/IReportPosition.ts";

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
    getReport: builder.query<IReportPosition, void>({
      query: (positionId) => `report/${positionId}`,
    }),
  }),
});

export const { useGetReportQuery } = reportApi;
