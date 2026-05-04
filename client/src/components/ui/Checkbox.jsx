import React from "react";
import styles from "./Checkbox.module.css";

const Checkbox = ({ label, checked, onChange, disabled = false, ...props }) => {
  const handleClick = (e) => {
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
