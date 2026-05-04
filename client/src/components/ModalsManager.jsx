import React from "react";
import { AnimatePresence } from "framer-motion";
import EntityModal from "./EntityModal";
import { PROJECTS_MANAGE, CATEGORIES_MANAGE } from "../constants/links";

const ModalsManager = ({
  translator,
  isCategoryManagerOpen,
  setIsCategoryManagerOpen,
  isProjectManagerOpen,
  setIsProjectManagerOpen,
  categories,
  projects,
  fetchData,
}) => {
  return (
    <>
      <AnimatePresence>
        {isCategoryManagerOpen && (
          <EntityModal
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
          <EntityModal
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
