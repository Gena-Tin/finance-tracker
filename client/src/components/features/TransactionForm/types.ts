import { Category, Project, TransactionType } from "@/types";

export interface TransactionFormProps {
  editingId?: number | null; //id может отсутствовать, когда мы просто добавляем запись
  date: string;
  setDate: (date: string) => void;
  amount: string;
  setAmount: (amount: string) => void;
  description: string;
  setDescription: (description: string) => void;
  catId: string;
  setCatId: (cat: string) => void;
  categories: Category[];
  type: TransactionType;
  setType: (type: TransactionType) => void;
  projId: number;
  setProjId: (proj: number) => void;
  projects: Project[];
  handleSubmit: (e: React.SyntheticEvent<HTMLFormElement, SubmitEvent>) => void;
  isSubmitting?: boolean;
  cancelEdit: () => void;
}
