import styles from "./Filters.module.css";
import { IconClose } from "../../ui/SvgLib";

import { ResetButtonProps } from "./types";

export const ResetButton: React.FC<ResetButtonProps> = ({ onClick, label }) => {
  return (
    <button type="button" onClick={onClick} className={styles.resetBtn}>
      <IconClose
        className="icon-svg"
        style={{
          color: "white",
        }}
      />
      {label}
    </button>
  );
};
