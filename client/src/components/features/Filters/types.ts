import { Category } from "@/types";

export interface FiltersProps {
  categories: Category[];
  filterCatIds: number[];
  toggleFilterCategory: (id: number) => void;
  setFilterCatIds: (id: number[]) => void;

  startDate: string;
  endDate: string;
  setStartDate: (date: string) => void;
  setEndDate: (date: string) => void;
  clearDates: () => void;

  searchQuery: string;
  setSearchQuery: (query: string) => void;

  filterType: "income" | "expense" | "";
  setFilterType: (type: "income" | "expense" | "") => void;
  setIsCategoryManagerOpen: (open: boolean) => void;
}

export interface CategoryFilterProps {
  categories: Category[];
  filterCatIds: number[];
  toggleFilterCategory: (id: number) => void;
  setIsCategoryManagerOpen: (open: boolean) => void;
  settingCategoriesLabel: string;
}

export interface DateInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  hasValueReference?: string; // для проверки startDate ? "date" : "text"
}

export interface ResetButtonProps {
  onClick: () => void;
  label: string;
}

export interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}

export interface TypeFilterProps {
  value: "income" | "expense" | "";
  onChange: (type: "income" | "expense" | "") => void;
  incomeLabel: string;
  expenseLabel: string;
  resetLabel: string;
}
