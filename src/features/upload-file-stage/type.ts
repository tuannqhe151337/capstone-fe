export enum FileUploadStage {
  EMPTY = "empty",
  PROCESSING = "processing",
  SUCCESS = "success",
  INVALID_FORMAT_ERROR = "invalid_format_error",
  VALIDATION_ERROR = "validation_err",
}

export interface Expense {
  date: Date;
  name: string;
  unitPrice: number;
  amount: number;
  projectName: string;
  supplierName: string;
  pic: string;
  notes?: string;
}
