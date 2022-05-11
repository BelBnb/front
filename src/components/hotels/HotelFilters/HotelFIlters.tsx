/* eslint-disable jsx-a11y/label-has-associated-control */
import ColoredButton from "@/elements/common/buttons/buttons";
import React from "react";
import styles from "./styles.module.scss";

export type hotelFiltersType = {
  city: string;
  priceL: string;
  priceB: string;
};

interface HotelFiltersProps {
  setValue: (e: string, prop: keyof hotelFiltersType) => void;
  city: string;
  priceL: string;
  priceB: string;
  handleApply: () => void;
}

const HotelFilters: React.FC<HotelFiltersProps> = ({ city, priceL, priceB, setValue, handleApply }) => {
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>, propName: keyof hotelFiltersType) => {
    setValue(e.currentTarget.value || "", propName);
  };
  return (
    <div className={styles.inputWrapper}>
      <div className={styles.group}>
        <input type="text" value={city} onChange={(e) => changeHandler(e, "city")} />
        <label>City</label>
      </div>
      <div className={styles.group}>
        <input type="text" value={priceL} onChange={(e) => changeHandler(e, "priceL")} />
        <label>Price from</label>
      </div>
      <div className={styles.group}>
        <input type="text" value={priceB} onChange={(e) => changeHandler(e, "priceB")} />
        <label>Price to</label>
      </div>
      <div className={styles.button}>
        <ColoredButton
          coloredLabel="Apply"
          onClick={() => {
            handleApply();
          }}
        />
      </div>
    </div>
  );
};

export default HotelFilters;
