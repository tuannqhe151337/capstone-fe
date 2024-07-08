import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
import { LocalStorageItemKey, PaginationResponse } from "./type";

export interface ListAnnualReportParameters {
  query?: string | null;
  year: number;
  page: number;
  pageSize: number;
}

export interface AnnualReport {
  annualReportId: number | string;
  year: string;
  totalTerm: number;
  totalExpense: number;
  totalDepartment: number;
  createdDate: string;
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

const annualAPI = createApi({
  reducerPath: "annual",
  baseQuery: staggeredBaseQuery,
  tagTypes: ["query"],
  endpoints(builder) {
    return {
      fetchAnnual: builder.query<
        PaginationResponse<AnnualReport[]>,
        ListAnnualReportParameters
      >({
        query: ({ query, year, page, pageSize }) => {
          let endpoint = `plan/list?page=${page}&size=${pageSize}`;
          if (query && query !== "") {
            endpoint += `&query=${query}`;
          }
          if (year) {
            endpoint += `&year=${year}`;
          }
          return endpoint;
        },
      }),
    };
  },
});

export const { useFetchAnnualQuery, useLazyFetchAnnualQuery } = annualAPI;
export { annualAPI };
