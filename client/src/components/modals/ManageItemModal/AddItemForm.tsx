import styles from "./ManageItemModal.module.css";
import { IconPicker } from "../../ui/IconPicker/IconPicker";

import { AddItemFormProps } from "./types";

export const AddItemForm: React.FC<AddItemFormProps> = ({
  name,
  setName,
  icon,
  isPickerOpen,
  togglePicker,
  onSelectIcon,
  onSubmit,
  placeholder,
  btnText,
}) => {
  return (
    <form onSubmit={onSubmit} className={styles.addForm}>
      <div className={styles.inputWrapper}>
        <div className={styles.iconPickerWrapper}>
          <button
            type="button"
            className={styles.iconPreview}
            onClick={togglePicker}
          >
            {icon}
          </button>
          {isPickerOpen && <IconPicker onSelect={onSelectIcon} />}
        </div>

        <input
          name="enter name"
          type="text"
          placeholder={placeholder}
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={styles.inputName}
        />
      </div>
      <button type="submit" className={styles.btnAdd}>
        {btnText}
      </button>
    </form>
  );
};
