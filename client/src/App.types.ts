import { TransactionType } from "@/types";

// Описываем интерфейс для локального стейта фильтров
export interface FilterState {
  filterCatIds: number[];
  startDate: Date | null;
  endDate: Date | null;
  searchQuery: string;
  filterType: TransactionType | "";
  projId: number;
}

// Тип для состояния модалки
export interface ConfirmState {
  isOpen: boolean;
  title: string;
  onConfirm: () => void;
}
