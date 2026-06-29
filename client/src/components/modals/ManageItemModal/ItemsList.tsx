import styles from "./ManageItemModal.module.css";
import { ItemsListProps } from "./types";

export const ItemsList: React.FC<ItemsListProps> = ({
  items,
  onDelete,
  deleteTooltip,
}) => {
  return (
    <ul className={styles.list}>
      {items.map((item) => (
        <li key={item.id} className={styles.item}>
          <span>
            {item.icon} {item.name}
          </span>
          {!item.is_system && (
            <button
              type="button"
              className={styles.btnDelete}
              onClick={() => onDelete(item.id)}
              title={deleteTooltip}
            >
              🗑️
            </button>
          )}
        </li>
      ))}
    </ul>
  );
};
