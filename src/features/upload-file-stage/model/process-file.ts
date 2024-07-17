import { read, utils } from "xlsx";
import { z } from "zod";
import { getZodMessasges } from "../../../shared/utils/get-zod-messages";
import { Expense } from "../type";
import { format, parse } from "date-fns";

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
const DateSchema = z.date();
const ExpenseNameSchema = z.string();
const CostTypeSchema = z.string();
const UnitPriceSchema = z.number().gt(0);
const AmountSchema = z.number().gt(0);
const ProjectNameSchema = z.string();
const SupplierNameSchema = z.string();
const PicSchema = z.string();

export const processFile = async (file: File) => {
  // Results and errors
  let expenses: Expense[] = [];
  let errors: string[][] = [];
  let isError = false;

  // If file is null or undefined, return empty array
  if (!file) {
    return { expenses, errors, isError } as const;
  }

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
          dateNF: datePattern, // This dateNF definitely not parse date from string from XLSX file as expected
        });

      // Loop through each row to read expenses
      for (let index = 0; index < rows.length; index++) {
        // Get row
        const row = rows[index];

        console.log(row);

        // Calculate row index
        const rowIndex = index + 1 - BeginLine;

        // Any row that have index >= 3 will be mapped to expense
        if (index + 1 >= BeginLine) {
          // Get data from cell
          const rawDate = row[ColumnNameIndexMappingConfig.date];
          const rawExpenseName = row[ColumnNameIndexMappingConfig.expenseName];
          const rawCostType = row[ColumnNameIndexMappingConfig.costType];
          const rawUnitPrice = row[ColumnNameIndexMappingConfig.unitPrice];
          const rawAmount = row[ColumnNameIndexMappingConfig.amount];
          const rawProjectName = row[ColumnNameIndexMappingConfig.projectName];
          const rawSupplierName =
            row[ColumnNameIndexMappingConfig.supplierName];
          const rawPic = row[ColumnNameIndexMappingConfig.pic];
          const note = row[ColumnNameIndexMappingConfig.note];

          // Validation
          errors[rowIndex] = [];

          // -- Date
          let date: Date = new Date();
          let dateErrorMessage: string | null | undefined = "";

          if (typeof rawDate === "string") {
            // This means the xlsx library does not parse successfully (eg: 23/12/2002)
            try {
              date = parse(rawDate, datePattern, new Date());
            } catch {
              dateErrorMessage = "Invalid date";
            }
          } else if (rawDate instanceof Date) {
            // This means the xlsx library parse successfully but wrong format (eg: from 05/12/2022 to 12/05/2022)
            const dateStr = format(date, datePattern);
            try {
              date = parse(dateStr, datePattern, new Date());
            } catch {
              dateErrorMessage = "Invalid date";
            }
          } else {
            dateErrorMessage = "Invalid date";
          }

          if (dateErrorMessage) {
            isError = true;
            errors[rowIndex][ColumnNameIndexMappingConfig.date] =
              dateErrorMessage;
          }

          // -- Expense name
          let expenseName = "";
          const expenseNameErrorMessage = getZodMessasges(
            () => (expenseName = ExpenseNameSchema.parse(rawExpenseName))
          );

          if (expenseNameErrorMessage) {
            isError = true;
            errors[rowIndex][ColumnNameIndexMappingConfig.expenseName] =
              expenseNameErrorMessage;
          }

          // -- Cost type
          let costType = "";
          const costTypeErrorMessage = getZodMessasges(
            () => (costType = CostTypeSchema.parse(rawCostType))
          );

          if (costTypeErrorMessage) {
            isError = true;
            errors[rowIndex][ColumnNameIndexMappingConfig.costType] =
              costTypeErrorMessage;
          }

          // -- Unit price
          let unitPrice = 0;
          const unitPriceErrorMessage = getZodMessasges(
            () => (unitPrice = UnitPriceSchema.parse(rawUnitPrice))
          );

          if (unitPriceErrorMessage) {
            isError = true;
            errors[rowIndex][ColumnNameIndexMappingConfig.unitPrice] =
              unitPriceErrorMessage;
          }

          // -- Amount
          let amount = 0;
          const amountErrorMessage = getZodMessasges(
            () => (amount = AmountSchema.parse(rawAmount))
          );

          if (amountErrorMessage) {
            isError = true;
            errors[rowIndex][ColumnNameIndexMappingConfig.amount] =
              amountErrorMessage;
          }

          // -- Project name
          let projectName = "";
          const projectNameErrorMessage = getZodMessasges(
            () => (projectName = ProjectNameSchema.parse(rawProjectName))
          );

          if (projectNameErrorMessage) {
            isError = true;
            errors[rowIndex][ColumnNameIndexMappingConfig.projectName] =
              projectNameErrorMessage;
          }

          // -- Supplier name
          let supplierName = "";
          const supplierNameErrorMessage = getZodMessasges(
            () => (supplierName = SupplierNameSchema.parse(rawSupplierName))
          );

          if (supplierNameErrorMessage) {
            isError = true;
            errors[rowIndex][ColumnNameIndexMappingConfig.supplierName] =
              supplierNameErrorMessage;
          }

          // -- Pic
          let pic = "";
          const picErrorMessage = getZodMessasges(
            () => (pic = PicSchema.parse(rawPic))
          );

          if (picErrorMessage) {
            isError = true;
            errors[rowIndex][ColumnNameIndexMappingConfig.pic] =
              picErrorMessage;
          }

          // Add to result
          if (
            errors[rowIndex] === undefined ||
            errors[rowIndex] === null ||
            errors[rowIndex].length === 0
          ) {
            expenses.push({
              name: expenseName,
              date,
              unitPrice,
              amount,
              projectName,
              supplierName,
              pic,
              notes: note ? note.toString() : "",
            });
          }
        }
      }
    }
  }

  return { expenses, errors, isError } as const;
};
