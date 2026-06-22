import { PieChart, Pie, Tooltip, Legend } from "recharts";

import { CategoryPieChartProps } from "../types";

export const CategoryPieChart: React.FC<CategoryPieChartProps> = ({
  totalStats,
  coloredCategoryStats,
}) => {
  return (
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
  );
};
