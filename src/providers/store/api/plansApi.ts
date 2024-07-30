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
  department: UserDepartment;
  version: number;
  isDelete: boolean;
  status: PlanStatus;
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
  status: PlanStatus;
  planDueDate: string;
  createdAt: string;
  department: PlanDepartment;
  user: User;
  version: number;
}

export interface PlanExpense {
  expenseId: number;
  name: string;
  costType: CostType;
  unitPrice: number;
  amount: number;
  projectName: string;
  supplierName: string;
  pic: string;
  notes: string;
  status: ExpenseStatus;
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
  department: UserDepartment;
  role: Role;
  position: Position;
  deactivate: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ExpenseStatus {
  statusId: number;
  code: ExpenseCode;
  name: string;
}

export type ExpenseCode =
  | "NEW"
  | "WAITING_FOR_APPROVAL"
  | "APPROVED"
  | "DENIED";

export interface PlanStatus {
  id: number;
  name: string;
  code: PlanCode;
}

export type PlanCode =
  | "NEW"
  | "WAITING_FOR_REVIEWED"
  | "APPROVED"
  | "REVIEWED"
  | "CLOSED";

export interface Position {
  id: string | number;
  name: string;
}

export interface Term {
  id: number;
  name: string;
}

export interface UserDepartment {
  departmentId: number;
  name: string;
}

export interface PlanDepartment {
  departmentId: number;
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

export interface ReuploadPlanBody {
  planId: string | number;
  data: ReuploadExpenseBody[];
}

export interface ReuploadExpenseBody {
  expenseCode: string;
  expenseName: string;
  costTypeId: number;
  unitPrice: number;
  amount: number;
  projectName: string;
  supplierName: string;
  pic: string;
  notes?: string | number;
}

export interface ReviewExpensesBody {
  planId: number;
  listExpenseId: number[];
}

export interface SubmitPlanBody {
  planId: number;
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
  tagTypes: ["plans", "plan-detail", "plan-expenses"],
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
        providesTags: ["plan-detail"],
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
        providesTags: ["plan-detail"],
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
        providesTags: ["plan-detail", "plan-expenses"],
      }),
      reuploadPlan: builder.mutation<any, ReuploadPlanBody>({
        query: (reuploadPlanBody) => ({
          url: "plan/re-upload",
          method: "PUT",
          body: reuploadPlanBody,
        }),
        invalidatesTags: ["plan-detail"],
      }),
      approveExpenses: builder.mutation<any, ReviewExpensesBody>({
        query: (reviewExpenseBody) => ({
          url: "plan/expense-approval",
          method: "PUT",
          body: reviewExpenseBody,
        }),
      }),
      denyExpenses: builder.mutation<any, ReviewExpensesBody>({
        query: (reviewExpenseBody) => ({
          url: "plan/expense-deny",
          method: "PUT",
          body: reviewExpenseBody,
        }),
      }),
      submitPlanForReview: builder.mutation<any, SubmitPlanBody>({
        query: (submitPlanBody) => ({
          url: "plan/submit-for-review",
          method: "PUT",
          body: submitPlanBody,
        }),
        invalidatesTags: ["plan-detail"],
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
  useReuploadPlanMutation,
  useApproveExpensesMutation,
  useDenyExpensesMutation,
  useSubmitPlanForReviewMutation,
} = plansApi;
export { plansApi };
