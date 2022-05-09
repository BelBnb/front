import React from "react";
import ReactStarsRating from "react-awesome-stars-rating";
import styles from "./styles.module.scss";

interface StarsComponentProps {
  isEdit: boolean;
  onChange: (e: number) => void;
  value: number;
}

const StarsComponent: React.FC<StarsComponentProps> = ({ isEdit, onChange, value }) => (
  <div className={styles.prikol}>
    <ReactStarsRating
      secondaryColor="#d7d7d7"
      primaryColor="#2a2a2a"
      isEdit={isEdit}
      onChange={onChange}
      value={value}
    />
  </div>
);

export default StarsComponent;
