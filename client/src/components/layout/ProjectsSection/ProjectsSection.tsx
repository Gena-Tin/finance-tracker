import styles from "./ProjectsSection.module.css";
import { IconOptions } from "../../ui/SvgLib";

import { ProjectsSectionProps } from "./types";

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  translator,
  projId,
  setProjId,
  setIsProjectManagerOpen,
  projects,
}) => {
  const handleProjectChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    setProjId(Number(e.target.value));
  };

  return (
    <>
      <div className={styles.projectHeader}>
        <h2>{translator.project}:</h2>
        <select
          name="project-select"
          value={projId}
          onChange={handleProjectChange}
          className={styles.projectSelect}
        >
          {projects.map((p) => (
            <option key={p.id} value={p.id}>
              {p.icon} {p.name}
            </option>
          ))}
        </select>
        <button
          type="button"
          onClick={() => setIsProjectManagerOpen(true)}
          className={styles.projectsSettingsBtn}
          aria-label={translator.settingProjects}
        >
          <IconOptions className="icon-svg" />
        </button>
      </div>
    </>
  );
};
