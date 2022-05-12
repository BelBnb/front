import searchIcon from "@/assets/images/icons/search.png";
import styles from "./styles.module.scss";

const Searchbar = ({
  placeholder,
  valueSetter,
  value,
}: {
  placeholder: string;
  valueSetter: (s: string) => void;
  value: string;
}) => (
  <div className={styles.searchbarContainer}>
    <input
      placeholder={placeholder || ""}
      onChange={(e) => valueSetter(e.target.value)}
      value={value}
      className={styles.input}
      type="text"
    />
    <img src={searchIcon} alt="search" />
  </div>
);

export default Searchbar;
