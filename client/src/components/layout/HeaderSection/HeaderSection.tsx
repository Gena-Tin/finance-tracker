import styles from "./HeaderSection.module.css";

import LanguageMenu from "../LanguageMenu/LanguageMenu.tsx";
import { IconChevronUp, IconMenu } from "../../ui/SvgLib.tsx";
import { THEMES } from "../../../constants/themes.ts";
import { TranslationData } from "../../../types/index.ts";

interface HeaderSectionProps {
  translator: TranslationData;
  currentTheme: string;
  setCurrentTheme: (theme: string) => void;
  isToolsOpen: boolean;
  setIsToolsOpen: (open: boolean) => void;
}

const HeaderSection: React.FC<HeaderSectionProps> = ({
  translator,
  currentTheme,
  setCurrentTheme,
  isToolsOpen,
  setIsToolsOpen,
}) => {
  return (
    <div className={styles.mainHeader}>
      <h1>{translator.title}</h1>

      <div className={styles.containerBtnHeader}>
        <LanguageMenu />

        {/* Выбор темы */}
        <select
          name="themes"
          value={currentTheme}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setCurrentTheme(e.target.value)
          }
          className={styles.themeSelect}
        >
          {Object.entries(THEMES).map(([key, theme]) => (
            <option key={key} value={key}>
              {theme.label}
            </option>
          ))}
        </select>

        {/* Кнопка открытия инструментов */}
        <button
          type="button"
          onClick={() => setIsToolsOpen(!isToolsOpen)}
          className={styles.toolsButton}
          aria-label={translator.openMenu}
        >
          {isToolsOpen ? (
            <IconChevronUp className="icon-svg" />
          ) : (
            <IconMenu className="icon-svg" />
          )}
        </button>
      </div>
    </div>
  );
};

export default HeaderSection;
