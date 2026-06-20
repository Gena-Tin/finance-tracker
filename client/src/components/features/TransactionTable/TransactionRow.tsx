import { motion } from "framer-motion";
import { useLanguage } from "../../../hooks/useLanguage";
import Checkbox from "../../ui/Checkbox/Checkbox";
import { Transaction } from "@/types";
import styles from "./TransactionTable.module.css";

interface TransactionRowProps {
  transaction: Transaction;
  isSelected: boolean;
  isEditingAny: boolean;
  onToggleSelect: (id: number) => void;
  onEdit: (transaction: Transaction) => void;
}

export const TransactionRow: React.FC<TransactionRowProps> = ({
  transaction,
  isSelected,
  isEditingAny,
  onToggleSelect,
  onEdit,
}) => {
  const { translator, lang } = useLanguage();

  const isExpense = transaction.type === "expense";

  // Динамическое форматирование даты под язык пользователя
  const formattedDate = new Date(transaction.created_at).toLocaleDateString(
    lang,
    {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      //   year: "2-digit",
    }
  );

  return (
    <motion.tr
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, x: -10 }}
      transition={{ duration: 0.2 }}
      className={`${styles.row} ${isSelected ? styles.rowSelected : ""}`}
    >
      {/* Чекбокс выбора строки */}
      <td>
        <Checkbox
          type="checkbox"
          checked={isSelected}
          onChange={() => onToggleSelect(transaction.id)}
        />
      </td>

      {/* Сумма операции */}
      <td
        className={`${styles.amountCell} ${
          isExpense ? styles.expenseStyle : styles.incomeStyle
        }`}
      >
        {isExpense ? "-" : "+"}
        {transaction.amount}
      </td>

      {/* Описание */}
      <td>{transaction.description}</td>

      {/* Локализованная дата */}
      <td className={styles.dataCell}>{formattedDate}</td>

      {/* Кнопка быстрого редактирования */}
      <td>
        {isSelected && !isEditingAny && (
          <button
            type="button"
            onClick={() => onEdit(transaction)}
            className={styles.editBtn}
            title={translator.edit}
          >
            ✏️
          </button>
        )}
      </td>

      {/* Категория */}
      <td>
        {transaction.category_icon}&nbsp;{transaction.category_name}
      </td>

      {/* Проект */}
      <td>
        {transaction.project_icon}&nbsp;{transaction.project_name}
      </td>
    </motion.tr>
  );
};
