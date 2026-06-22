import styles from "./Filters.module.css";
import Checkbox from "../../ui/Checkbox/Checkbox";
import { IconOptions } from "../../ui/SvgLib";

import { CategoryFilterProps } from "./types";

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  filterCatIds,
  toggleFilterCategory,
  setIsCategoryManagerOpen,
  settingCategoriesLabel,
}) => {
  return (
    <>
      <div className={styles.categoryList}>
        <button
          type="button"
          className={styles.settingsButton}
          onClick={() => setIsCategoryManagerOpen(true)}
          aria-label={settingCategoriesLabel}
        >
          <IconOptions className="icon-svg" />
        </button>

        {categories.map((cat) => {
          const isSelected = filterCatIds.includes(cat.id);

          return (
            <div
              key={cat.id}
              onClick={() => toggleFilterCategory(cat.id)}
              className={`${styles.categoryCard} ${
                isSelected ? styles.categoryCardActive : ""
              }`}
            >
              <Checkbox
                type="checkbox"
                checked={isSelected}
                onChange={() => toggleFilterCategory(cat.id)}
                readOnly
                style={{ cursor: "pointer" }}
              />
              {cat.icon} {cat.name}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default CategoryFilter;
