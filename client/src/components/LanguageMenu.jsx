import React, { useState } from "react";
import { useLanguage } from "../hooks/useLanguage";
import { translations } from "../constants/locales";
import styles from "./LanguageMenu.module.css";
import { IconGlobe } from "./SvgLib";

const LanguageMenu = () => {
  const { lang, switchLanguage } = useLanguage();
  const { translator } = useLanguage();

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleSelect = (newLang) => {
    switchLanguage(newLang);
    setIsOpen(false);
  };

  const availableLanguages = Object.keys(translations);

  return (
    <div className={styles.langMenuContainer}>
      <button
        className={styles.langMenuButton}
        onClick={toggleMenu}
        title={translator.chooseLanguage}
      >
        <IconGlobe className={styles.iconSvg} />
      </button>

      {isOpen && (
        <>
          <div className={styles.overlay} onClick={() => setIsOpen(false)} />
          <ul className={styles.langMenuList}>
            {availableLanguages.map((key) => {
              const { flag, name } = translations[key].info;
              return (
                <li
                  key={key}
                  className={`${styles.langMenuItem} ${
                    key === lang ? styles.active : ""
                  }`}
                  onClick={() => handleSelect(key)}
                >
                  <span className={styles.langFlag}>{flag}</span>
                  <span className={styles.langName}>{name}</span>
                </li>
              );
            })}
          </ul>
        </>
      )}
    </div>
  );
};

export default LanguageMenu;
