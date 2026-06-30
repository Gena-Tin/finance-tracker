import styles from "./LanguageMenu.module.css";
import { useState } from "react";
import { useLanguage } from "../../../hooks/useLanguage";
import { translations } from "../../../locales/locales";
import { IconGlobe } from "../../ui/SvgLib";

import { LangCode } from "../../../types";

export const LanguageMenu: React.FC = () => {
  const { lang, switchLanguage, translator } = useLanguage();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleMenu = (): void => setIsOpen(!isOpen);

  const handleSelect = (newLang: LangCode): void => {
    switchLanguage(newLang);
    setIsOpen(false);
  };

  const availableLanguages = Object.keys(translations) as LangCode[];

  return (
    <div className={styles.langMenuContainer}>
      <button
        type="button"
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
