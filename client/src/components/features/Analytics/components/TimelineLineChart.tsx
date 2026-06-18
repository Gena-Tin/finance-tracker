import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { TimelineGroup } from "../types";

interface TimelineLineChartProps {
  data: TimelineGroup[];
  incomeLabel: string;
  expenseLabel: string;
}

export const TimelineLineChart: React.FC<TimelineLineChartProps> = ({
  data,
  incomeLabel,
  expenseLabel,
}) => {
  return (
    <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
      <CartesianGrid
        strokeDasharray="3 3"
        vertical={false}
        stroke="var(--border)"
      />
      <XAxis
        dataKey="date"
        stroke="var(--text)"
        fontSize={12}
        tickFormatter={(str: string) =>
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
        name={incomeLabel}
        type="monotone"
        dataKey="income"
        stroke="var(--incomeColor)"
        strokeWidth={3}
        dot={{ r: 4 }}
        activeDot={{ r: 6 }}
      />
      <Line
        name={expenseLabel}
        type="monotone"
        dataKey="expense"
        stroke="var(--expenseColor)"
        strokeWidth={3}
        dot={{ r: 4 }}
        activeDot={{ r: 6 }}
      />
    </LineChart>
  );
};
