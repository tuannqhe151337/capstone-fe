import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
import { LocalStorageItemKey, PaginationResponse } from "./type";

export enum AFFIX {
  PREFIX = "PREFIX",
  SUFFIX = "SUFFIX",
}

export interface MonthlyExchangeRate {
  month: string;
  exchangeRates: ExchangeRate[];
}

export interface ExchangeRate {
  exchangeRateId: number;
  currency: Currency;
  amount: number;
}

export interface Currency {
  currencyId: number;
  name: string;
  symbol: string;
  affix: AFFIX;
}

export interface ListExchangeRateParameters {
  year?: number;
  page: number;
  pageSize: number;
  sortBy?: string;
  sortType?: string;
}

export interface DeleteExchangeRateBody {
  month: string;
}

export interface CreateExchangeRateBody {
  month: string;
  exchangeRates: ExchangeRateBody[];
}

export interface UpdateExchangeRateBody {
  exchangeId: number;
  amount: number;
}

export interface ExchangeRateBody {
  currencyId: number;
  amount: number;
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

export const exchangeRateAPI = createApi({
  reducerPath: "exchangeRate",
  baseQuery: staggeredBaseQuery,
  tagTypes: ["exchange-rate"],
  endpoints: (builder) => ({
    getListExchangeRate: builder.query<
      PaginationResponse<MonthlyExchangeRate[]>,
      ListExchangeRateParameters
    >({
      query: ({ year, page, pageSize, sortBy, sortType }) => {
        let url = `/exchange/list-paginate?page=${page}&size=${pageSize}`;

        if (year) {
          url += `&year=${year}`;
        }

        if (sortBy) {
          url += `&sortBy=${sortBy}`;
        }

        if (sortType) {
          url += `&sortType=${sortType}`;
        }

        return url;
      },
      providesTags: ["exchange-rate"],
      // Only have one cache entry because the arg always maps to one string
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      // Merge to exists cache, if page === 0 then invalidate all cache
      // https://stackoverflow.com/questions/72530121/rtk-query-infinite-scrolling-retaining-existing-data
      // https://github.com/reduxjs/redux-toolkit/issues/2874
      merge(currentCacheData, responseData, { arg: { page } }) {
        if (page > 1) {
          currentCacheData.data.push(...responseData.data);
          currentCacheData.pagination = responseData.pagination;
        } else if (page <= 1) {
          currentCacheData = responseData;
        }

        return currentCacheData;
      },
      // Refetch when the page arg changes
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
    }),

    createExchangeRate: builder.mutation<any, CreateExchangeRateBody>({
      query: (createExchangeRateBody) => ({
        url: `/exchange/create`,
        method: "POST",
        body: createExchangeRateBody,
      }),
      invalidatesTags: ["exchange-rate"],
    }),
    updateExchangeRate: builder.mutation<any, UpdateExchangeRateBody>({
      query: (updateExchangeRateBody) => ({
        url: `/exchange/update`,
        method: "PUT",
        body: updateExchangeRateBody,
      }),
      invalidatesTags: ["exchange-rate"],
    }),
    deleteExchangeRate: builder.mutation<any, DeleteExchangeRateBody>({
      query: (deleteExchangeRateBody) => ({
        url: `/exchange`,
        method: "DELETE",
        body: deleteExchangeRateBody,
      }),
      invalidatesTags: ["exchange-rate"],
    }),
  }),
});

export const {
  useLazyGetListExchangeRateQuery,
  useDeleteExchangeRateMutation,
  useCreateExchangeRateMutation,
  useUpdateExchangeRateMutation,
} = exchangeRateAPI;
