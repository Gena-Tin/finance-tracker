import React, { useState, useMemo } from "react";
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

const COLORS = [
  "#8884d8",
  "#82ca9d",
  "#ffc658",
  "#ff8042",
  "#0088FE",
  "#00C49F",
];

const Analytics = ({ categoryStats, totalStats, filteredByCategory }) => {
  const [viewType, setViewType] = useState("pie"); // 'pie' или 'line'

  // 1. Подготовка данных для круговой диаграммы
  const coloredCategoryStats = useMemo(() => {
    return categoryStats.map((entry, index) => ({
      ...entry,
      fill: entry.type === "income" ? "#10b981" : COLORS[index % COLORS.length],
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

  console.log("Данные для графика:", timelineData);
  return (
    <div style={{ marginTop: "20px" }}>
      {/* Переключатель графиков */}
      <div
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "15px",
          justifyContent: "center",
        }}
      >
        <button
          type="button"
          onClick={() => setViewType("pie")}
          style={{
            padding: "6px 16px",
            borderRadius: "20px",
            border: "1px solid var(--border)",
            background: viewType === "pie" ? "var(--accent-bg)" : "transparent",
            color: viewType === "pie" ? "var(--accent)" : "var(--text)",
            cursor: "pointer",
            fontWeight: 500,
          }}
        >
          🥧 Состав
        </button>
        <button
          type="button"
          onClick={() => setViewType("line")}
          style={{
            padding: "6px 16px",
            borderRadius: "20px",
            border: "1px solid var(--border)",
            background:
              viewType === "line" ? "var(--accent-bg)" : "transparent",
            color: viewType === "line" ? "var(--accent)" : "var(--text)",
            cursor: "pointer",
            fontWeight: 500,
          }}
        >
          📈 Динамика
        </button>
      </div>

      <div style={{ width: "100%", height: 380, minWidth: 0 }}>
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
                name="Доход"
                type="monotone"
                dataKey="income"
                stroke="#10b981"
                strokeWidth={3}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Line
                name="Расход"
                type="monotone"
                dataKey="expense"
                stroke="#aa3bff"
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
