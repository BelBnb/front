import React from "react";
import styles from "./styles.module.scss";

interface SubmitButtonProps {
  text: string;
  onClick: () => void;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ text, onClick }) => (
  <button type="button" onClick={onClick} className={styles.submitButton}>
    {text}
  </button>
);

export default SubmitButton;
