import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
import { LocalStorageItemKey, PaginationResponse } from "./type";

export interface Term {
  termId: number;
  name: string;
}

export interface ListTermParameters {
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

export const termAPI = createApi({
  reducerPath: "termAPI",
  baseQuery: staggeredBaseQuery,
  endpoints: (builder) => ({
    getListTerm: builder.query<PaginationResponse<[Term]>, ListTermParameters>({
      query: ({ page, pageSize, query }) => {
        return `/term/plan-paging-term?page=${page}&size=${pageSize}&query=${query}`;
      },
    }),
  }),
});

export const { useLazyGetListTermQuery } = termAPI;
