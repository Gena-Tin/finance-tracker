import React, { useState, ReactNode } from "react";
import { LanguageContext } from "./LanguageContext";
import { translations } from "../locales/locales";
import { LangCode } from "@/types";

// 1. Описываем интерфейс для пропсов компонента
interface LanguageProviderProps {
  children: ReactNode; // ReactNode — стандартный тип для всего, что можно отрендерить внутри React
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({
  children,
}) => {
  // 2. Указываем, что в стейте может лежать только строго валидный код языка
  const [lang, setLang] = useState<LangCode>(
    (localStorage.getItem("app-lang") as LangCode) || "en"
  );

  // 3. Строго типизируем аргумент функции
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

// import { useState } from "react";
// import { LanguageContext } from "./LanguageContext";
// import { translations } from "../locales/locales";

// export const LanguageProvider = ({ children }) => {
//   const [lang, setLang] = useState(localStorage.getItem("app-lang") || "en");

//   const switchLanguage = (newLang) => {
//     setLang(newLang);
//     localStorage.setItem("app-lang", newLang);
//   };

//   return (
//     <LanguageContext.Provider
//       value={{ lang, translator: translations[lang].data, switchLanguage }}
//     >
//       {children}
//     </LanguageContext.Provider>
//   );
// };
