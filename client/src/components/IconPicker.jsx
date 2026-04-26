import styles from "./IconPicker.module.css";
import { COMMON_ICONS } from "../constants/icons";

const IconPicker = ({ onSelect }) => {
  return (
    <div className={styles.iconGrid}>
      {COMMON_ICONS.map((emoji) => (
        <span
          key={emoji}
          className={styles.gridEmoji}
          onClick={() => onSelect(emoji)}
        >
          {emoji}
        </span>
      ))}
    </div>
  );
};

export default IconPicker;
