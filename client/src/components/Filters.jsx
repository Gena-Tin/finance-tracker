import React from "react";

import styles from "./Filters.module.css";
import Checkbox from "./Checkbox";
import { useLanguage } from "../hooks/useLanguage";
import {
  IconClose,
  IconMinus,
  IconOptions,
  IconPlus,
  IconSearch,
} from "./SvgLib";

const Filters = ({
  categories,
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
  const { trnslt } = useLanguage();
  return (
    <div className={styles.filtersContainer}>
      {/* 1. Категории */}
      <section>
        <div className={styles.categoryList}>
          <button
            type="button"
            className={styles.settingsButton}
            onClick={() => setIsCategoryManagerOpen(true)}
            aria-label={trnslt.settingCategories}
          >
            <IconOptions className={styles.iconSvg} />
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
                  onClick={() => toggleFilterCategory(cat.id)}
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
              <IconClose className={styles.iconSvg} />
              {trnslt.reset}
            </button>
          )}
        </div>
      </section>

      {/* 2. Даты */}
      <section className={styles.dateSection}>
        <div className={styles.dateGroup}>
          <span>{trnslt.periodFrom}</span>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className={styles.inputField}
          />
        </div>
        <div className={styles.dateGroup}>
          <span>{trnslt.periodTo}</span>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className={styles.inputField}
          />
        </div>
        {(startDate || endDate) && (
          <button
            type="button"
            onClick={() => {
              setStartDate("");
              setEndDate("");
            }}
            className={styles.resetBtn}
          >
            <IconClose className={styles.iconSvg} /> {trnslt.reset}
          </button>
        )}
      </section>

      {/* 3. Поиск */}
      <section className={styles.searchWrapper}>
        <span style={{ fontSize: "20px" }}>
          <IconSearch className={styles.iconSvg} />
        </span>
        <input
          type="text"
          placeholder={trnslt.plhSearchByDescription}
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
            <IconClose className={styles.iconSvg} /> {trnslt.reset}
          </button>
        )}
      </section>

      {/* 4. Тип (Доход/Расход) */}
      <section className={styles.typeSection}>
        {/* <span>Тип:</span> */}
        <button
          type="button"
          onClick={() => setFilterType("income")}
          className={`${styles.typeBtn} ${
            filterType === "income" ? styles.incomeBtnActive : ""
          }`}
        >
          <IconPlus className={styles.iconSvg} /> {trnslt.income}
        </button>
        <button
          onClick={() => setFilterType("expense")}
          className={`${styles.typeBtn} ${
            filterType === "expense" ? styles.expenseBtnActive : ""
          }`}
        >
          <IconMinus className={styles.iconSvg} /> {trnslt.expense}
        </button>
        {filterType && (
          <button
            type="button"
            onClick={() => setFilterType("")}
            className={styles.resetBtn}
          >
            <IconClose className={styles.iconSvg} /> {trnslt.reset}
          </button>
        )}
      </section>
    </div>
  );
};

export default Filters;
