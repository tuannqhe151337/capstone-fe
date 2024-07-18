import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
import { ListResponse, LocalStorageItemKey } from "./type";

export interface CostType {
  costTypeId: number;
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

export const costTypeAPI = createApi({
  reducerPath: "costTypeAPI",
  baseQuery: staggeredBaseQuery,
  endpoints: (builder) => ({
    getListCostType: builder.query<ListResponse<CostType[]>, void>({
      query: () => {
        return `/cost-type/list`;
      },
    }),
  }),
});

export const { useGetListCostTypeQuery } = costTypeAPI;
