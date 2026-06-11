import styles from "./Filters.module.css";

interface DateInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  hasValueReference?: string; // для проверки startDate ? "date" : "text"
}

const DateInput: React.FC<DateInputProps> = ({
  label,
  value,
  onChange,
  placeholder,
  hasValueReference,
}) => (
  <div className={styles.dateGroup}>
    <span>{label} </span>
    <input
      type={hasValueReference ? "date" : "text"}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onFocus={(e) => (e.target.type = "date")}
      onBlur={(e) => {
        if (!e.target.value) e.target.type = "text";
      }}
      placeholder={placeholder}
      className={styles.inputField}
    />
  </div>
);

export default DateInput;
