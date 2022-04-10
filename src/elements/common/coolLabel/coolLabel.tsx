import React from "react";
import styles from "./styles.module.scss";

const CoolLabel: React.FC = ({ children }) => (
  <div className={styles.coolLine}>
    <span className={styles.line} />
    <span className={styles.text}>{children}</span>
    <span className={styles.line} />
  </div>
);

export default CoolLabel;
