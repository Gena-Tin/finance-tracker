import React from "react";

import styles from "./TransactionTable.module.css";

const TransactionTable = ({
  transactions,
  filteredByCategory,
  selectedIds,
  onToggleSelect,
  onToggleAll,
  onDelete,
  onEdit,
  editingId,
}) => {
  return (
    <div className={styles.tableContainer}>
      <div className={styles.tableHeader}>
        <h2>Последние операции</h2>
        {selectedIds.length > 0 && (
          <button onClick={onDelete} className={styles.deleteBtn}>
            🗑 Удалить ({selectedIds.length})
          </button>
        )}
      </div>

      <table className={styles.table}>
        <thead>
          <tr className={styles.headRow}>
            <th className={styles.checkboxCell}>
              <input
                type="checkbox"
                onChange={(e) => onToggleAll(e.target.checked)}
                checked={
                  selectedIds.length === transactions.length &&
                  transactions.length > 0
                }
              />
            </th>
            <th>Дата</th>
            <th>Категория</th>
            <th>Описание</th>
            <th>Сумма</th>
            <th className={styles.checkboxCell}></th>
          </tr>
        </thead>
        <tbody>
          {filteredByCategory.map((t) => {
            const isSelected = selectedIds.includes(t.id);

            return (
              <tr
                key={t.id}
                className={`${styles.row} ${
                  isSelected ? styles.rowSelected : ""
                }`}
              >
                <td>
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => onToggleSelect(t.id)}
                  />
                </td>
                <td className={styles.cell}>
                  {new Date(t.created_at).toLocaleDateString()}
                </td>
                <td>
                  {t.category_icon} {t.category_name}
                </td>
                <td>{t.description}</td>
                <td
                  className={`${styles.amount} ${
                    t.type === "expense" ? styles.expense : styles.income
                  }`}
                >
                  {t.type === "expense" ? "-" : "+"}
                  {t.amount} ₴
                </td>
                <td>
                  {isSelected && !editingId && (
                    <button
                      onClick={() => onEdit(t)}
                      className={styles.editBtn}
                      title="Редактировать"
                    >
                      ✏️
                    </button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;
