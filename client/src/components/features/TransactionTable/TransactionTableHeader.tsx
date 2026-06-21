import { useState } from "react";
import { useLanguage } from "../../../hooks/useLanguage";
import styles from "./TransactionTable.module.css";
import { Project } from "@/types";

interface TransactionTableHeaderProps {
  selectedCount: number;
  projects: Project[];
  onDelete: () => void;
  onMove: (targetProjectId: number) => void | Promise<void>;
}

export const TransactionTableHeader: React.FC<TransactionTableHeaderProps> = ({
  selectedCount,
  projects,
  onDelete,
  onMove,
}) => {
  const [targetProjectId, setTargetProjectId] = useState<number>(1);
  const { translator } = useLanguage();

  if (selectedCount === 0) {
    return (
      <div className={styles.tableHeader}>
        <h2>{translator.lastOperations}:</h2>
      </div>
    );
  }

  return (
    <div className={styles.tableHeader}>
      <button
        type="button"
        onClick={onDelete}
        className={styles.deleteBtn}
        title={translator.deleteSelected}
      >
        ({selectedCount}) {translator.delete} 🗑
      </button>

      <button
        type="button"
        onClick={() => onMove(targetProjectId)}
        className={styles.moveBtn}
        title={translator.moveSelected}
      >
        ({selectedCount}) {translator.moveTo} 👉
      </button>

      <select
        name="project-target"
        className={styles.projectSelect}
        value={targetProjectId}
        onChange={(e) => setTargetProjectId(Number(e.target.value))}
      >
        {projects.map((p) => (
          <option key={p.id} value={p.id}>
            {p.icon} {p.name}
          </option>
        ))}
      </select>
    </div>
  );
};
