import React from "react";
import googleIcon from "@/assets/images/logos/googleIcon.svg";
import styles from "./styles.module.scss";

const GoogleButton = () => (
  <button type="button" className={styles.googleButton}>
    <div>
      <img src={googleIcon} alt="google icon" />
    </div>
    <span>Login with google</span>
  </button>
);

export default GoogleButton;
