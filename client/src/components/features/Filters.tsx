import styles from "./Filters.module.css";
import Checkbox from "../ui/Checkbox";
import { useLanguage } from "../../hooks/useLanguage";
import {
  IconClose,
  IconMinus,
  IconOptions,
  IconPlus,
  IconSearch,
} from "../ui/SvgLib";
import { Category } from "@/types";

interface FiltersProps {
  categories: Category[];
  filterCatIds: number[];
  toggleFilterCategory: (ids: number) => void;
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
            onClick={() => setIsCategoryManagerOpen(true)}
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
                  // tabIndex="-1"
                  style={{ cursor: "pointer" }}
                />
                {cat.icon} {cat.name}
              </div>
            );
          })}
          {filterCatIds.length > 0 && (
            <button
              type="button"
              onClick={() => setFilterCatIds([])}
              className={styles.resetBtn}
            >
              <IconClose className="icon-svg" />
              {translator.reset}
            </button>
          )}
        </div>
      </section>

      {/* 2. Даты */}
      <section className={styles.dateSection}>
        <div className={styles.dateGroup}>
          <span>{translator.periodFrom} </span>
          <input
            type={startDate ? "date" : "text"}
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            onFocus={(e) => (e.target.type = "date")} //переключение типа date/text для перевода плейсхолдера
            onBlur={(e) => {
              if (!e.target.value) e.target.type = "text";
            }}
            placeholder={translator.placeholderDate}
            className={styles.inputField}
          />
        </div>
        <div className={styles.dateGroup}>
          <span>{translator.periodTo} </span>
          <input
            type={startDate ? "date" : "text"}
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            onFocus={(e) => (e.target.type = "date")} //переключение типа date/text для перевода плейсхолдера
            onBlur={(e) => {
              if (!e.target.value) e.target.type = "text";
            }}
            placeholder={translator.placeholderDate}
            className={styles.inputField}
          />
        </div>
        {(startDate || endDate) && (
          <button
            type="button"
            onClick={clearDates}
            className={styles.resetBtn}
          >
            <IconClose className="icon-svg" /> {translator.reset}
          </button>
        )}
      </section>

      {/* 3. Поиск */}
      <section className={styles.searchSection}>
        <span style={{ fontSize: "20px" }}>
          <IconSearch className="icon-svg" />
        </span>
        <input
          type="text"
          placeholder={translator.plhSearchByDescription}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={styles.searchInput}
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => setSearchQuery("")}
            className={styles.resetBtn}
          >
            <IconClose className="icon-svg" /> {translator.reset}
          </button>
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
          <button
            type="button"
            onClick={() => setFilterType("")}
            className={styles.resetBtn}
          >
            <IconClose className="icon-svg" /> {translator.reset}
          </button>
        )}
      </section>
    </div>
  );
};

export default Filters;
