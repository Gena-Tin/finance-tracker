import React from "react";

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
}) => {
  return (
    <div className="filters-container">
      {/* 1. Категории */}
      <section>
        <h2>Фильтры</h2>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          {categories.map((cat) => {
            const isSelected = filterCatIds.includes(cat.id);
            return (
              <div
                key={cat.id}
                onClick={() => toggleFilterCategory(cat.id)}
                style={{
                  border: isSelected ? "2px solid #007bff" : "1px solid #ddd",
                  padding: "10px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  background: isSelected ? "#e7f3ff" : "white",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  transition: "0.2s",
                }}
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
              style={{
                border: "none",
                background: "none",
                color: "#007bff",
                cursor: "pointer",
              }}
            >
              Сбросить
            </button>
          )}
        </div>
      </section>

      {/* 2. Даты */}
      <section
        style={{
          background: "#fff",
          padding: "15px",
          borderRadius: "10px",
          border: "1px solid #eee",
          marginTop: "20px",
          display: "flex",
          alignItems: "center",
          gap: "15px",
          flexWrap: "wrap",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span>Период с:</span>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            style={{
              padding: "5px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span>по:</span>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            style={{
              padding: "5px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
        </div>
        {(startDate || endDate) && (
          <button
            onClick={() => {
              setStartDate("");
              setEndDate("");
            }}
            style={{
              border: "none",
              background: "#f0f2f5",
              padding: "5px 10px",
              borderRadius: "5px",
              cursor: "pointer",
              color: "#007bff",
            }}
          >
            ✖ Сбросить даты
          </button>
        )}
      </section>

      {/* 3. Поиск */}
      <section style={{ marginTop: "20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ fontSize: "20px" }}>🔍</span>
          <input
            type="text"
            placeholder="Поиск по описанию..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              flex: 1,
              padding: "8px 12px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              fontSize: "14px",
            }}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              style={{
                border: "none",
                background: "none",
                cursor: "pointer",
                color: "#999",
              }}
            >
              ✖ Очистить
            </button>
          )}
        </div>
      </section>

      {/* 4. Тип (Доход/Расход) */}
      <section style={{ marginTop: "20px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            paddingTop: "10px",
          }}
        >
          <span>Тип:</span>
          <button
            onClick={() => setFilterType("income")}
            style={{
              padding: "5px 15px",
              borderRadius: "20px",
              border:
                filterType === "income" ? "2px solid green" : "1px solid #ccc",
              background: filterType === "income" ? "#e6ffed" : "white",
              cursor: "pointer",
              fontWeight: filterType === "income" ? "bold" : "normal",
            }}
          >
            📈 Доходы
          </button>
          <button
            onClick={() => setFilterType("expense")}
            style={{
              padding: "5px 15px",
              borderRadius: "20px",
              border:
                filterType === "expense" ? "2px solid red" : "1px solid #ccc",
              background: filterType === "expense" ? "#fff1f0" : "white",
              cursor: "pointer",
              fontWeight: filterType === "expense" ? "bold" : "normal",
            }}
          >
            📉 Расходы
          </button>
          {filterType && (
            <button
              onClick={() => setFilterType("")}
              style={{
                border: "none",
                background: "none",
                color: "#007bff",
                cursor: "pointer",
                fontSize: "13px",
              }}
            >
              ✖ Сбросить тип
            </button>
          )}
        </div>
      </section>
    </div>
  );
};

export default Filters;
