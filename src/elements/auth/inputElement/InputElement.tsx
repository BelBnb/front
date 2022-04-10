import React from "react";
import styles from "./styles.module.scss";

interface InputElementProps {
  placeholder: string;
}

const InputElement: React.FC<InputElementProps> = ({ placeholder }) => (
  <div className={styles.inputContainer}>
    <input type="password" className={styles.loginInput} placeholder={placeholder} />
    <span className={styles.loginInputBotom} />
  </div>
);

export default InputElement;
