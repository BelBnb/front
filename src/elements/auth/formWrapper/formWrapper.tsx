import React from "react";
import styles from "./styles.module.scss";

const FormWrapper: React.FC = ({ children }) => <div className={styles.formWrapperContainer}>{children}</div>;

export default FormWrapper;
