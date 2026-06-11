import styles from "./Filters.module.css";
import Checkbox from "../../ui/Checkbox/Checkbox";
import ResetButton from "./ResetButton";
import DateInput from "./DateInput";
import SearchInput from "./SearchInput";

import { useLanguage } from "../../../hooks/useLanguage";
import { IconMinus, IconOptions, IconPlus, IconSearch } from "../../ui/SvgLib";
import { Category } from "@/types";

interface FiltersProps {
  categories: Category[];
  filterCatIds: number[];
  toggleFilterCategory: (id: number) => void;
  setFilterCatIds: (id: number[]) => void;

  startDate: string;
  endDate: string;
  setStartDate: (date: string) => void;
  setEndDate: (date: string) => void;
  clearDates: () => void;

  searchQuery: string;
  setSearchQuery: (query: string) => void;

  filterType: "income" | "expense" | "";
  setFilterType: (type: "income" | "expense" | "") => void;
  setIsCategoryManagerOpen: (open: boolean) => void;
}

const Filters: React.FC<FiltersProps> = ({
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
        <div className={styles.categoryList}>
          <button
            type="button"
            className={styles.settingsButton}
            onClick={() => {
              setIsCategoryManagerOpen(true);
            }}
            aria-label={translator.settingCategories}
          >
            <IconOptions className="icon-svg" />
          </button>

          {categories.map((cat) => {
            const isSelected = filterCatIds.includes(cat.id);

            return (
              <div
                key={cat.id}
                onClick={() => toggleFilterCategory(cat.id)}
                className={`${styles.categoryCard} ${
                  isSelected ? styles.categoryCardActive : ""
                }`}
              >
                <Checkbox
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => toggleFilterCategory(cat.id)}
                  readOnly
                  style={{ cursor: "pointer" }}
                />
                {cat.icon} {cat.name}
              </div>
            );
          })}
          {filterCatIds.length > 0 && (
            <ResetButton
              onClick={() => setFilterCatIds([])}
              label={translator.reset}
            />
          )}
        </div>
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
        <button
          type="button"
          onClick={() => setFilterType("income")}
          className={`${styles.typeBtn} ${
            filterType === "income" ? styles.incomeBtnActive : ""
          }`}
        >
          <IconPlus className="icon-svg" /> {translator.income}
        </button>
        <button
          onClick={() => setFilterType("expense")}
          className={`${styles.typeBtn} ${
            filterType === "expense" ? styles.expenseBtnActive : ""
          }`}
        >
          <IconMinus className="icon-svg" /> {translator.expense}
        </button>
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

export default Filters;
