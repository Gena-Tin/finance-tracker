import { TransactionType } from "@/types";

// Описываем интерфейс для локального стейта фильтров
export interface FilterState {
  filterCatIds: number[];
  startDate: string;
  endDate: string;
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
