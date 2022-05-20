import OutlinedButton from "@/elements/common/buttons/outlinedButton";
import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.scss";

const NotFound = () => {
  const nav = useNavigate();

  const hableBack = () => {
    nav("/");
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.leftCol}>
        <div>
          <span>You look lonely</span>
          <span>Location couldn't be found</span>
          <OutlinedButton outlineLabel="Go back" onClick={hableBack} />
        </div>
      </div>
      <div className={styles.rightCol}>
        <span>404</span>
      </div>
    </div>
  );
};

export default NotFound;
