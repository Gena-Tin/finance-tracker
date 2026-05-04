import React, { useState, useMemo } from "react";

import styles from "./Analytics.module.css";

import {
  PieChart,
  Pie,
  ResponsiveContainer,
  Tooltip,
  Legend,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { useLanguage } from "../../hooks/useLanguage";
import { IconGraphLines, IconGraphPie } from "../ui/SvgLib";

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

const Analytics = ({ categoryStats, totalStats, filteredByCategory }) => {
  const [viewType, setViewType] = useState("pie"); // 'pie' или 'line'
  const { translator } = useLanguage();

  // 1. Подготовка данных для круговой диаграммы
  const coloredCategoryStats = useMemo(() => {
    return categoryStats.map((entry, index) => ({
      ...entry,
      fill:
        entry.type === "income"
          ? "var(--incomeColor)"
          : COLORS[index % COLORS.length],
    }));
  }, [categoryStats]);

  // 2. Подготовка данных для линейного графика (группировка по датам)
  const timelineData = useMemo(() => {
    if (!filteredByCategory || filteredByCategory.length === 0) return [];

    const groups = filteredByCategory.reduce((acc, item) => {
      // 1. Берем дату из 'created_at' и оставляем только часть YYYY-MM-DD
      const fullDate = item.created_at || "";
      const date = fullDate.split(" ")[0]; // Отрезаем время, остается "2026-04-06"

      if (!date) return acc; // Пропускаем, если даты вдруг нет

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
    }, {});

    // 2. Сортируем и возвращаем
    return Object.values(groups).sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );
  }, [filteredByCategory]);

  return (
    <div className={styles.container}>
      <div className={styles.btnWrapper}>
        <button
          type="button"
          onClick={() => setViewType("pie")}
          className={`${styles.graphBtn} ${
            viewType !== "pie" ? styles.graphBtnActive : ""
          }`}
        >
          <IconGraphPie className="icon-svg" />
          &nbsp;{translator.contents}
        </button>
        <button
          type="button"
          onClick={() => setViewType("line")}
          className={`${styles.graphBtn} ${
            viewType !== "line" ? styles.graphBtnActive : ""
          }`}
        >
          <IconGraphLines className="icon-svg" />
          &nbsp;{translator.dynamics}
        </button>
      </div>

      <div className={styles.graphWrapper}>
        <ResponsiveContainer width="100%" height="380">
          {viewType === "pie" ? (
            <PieChart>
              <Pie
                data={totalStats}
                dataKey="value"
                cx="50%"
                cy="50%"
                outerRadius={60}
              />
              <Pie
                data={coloredCategoryStats}
                dataKey="value"
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={100}
                label={(entry) => entry.name}
                minAngle={5}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--bg)",
                  borderColor: "var(--border)",
                  color: "var(--text)",
                }}
              />
              <Legend verticalAlign="top" align="center" />
            </PieChart>
          ) : (
            <LineChart
              data={timelineData}
              margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="var(--border)"
              />
              <XAxis
                dataKey="date"
                stroke="var(--text)"
                fontSize={12}
                tickFormatter={(str) =>
                  new Date(str).toLocaleDateString(undefined, {
                    day: "numeric",
                    month: "short",
                  })
                }
              />
              <YAxis stroke="var(--text)" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--bg)",
                  borderColor: "var(--border)",
                  color: "var(--text)",
                }}
              />
              <Legend verticalAlign="top" align="center" />
              <Line
                name={translator.income}
                type="monotone"
                dataKey="income"
                stroke="var(--incomeColor)"
                strokeWidth={3}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Line
                name={translator.expense}
                type="monotone"
                dataKey="expense"
                stroke="var(--expenseColor)"
                strokeWidth={3}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Analytics;
