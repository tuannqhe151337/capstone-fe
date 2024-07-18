import { CostType } from "../../providers/store/api/costTypeAPI";

export interface Expense {
  // date: Date;
  costType: CostType;
  name: string;
  unitPrice: number;
  amount: number;
  projectName: string;
  supplierName: string;
  pic: string;
  notes?: string;
}
