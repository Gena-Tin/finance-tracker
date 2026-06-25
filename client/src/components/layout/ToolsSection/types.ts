import { TranslationData } from "@/types";

// type, Импортируем ИНТЕРФЕЙСЫ ПРОПСОВ, а не сами компоненты!
import type TransactionForm from "@/components/features/TransactionForm/TransactionForm";
import type Analytics from "@/components/features/Analytics/Analytics";
import type Filters from "@/components/features/Filters/Filters";
import type BalanceBoard from "@/components/features/BalanceBoard/BalanceBoard";

export interface ToolsSectionProps {
  translator: TranslationData;

  isFormOpen: boolean;
  setIsFormOpen: (open: boolean) => void;

  // Для пропсов дочерних компонентов используем встроенный тип React.ComponentProps,
  // чтобы не дублировать их ручное описание.
  formProps: React.ComponentProps<typeof TransactionForm> & {
    editingId: number | null;
  };
  analyticsProps: React.ComponentProps<typeof Analytics>;
  filtersProps: React.ComponentProps<typeof Filters>;
  balanceProps: React.ComponentProps<typeof BalanceBoard>;
}

export interface AccordionItemProps {
  title: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
  extraHeaderContent?: React.ReactNode;
  customStyle?: React.CSSProperties;
}
