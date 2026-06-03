import { createContext } from "react";
import { LanguageContextType } from "../types";

export const LanguageContext = createContext<LanguageContextType | null>(null);
