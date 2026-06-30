import styles from "./Filters.module.css";
import { CategoryFilter } from "./CategoryFilter";
import { DateInput } from "./DateInput";
import { SearchInput } from "./SearchInput";
import { TypeFilter } from "./TypeFilter";
import { ResetButton } from "./ResetButton";

import { useLanguage } from "../../../hooks/useLanguage";

import { FiltersProps } from "./types";

export const Filters: React.FC<FiltersProps> = ({
  categories,
  clearDates,
  filterCatIds,
  toggleFilterCategory,
  setFilterCatIds,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  searchQuery,
  setSearchQuery,
  filterType,
  setFilterType,
  setIsCategoryManagerOpen,
}) => {
  const { translator } = useLanguage();
  return (
    <div className={styles.filtersContainer}>
      {/* 1. Категории */}
      <section className={styles.categorySection}>
        <CategoryFilter
          categories={categories}
          filterCatIds={filterCatIds}
          toggleFilterCategory={toggleFilterCategory}
          setIsCategoryManagerOpen={setIsCategoryManagerOpen}
          settingCategoriesLabel={translator.settingCategories}
        />
        {filterCatIds.length > 0 && (
          <ResetButton
            onClick={() => setFilterCatIds([])}
            label={translator.reset}
          />
        )}
      </section>

      {/* 2. Даты */}
      <section className={styles.dateSection}>
        <DateInput
          label={translator.periodFrom}
          value={startDate}
          onChange={setStartDate}
          placeholder={translator.placeholderDate}
          hasValueReference={startDate}
        />
        <DateInput
          label={translator.periodTo}
          value={endDate}
          onChange={setEndDate}
          placeholder={translator.placeholderDate}
          hasValueReference={endDate}
        />
        {(startDate || endDate) && (
          <ResetButton onClick={clearDates} label={translator.reset} />
        )}
      </section>

      {/* 3. Поиск */}
      <section className={styles.searchSection}>
        <SearchInput
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder={translator.plhSearchByDescription}
        />

        {searchQuery && (
          <ResetButton
            onClick={() => setSearchQuery("")}
            label={translator.reset}
          />
        )}
      </section>

      {/* 4. Тип (Доход/Расход) */}
      <section className={styles.typeSection}>
        <TypeFilter
          value={filterType}
          onChange={setFilterType}
          incomeLabel={translator.income}
          expenseLabel={translator.expense}
          resetLabel={translator.reset}
        />
        {filterType && (
          <ResetButton
            onClick={() => setFilterType("")}
            label={translator.reset}
          />
        )}
      </section>
    </div>
  );
};
