/* eslint-disable jsx-a11y/label-has-associated-control */
import ColoredButton from "@/elements/common/buttons/buttons";
import React from "react";
import styles from "./styles.module.scss";

export type hotelFiltersType = {
  city: string;
  priceL: number;
  priceB: number;
};

interface HotelFiltersProps {
  setValue: (e: string, prop: keyof hotelFiltersType) => void;
  city: string;
  priceL: number;
  priceB: number;
  handleApply: () => void;
}

const HotelFilters = React.forwardRef<HTMLInputElement, HotelFiltersProps>((props, ref) => {
  const { city, priceL, priceB, setValue, handleApply } = props;
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>, propName: keyof hotelFiltersType) => {
    setValue(e.currentTarget.value || "", propName);
  };

  return (
    <div className={styles.inputWrapper} ref={ref}>
      <div className={styles.group}>
        <input type="text" value={city} onChange={(e) => changeHandler(e, "city")} />
        <label className={styles.label}>City</label>
      </div>
      <div className={styles.group}>
        <input type="number" min={0} max={100000} value={priceB} onChange={(e) => changeHandler(e, "priceB")} />
        <label className={styles.label}>Price from</label>
      </div>
      <div className={styles.group}>
        <input type="number" min={0} max={100000} value={priceL} onChange={(e) => changeHandler(e, "priceL")} />
        <label className={styles.label}>Price to</label>
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
});
export default HotelFilters;
