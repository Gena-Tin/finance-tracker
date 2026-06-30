import styles from "./Filters.module.css";
import { IconSearch } from "../../ui/SvgLib";

import { SearchInputProps } from "./types";

export const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  placeholder,
}) => {
  return (
    <>
      <span style={{ fontSize: "20px" }}>
        <IconSearch className="icon-svg" />
      </span>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={styles.searchInput}
      />
    </>
  );
};
