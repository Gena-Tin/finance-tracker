import styles from "./HeaderSection.module.css";
import { LanguageMenu } from "../LanguageMenu/LanguageMenu.tsx";
import { IconChevronUp, IconMenu } from "../../ui/SvgLib.tsx";
import { THEMES } from "../../../constants/themes/themes.ts";

import { HeaderSectionProps } from "./types.ts";

export const HeaderSection: React.FC<HeaderSectionProps> = ({
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
