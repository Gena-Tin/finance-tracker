import {
  StatEntry,
  ColoredStatEntry,
  TransactionItem,
  TimelineGroup,
} from "../types";

const COLORS = [
  "#580063",
  "#8884d8",
  "#c30000",
  "#ff8042",
  "#ffc658",
  "#26d440",
  "#0088FE",
  "#171bff",
];

// 1. Маппинг цветов для категорий
export const getColoredCategoryStats = (
  categoryStats: StatEntry[]
): ColoredStatEntry[] => {
  return categoryStats.map((entry, index) => ({
    ...entry,
    fill:
      entry.type === "income"
        ? "var(--incomeColor)"
        : COLORS[index % COLORS.length],
  }));
};

// 2. Группировка транзакций по дням для графика
export const prepareTimelineData = (
  filteredByCategory: TransactionItem[]
): TimelineGroup[] => {
  if (!filteredByCategory || filteredByCategory.length === 0) return [];

  const groups = filteredByCategory.reduce<Record<string, TimelineGroup>>(
    (acc, item) => {
      const fullDate = item.created_at || "";
      const date = fullDate.split(" ")[0]; // Отрезаем время, оставляем YYYY-MM-DD

      if (!date) return acc;

      if (!acc[date]) {
        acc[date] = { date, income: 0, expense: 0 };
      }

      const amount = parseFloat(String(item.amount).replace(",", "."));

      if (item.type === "income") {
        acc[date].income += amount;
      } else {
        acc[date].expense += amount;
      }
      return acc;
    },
    {}
  );

  return Object.values(groups).sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );
};
