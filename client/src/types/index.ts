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

export type LangCode =
  | "ua"
  | "en"
  | "ro"
  | "pl"
  | "de"
  | "es"
  | "fr"
  | "it"
  | "ru";

export interface LanguagePackage {
  info: { flag: string; name: string };
  data: TranslationData;
}
export interface LanguageContextType {
  lang: LangCode;
  switchLanguage: (lang: LangCode) => void;
  translator: TranslationData;
}

export interface TranslationData {
  title: string;
  openMenu: string;
  addOperation: string;
  editOperation: string;
  analytics: string;
  contents: string;
  dynamics: string;
  filters: string;
  balance: string;
  expense: string;
  income: string;
  total: string;
  lastOperations: string;
  chooseLanguage: string;
  sum: string;
  settingProjects: string;
  description: string;
  date: string;
  category: string;
  settingCategories: string;
  periodFrom: string;
  periodTo: string;
  plhSearchByDescription: string;
  edit: string;
  project: string;
  delete: string;
  add: string;
  save: string;
  cancel: string;
  deleteSelected: string;
  moveTo: string;
  moveSelected: string;
  confMoving: string;
  errMoving: string;
  confDeletind: string;
  errDeleting: string;
  plhName: string;
  reset: string;
  resetAll: string;
  backendWakingUp: string;
  placeholderDate: string;
}
