import React from "react";

import styles from "./Filters.module.css";

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
  return (
    <div className={styles.filtersContainer}>
      {/* 1. Категории */}
      <section>
        <div className={styles.categoryList}>
          <button
            type="button"
            className={styles.settingsButton}
            onClick={() => setIsCategoryManagerOpen(true)}
          >
            ⚙️
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
                <input
                  type="checkbox"
                  checked={isSelected}
                  readOnly
                  style={{ cursor: "pointer" }}
                />
                {cat.icon} {cat.name}
              </div>
            );
          })}
          {filterCatIds.length > 0 && (
            <button
              onClick={() => setFilterCatIds([])}
              className={styles.resetBtn}
            >
              Сбросить
            </button>
          )}
        </div>
      </section>

      {/* 2. Даты */}
      <section className={styles.dateSection}>
        <div className={styles.dateGroup}>
          <span>Период с:</span>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className={styles.inputField}
          />
        </div>
        <div className={styles.dateGroup}>
          <span>по:</span>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className={styles.inputField}
          />
        </div>
        {(startDate || endDate) && (
          <button
            onClick={() => {
              setStartDate("");
              setEndDate("");
            }}
            className={styles.resetBtn}
          >
            ✖ Сбросить даты
          </button>
        )}
      </section>

      {/* 3. Поиск */}
      <section className={styles.searchWrapper}>
        <span style={{ fontSize: "20px" }}>🔍</span>
        <input
          type="text"
          placeholder="Поиск по описанию..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={styles.searchInput}
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className={styles.resetBtn}
          >
            ✖ Очистить
          </button>
        )}
      </section>

      {/* 4. Тип (Доход/Расход) */}
      <section className={styles.typeSection}>
        <span>Тип:</span>
        <button
          onClick={() => setFilterType("income")}
          className={`${styles.typeBtn} ${
            filterType === "income" ? styles.incomeBtnActive : ""
          }`}
        >
          ✅ Доходы
        </button>
        <button
          onClick={() => setFilterType("expense")}
          className={`${styles.typeBtn} ${
            filterType === "expense" ? styles.expenseBtnActive : ""
          }`}
        >
          ❌ Расходы
        </button>
        {filterType && (
          <button onClick={() => setFilterType("")} className={styles.resetBtn}>
            ✖ Сбросить тип
          </button>
        )}
      </section>
    </div>
  );
};

export default Filters;
