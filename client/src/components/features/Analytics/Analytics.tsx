import styles from "./Analytics.module.css";
import { useState, useMemo } from "react";
import { ResponsiveContainer } from "recharts";
import { useLanguage } from "../../../hooks/useLanguage";
import { IconGraphLines, IconGraphPie } from "../../ui/SvgLib";

// Импорт типов, утилит и подкомпонентов
import {
  getColoredCategoryStats,
  prepareTimelineData,
} from "./helpers/analyticsHelpers";
import { CategoryPieChart } from "./components/CategoryPieChart";
import { TimelineLineChart } from "./components/TimelineLineChart";

import { AnalyticsProps } from "./types";

export const Analytics: React.FC<AnalyticsProps> = ({
  categoryStats,
  totalStats,
  filteredByCategory,
}) => {
  const [viewType, setViewType] = useState<"pie" | "line">("pie");
  const { translator } = useLanguage();

  // 1. Подготовка данных для круговой диаграммы (мемоизировано)
  const coloredCategoryStats = useMemo(
    () => getColoredCategoryStats(categoryStats),
    [categoryStats]
  );

  // 2. Подготовка данных для линейного графика (мемоизировано)
  const timelineData = useMemo(
    () => prepareTimelineData(filteredByCategory),
    [filteredByCategory]
  );

  return (
    <div className={styles.container}>
      {/* Переключатель графиков */}
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

      {/* Контейнер отрисовки выбранного графика */}
      <div className={styles.graphWrapper}>
        <ResponsiveContainer width="100%" height={380}>
          {viewType === "pie" ? (
            <CategoryPieChart
              totalStats={totalStats}
              coloredCategoryStats={coloredCategoryStats}
            />
          ) : (
            <TimelineLineChart
              data={timelineData}
              incomeLabel={translator.income}
              expenseLabel={translator.expense}
            />
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
};
