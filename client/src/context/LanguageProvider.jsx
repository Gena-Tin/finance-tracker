import React, { useState } from "react";
import { LanguageContext } from "./LanguageContext";
import { translations } from "../locales/locales";

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(localStorage.getItem("app-lang") || "en");

  const switchLanguage = (newLang) => {
    setLang(newLang);
    localStorage.setItem("app-lang", newLang);
  };

  return (
    <LanguageContext.Provider
      value={{ lang, translator: translations[lang].data, switchLanguage }}
    >
      {children}
    </LanguageContext.Provider>
  );
};
