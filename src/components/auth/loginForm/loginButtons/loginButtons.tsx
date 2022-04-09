import React from "react";
import googleIcon from "@/assets/images/logos/googleIcon.svg";
import styles from "./style.module.scss";

const LoginButtons = () => (
  <div className={styles.buttonsContainer}>
    <button type="button" className={styles.loginButton}>
      Login
    </button>
    <span>OR</span>
    <button type="button" className={styles.googleButton}>
      <div>
        <img src={googleIcon} alt="google icon" />
      </div>
      <span>Login with google</span>
    </button>
  </div>
);

export default LoginButtons;
