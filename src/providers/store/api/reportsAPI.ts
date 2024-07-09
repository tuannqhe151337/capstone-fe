import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
import { LocalStorageItemKey, PaginationResponse } from "./type";

export interface ListReportParameters {
  query?: string | null;
  termId?: number | null;
  departmentId?: number | null;
  page: number;
  pageSize: number;
}

export interface Report {
  reportId: number | string;
  name: string;
  version: string;
  month: string;
  term: Term;
  department: Department;
}

interface Term {
  id: number;
  name: string;
}

interface Department {
  id: number;
  name: string;
}

// DEV ONLY!!!
const pause = (duration: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
};

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
    fetchFn: async (...args) => {
      // REMOVE FOR PRODUCTION
      // await pause(1000);
      return fetch(...args);
    },
  }),
  {
    maxRetries: 5,
  }
);

const reportsAPI = createApi({
  reducerPath: "report",
  baseQuery: staggeredBaseQuery,
  tagTypes: ["query"],
  endpoints(builder) {
    return {
      fetchReports: builder.query<
        PaginationResponse<Report[]>,
        ListReportParameters
      >({
        query: ({ query, termId, departmentId, page, pageSize }) => {
          let endpoint = `report/list?page=${page}&size=${pageSize}`;

          if (query && query !== "") {
            endpoint += `&query=${query}`;
          }

          if (departmentId) {
            endpoint += `&departmentId=${departmentId}`;
          }

          if (termId) {
            endpoint += `&termId=${termId}`;
          }

          return endpoint;
        },
      }),
    };
  },
});

export const { useFetchReportsQuery, useLazyFetchReportsQuery } = reportsAPI;
export { reportsAPI };
