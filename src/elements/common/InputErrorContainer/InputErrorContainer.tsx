import React from "react";
import styles from "./styles.module.scss";

interface ErrorContaienrProps {
  isErrorr: boolean;
  message: string;
}

const InputErrorContainer: React.FC<ErrorContaienrProps> = ({ isErrorr, message, children }) => (
  <div className={isErrorr ? styles.error : ""}>
    {children}
    {isErrorr && <span>{message}</span>}
  </div>
);

export default InputErrorContainer;
