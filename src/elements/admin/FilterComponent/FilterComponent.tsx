import ColoredButton from "@/elements/common/buttons/buttons";
import React from "react";
import styles from "./styles.module.scss";

interface FilterProps {
  onFilter: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClear: () => void;
  filterText: string;
}

const FilterComponent: React.FC<FilterProps> = ({ onFilter, onClear, filterText }) => (
  <div className={styles.filterContainer}>
    <input type="text" value={filterText} placeholder="Filter by name" onChange={onFilter} />
    <ColoredButton coloredLabel="X" onClick={onClear} />
  </div>
);

export default FilterComponent;
