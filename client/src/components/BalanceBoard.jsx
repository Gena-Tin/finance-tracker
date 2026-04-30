import React from "react";

import styles from "./BalanceBoard.module.css";
import { useLanguage } from "../hooks/useLanguage";

const BalanceBoard = ({ totalIncome, totalExpense, balance }) => {
  const { trnslt } = useLanguage();

  return (
    <div className={styles.container}>
      <div className={styles.block}>
        <p className={styles.label}>{trnslt.income}</p>
        <h3 className={` ${styles.value} ${styles.income}`}>
          +{totalIncome.toFixed(2)}
        </h3>
      </div>
      <div className={styles.centerBlock}>
        <p className={styles.label}>{trnslt.expense}</p>
        <h3 className={`${styles.value} ${styles.expense}`}>
          -{totalExpense.toFixed(2)}
        </h3>
      </div>
      <div className={styles.block}>
        <p className={styles.label}>{trnslt.total}</p>
        <h3
          className={`${styles.value} ${
            balance >= 0 ? styles.totalPositive : styles.totalNegative
          }`}
        >
          {balance.toFixed(2)}
        </h3>
      </div>
    </div>
  );
};

export default BalanceBoard;
