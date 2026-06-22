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

// import { useState } from "react";
// import { useLanguage } from "../../../hooks/useLanguage";
// import { AnimatePresence } from "framer-motion";
// import styles from "./TransactionTable.module.css";
// import Checkbox from "../../ui/Checkbox/Checkbox";
// import { Project, Transaction } from "@/types";
// import { TransactionRow } from "./TransactionRow";

// interface TransactionTableProps {
//   transactions: Transaction[];
//   filteredByCategory: Transaction[];
//   projects: Project[];
//   selectedIds: number[];
//   editingId?: number | null;
//   onToggleSelect: (id: number) => void;
//   onToggleAll: (checked: boolean) => void;
//   onDelete: () => void;
//   onEdit: (transaction: Transaction) => void;
//   onMove: (targetProjectId: number) => void | Promise<void>;
// }

// const TransactionTable: React.FC<TransactionTableProps> = ({
//   transactions,
//   filteredByCategory,
//   selectedIds,
//   onToggleSelect,
//   onToggleAll,
//   onDelete,
//   onEdit,
//   editingId,
//   projects,
//   onMove,
// }) => {
//   const [targetProjectId, setTargetProjectId] = useState<number>(1);
//   const { translator } = useLanguage();

//   const isAllSelected =
//     selectedIds.length === transactions.length && transactions.length > 0;

//   return (
//     <div className={styles.tableContainer}>
//       {/* Шапка таблицы: Логика массовых операций удаления/перемещения записей */}
//       <div className={styles.tableHeader}>
//         {selectedIds.length <= 0 ? (
//           <h2>{translator.lastOperations}:</h2>
//         ) : (
//           <>
//             <button
//               type="button"
//               onClick={onDelete}
//               className={styles.deleteBtn}
//               title={translator.deleteSelected}
//             >
//               ({selectedIds.length}) {translator.delete} 🗑
//             </button>
//             <button
//               type="button"
//               onClick={() => onMove(targetProjectId)}
//               className={styles.moveBtn}
//               title={translator.moveSelected}
//             >
//               ({selectedIds.length}) {translator.moveTo} 👉
//             </button>

//             <select
//               name="project-target"
//               className={styles.projectSelect}
//               value={targetProjectId}
//               onChange={(e) => setTargetProjectId(Number(e.target.value))}
//             >
//               {projects.map((p) => (
//                 <option key={p.id} value={p.id}>
//                   {p.icon} {p.name}
//                 </option>
//               ))}
//             </select>
//           </>
//         )}
//       </div>

//       {/* HTML-таблица */}
//       <table className={styles.table}>
//         <thead>
//           <tr className={styles.headRow}>
//             <th className={styles.checkboxCell}>
//               <Checkbox
//                 type="checkbox"
//                 onChange={(e) => onToggleAll(e.target.checked)}
//                 checked={isAllSelected}
//               />
//             </th>
//             <th>{translator.sum}</th>
//             <th>{translator.description}</th>
//             <th>{translator.date}</th>
//             <th className={styles.checkboxCell}></th>
//             <th>{translator.category}</th>
//             <th>{translator.project}</th>
//           </tr>
//         </thead>
//         <tbody>
//           <AnimatePresence mode="popLayout">
//             {filteredByCategory.map((t) => (
//               <TransactionRow
//                 key={t.id}
//                 transaction={t}
//                 isSelected={selectedIds.includes(t.id)}
//                 isEditingAny={!!editingId}
//                 onToggleSelect={onToggleSelect}
//                 onEdit={onEdit}
//               />
//             ))}
//           </AnimatePresence>
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default TransactionTable;
