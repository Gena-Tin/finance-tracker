import { TransactionType } from "@/types";

export interface StatEntry {
  name: string;
  value: number;
  type: TransactionType;
  [key: string]: any;
}

export interface ColoredStatEntry extends StatEntry {
  fill: string;
}

export interface TransactionItem {
  id: number | string;
  amount: number | string;
  type: TransactionType;
  created_at?: string;
  category?: string;
  [key: string]: any;
}

export interface TimelineGroup {
  date: string;
  income: number;
  expense: number;
}

export interface AnalyticsProps {
  categoryStats: StatEntry[];
  totalStats: StatEntry[];
  filteredByCategory: TransactionItem[];
}

export interface CategoryPieChartProps {
  totalStats: StatEntry[];
  coloredCategoryStats: ColoredStatEntry[];
}

export interface TimelineLineChartProps {
  data: TimelineGroup[];
  incomeLabel: string;
  expenseLabel: string;
}
