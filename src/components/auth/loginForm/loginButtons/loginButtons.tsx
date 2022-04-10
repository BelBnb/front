import React from "react";
import SubmitButton from "@/elements/common/submitButton/button";
import GoogleButton from "@/elements/common/googleButton/googleButton";
import styles from "./style.module.scss";

const LoginButtons = () => (
  <div className={styles.buttonsContainer}>
    <SubmitButton text="Login" onClick={() => console.log("prikol")} />
    <span>OR</span>
    <GoogleButton />
  </div>
);

export default LoginButtons;
