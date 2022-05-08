/* eslint-disable react/no-unescaped-entities */
import React, { useEffect } from "react";
import signInImage from "@/assets/images/backgrounds/sign-in.jpg";
import usePageLoad from "@/hooks/pageLoadHooh/pageLoadHook";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { User } from "@/types/redux/initStates";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.scss";
import LoginForm from "../loginForm/loginForm";

const LoginPage = () => {
  const user = useSelector<RootState, User>((el) => el.user);
  const navigate = useNavigate();
  useEffect(() => {
    console.log(user.authorized);
    if (user.authorized) {
      navigate("/");
    }
  }, []);

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
