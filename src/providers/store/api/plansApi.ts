import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { LocalStorageItemKey, PaginationResponse } from "./type";

export interface ListPlanParameters {
  query?: string | null;
  termId?: number | null;
  departmentId?: number | null;
  statusId?: number | null;
  page: number;
  pageSize: number;
}

export interface ListPlanExpenseParameters {
  query?: string | null;
  planId: number | null;
  statusId?: number | null;
  costTypeId?: number | null;
  page: number;
  pageSize: number;
}

export interface PlanPreview {
  planId: number | string;
  name: string;
  term: Term;
  role: Role;
  department: Department;
  version: number;
  isDelete: boolean;
  status: Status;
}

export interface PlanDetailParameters {
  planId: string | number;
}

export interface PlanDetail {
  id: string | number;
  name: string;
  biggestExpenditure: number;
  totalPlan: number;
  term: Term;
  status: Status;
  planDueDate: string;
  createdAt: string;
  department: Department;
  user: User;
  version: number;
}

export interface PlanExpense {
  expenseId: number | string;
  name: string;
  costType: CostType;
  unitPrice: number;
  amount: number;
  projectName: string;
  supplierName: string;
  pic: string;
  notes: string;
  status: StatusExpense;
}

export interface CostType {
  costTypeId: number;
  name: string;
  code: string;
}

export interface PlanDeleteParameters {
  planId: string | number;
}

export interface PlanVersion {
  planFileId: string | number;
  version: number;
  publishedDate: string;
  uploadedBy: User;
}

export interface PlanVersionParameters {
  planId: string | number;
  page: number;
  pageSize: number;
}

export interface User {
  userId: string | number;
  username: string;
  email: string;
  department: Department;
  role: Role;
  position: Position;
  deactivate: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface StatusExpense {
  statusId: number;
  code: string;
  name: string;
}

export interface Status {
  id: number;
  name: string;
  code: string;
}

export interface Position {
  id: string | number;
  name: string;
}

export interface Term {
  id: number;
  name: string;
}

export interface Department {
  id: number;
  name: string;
}

export interface Role {
  id: number;
  code: string;
  name: string;
}

export interface CreatePlanBody {
  termId: string | number;
  planName: string;
  fileName: string;
  expenses: ExpenseBody[];
}

export interface ExpenseBody {
  name: string;
  costTypeId: number;
  unitPrice: number;
  amount: number;
  projectName: string;
  supplierName: string;
  pic: string;
  notes?: string | number;
}

// DEV ONLY!!!
// const pause = (duration: number) => {
//   return new Promise((resolve) => {
//     setTimeout(resolve, duration);
//   });
// };

const plansApi = createApi({
  reducerPath: "plans",
  baseQuery: fetchBaseQuery({
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
      // await pause(2000);
      return fetch(...args);
    },
  }),
  tagTypes: ["plans"],
  endpoints(builder) {
    return {
      fetchPlans: builder.query<
        PaginationResponse<PlanPreview[]>,
        ListPlanParameters
      >({
        query: ({ query, termId, departmentId, statusId, page, pageSize }) => {
          let endpoint = `plan/list?page=${page}&size=${pageSize}`;

          if (query && query !== "") {
            endpoint += `&query=${query}`;
          }

          if (departmentId) {
            endpoint += `&departmentId=${departmentId}`;
          }

          if (termId) {
            endpoint += `&termId=${termId}`;
          }

          if (statusId) {
            endpoint += `&statusId=${statusId}`;
          }

          return endpoint;
        },
        providesTags: ["plans"],
      }),
      getPlanDetail: builder.query<PlanDetail, PlanDetailParameters>({
        query: ({ planId }) => `/plan/detail?planId=${planId}`,
      }),
      deletePlan: builder.mutation<any, PlanDeleteParameters>({
        query: ({ planId }) => ({
          url: `/plan/delete`,
          method: "DELETE",
          body: { planId },
        }),
        invalidatesTags: ["plans"],
      }),
      getPlanVersion: builder.query<
        PaginationResponse<PlanVersion[]>,
        PlanVersionParameters
      >({
        query: ({ page, pageSize, planId }) =>
          `/plan/versions?planId=${planId}&page=${page}&size=${pageSize}`,
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
      createPlan: builder.mutation<any, CreatePlanBody>({
        query: (createPlanBody) => ({
          url: `plan/create`,
          method: "POST",
          body: createPlanBody,
        }),
        invalidatesTags: ["plans"],
      }),

      fetchPlanExpenses: builder.query<
        PaginationResponse<PlanExpense[]>,
        ListPlanExpenseParameters
      >({
        query: ({ query, planId, costTypeId, statusId, page, pageSize }) => {
          let endpoint = `plan/expenses?planId=${planId}&page=${page}&size=${pageSize}`;

          if (query && query !== "") {
            endpoint += `&query=${query}`;
          }

          if (costTypeId) {
            endpoint += `&costTypeId=${costTypeId}`;
          }

          if (statusId) {
            endpoint += `&statusId=${statusId}`;
          }

          return endpoint;
        },
      }),
    };
  },
});

export const {
  useFetchPlansQuery,
  useLazyFetchPlansQuery,
  useGetPlanDetailQuery,
  useDeletePlanMutation,
  useLazyGetPlanVersionQuery,
  useCreatePlanMutation,
  useFetchPlanExpensesQuery,
  useLazyFetchPlanExpensesQuery,
} = plansApi;
export { plansApi };
