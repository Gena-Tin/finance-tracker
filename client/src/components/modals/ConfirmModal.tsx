import styles from "./Modals.module.css";
import { motion, AnimatePresence } from "framer-motion";
import { ConfirmModalProps } from "./types";

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  title,
  onClose,
  onConfirm,
  cancelText = "Cancel",
  confirmText = "OK",
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
              {title}
            </h3>

            <div className={styles.actions}>
              <button className={styles.cancelBtn} onClick={onClose}>
                {cancelText}
              </button>
              <button className={styles.confirmBtn} onClick={onConfirm}>
                {confirmText}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
