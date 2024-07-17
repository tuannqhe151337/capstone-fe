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
