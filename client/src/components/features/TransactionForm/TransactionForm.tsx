import styles from "./TransactionForm.module.css";
import { useLanguage } from "../../../hooks/useLanguage";

import { Category, Project, TransactionType } from "@/types";

interface TransactionFormProps {
  editingId?: number | null; //id может отсутствовать, когда мы просто добавляем запись
  date: string;
  setDate: (date: string) => void;
  amount: string;
  setAmount: (amount: string) => void;
  description: string;
  setDescription: (description: string) => void;
  catId: string;
  setCatId: (cat: string) => void;
  categories: Category[];
  type: TransactionType;
  setType: (type: TransactionType) => void;
  projId: number;
  setProjId: (proj: number) => void;
  projects: Project[];
  handleSubmit: (e: React.SyntheticEvent<HTMLFormElement, SubmitEvent>) => void;
  isSubmitting?: boolean;
  cancelEdit: () => void;
}

const TransactionForm: React.FC<TransactionFormProps> = ({
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
  isSubmitting = false,
  cancelEdit,
  projects,
  projId,
  setProjId,
}) => {
  const { translator } = useLanguage();

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
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
          placeholder={` ∑  ${translator.sum}`}
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <input
          className={styles.field}
          type="text"
          placeholder={` ✏️ ${translator.description}`}
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
              {c.icon}&nbsp;{c.name}
            </option>
          ))}
        </select>
        <select
          className={styles.field}
          value={type}
          onChange={(e) => setType(e.target.value as TransactionType)}
        >
          <option value="expense">❌ {translator.expense}</option>
          <option value="income">✅ {translator.income}</option>
        </select>
        <select
          className={styles.field}
          value={projId}
          onChange={(e) => setProjId(Number(e.target.value))}
        >
          {projects.map((p) => (
            <option key={p.id} value={p.id}>
              {p.icon} {p.name}
            </option>
          ))}
        </select>
        <div>
          <button
            type="submit"
            className={styles.submitBtn}
            disabled={isSubmitting}
          >
            {editingId ? `${translator.save}` : `${translator.add}`}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={cancelEdit}
              className={styles.cancelBtn}
            >
              {translator.cancel}
            </button>
          )}
        </div>
      </div>
    </form>
  );
};

export default TransactionForm;
