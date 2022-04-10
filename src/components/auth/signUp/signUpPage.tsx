import React from "react";
import signUpImage from "@/assets/images/backgrounds/signUp.jpg";
import usePageLoad from "@/hooks/pageLoadHooh/pageLoadHook";
import SignUpForm from "../signUpForm/signUpForm";
import styles from "./style.module.scss";

const SignUpPage = () => {
  const { loadStyle, onImageLoad } = usePageLoad();
  return (
    <div className={styles.signUpPageContainer} style={loadStyle}>
      <div className={styles.row}>
        <div className={styles.leftCol}>
          <span className={styles.loginLabel}>Let's Get Personal.</span>
          <SignUpForm />
        </div>
      </div>
      <img
        style={{ zIndex: -1 }}
        src={signUpImage}
        className={styles.bgImage}
        alt="beautiful"
        onLoad={() => onImageLoad()}
      />
    </div>
  );
};

export default SignUpPage;
