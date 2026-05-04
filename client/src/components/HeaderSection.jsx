import React from "react";
import styles from "../App.module.css";
import LanguageMenu from "./LanguageMenu";
import { IconChevronUp, IconMenu } from "./SvgLib";
import { THEMES } from "../constants/themes";

const HeaderSection = ({
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
        {/* Выбор языка */}
        <LanguageMenu />

        {/* Выбор темы */}
        <select
          name="themes"
          value={currentTheme}
          onChange={(e) => setCurrentTheme(e.target.value)}
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
