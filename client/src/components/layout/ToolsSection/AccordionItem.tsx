import { motion, AnimatePresence, HTMLMotionProps } from "framer-motion";
import { IconChevronDown } from "../../ui/SvgLib";
import styles from "./ToolsSection.module.css";

interface AccordionItemProps {
  title: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
  extraHeaderContent?: React.ReactNode;
  customStyle?: React.CSSProperties;
}

const accordionAnimation: HTMLMotionProps<"div"> = {
  initial: { height: 0, opacity: 0, overflow: "hidden" },
  animate: { height: "auto", opacity: 1 },
  exit: { height: 0, opacity: 0 },
  transition: { duration: 0.3 },
};

const AccordionItem: React.FC<AccordionItemProps> = ({
  title,
  isOpen,
  onToggle,
  children,
  extraHeaderContent,
  customStyle,
}) => {
  return (
    <>
      <div className={styles.accordionHeader} onClick={onToggle}>
        <h2>{title}</h2>

        {/* счетчик фильтров с кнопкой сброса */}
        {extraHeaderContent}

        <span className={`${styles.icon} ${isOpen ? styles.iconOpen : ""}`}>
          <IconChevronDown className="icon-svg" />
        </span>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div {...accordionAnimation} style={customStyle}>
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AccordionItem;
