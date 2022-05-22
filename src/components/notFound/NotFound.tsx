import OutlinedButton from "@/elements/common/buttons/outlinedButton";
import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.scss";

interface ErrorComponentProps {
  topCaption: string;
  bottomCaption: string;
  code: number;
}

const ErrorComponent: React.FC<ErrorComponentProps> = ({ topCaption, bottomCaption, code }) => {
  const nav = useNavigate();

  const hableBack = () => {
    nav("/");
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.leftCol}>
        <div>
          <span>{topCaption}</span>
          <span>{bottomCaption}</span>
          <OutlinedButton outlineLabel="Go back" onClick={hableBack} />
        </div>
      </div>
      <div className={styles.rightCol}>
        <span>{code}</span>
      </div>
    </div>
  );
};

export default ErrorComponent;
