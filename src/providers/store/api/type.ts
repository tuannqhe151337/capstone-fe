export enum LocalStorageItemKey {
  TOKEN = "token",
  REFRESH_TOKEN = "refreshToken",
}

export interface PaginationType {
  page: number;
  totalRecords: number;
  limitRecordsPerPage: number;
  numPages: number;
}

export interface PaginationResponse<T> {
  data: T;
  pagination: PaginationType;
}

export interface ErrorData {
  field: string;
  message: string;
}
