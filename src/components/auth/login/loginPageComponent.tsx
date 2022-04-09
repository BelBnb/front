/* eslint-disable react/no-unescaped-entities */
import React from "react";
import signInImage from "@/assets/images/backgrounds/sign-in.jpg";
import LoginForm from "../loginForm/loginForm";
import styles from "./styles.module.scss";

const LoginPage = () => (
  <>
    <div className={styles.loginPage}>
      <div className={styles.row}>
        <div className={styles.leftCol}>
          <span className={styles.loginLabel}>Let's Get Personal.</span>
          <LoginForm />
        </div>
      </div>
    </div>
    <img src={signInImage} className={styles.bgImage} alt="beautiful" />
  </>
);

export default LoginPage;
