import styles from "./Checkbox.module.css";
import { CheckboxProps } from "./types";

const Checkbox: React.FC<CheckboxProps> = ({
  label,
  checked,
  onChange,
  disabled = false,
  ...props
}) => {
  const handleClick = (e: React.MouseEvent<HTMLLabelElement>): void => {
    e.stopPropagation();
  };

  return (
    <label
      className={`${styles.checkboxContainer} ${
        disabled ? styles.disabled : ""
      }`}
      onClick={handleClick} // Останавливаем клик на уровне контейнера чекбокса
    >
      <input
        type="checkbox"
        className={styles.realCheckbox}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        {...props}
      />
      <span className={styles.customCheckbox}></span>
      {label && <span className={styles.labelText}>{label}</span>}
    </label>
  );
};

export default Checkbox;
