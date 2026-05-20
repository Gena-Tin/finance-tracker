import { AnimatePresence } from "framer-motion";
import EntityModal from "./EntityModal";
import { PROJECTS_MANAGE, CATEGORIES_MANAGE } from "../../constants/links";
import { Category, Project, TranslationData } from "../../types";

interface ModalsManagerProps {
  translator: TranslationData;
  isCategoryManagerOpen: boolean;
  isProjectManagerOpen: boolean;
  setIsCategoryManagerOpen: (open: boolean) => void;
  setIsProjectManagerOpen: (open: boolean) => void;
  categories: Category[];
  projects: Project[];
  fetchData: () => Promise<void> | void; // Функция ничего не принимает и может быть асинхронной
}

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

// import { AnimatePresence } from "framer-motion";
// import EntityModal from "./EntityModal";
// import { PROJECTS_MANAGE, CATEGORIES_MANAGE } from "../../constants/links";

// const ModalsManager = ({
//   translator,
//   isCategoryManagerOpen,
//   setIsCategoryManagerOpen,
//   isProjectManagerOpen,
//   setIsProjectManagerOpen,
//   categories,
//   projects,
//   fetchData,
// }) => {
//   return (
//     <>
//       <AnimatePresence>
//         {isCategoryManagerOpen && (
//           <EntityModal
//             title={translator.category}
//             items={categories}
//             onUpdate={fetchData}
//             apiUrl={CATEGORIES_MANAGE}
//             onClose={() => setIsCategoryManagerOpen(false)}
//           />
//         )}
//       </AnimatePresence>

//       <AnimatePresence>
//         {isProjectManagerOpen && (
//           <EntityModal
//             title={translator.project}
//             items={projects}
//             onUpdate={fetchData}
//             apiUrl={PROJECTS_MANAGE}
//             onClose={() => setIsProjectManagerOpen(false)}
//           />
//         )}
//       </AnimatePresence>
//     </>
//   );
// };

// export default ModalsManager;
