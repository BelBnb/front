/* eslint-disable prefer-regex-literals */
import FormWrapper from "@/elements/auth/formWrapper/formWrapper";
import InputElement from "@/elements/auth/inputElement/InputElement";
import SubmitButton from "@/elements/common/submitButton/button";
import { AppDispatch } from "@/redux/store";
import { signUserIn } from "@/redux/thunks/auth/signInThunk";
import { SignInDto } from "@/types/dto/user";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import styles from "./styles.module.scss";

interface errors {
  email: string;
  password: string;
}

const LoginForm = () => {
  const [user, setUser] = useState<SignInDto>({ email: "", password: "" });
  const [apiStatus, setApiStatus] = useState(false);
  const [errors, setErrors] = useState<errors>({ email: "", password: "" });
  const emailRef = React.createRef<HTMLInputElement>();
  const passRef = React.createRef<HTMLInputElement>();

  const validEmailRegex = RegExp(
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
  );
  const dispatch: AppDispatch = useDispatch();

  const handleLogin = () => {
    const { email, password } = user;
    console.log(emailRef?.current?.value, passRef?.current?.value);
    if (!email && !password) {
      toast.warn("Empty fields");
      return;
    }
    dispatch(
      signUserIn({
        user: { email, password },
        setStatus(e) {
          setApiStatus(e);
        },
      })
    );
  };

  const handleInput = (key: keyof SignInDto, value: string) => {
    setUser((prevState) => ({ ...prevState, [key]: value }));
  };

  const emailChange = (val: string) => {
    errors.email = validEmailRegex.test(val) ? "" : "Email is not valid!";
    handleInput("email", val);
  };
  const passwordChange = (val: string) => {
    errors.password = val.length < 8 ? "Password must be at least 8 characters long!" : "";
    handleInput("password", val);
  };

  return (
    <FormWrapper>
      <div>
        <div className={styles.inputs}>
          <div className={errors.email.length > 0 ? styles.error : ""}>
            <InputElement ref={emailRef} type="text" placeholder="Email" onChange={emailChange} />
            <span>{errors.email.length > 0 && <span className="error">{errors.email}</span>}</span>{" "}
          </div>
          <div className={errors.password.length > 0 ? styles.error : ""}>
            <InputElement ref={passRef} type="password" placeholder="Password" onChange={passwordChange} />
            <span>{errors.password.length > 0 && <span className="error">{errors.password}</span>}</span>
          </div>
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
        <div className={styles.buttonsContainer}>
          <SubmitButton text="Login" onClick={() => handleLogin()} />
        </div>
      </div>
    </FormWrapper>
  );
};

export default LoginForm;
