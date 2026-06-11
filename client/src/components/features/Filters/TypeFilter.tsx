import { IconMinus, IconPlus } from "../../ui/SvgLib";
import styles from "./Filters.module.css";

interface TypeFilterProps {
  value: "income" | "expense" | "";
  onChange: (type: "income" | "expense" | "") => void;
  incomeLabel: string;
  expenseLabel: string;
  resetLabel: string;
}

const TypeFilter: React.FC<TypeFilterProps> = ({
  value,
  onChange,
  incomeLabel,
  expenseLabel,
}) => {
  return (
    <>
      <button
        type="button"
        onClick={() => onChange("income")}
        className={`${styles.typeBtn} ${
          value === "income" ? styles.incomeBtnActive : ""
        }`}
      >
        <IconPlus className="icon-svg" /> {incomeLabel}
      </button>

      <button
        type="button"
        onClick={() => onChange("expense")}
        className={`${styles.typeBtn} ${
          value === "expense" ? styles.expenseBtnActive : ""
        }`}
      >
        <IconMinus className="icon-svg" /> {expenseLabel}
      </button>
    </>
  );
};

export default TypeFilter;
