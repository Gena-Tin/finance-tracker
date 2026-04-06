import React from "react";

import styles from "./BalanceBoard.module.css";

const BalanceBoard = ({ totalIncome, totalExpense, balance }) => {
  return (
    <div className={styles.container}>
      <div>
        <p className={styles.label}>Доходы</p>
        <h3 className={` ${styles.value} ${styles.income}`}>
          +{totalIncome.toFixed(2)} ₴
        </h3>
      </div>
      <div className={styles.centerBlock}>
        <p className={styles.label}>Расходы</p>
        <h3 className={`${styles.value} ${styles.expense}`}>
          -{totalExpense.toFixed(2)} ₴
        </h3>
      </div>
      <div>
        <p className={styles.label}>Итого</p>
        <h3
          className={`${styles.value} ${
            balance >= 0 ? styles.totalPositive : styles.totalNegative
          }`}
        >
          {balance.toFixed(2)} ₴
        </h3>
      </div>
    </div>
  );
};

export default BalanceBoard;
