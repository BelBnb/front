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
  <input
    placeholder={placeholder || ""}
    onChange={(e) => valueSetter(e.target.value)}
    value={value}
    className={styles.input}
    type="text"
  />
);

export default Searchbar;
