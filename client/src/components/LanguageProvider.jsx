import React, { useState } from "react";
import { LanguageContext } from "../context/LanguageContext";
import { translations } from "../constants/locales";

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(localStorage.getItem("app-lang") || "en");

  const switchLanguage = (newLang) => {
    setLang(newLang);
    localStorage.setItem("app-lang", newLang);
  };

  return (
    <LanguageContext.Provider
      value={{ lang, t: translations[lang].data, switchLanguage }}
    >
      {children}
    </LanguageContext.Provider>
  );
};
