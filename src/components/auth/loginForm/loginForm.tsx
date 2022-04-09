import React from "react";
import { Link } from "react-router-dom";
import LoginButtons from "./loginButtons/loginButtons";
import styles from "./styles.module.scss";

const LoginForm = () => (
  <div className={styles.loginFromContainer}>
    <div className={styles.inputContainer}>
      <input autoComplete="none" type="text" className={styles.loginInput} placeholder="Email" />
      <span className={styles.loginInputBotom} />
    </div>
    <div className={styles.inputContainer}>
      <input type="password" className={styles.loginInput} placeholder="Password" />
      <span className={styles.loginInputBotom} />
    </div>
    <div className={styles.bottomItems}>
      <span>
        <label htmlFor="remember">
          <input name="remember" type="checkbox" className={styles.loginInput} />
          Remember me
        </label>
      </span>
      <Link to="/password-reset">Forget password?</Link>
    </div>
    <div>
      <LoginButtons />
    </div>
  </div>
);

export default LoginForm;
