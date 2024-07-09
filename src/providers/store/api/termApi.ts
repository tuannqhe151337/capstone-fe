import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
import { LocalStorageItemKey, PaginationResponse } from "./type";

export interface Term {
  termId: number | string;
  name: string;
  status: Status;
  startDate: string;
  endDate: string;
}

interface Status {
  id: number;
  name: string;
  code: string;
}

export interface ListTermParameters {
  query?: string;
  statusId?: number | null;
  page: number;
  pageSize: number;
}

export interface TermCreatePlan {
  termId: string | number;
  name: string;
  duration: string;
  startDate: string;
  endDate: string;
}

export interface ListTermWhenCreatePlanParameters {
  query?: string;
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
    getListTerm: builder.query<PaginationResponse<Term[]>, ListTermParameters>({
      query: ({ query, statusId, page, pageSize }) => {
        let endpoint = `term/plan-paging-term?page=${page}&size=${pageSize}`;

        if (query && query !== "") {
          endpoint += `&query=${query}`;
        }

        if (statusId) {
          endpoint += `&statusId=${statusId}`;
        }

        return endpoint;
      },
    }),
    getListTermWhenCreatePlan: builder.query<
      PaginationResponse<TermCreatePlan[]>,
      ListTermWhenCreatePlanParameters
    >({
      query: ({ query, page, pageSize }) => {
        let endpoint = `term/plan-create-select-term?page=${page}&size=${pageSize}`;

        if (query && query !== "") {
          endpoint += `&query=${query}`;
        }

        return endpoint;
      },
    }),
  }),
});

export const {
  useLazyGetListTermQuery,
  useLazyGetListTermWhenCreatePlanQuery,
} = termAPI;
