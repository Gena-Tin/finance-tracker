import { IconSearch } from "../../ui/SvgLib";
import styles from "./Filters.module.css";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}

const SearchInput: React.FC<SearchInputProps> = ({
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

export default SearchInput;
