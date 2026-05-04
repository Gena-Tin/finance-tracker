import React, { useState } from "react";
/* eslint-disable-next-line no-unused-vars */ //fix magic error of eslint
import { motion, AnimatePresence } from "framer-motion";
import styles from "../App.module.css";
import {
  IconEdit,
  IconAdd,
  IconChevronDown,
  IconAnalytics,
  IconFilters,
  IconBalance,
} from "./SvgLib";

import TransactionForm from "./TransactionForm";
import Analytics from "./Analytics";
import Filters from "./Filters";
import BalanceBoard from "./BalanceBoard";

const ToolsSection = ({
  translator,
  formProps,
  analyticsProps,
  filtersProps,
  balanceProps,
}) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isAnalyticsOpen, setIsAnalyticsOpen] = useState(false);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [isBalanceOpen, setIsBalanceOpen] = useState(false);

  const accordionAnimation = {
    initial: { height: 0, opacity: 0, overflow: "hidden" },
    animate: { height: "auto", opacity: 1 },
    exit: { height: 0, opacity: 0 },
    transition: { duration: 0.3 },
  };

  return (
    <>
      {/* --- АККОРДЕОН: ФОРМА --- */}
      <div
        className={styles.accordionHeader}
        onClick={() => setIsFormOpen(!isFormOpen)}
      >
        <h2>
          {formProps.editingId ? (
            <>
              <IconEdit className="icon-svg" /> {translator.editOperation}
            </>
          ) : (
            <>
              <IconAdd className="icon-svg" /> {translator.addOperation}
            </>
          )}
        </h2>
        <span className={`${styles.icon} ${isFormOpen ? styles.iconOpen : ""}`}>
          <IconChevronDown className="icon-svg" />
        </span>
      </div>
      <AnimatePresence>
        {isFormOpen && (
          <motion.div {...accordionAnimation}>
            <TransactionForm {...formProps} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- АККОРДЕОН: АНАЛИТИКА --- */}
      <div
        className={styles.accordionHeader}
        onClick={() => setIsAnalyticsOpen(!isAnalyticsOpen)}
      >
        <h2>
          <IconAnalytics className="icon-svg" /> {translator.analytics}
        </h2>
        <span
          className={`${styles.icon} ${isAnalyticsOpen ? styles.iconOpen : ""}`}
        >
          <IconChevronDown className="icon-svg" />
        </span>
      </div>
      <AnimatePresence>
        {isAnalyticsOpen && (
          <motion.div
            {...accordionAnimation}
            style={{ background: "var(--accent-bg-alt)", borderRadius: 8 }}
          >
            <Analytics {...analyticsProps} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- АККОРДЕОН: ФИЛЬТРЫ --- */}
      <div
        className={styles.accordionHeader}
        onClick={() => setIsFiltersOpen(!isFiltersOpen)}
      >
        <h2>
          <IconFilters className="icon-svg" /> {translator.filters}
        </h2>
        <span
          className={`${styles.icon} ${isFiltersOpen ? styles.iconOpen : ""}`}
        >
          <IconChevronDown className="icon-svg" />
        </span>
      </div>
      <AnimatePresence>
        {isFiltersOpen && (
          <motion.div {...accordionAnimation}>
            <Filters {...filtersProps} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- АККОРДЕОН: БАЛАНС --- */}
      <div
        className={styles.accordionHeader}
        onClick={() => setIsBalanceOpen(!isBalanceOpen)}
      >
        <h2>
          <IconBalance className="icon-svg" /> {translator.balance}
        </h2>
        <span
          className={`${styles.icon} ${isBalanceOpen ? styles.iconOpen : ""}`}
        >
          <IconChevronDown className="icon-svg" />
        </span>
      </div>
      <AnimatePresence>
        {isBalanceOpen && (
          <motion.div {...accordionAnimation}>
            <BalanceBoard {...balanceProps} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ToolsSection;
