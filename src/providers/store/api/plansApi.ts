import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
import { LocalStorageItemKey, PaginationResponse } from "./type";

export interface ListPlanParameters {
  query?: string | null;
  termId?: number | null;
  departmentId?: number | null;
  statusId?: number | null;
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

export interface PlanDeleteParameters {
  planId: string | number;
}

interface User {
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

interface Status {
  id: number;
  name: string;
  code: string;
}

interface Position {
  id: string | number;
  name: string;
}

interface Term {
  id: number;
  name: string;
}

interface Department {
  id: number;
  name: string;
}

interface Role {
  id: number;
  code: string;
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

const plansApi = createApi({
  reducerPath: "plans",
  baseQuery: staggeredBaseQuery,
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
    };
  },
});

export const {
  useFetchPlansQuery,
  useLazyFetchPlansQuery,
  useGetPlanDetailQuery,
  useDeletePlanMutation,
} = plansApi;
export { plansApi };
