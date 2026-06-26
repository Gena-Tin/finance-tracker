import styles from "./IconPicker.module.css";
import { COMMON_ICONS } from "../../../constants/icons";
import { IconPickerProps } from "./types";

const IconPicker: React.FC<IconPickerProps> = ({ onSelect }) => {
  return (
    <div className={styles.iconGrid}>
      {COMMON_ICONS.map((emoji: string) => (
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
