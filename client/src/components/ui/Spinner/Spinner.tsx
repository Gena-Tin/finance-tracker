import { useState, useEffect } from "react";
import styles from "./Spinner.module.css";
import { useLanguage } from "../../../hooks/useLanguage";

const Spinner = () => {
  const [showHint, setShowHint] = useState<boolean>(false);
  const { translator } = useLanguage();

  useEffect(() => {
    setShowHint(false);
    const timer = setTimeout(() => setShowHint(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={styles.loaderContainer}>
      <div className={styles.spinner}></div>

      {showHint && (
        <p className={styles.hintText}>{translator.backendWakingUp}</p>
      )}
    </div>
  );
};

export default Spinner;
