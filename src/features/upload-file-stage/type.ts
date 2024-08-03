import { CostType } from "../../providers/store/api/costTypeAPI";
import { ExpenseStatus } from "../../providers/store/api/type";

export enum FileUploadStage {
  EMPTY = "empty",
  PROCESSING = "processing",
  SUCCESS = "success",
  INVALID_FORMAT_ERROR = "invalid_format_error",
  VALIDATION_ERROR = "validation_err",
}

export interface Expense {
  // date: Date;
  costType: CostType;
  code: string;
  name: string;
  unitPrice: number;
  amount: number;
  projectName: string;
  supplierName: string;
  pic: string;
  notes?: string;
  status?: ExpenseStatus;
}

export interface ExpenseFieldError {
  value: string | number | undefined;
  errorMessage?: string | undefined;
}

export interface ExpenseError {
  // date: ExpenseFieldError;
  costType: ExpenseFieldError;
  name: ExpenseFieldError;
  unitPrice: ExpenseFieldError;
  amount: ExpenseFieldError;
  projectName: ExpenseFieldError;
  supplierName: ExpenseFieldError;
  pic: ExpenseFieldError;
  notes?: string | number | undefined;
  status: ExpenseFieldError;
}
