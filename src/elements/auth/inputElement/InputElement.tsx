import React from "react";
import styles from "./styles.module.scss";

interface InputElementProps {
  placeholder: string;
  onChange: (val: string) => void;
  type: string;
  min?: number;
  max?: number;
}

const InputElement = React.forwardRef<HTMLInputElement, InputElementProps>((props, ref) => {
  const { placeholder, min, max, onChange, type } = props;
  return (
    <div className={styles.inputContainer}>
      <input
        type={type}
        ref={ref}
        min={min}
        max={max}
        className={styles.loginInput}
        onChange={(e) => onChange(e.currentTarget.value)}
        placeholder={placeholder}
      />
      <span className={styles.loginInputBotom} />
    </div>
  );
});

export default InputElement;
