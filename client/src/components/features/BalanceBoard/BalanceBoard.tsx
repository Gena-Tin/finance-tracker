import styles from "./BalanceBoard.module.css";
import { useLanguage } from "../../../hooks/useLanguage";

import { BalanceBoardProps } from "./types";

export const BalanceBoard: React.FC<BalanceBoardProps> = ({
  totalIncome,
  totalExpense,
  balance,
}) => {
  const { translator } = useLanguage();

  //  Функция для форматирования чисел.
  const formatCurrency = (val: number): string => val.toFixed(2);

  //  Определяем класс для общего баланса в зависимости от его знака
  const balanceClass =
    balance >= 0 ? styles.totalPositive : styles.totalNegative;

  return (
    <div className={styles.container}>
      {/* Блок ДОХОДОВ */}
      <div className={styles.block}>
        <p className={styles.label}>{translator.income}</p>
        <h3 className={`${styles.value} ${styles.income}`}>
          +{formatCurrency(totalIncome)}
        </h3>
      </div>

      {/* Блок РАСХОДОВ */}
      <div className={styles.centerBlock}>
        <p className={styles.label}>{translator.expense}</p>
        <h3 className={`${styles.value} ${styles.expense}`}>
          -{formatCurrency(totalExpense)}
        </h3>
      </div>

      {/* Блок ОБЩЕГО БАЛАНСА */}
      <div className={styles.block}>
        <p className={styles.label}>{translator.total}</p>
        <h3 className={`${styles.value} ${balanceClass}`}>
          {formatCurrency(balance)}
        </h3>
      </div>
    </div>
  );
};
