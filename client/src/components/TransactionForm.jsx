import React from "react";

import styles from "./TransactionForm.module.css";

const TransactionForm = ({
  editingId,
  date,
  setDate,
  amount,
  setAmount,
  description,
  setDescription,
  catId,
  setCatId,
  type,
  setType,
  categories,
  handleSubmit,
  cancelEdit,
}) => {
  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      {/* <h3 className={styles.title}>
        {editingId ? "Редактировать операцию" : "Добавить операцию"}
      </h3> */}
      <div className={styles.inputGroup}>
        <input
          className={styles.field}
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <input
          className={styles.field}
          type="number"
          placeholder="Сумма"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <input
          className={styles.field}
          type="text"
          placeholder="Описание"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <select
          className={styles.field}
          value={catId}
          onChange={(e) => setCatId(e.target.value)}
        >
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
        <select
          className={styles.field}
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="expense">Расход</option>
          <option value="income">Доход</option>
        </select>
        <div>
          <button type="submit" className={styles.submitBtn}>
            {editingId ? "Сохранить" : "Добавить"}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={cancelEdit}
              className={styles.cancelBtn}
            >
              Отмена
            </button>
          )}
        </div>
      </div>
    </form>
  );
};

export default TransactionForm;
