import { createApi, FetchArgs, BaseQueryFn } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQuery.ts";
import { CustomError } from "../../models/error/CustomError.ts";
import { IDepartment } from "../../models/position/IDepartment.ts";
import { IPage } from "../../models/IPage.ts";

export const departmentApi = createApi({
    reducerPath: 'departmentApi',
    baseQuery: baseQueryWithReauth as BaseQueryFn<string | FetchArgs, unknown, CustomError>,
    endpoints: (builder) => ({
        getDepartmentById: builder.query<IDepartment, number>({
            query: (id) => `/departments/getDepartment?id=${id}`
        }),
        getAllDepartments: builder.query<IPage<IDepartment>, { id?: number, search: string, offset: number, pageSize: number }>({
            query: ({ id, search, offset, pageSize }) => ({
                url: '/departments',
                params: {
                    locationId: id,
                    search,
                    offset,
                    pageSize
                }
            }),
        }),
        createDepartment: builder.mutation<IDepartment, { name: string, locationId: number }>({
            query: ({ name, locationId }) => ({
                url: '/departments',
                method: 'POST',
                body: { name, locationId }
            }),
        }),
        updateDepartment: builder.mutation<IDepartment, { id: number, newName: string }>({
            query: ({ id, newName }) => ({
                url: `/departments/${id}`,
                method: 'PUT',
                body: { name: newName }
            }),
        }),
        deleteDepartment: builder.mutation<{ success: boolean }, number>({
            query: (id) => ({
                url: `/departments/${id}`,
                method: 'DELETE',
            }),
        }),
    }),
});

export const {
    useGetDepartmentByIdQuery,
    useGetAllDepartmentsQuery,
    useCreateDepartmentMutation,
    useUpdateDepartmentMutation,
    useDeleteDepartmentMutation
} = departmentApi;