import React from "react";
import styles from "./styles.module.scss";

interface InputElementProps {
  placeholder: string;
  onChange: (val: string) => void;
  type: string;
}

const InputElement = React.forwardRef<HTMLInputElement, InputElementProps>((props, ref) => {
  const { placeholder, onChange, type } = props;
  return (
    <div className={styles.inputContainer}>
      <input
        type={type}
        ref={ref}
        className={styles.loginInput}
        onChange={(e) => onChange(e.currentTarget.value)}
        placeholder={placeholder}
      />
      <span className={styles.loginInputBotom} />
    </div>
  );
});

export default InputElement;
