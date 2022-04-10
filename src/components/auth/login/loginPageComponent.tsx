/* eslint-disable react/no-unescaped-entities */
import React from "react";
import signInImage from "@/assets/images/backgrounds/sign-in.jpg";
import usePageLoad from "@/hooks/pageLoadHooh/pageLoadHook";
import LoginForm from "../loginForm/loginForm";
import styles from "./styles.module.scss";

const LoginPage = () => {
  const { loadStyle, onImageLoad } = usePageLoad();
  return (
    <div className={styles.loginPage} style={loadStyle}>
      <div className={styles.row}>
        <div className={styles.leftCol}>
          <span className={styles.loginLabel}>Let's Get Personal.</span>
          <LoginForm />
        </div>
      </div>
      <img
        src={signInImage}
        className={styles.bgImage}
        style={loadStyle}
        alt="beautiful"
        onLoad={() => onImageLoad()}
      />
    </div>
  );
};

export default LoginPage;
