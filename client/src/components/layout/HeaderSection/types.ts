import { TranslationData } from "../../../types/index.ts";

export interface HeaderSectionProps {
  translator: TranslationData;
  currentTheme: string;
  setCurrentTheme: (theme: string) => void;
  isToolsOpen: boolean;
  setIsToolsOpen: (open: boolean) => void;
}
