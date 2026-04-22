import React from "react";
import { useState } from "react";

/* eslint-disable-next-line no-unused-vars */ //fix magic error of eslint
import { motion, AnimatePresence } from "framer-motion";

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
  projects,
  onMove,
}) => {
  const [targetProjectId, setTargetProjectId] = useState(1);

  return (
    <div className={styles.tableContainer}>
      <div className={styles.tableHeader}>
        <h2>Последние операции</h2>
        {selectedIds.length > 0 && (
          <>
            <button
              type="button"
              onClick={onDelete}
              className={styles.deleteBtn}
              title="Удалить выбранные"
            >
              ({selectedIds.length}) Delete 🗑
            </button>
            <div>
              <button
                type="button"
                onClick={() => onMove(selectedIds, targetProjectId)}
                className={styles.moveBtn}
                title="Перенести выбранные"
              >
                ({selectedIds.length}) move to 👉
              </button>
              <select
                name="project-target"
                className={styles.projectSelect}
                value={targetProjectId}
                onChange={(e) => setTargetProjectId(Number(e.target.value))}
              >
                {projects.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>
          </>
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
            <th>Сумма</th>
            <th>Описание</th>
            <th>Дата</th>
            <th className={styles.checkboxCell}></th>
            <th>Категория</th>
            <th>Проект</th>
          </tr>
        </thead>
        <tbody>
          <AnimatePresence mode="popLayout">
            {filteredByCategory.map((t) => {
              const isSelected = selectedIds.includes(t.id);

              return (
                <motion.tr
                  key={t.id}
                  layout // <--- ЭТО заставляет строки плавно съезжаться
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, x: -10 }}
                  transition={{ duration: 0.2 }}
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

                  <td
                    className={`${styles.amount} ${
                      t.type === "expense" ? styles.expense : styles.income
                    }`}
                  >
                    {t.type === "expense" ? "-" : "+"}
                    {t.amount}
                  </td>

                  <td>{t.description}</td>

                  <td className={styles.cell}>
                    {new Date(t.created_at).toLocaleDateString("ru-RU", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "2-digit",
                    })}
                  </td>
                  <td>
                    {isSelected && !editingId && (
                      <button
                        type="button"
                        onClick={() => onEdit(t)}
                        className={styles.editBtn}
                        title="Редактировать"
                      >
                        ✏️
                      </button>
                    )}
                  </td>
                  <td>
                    {t.category_icon} {t.category_name}
                  </td>
                  <td>
                    {t.project_icon} {t.project_name}
                  </td>
                </motion.tr>
              );
            })}
          </AnimatePresence>
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;
