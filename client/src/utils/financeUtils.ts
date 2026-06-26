import { Transaction, TransactionType } from "../types";
import { Filters, ProcessedData, Translator } from "./types";

export const getProcessedData = (
  transactions: Transaction[],
  filters: Filters,
  selectedIds: number[],
  translator: Translator | null // Переводчик может быть null, если грузится
): ProcessedData => {
  let filtered = [...transactions];

  // Фильтрация
  if (filters.projId !== 1) {
    filtered = filtered.filter((t) => Number(t.project_id) === filters.projId);
  }

  if (filters.filterCatIds.length > 0) {
    filtered = filtered.filter((t) =>
      filters.filterCatIds.includes(Number(t.category_id))
    );
  }

  if (filters.startDate) {
    filtered = filtered.filter((t) => t.created_at >= filters.startDate);
  }

  if (filters.endDate) {
    filtered = filtered.filter(
      (t) => t.created_at <= filters.endDate + " 23:59:59"
    );
  }

  if (filters.searchQuery) {
    filtered = filtered.filter((t) =>
      t.description.toLowerCase().includes(filters.searchQuery.toLowerCase())
    );
  }

  if (filters.filterType) {
    filtered = filtered.filter((t) => t.type === filters.filterType);
  }

  // Расчеты
  const active = filtered.filter((t) => !selectedIds.includes(t.id));

  const totalIncome = active
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + parseFloat(t.amount.toString()), 0);

  const totalExpense = active
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + parseFloat(t.amount.toString()), 0);

  // Аналитика
  const categoryStats = filtered.reduce((acc, t) => {
    const catName = t.category_name || "Unknown";

    const existing = acc.find(
      (item) => item.name === catName && item.type === t.type
    );

    if (existing) {
      existing.value += parseFloat(t.amount.toString());
    } else {
      acc.push({
        name: catName,
        value: parseFloat(t.amount.toString()),
        type: t.type,
      });
    }
    return acc;
  }, [] as { name: string; value: number; type: TransactionType }[]);

  const totalStats = [
    {
      name: translator?.income || "Income",
      value: totalIncome,
      fill: "var(--incomeColor)",
      type: "income" as TransactionType,
    },
    {
      name: translator?.expense || "Expense",
      value: totalExpense,
      fill: "var(--expenseColor)",
      type: "expense" as TransactionType,
    },
  ].filter((item) => item.value > 0);

  return {
    filteredData: filtered,
    totalIncome,
    totalExpense,
    balance: totalIncome - totalExpense,
    categoryStats,
    totalStats,
  };
};
