import { Category, Project, TranslationData } from "../../../types";

export interface ModalItem {
  id: number;
  name: string;
  icon?: string;
  is_system?: boolean | number; // в зависимости от того, что возвращает бекэнд (0/1 или true/false)
}

export interface ManageItemModalProps {
  items: ModalItem[];
  onUpdate: () => void;
  apiUrl: string;
  onClose: () => void;
  title: string;
}

export interface ModalsManagerProps {
  translator: TranslationData;
  isCategoryManagerOpen: boolean;
  isProjectManagerOpen: boolean;
  setIsCategoryManagerOpen: (open: boolean) => void;
  setIsProjectManagerOpen: (open: boolean) => void;
  categories: Category[];
  projects: Project[];
  fetchData: () => Promise<void> | void; // Функция ничего не принимает и может быть асинхронной
}

export interface AddItemFormProps {
  name: string;
  setName: (name: string) => void;
  icon: string;
  isPickerOpen: boolean;
  togglePicker: () => void;
  onSelectIcon: (emoji: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  placeholder: string;
  btnText: string;
}

export interface ItemsListProps {
  items: ModalItem[];
  onDelete: (id: number) => void | Promise<void>;
  deleteTooltip: string;
}
