import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "../../../hooks/useLanguage";

import AlertModal from "../AlertModal";
import IconPicker from "../../ui/IconPicker/IconPicker";
import styles from "./EntityModal.module.css";

interface EntityItem {
  id: number;
  name: string;
  icon?: string;
  is_system?: boolean | number; // в зависимости от того, что возвращает PHP (0/1 или true/false)
}

interface EntityModalProps {
  items: EntityItem[];
  onUpdate: () => void;
  apiUrl: string;
  onClose: () => void;
  title: string;
}

const EntityModal: React.FC<EntityModalProps> = ({
  items,
  onUpdate,
  apiUrl,
  onClose,
  title,
}) => {
  const [name, setName] = useState<string>("");
  const [icon, setIcon] = useState<string>("💎");
  const [isPickerOpen, setIsPickerOpen] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  const { translator } = useLanguage();

  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalStyle;
      document.documentElement.style.overflow = "auto";
    };
  }, []);

  const selectIcon = (emoji: string): void => {
    setIcon(emoji);
    setIsPickerOpen(false);
  };

  const handleAdd = async (e: React.SubmitEvent): Promise<void> => {
    e.preventDefault();
    if (!name.trim()) return;
    setAlertMessage(null);

    // await fetch(`${import.meta.env.VITE_API_URL}/${apiUrl}`, {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ name, icon }),
    // });

    // setName("");
    // onUpdate();
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/${apiUrl}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, icon }),
        }
      );

      if (!response.ok) {
        const result = await response.json();
        const errorCode = result.code;

        const translatedMessage =
          translator[errorCode as keyof typeof translator] ||
          result.error ||
          "Failed to add item";

        setAlertMessage(translatedMessage);
      } else {
        setName("");
        onUpdate();
      }
    } catch (err) {
      console.error("Request error:", err);
      setAlertMessage("Failed to contact the server");
    }
  };

  const handleDelete = async (id: number): Promise<void> => {
    setAlertMessage(null);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/${apiUrl}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        // setAlertMessage(result.error || "Server error");
        const errorCode = result.code;

        // Динамически ищем перевод по коду ответа бэкенда
        const translatedMessage =
          translator[errorCode as keyof typeof translator] ||
          result.error ||
          "Server error";

        setAlertMessage(translatedMessage);
      } else {
        onUpdate();
      }
    } catch (error) {
      console.error("Request error:", error);
      setAlertMessage("Failed to contact the server");
    }
  };

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
        <div className={styles.modalHeader}>
          <h3>
            {title}: {translator.add} / {translator.delete}
          </h3>
          <button type="button" className={styles.closeX} onClick={onClose}>
            ✖
          </button>
        </div>

        <ul className={styles.list}>
          {items.map((proj) => (
            <li key={proj.id} className={styles.item}>
              <span>
                {proj.icon} {proj.name}
              </span>
              {!proj.is_system && (
                <button
                  type="button"
                  className={styles.btnDelete}
                  onClick={() => handleDelete(proj.id)}
                  title={translator.delete}
                >
                  🗑️
                </button>
              )}
            </li>
          ))}
        </ul>

        <form onSubmit={handleAdd} className={styles.addForm}>
          <div className={styles.inputWrapper}>
            <div className={styles.iconPickerWrapper}>
              <button
                type="button"
                className={styles.iconPreview}
                onClick={() => setIsPickerOpen(!isPickerOpen)}
              >
                {icon}
              </button>

              {isPickerOpen && <IconPicker onSelect={selectIcon} />}
            </div>

            <input
              name="enter name"
              type="text"
              placeholder={translator.plhName}
              value={name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setName(e.target.value)
              }
              className={styles.inputName}
            />
          </div>
          <button type="submit" className={styles.btnAdd}>
            {translator.add}
          </button>
        </form>
        <button className={styles.btnClose} onClick={onClose}>
          Ok
        </button>
        <AlertModal
          isOpen={alertMessage !== null}
          message={alertMessage || ""}
          onClose={() => setAlertMessage(null)}
          buttonText="Ok"
        />
      </motion.div>
    </motion.div>
  );
};

export default EntityModal;
