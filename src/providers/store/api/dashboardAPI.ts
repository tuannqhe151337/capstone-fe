import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
import { ListResponse, LocalStorageItemKey } from "./type";

export interface YearlyCostTypeResult {
  costType: CostType;
  totalCost: number;
}

export interface YearlyCostTypeExpenseByYearParam {
  year: number;
}

export interface MonthlyCostTypeResult {
  month: string;
  diagramResponses: MonthlyDiagramResponses[];
}

export interface MonthlyDiagramResponses {
  costType: CostType;
  totalCost: number;
}

export interface MonthlyCostTypeExpenseByYearParam {
  year: number;
}

export interface CostType {
  costTypeId: number;
  name: string;
}

export interface MonthlyExpectedActualCost {
  month: number;
  expectedCost: number;
  actualCost: number;
}

export interface MonthlyExpectedActualCostParam {
  year: number;
}

// DEV ONLY!!!
// const pause = (duration: number) => {
//   return new Promise((resolve) => {
//     setTimeout(resolve, duration);
//   });
// };

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

const dashboardApi = createApi({
  reducerPath: "dashboard",
  baseQuery: staggeredBaseQuery,
  tagTypes: ["dashboard"],
  endpoints(builder) {
    return {
      getYearlyCostTypeExpense: builder.query<
        ListResponse<YearlyCostTypeResult[]>,
        YearlyCostTypeExpenseByYearParam
      >({
        query: ({ year }) => `/report/cost-type-year-diagram?year=${year}`,
      }),
      getMonthlyCostTypeExpense: builder.query<
        ListResponse<MonthlyCostTypeResult[]>,
        MonthlyCostTypeExpenseByYearParam
      >({
        query: ({ year }) => `/report/cost-type-report-diagram?year=${year}`,
      }),
      getMonthlyExpectedActualCost: builder.query<
        ListResponse<MonthlyExpectedActualCost[]>,
        MonthlyExpectedActualCostParam
      >({
        query: ({ year }) => `/report/year-diagram?year=${year}`,
      }),
    };
  },
});

export const {
  useLazyGetYearlyCostTypeExpenseQuery,
  useLazyGetMonthlyCostTypeExpenseQuery,
  useLazyGetMonthlyExpectedActualCostQuery,
} = dashboardApi;
export { dashboardApi };
