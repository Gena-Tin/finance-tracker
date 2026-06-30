import styles from "./Modals.module.css"; // Переиспользуем твои базовые стили модалок
import { motion, AnimatePresence } from "framer-motion";
import { AlertModalProps } from "./types";

export const AlertModal: React.FC<AlertModalProps> = ({
  isOpen,
  message,
  onClose,
  buttonText = "OK",
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className={styles.overlay} onClick={onClose}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={styles.modal}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className={styles.title}>
              <span className={styles.sign}>⚠️</span>
              <span>{message}</span>
            </h3>

            <div className={styles.actions}>
              <button
                type="button"
                className={styles.confirmBtn}
                onClick={onClose}
              >
                {buttonText}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
