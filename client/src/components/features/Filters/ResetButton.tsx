import styles from "./Filters.module.css";
import { IconClose } from "../../ui/SvgLib";

interface ResetButtonProps {
  onClick: () => void;
  label: string;
}

const ResetButton: React.FC<ResetButtonProps> = ({ onClick, label }) => {
  return (
    <button type="button" onClick={onClick} className={styles.resetBtn}>
      <IconClose
        className="icon-svg"
        style={{
          color: "var(--text-l)",
        }}
      />
      {label}
    </button>
  );
};
export default ResetButton;
