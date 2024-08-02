import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
import {
  ExpenseStatusCode,
  LocalStorageItemKey,
  PaginationResponse,
} from "./type";

export interface ListReportParameters {
  query?: string | null;
  termId?: number | null;
  departmentId?: number | null;
  page: number;
  pageSize: number;
}

export interface ListReportExpenseParameters {
  query?: string | null;
  reportId: number | null;
  statusId?: number | null;
  costTypeId?: number | null;
  page: number;
  pageSize: number;
}

export interface Report {
  reportId: number | string;
  name: string;
  version: string;
  month: string;
  term: Term;
  status: ReportStatus;
  createdAt: string;
}

export interface ReportExpense {
  expenseId: number | string;
  name: string;
  costType: CostType;
  unitPrice: number;
  amount: number;
  projectName: string;
  supplierName: string;
  pic: string;
  notes: string;
  status: ReportExpenseStatus;
}

export interface CostType {
  costTypeId: number;
  name: string;
  code: string;
}

export interface ReportExpenseStatus {
  statusId: number;
  code: ExpenseStatusCode;
  name: string;
}

export interface ReportDetailParameters {
  reportId: string | number;
}

export interface ReportDetail {
  id: string | number;
  name: string;
  term: Term;
  status: ReportStatus;
  createdAt: string;
}

export interface ReportStatus {
  id: number;
  name: string;
  code: ReportStatusCode;
}

export type ReportStatusCode =
  | "NEW"
  | "WAITING_FOR_APPROVAL"
  | "REVIEWED"
  | "APPROVED"
  | "CLOSED";

export interface Term {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  reuploadStartDate: string;
  reuploadEndDate: string;
  finalEndTermDate: string;
}

export interface Department {
  id: number;
  name: string;
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

export interface Role {
  id: number;
  code: string;
  name: string;
}

export interface Position {
  id: string | number;
  name: string;
}

export interface ReportExpectedCostResponse {
  expectedCost: number;
}

export interface ReportActualCostResponse {
  actualCost: number;
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

      getReportDetail: builder.query<ReportDetail, ReportDetailParameters>({
        query: ({ reportId }) => `/report/detail?reportId=${reportId}`,
      }),

      getReportActualCost: builder.query<
        ReportActualCostResponse,
        ReportDetailParameters
      >({
        query: ({ reportId }) => `/report/actual-cost?reportId=${reportId}`,
      }),

      getReportExpectedCost: builder.query<
        ReportExpectedCostResponse,
        ReportDetailParameters
      >({
        query: ({ reportId }) => `/report/expected-cost?reportId=${reportId}`,
      }),

      fetchReportExpenses: builder.query<
        PaginationResponse<ReportExpense[]>,
        ListReportExpenseParameters
      >({
        query: ({ query, reportId, costTypeId, statusId, page, pageSize }) => {
          let endpoint = `report/expenses?reportId=${reportId}&page=${page}&size=${pageSize}`;

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
  useFetchReportsQuery,
  useGetReportActualCostQuery,
  useGetReportExpectedCostQuery,
  useLazyFetchReportsQuery,
  useGetReportDetailQuery,
  useFetchReportExpensesQuery,
  useLazyFetchReportExpensesQuery,
} = reportsAPI;
export { reportsAPI };
