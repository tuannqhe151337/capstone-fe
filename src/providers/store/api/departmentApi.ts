import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
import { LocalStorageItemKey, PaginationResponse } from "./type";

export interface Department {
  departmentId: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface ListDepartmentParameters {
  query?: string;
  page: number;
  pageSize: number;
  sortBy?: string;
  sortType?: string;
}

// maxRetries: 5 is the default, and can be omitted. Shown for documentation purposes.
const staggeredBaseQuery = retry(
  fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BACKEND_HOST,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem(LocalStorageItemKey.TOKEN);
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  {
    maxRetries: 5,
  }
);

export const departmentAPI = createApi({
  reducerPath: "departmentAPI",
  baseQuery: staggeredBaseQuery,
  endpoints: (builder) => ({
    getListDepartment: builder.query<
      PaginationResponse<Department[]>,
      ListDepartmentParameters
    >({
      query: ({ page, pageSize, query, sortBy, sortType }) => {
        let url = `/department/list?page=${page}&size=${pageSize}`;

        if (query) {
          url += `&query=${query}`;
        }

        if (sortBy) {
          url += `&sortBy=${sortBy}`;
        }

        if (sortType) {
          url += `&sortType=${sortType}`;
        }

        return url;
      },
    }),
  }),
});

export const { useLazyGetListDepartmentQuery } = departmentAPI;
