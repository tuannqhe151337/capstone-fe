import { read, utils } from "xlsx";
import { z } from "zod";
import { getZodMessasges } from "../../../shared/utils/get-zod-messages";
import { Expense, ExpenseError } from "../type";
import { format } from "date-fns";
import { CostType } from "../../../providers/store/api/costTypeAPI";
import { ExpenseStatus } from "../../../providers/store/api/type";

// Beggining line to start to read expense
const BeginLine = 3;

// Mapping column to index
type ColumnName =
  | "expenseCode"
  | "date"
  | "term"
  | "department"
  | "expenseName"
  | "costType"
  | "unitPrice"
  | "amount"
  | "total"
  | "projectName"
  | "supplierName"
  | "pic"
  | "note"
  | "status";

const ColumnNameIndexMappingConfig: Record<ColumnName, number> = {
  expenseCode: 0,
  date: 1,
  term: 2,
  department: 3,
  expenseName: 4,
  costType: 5,
  unitPrice: 6,
  amount: 7,
  total: 8,
  projectName: 9,
  supplierName: 10,
  pic: 11,
  note: 12,
  status: 13,
};

// Date pattern
const datePattern = "dd/MM/yyyy";

// Validation schema
const ExpenseNameSchema = z.string();
const CostTypeSchema = z.string();
const UnitPriceSchema = z.number().gt(0);
const AmountSchema = z.number().gt(0);
const ProjectNameSchema = z.string();
const SupplierNameSchema = z.string();
const PicSchema = z.string();
const StatusCodeSchema = z.string();

export interface Options {
  validateExpenseCode?: boolean;
}

export const processFile = async (
  file: File,
  costTypeList: CostType[],
  expenseStatusList: ExpenseStatus[],
  options?: Options
) => {
  // Results and errors
  let expenses: Expense[] = [];
  let errors: ExpenseError[] = [];
  let isError = false;

  // If file is null or undefined, return empty array
  if (!file) {
    return { expenses, errors, isError } as const;
  }

  // Convert list of cost type to map by name
  const costTypeMap = mapCostTypeListByLowercaseName(costTypeList);
  const expenseStatusCodeMap =
    mapExpenseStatusCodeByLowercaseName(expenseStatusList);

  // Convert to array buffer for xlsx to read
  const buffer = await file?.arrayBuffer();

  // Read to workbook
  const workbook = read(buffer, {
    type: "buffer",
    cellDates: true,
  });

  // Loop through each sheet
  for (let sheetName of workbook.SheetNames) {
    // Only import the sheet that have name "Expense"
    if (sheetName === "Expense") {
      // Get sheet
      const sheet = workbook.Sheets[sheetName];

      // Get rows
      const rows: (Date | string | number | undefined)[][] =
        utils.sheet_to_json(sheet, {
          header: 1,
          blankrows: false,
          dateNF: datePattern, // This dateNF definitely not parse date from string from XLSX file as expected, it was due to by default Excel always use the standard MM/dd/yyyy
        });

      // Loop through each row to read expenses
      for (let index = 0; index < rows.length; index++) {
        // Get row
        const row = rows[index];

        // Any row that have index >= 3 will be mapped to expense
        if (index + 1 >= BeginLine) {
          // Get data from cell
          // const rawDate = row[ColumnNameIndexMappingConfig.date];
          const expenseCode = row[ColumnNameIndexMappingConfig.expenseCode];
          const rawExpenseName = row[ColumnNameIndexMappingConfig.expenseName];
          const rawCostType = row[ColumnNameIndexMappingConfig.costType];
          const rawUnitPrice = row[ColumnNameIndexMappingConfig.unitPrice];
          const rawAmount = row[ColumnNameIndexMappingConfig.amount];
          const rawProjectName = row[ColumnNameIndexMappingConfig.projectName];
          const rawSupplierName =
            row[ColumnNameIndexMappingConfig.supplierName];
          const rawPic = row[ColumnNameIndexMappingConfig.pic];
          const note = row[ColumnNameIndexMappingConfig.note];
          const rawStatusCode = row[ColumnNameIndexMappingConfig.status];

          // Validation
          let isLineError = false;
          const expenseError: ExpenseError = {
            // date: { value: "" },
            costType: { value: "" },
            name: { value: "" },
            unitPrice: { value: "" },
            amount: { value: "" },
            projectName: { value: "" },
            supplierName: { value: "" },
            pic: { value: "" },
            notes:
              note instanceof Date ? format(note, datePattern) : note || "",
            status: { value: "" },
          };

          // -- Date
          // let date: Date = new Date();
          // let dateErrorMessage: string | null | undefined = "";

          // if (typeof rawDate === "string") {
          //   // This means the xlsx library does not parse successfully, by default Excel always use the standard MM/dd/yyyy (eg: 23/12/2002)
          //   try {
          //     date = parse(rawDate, datePattern, new Date());
          //   } catch {
          //     isLineError = true;
          //     expenseError.date.value = rawDate;
          //     expenseError.date.errorMessage = dateErrorMessage;
          //   }
          // } else if (rawDate instanceof Date) {
          //   // This means the xlsx library parse successfully but wrong format (eg: from 05/12/2022 to 12/05/2022)
          //   const dateStr = format(date, datePattern);
          //   try {
          //     date = parse(dateStr, datePattern, new Date());
          //   } catch {
          //     isLineError = true;
          //     expenseError.date.value = dateStr;
          //     expenseError.date.errorMessage = dateErrorMessage;
          //   }
          // } else {
          //   isLineError = true;
          //   expenseError.date.value = rawDate;
          //   expenseError.date.errorMessage = dateErrorMessage;
          // }

          // -- Expense name
          let expenseName = "";
          const expenseNameErrorMessage = getZodMessasges(
            () => (expenseName = ExpenseNameSchema.parse(rawExpenseName))
          );

          if (expenseNameErrorMessage) {
            isLineError = true;
            expenseError.name.errorMessage = expenseNameErrorMessage;
          }

          // -- Cost type
          let costTypeName = "";
          const costTypeErrorMessage = getZodMessasges(
            () => (costTypeName = CostTypeSchema.parse(rawCostType))
          );

          if (costTypeErrorMessage) {
            isLineError = true;
            expenseError.costType.errorMessage = costTypeErrorMessage;
          }

          let costType: CostType | null | undefined = undefined;
          if (costTypeName) {
            if (costTypeMap[costTypeName.toLowerCase()]) {
              costType = costTypeMap[costTypeName.toLowerCase()];
            } else {
              isLineError = true;
              expenseError.costType.errorMessage = "Invalid cost type";
            }
          }

          // -- Unit price
          let unitPrice = 0;
          const unitPriceErrorMessage = getZodMessasges(
            () => (unitPrice = UnitPriceSchema.parse(rawUnitPrice))
          );

          if (unitPriceErrorMessage) {
            isLineError = true;
            expenseError.unitPrice.errorMessage = unitPriceErrorMessage;
          }

          // -- Amount
          let amount = 0;
          const amountErrorMessage = getZodMessasges(
            () => (amount = AmountSchema.parse(rawAmount))
          );

          if (amountErrorMessage) {
            isLineError = true;
            expenseError.amount.errorMessage = amountErrorMessage;
          }

          // -- Project name
          let projectName = "";
          const projectNameErrorMessage = getZodMessasges(
            () => (projectName = ProjectNameSchema.parse(rawProjectName))
          );

          if (projectNameErrorMessage) {
            isLineError = true;

            expenseError.projectName.errorMessage = projectNameErrorMessage;
          }

          // -- Supplier name
          let supplierName = "";
          const supplierNameErrorMessage = getZodMessasges(
            () => (supplierName = SupplierNameSchema.parse(rawSupplierName))
          );

          if (supplierNameErrorMessage) {
            isLineError = true;

            expenseError.supplierName.errorMessage = supplierNameErrorMessage;
          }

          // -- Pic
          let pic = "";
          const picErrorMessage = getZodMessasges(
            () => (pic = PicSchema.parse(rawPic))
          );

          if (picErrorMessage) {
            isLineError = true;

            expenseError.pic.errorMessage = picErrorMessage;
          }

          // -- Status
          let status: ExpenseStatus | null | undefined = undefined;
          if (options && options.validateExpenseCode) {
            let statusCode = "";
            const statusCodeErrorMessage = getZodMessasges(
              () => (statusCode = StatusCodeSchema.parse(rawStatusCode))
            );

            if (statusCodeErrorMessage) {
              isLineError = true;
              expenseError.status.errorMessage = statusCodeErrorMessage;
            }

            if (statusCode) {
              if (expenseStatusCodeMap[statusCode.toLowerCase()]) {
                status = expenseStatusCodeMap[statusCode.toLowerCase()];
              } else {
                isLineError = true;
                expenseError.status.errorMessage = "Invalid status code";
              }
            }
          }

          // Add to result
          if (isLineError) {
            isError = isLineError;

            // Fill in error's value
            expenseError.name.value =
              rawExpenseName instanceof Date
                ? format(rawExpenseName, datePattern)
                : rawExpenseName;

            expenseError.costType.value =
              rawCostType instanceof Date
                ? format(rawCostType, datePattern)
                : rawCostType;

            expenseError.unitPrice.value =
              rawUnitPrice instanceof Date
                ? format(rawUnitPrice, datePattern)
                : rawUnitPrice;

            expenseError.amount.value =
              rawAmount instanceof Date
                ? format(rawAmount, datePattern)
                : rawAmount;

            expenseError.projectName.value =
              rawProjectName instanceof Date
                ? format(rawProjectName, datePattern)
                : rawProjectName;

            expenseError.supplierName.value =
              rawSupplierName instanceof Date
                ? format(rawSupplierName, datePattern)
                : rawSupplierName;

            expenseError.pic.value =
              rawPic instanceof Date ? format(rawPic, datePattern) : rawPic;

            if (options && options.validateExpenseCode) {
              expenseError.status.value =
                rawStatusCode instanceof Date
                  ? format(rawStatusCode, datePattern)
                  : rawStatusCode;
            }

            errors.push(expenseError);
          } else {
            if (costType) {
              expenses.push({
                code: typeof expenseCode === "string" ? expenseCode : "",
                name: expenseName,
                costType,
                // date,
                unitPrice,
                amount,
                projectName,
                supplierName,
                pic,
                notes: note ? note.toString() : "",
                status,
              });
            }
          }
        }
      }
    }
  }

  return { expenses, errors, isError } as const;
};

const mapCostTypeListByLowercaseName = (
  costTypeList: CostType[]
): Record<string, CostType> => {
  const costTypeMap: Record<string, CostType> = {};

  for (const costType of costTypeList) {
    costTypeMap[costType.name.toLowerCase()] = costType;
  }

  return costTypeMap;
};

const mapExpenseStatusCodeByLowercaseName = (
  expenseStatusList: ExpenseStatus[]
): Record<string, ExpenseStatus> => {
  const expenseStatusCodeMap: Record<string, ExpenseStatus> = {};

  for (const status of expenseStatusList) {
    expenseStatusCodeMap[status.code.toLowerCase()] = status;
  }

  return expenseStatusCodeMap;
};
