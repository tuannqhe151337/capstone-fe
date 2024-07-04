import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { LocalStorageItemKey, PaginationResponse } from "./type";

export interface CreateUserBody {
  fullName: string;
  email: string;
  phoneNumber: string;
  departmentId: number;
  roleId: number;
  positionId: number;
  dob: string;
  address: string;
}

export interface ListUserParameters {
  query?: string | null;
  departmentId?: number | null;
  roleId?: number | null;
  positionId?: number | null;
  page: number;
  pageSize: number;
}

export interface User {
  userId: number | string;
  username: string;
  email: string;
  role: Role;
  department: Department;
  position: Position;
  deactivate: boolean;
  createdAt: string;
  updatedAt: string;
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

interface Position {
  id: number;
  name: string;
}

const usersApi = createApi({
  reducerPath: "users",
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
      // await pause(1000);
      return fetch(...args);
    },
  }),
  tagTypes: ["users"],
  endpoints(builder) {
    return {
      fetchUsers: builder.query<PaginationResponse<User[]>, ListUserParameters>(
        {
          query: ({
            query,
            departmentId,
            roleId,
            positionId,
            page,
            pageSize,
          }) => {
            let endpoint = `user?page=${page}&size=${pageSize}`;

            if (query && query !== "") {
              endpoint += `&query=${query}`;
            }

            if (departmentId) {
              endpoint += `&departmentId=${departmentId}`;
            }

            if (roleId) {
              endpoint += `&roleId=${roleId}`;
            }

            if (positionId) {
              endpoint += `&positionId=${positionId}`;
            }

            return endpoint;
          },
        }
      ),
      createUser: builder.mutation<void, CreateUserBody>({
        query: (createUserBody) => ({
          url: "user",
          method: "POST",
          body: createUserBody,
        }),
        invalidatesTags: ["users"],
      }),
    };
  },
});

export const {
  useFetchUsersQuery,
  useLazyFetchUsersQuery,
  useCreateUserMutation,
} = usersApi;
export { usersApi };
