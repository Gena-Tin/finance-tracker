import styles from "./Filters.module.css";
import { IconMinus, IconPlus } from "../../ui/SvgLib";

import { TypeFilterProps } from "./types";

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
