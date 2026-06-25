import { Project, TranslationData } from "../../../types";

export interface ProjectsSectionProps {
  translator: TranslationData;
  projId: number;
  setProjId: (id: number) => void;
  setIsProjectManagerOpen: (open: boolean) => void;
  projects: Project[];
}
