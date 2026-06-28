import ManageItemModal from "./ManageItemModal";
import { AnimatePresence } from "framer-motion";
import { PROJECTS_MANAGE, CATEGORIES_MANAGE } from "../../../constants/links";

import { ModalsManagerProps } from "./types";

const ModalsManager: React.FC<ModalsManagerProps> = ({
  translator,
  isCategoryManagerOpen,
  isProjectManagerOpen,
  setIsCategoryManagerOpen,
  setIsProjectManagerOpen,
  categories,
  projects,
  fetchData,
}) => {
  return (
    <>
      <AnimatePresence>
        {isCategoryManagerOpen && (
          <ManageItemModal
            title={translator.category}
            items={categories}
            onUpdate={fetchData}
            apiUrl={CATEGORIES_MANAGE}
            onClose={() => setIsCategoryManagerOpen(false)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isProjectManagerOpen && (
          <ManageItemModal
            title={translator.project}
            items={projects}
            onUpdate={fetchData}
            apiUrl={PROJECTS_MANAGE}
            onClose={() => setIsProjectManagerOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default ModalsManager;
