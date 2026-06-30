import styles from "./Filters.module.css";

import { DateInputProps } from "./types";

export const DateInput: React.FC<DateInputProps> = ({
  label,
  value,
  onChange,
  placeholder,
  hasValueReference,
}) => {
  const getStringValue = (date: Date | null): string => {
    if (!date) return ""; // Если null, возвращаем пустую строку — инпут очистится
    // Преобразуем объект даты в локальную строку YYYY-MM-DD с учетом твоей таймзоны
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };
  return (
    <div className={styles.dateGroup}>
      <span>{label} </span>
      <input
        type={hasValueReference ? "date" : "text"}
        value={getStringValue(value)}
        onChange={(e) => {
          const stringValue = e.target.value;
          // Если строка пустая — шлем null, иначе создаем полноценный объект Date
          onChange(stringValue ? new Date(stringValue) : null);
        }}
        // onChange={(e) => onChange(e.target.value)}
        onFocus={(e) => (e.target.type = "date")}
        onBlur={(e) => {
          if (!e.target.value) e.target.type = "text";
        }}
        placeholder={placeholder}
        className={styles.inputField}
      />
    </div>
  );
};
