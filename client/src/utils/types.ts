import { Transaction, TransactionType } from "@/types";

export interface Filters {
  projId: number;
  filterCatIds: number[];
  startDate: string;
  endDate: string;
  searchQuery: string;
  filterType: TransactionType | "";
}

export interface Translator {
  income?: string;
  expense?: string;
}

export interface ProcessedData {
  filteredData: Transaction[];
  totalIncome: number;
  totalExpense: number;
  balance: number;
  categoryStats: { name: string; value: number; type: TransactionType }[];
  totalStats: {
    name: string;
    value: number;
    type: TransactionType;
    fill: string;
  }[];
}
