import styles from "./TransactionTable.module.css";
import Checkbox from "../../ui/Checkbox/Checkbox";
import { useLanguage } from "../../../hooks/useLanguage";
import { AnimatePresence } from "framer-motion";
import { TransactionRow } from "./TransactionRow";
import { TransactionTableHeader } from "./TransactionTableHeader"; // Наш новый компонент

import { TransactionTableProps } from "./types";

const TransactionTable: React.FC<TransactionTableProps> = ({
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
  const { translator } = useLanguage();

  const isAllSelected =
    selectedIds.length === transactions.length && transactions.length > 0;

  return (
    <div className={styles.tableContainer}>
      {/*  шапка  */}
      <TransactionTableHeader
        selectedCount={selectedIds.length}
        projects={projects}
        onDelete={onDelete}
        onMove={onMove}
      />

      {/* таблица */}
      <table className={styles.table}>
        <thead>
          <tr className={styles.headRow}>
            <th className={styles.checkboxCell}>
              <Checkbox
                type="checkbox"
                onChange={(e) => onToggleAll(e.target.checked)}
                checked={isAllSelected}
              />
            </th>
            <th>{translator.sum}</th>
            <th>{translator.description}</th>
            <th>{translator.date}</th>
            <th className={styles.checkboxCell}></th>
            <th>{translator.category}</th>
            <th>{translator.project}</th>
          </tr>
        </thead>
        <tbody>
          <AnimatePresence mode="popLayout">
            {filteredByCategory.map((t) => (
              <TransactionRow
                key={t.id}
                transaction={t}
                isSelected={selectedIds.includes(t.id)}
                isEditingAny={!!editingId}
                onToggleSelect={onToggleSelect}
                onEdit={onEdit}
              />
            ))}
          </AnimatePresence>
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;
