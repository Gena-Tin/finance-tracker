export type TransactionType = "income" | "expense";

export interface Transaction {
  id: number;
  amount: number;
  description: string;
  type: TransactionType;
  category_id: number;
  category_name?: string;
  project_id: number;
  created_at: string;
}

export interface Category {
  id: number;
  name: string;
  icon?: string;
}
