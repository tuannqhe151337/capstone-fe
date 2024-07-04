import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
import { LocalStorageItemKey, PaginationResponse } from "./type";

export interface Position {
  id: number;
  name: string;
}

export interface ListPositionParameters {
  query: string;
  page: number;
  pageSize: number;
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

export const positionAPI = createApi({
  reducerPath: "positionAPI",
  baseQuery: staggeredBaseQuery,
  endpoints: (builder) => ({
    getListPosition: builder.query<
      PaginationResponse<[Position]>,
      ListPositionParameters
    >({
      query: ({ page, pageSize, query }) => {
        return `/position/user-paging-position?page=${page}&size=${pageSize}&query=${query}`;
      },
    }),
  }),
});

export const { useLazyGetListPositionQuery } = positionAPI;
