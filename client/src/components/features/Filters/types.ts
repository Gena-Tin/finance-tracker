import { Category } from "@/types";

export interface FiltersProps {
  categories: Category[];
  filterCatIds: number[];
  toggleFilterCategory: (id: number) => void;
  setFilterCatIds: (id: number[]) => void;

  startDate: Date | null;
  endDate: Date | null;
  setStartDate: (date: Date | null) => void;
  setEndDate: (date: Date | null) => void;
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
  value: Date | null;

  onChange: (date: Date | null) => void; // <-- Функция должна принимать Date | null, а не string!
  // onChange: (value: string) => void;
  placeholder: string;
  hasValueReference?: any; // для проверки startDate ? "date" : "text"
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
