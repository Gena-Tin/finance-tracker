import React from "react";
import { PieChart, Pie, ResponsiveContainer, Tooltip, Legend } from "recharts";

const Analytics = ({ categoryStats, totalStats }) => {
  // Цвета для категорий:
  const COLORS = [
    "#8884d8",
    "#82ca9d",
    "#ffc658",
    "#ff8042",
    "#0088FE",
    "#00C49F",
  ];

  // Добавляем цвет в каждую категорию перед отрисовкой
  const coloredCategoryStats = categoryStats.map((entry, index) => ({
    ...entry,
    // Если доход — зеленый, если расход — берем из палитры
    fill: entry.type === "income" ? "#10b981" : COLORS[index % COLORS.length],
  }));

  return (
    <div style={{ width: "100%", height: 380, marginTop: "20px" }}>
      <ResponsiveContainer>
        <PieChart>
          {/* Внутреннее кольцо: Общие итоги */}
          <Pie
            data={totalStats}
            dataKey="value"
            cx="50%"
            cy="50%"
            outerRadius={60}
            // Recharts сам возьмет цвет из свойства 'fill' внутри объектов totalStats
          />
          {/* Внешнее кольцо: Категории */}
          <Pie
            data={coloredCategoryStats}
            dataKey="value"
            cx="50%"
            cy="50%"
            innerRadius={70}
            outerRadius={100}
            label={(entry) => entry.name}
            minAngle={5} // Чтобы маленькие сектора не пропадали
          />

          <Tooltip
            contentStyle={{
              backgroundColor: "var(--bg)",
              borderColor: "var(--border)",
              color: "var(--text)",
            }}
          />
          <Legend
            verticalAlign="top"
            height="fit-content"
            align="center"
            wrapperStyle={{ paddingTop: "2px" }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Analytics;
