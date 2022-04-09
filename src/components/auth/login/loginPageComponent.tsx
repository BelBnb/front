/* eslint-disable react/no-unescaped-entities */
import React from "react";
import LoginForm from "../loginForm/loginForm";
import styles from "./styles.module.scss";

const LoginPage = () => (
  <div className={styles.loginPage}>
    <div className={styles.row}>
      <div className={styles.leftCol}>
        <span className={styles.loginLabel}>Let's Get Personal.</span>
        <LoginForm />
      </div>
    </div>
  </div>
);

export default LoginPage;
