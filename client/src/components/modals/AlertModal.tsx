import { motion, AnimatePresence } from "framer-motion";
import styles from "./Modals.module.css"; // Переиспользуем твои базовые стили модалок

interface AlertModalProps {
  isOpen: boolean;
  message: string;
  onClose: () => void;
  buttonText?: string;
}

const AlertModal: React.FC<AlertModalProps> = ({
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
            <h3
              className={styles.title}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                alignItems: "center",
              }}
            >
              <span style={{ fontSize: "2rem" }}>⚠️</span>
              <span style={{ fontWeight: 400, fontSize: "1.05rem" }}>
                {message}
              </span>
            </h3>

            <div
              className={styles.actions}
              style={{ justifyContent: "center" }}
            >
              <button
                type="button"
                className={styles.confirmBtn}
                onClick={onClose}
                style={{ minWidth: "100px" }}
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

export default AlertModal;
