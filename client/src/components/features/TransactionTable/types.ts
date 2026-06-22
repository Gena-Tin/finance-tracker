import { Project, Transaction } from "@/types";

export interface TransactionTableProps {
  transactions: Transaction[];
  filteredByCategory: Transaction[];
  projects: Project[];
  selectedIds: number[];
  editingId?: number | null;
  onToggleSelect: (id: number) => void;
  onToggleAll: (checked: boolean) => void;
  onDelete: () => void;
  onEdit: (transaction: Transaction) => void;
  onMove: (targetProjectId: number) => void | Promise<void>;
}

export interface TransactionRowProps {
  transaction: Transaction;
  isSelected: boolean;
  isEditingAny: boolean;
  onToggleSelect: (id: number) => void;
  onEdit: (transaction: Transaction) => void;
}

export interface TransactionTableHeaderProps {
  selectedCount: number;
  projects: Project[];
  onDelete: () => void;
  onMove: (targetProjectId: number) => void | Promise<void>;
}
