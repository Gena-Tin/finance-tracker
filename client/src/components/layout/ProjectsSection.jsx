import styles from "../../App.module.css";
import { IconOptions } from "../ui/SvgLib";

const ProjectsSection = ({
  translator,
  projId,
  setProjId,
  setIsProjectManagerOpen,
  projects,
}) => {
  return (
    <>
      <div className={styles.projectHeader}>
        <h2>{translator.project}:</h2>
        <select
          name="project-select"
          value={projId}
          onChange={(e) => setProjId(Number(e.target.value))}
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

export default ProjectsSection;
