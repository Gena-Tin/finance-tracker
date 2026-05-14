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

export interface Project {
  id: number;
  name: string;
  icon?: string;
}
export interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  translator: {
    income: string;
    expense: string;

    [key: string]: string | undefined;
  };
}
