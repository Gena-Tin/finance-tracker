import { useState } from "react";
import { motion, AnimatePresence, HTMLMotionProps } from "framer-motion";
import styles from "../../App.module.css";
import {
  IconEdit,
  IconAdd,
  IconChevronDown,
  IconAnalytics,
  IconFilters,
  IconBalance,
  IconClose,
} from "../ui/SvgLib";

import { TranslationData } from "../../types";

// Компоненты:
import TransactionForm from "../features/TransactionForm";
import Analytics from "../features/Analytics";
import Filters from "../features/Filters";
import BalanceBoard from "../features/BalanceBoard";

// 1. Описываем интерфейс пропсов для ToolsSection
interface ToolsSectionProps {
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

const ToolsSection: React.FC<ToolsSectionProps> = ({
  translator,
  formProps,
  analyticsProps,
  filtersProps,
  balanceProps,
  isFormOpen,
  setIsFormOpen,
}) => {
  const [isAnalyticsOpen, setIsAnalyticsOpen] = useState<boolean>(false);
  const [isFiltersOpen, setIsFiltersOpen] = useState<boolean>(false);
  const [isBalanceOpen, setIsBalanceOpen] = useState<boolean>(false);

  // --- ДИНАМИЧЕСКИЙ ПОДСЧЕТ АКТИВНЫХ ФИЛЬТРОВ ---
  // Считаем сколько фильтров сейчас задействовано !!переводим в були
  const activeFiltersCount = [
    filtersProps.filterCatIds.length > 0, // Выбрана хоть одна категория
    !!filtersProps.startDate || !!filtersProps.endDate, //Указана дата "с" или указана дата "по"
    !!filtersProps.searchQuery, // Есть ли текст в поиске
    !!filtersProps.filterType, // Выбран ли тип Доход/Расход
  ].filter(Boolean).length; // Оставляем только true и берем длину

  // --- ФУНКЦИЯ СБРОСА ВСЕХ ФИЛЬТРОВ ИЗ ЗАГОЛОВКА ---
  const handleResetAllFilters = (e: React.MouseEvent) => {
    e.stopPropagation(); // Чтобы аккордеон не закрывался при клике на крестик
    filtersProps.setFilterCatIds([]);
    filtersProps.clearDates();
    filtersProps.setSearchQuery("");
    filtersProps.setFilterType("");
  };

  // Типизируем объект анимации framer-motion
  const accordionAnimation: HTMLMotionProps<"div"> = {
    initial: { height: 0, opacity: 0, overflow: "hidden" },
    animate: { height: "auto", opacity: 1 },
    exit: { height: 0, opacity: 0 },
    transition: { duration: 0.3 },
  };

  return (
    <>
      {/* --- АККОРДЕОН: ФОРМА --- */}
      <div
        className={styles.accordionHeader}
        onClick={() => setIsFormOpen(!isFormOpen)}
      >
        <h2>
          {formProps.editingId ? (
            <>
              <IconEdit className="icon-svg" /> {translator.editOperation}
            </>
          ) : (
            <>
              <IconAdd className="icon-svg" /> {translator.addOperation}
            </>
          )}
        </h2>
        <span className={`${styles.icon} ${isFormOpen ? styles.iconOpen : ""}`}>
          <IconChevronDown className="icon-svg" />
        </span>
      </div>
      <AnimatePresence>
        {isFormOpen && (
          <motion.div {...accordionAnimation}>
            <TransactionForm {...formProps} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- АККОРДЕОН: АНАЛИТИКА --- */}
      <div
        className={styles.accordionHeader}
        onClick={() => setIsAnalyticsOpen(!isAnalyticsOpen)}
      >
        <h2>
          <IconAnalytics className="icon-svg" /> {translator.analytics}
        </h2>
        <span
          className={`${styles.icon} ${isAnalyticsOpen ? styles.iconOpen : ""}`}
        >
          <IconChevronDown className="icon-svg" />
        </span>
      </div>
      <AnimatePresence>
        {isAnalyticsOpen && (
          <motion.div
            {...accordionAnimation}
            style={{ background: "var(--accent-bg-alt)", borderRadius: 8 }}
          >
            <Analytics {...analyticsProps} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- АККОРДЕОН: ФИЛЬТРЫ --- */}
      <div
        className={styles.accordionHeader}
        onClick={() => setIsFiltersOpen(!isFiltersOpen)}
      >
        <h2>
          <IconFilters className="icon-svg" /> {translator.filters}
        </h2>
        {/* количество выбранных фильтров и кнопка сброса */}
        {activeFiltersCount > 0 && (
          <span className={styles.filterBadge}>
            {activeFiltersCount}
            <button
              type="button"
              className={styles.resetAllTopBtn}
              onClick={handleResetAllFilters}
              title={translator.resetAll}
            >
              <IconClose className="icon-svg" />
            </button>
          </span>
        )}
        {/* ------------------------------ */}

        <span
          className={`${styles.icon} ${isFiltersOpen ? styles.iconOpen : ""}`}
        >
          <IconChevronDown className="icon-svg" />
        </span>
      </div>
      <AnimatePresence>
        {isFiltersOpen && (
          <motion.div {...accordionAnimation}>
            <Filters {...filtersProps} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- АККОРДЕОН: БАЛАНС --- */}
      <div
        className={styles.accordionHeader}
        onClick={() => setIsBalanceOpen(!isBalanceOpen)}
      >
        <h2>
          <IconBalance className="icon-svg" /> {translator.balance}
        </h2>
        <span
          className={`${styles.icon} ${isBalanceOpen ? styles.iconOpen : ""}`}
        >
          <IconChevronDown className="icon-svg" />
        </span>
      </div>
      <AnimatePresence>
        {isBalanceOpen && (
          <motion.div {...accordionAnimation}>
            <BalanceBoard {...balanceProps} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ToolsSection;
