import { useState } from "react";
import { LanguageContext } from "./LanguageContext";
import { translations } from "../locales/locales";
import { LangCode } from "@/types";
import { LanguageProviderProps } from "./types";

export const LanguageProvider: React.FC<LanguageProviderProps> = ({
  children,
}) => {
  const [lang, setLang] = useState<LangCode>(
    (localStorage.getItem("app-lang") as LangCode) || "en"
  );

  const switchLanguage = (newLang: LangCode): void => {
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
