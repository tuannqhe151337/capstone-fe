import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
import { LocalStorageItemKey, PaginationResponse } from "./type";

export interface ListTermParameters {
  query?: string | null;
  statusId?: number | null;
  page: number;
  pageSize: number;
}

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

const termsApi = createApi({
  reducerPath: "terms",
  baseQuery: staggeredBaseQuery,
  tagTypes: ["query"],
  endpoints(builder) {
    return {
      fetchTerms: builder.query<PaginationResponse<Term[]>, ListTermParameters>(
        {
          query: ({ query, statusId, page, pageSize }) => {
            let endpoint = `term/plan-paging-term?page=${page}&size=${pageSize}`;

            if (query && query !== "") {
              endpoint += `&query=${query}`;
            }
            if (statusId) {
              endpoint += `&pstatusId=${statusId}`;
            }
            return endpoint;
          },
        }
      ),
    };
  },
});

export const { useFetchTermsQuery, useLazyFetchTermsQuery } = termsApi;
export { termsApi };
