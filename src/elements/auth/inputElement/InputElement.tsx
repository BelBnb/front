import React from "react";
import styles from "./styles.module.scss";

interface InputElementProps {
  placeholder: string;
  onChange: (val: string) => void;
}

const InputElement: React.FC<InputElementProps> = ({ placeholder, onChange }) => (
  <div className={styles.inputContainer}>
    <input type="password" className={styles.loginInput} onChange={(e) => onChange(e.currentTarget.value)} placeholder={placeholder} />
    <span className={styles.loginInputBotom} />
  </div>
);

export default InputElement;
