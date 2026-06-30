import { useState } from "react";
import styles from "./ToolsSection.module.css";
import {
  IconEdit,
  IconAdd,
  IconAnalytics,
  IconFilters,
  IconBalance,
  IconClose,
} from "../../ui/SvgLib";

// Компоненты:
import { TransactionForm } from "../../features/TransactionForm/TransactionForm";
import { Analytics } from "../../features/Analytics/Analytics";
import { Filters } from "../../features/Filters/Filters";
import { BalanceBoard } from "../../features/BalanceBoard/BalanceBoard";

import { AccordionItem } from "./AccordionItem";

import { ToolsSectionProps } from "./types";

export const ToolsSection: React.FC<ToolsSectionProps> = ({
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

  return (
    <>
      {/* --- АККОРДЕОН: ФОРМА --- */}

      <AccordionItem
        isOpen={isFormOpen}
        onToggle={() => setIsFormOpen(!isFormOpen)}
        title={
          formProps.editingId ? (
            <>
              <IconEdit className="icon-svg" /> {translator.editOperation}
            </>
          ) : (
            <>
              <IconAdd className="icon-svg" /> {translator.addOperation}
            </>
          )
        }
      >
        <TransactionForm {...formProps} />
      </AccordionItem>

      {/* --- АККОРДЕОН: АНАЛИТИКА --- */}

      <AccordionItem
        isOpen={isAnalyticsOpen}
        onToggle={() => setIsAnalyticsOpen(!isAnalyticsOpen)}
        title={
          <>
            <IconAnalytics className="icon-svg" /> {translator.analytics}
          </>
        }
        customStyle={{ background: "var(--accent-bg-alt)", borderRadius: 8 }}
      >
        <Analytics {...analyticsProps} />
      </AccordionItem>

      {/* --- АККОРДЕОН: ФИЛЬТРЫ --- */}

      <AccordionItem
        isOpen={isFiltersOpen}
        onToggle={() => setIsFiltersOpen(!isFiltersOpen)}
        title={
          <>
            <IconFilters className="icon-svg" /> {translator.filters}
          </>
        }
        extraHeaderContent={
          activeFiltersCount > 0 && (
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
          )
        }
      >
        <Filters {...filtersProps} />
      </AccordionItem>

      {/* --- АККОРДЕОН: БАЛАНС --- */}

      <AccordionItem
        isOpen={isBalanceOpen}
        onToggle={() => setIsBalanceOpen(!isBalanceOpen)}
        title={
          <>
            <IconBalance className="icon-svg" /> {translator.balance}
          </>
        }
      >
        <BalanceBoard {...balanceProps} />
      </AccordionItem>
    </>
  );
};
