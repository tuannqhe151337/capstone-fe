import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
import { LocalStorageItemKey, PaginationResponse } from "./type";

export interface Status {
  id: number;
  code: string;
  name: string;
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

export const statusAPI = createApi({
  reducerPath: "statusAPI",
  baseQuery: staggeredBaseQuery,
  endpoints: (builder) => ({
    getListStatus: builder.query<PaginationResponse<Status[]>, void>({
      query: () => {
        return `/term-status/term-status-list`;
      },
    }),
  }),
});

export const { useGetListStatusQuery } = statusAPI;
