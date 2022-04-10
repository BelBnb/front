import FormWrapper from "@/elements/auth/formWrapper/formWrapper";
import InputElement from "@/elements/auth/inputElement/InputElement";
import React from "react";
import { Link } from "react-router-dom";
import LoginButtons from "./loginButtons/loginButtons";
import styles from "./styles.module.scss";

const LoginForm = () => (
  <FormWrapper>
    <div>
      <div className={styles.inputs}>
        <InputElement placeholder="Email" />
        <InputElement placeholder="Password" />
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
    </div>

    <div className={styles.bottomItems}>
      <LoginButtons />
    </div>
  </FormWrapper>
);

export default LoginForm;
