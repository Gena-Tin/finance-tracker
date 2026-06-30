import styles from "./ManageItemModal.module.css";
import { AlertModal } from "../AlertModal";
import { motion } from "framer-motion";

import { useManageItemsModal } from "../../../hooks/useManageItemsModal/useManageItemsModal";
import { AddItemForm } from "./AddItemForm";
import { ItemsList } from "./ItemsList";

import { ManageItemModalProps } from "./types";

export const ManageItemModal: React.FC<ManageItemModalProps> = ({
  items,
  onUpdate,
  apiUrl,
  onClose,
  title,
}) => {
  // Подключаем кастомный хук
  const {
    name,
    setName,
    icon,
    isPickerOpen,
    alertMessage,
    translator,
    togglePicker,
    handleSelectIcon,
    handleAdd,
    handleDelete,
    closeAlert,
  } = useManageItemsModal({ apiUrl, onUpdate });

  return (
    <motion.div
      className={styles.overlay}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className={styles.modal}
        initial={{ y: 50, scale: 0.9 }}
        animate={{ y: 0, scale: 1 }}
        exit={{ y: 50, scale: 0.9 }}
        onClick={(e: React.MouseEvent) => e.stopPropagation()}
      >
        {/* Шапка модального окна */}
        <div className={styles.modalHeader}>
          <h3>
            {title}: {translator.add} / {translator.delete}
          </h3>
          <button type="button" className={styles.closeX} onClick={onClose}>
            ✖
          </button>
        </div>

        {/* Список элементов */}
        <ItemsList
          items={items}
          onDelete={handleDelete}
          deleteTooltip={translator.delete}
        />

        {/* Форма добавления нового элемента */}
        <AddItemForm
          name={name}
          setName={setName}
          icon={icon}
          isPickerOpen={isPickerOpen}
          togglePicker={togglePicker}
          onSelectIcon={handleSelectIcon}
          onSubmit={handleAdd}
          placeholder={translator.plhName}
          btnText={translator.add}
        />

        {/* Кнопка закрытия модалки */}
        <button className={styles.btnClose} onClick={onClose}>
          Ok
        </button>

        {/* Модалка ошибок */}
        <AlertModal
          isOpen={alertMessage !== null}
          message={alertMessage || ""}
          onClose={closeAlert}
          buttonText="Ok"
        />
      </motion.div>
    </motion.div>
  );
};
