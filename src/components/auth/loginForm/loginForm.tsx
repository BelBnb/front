import FormWrapper from "@/elements/auth/formWrapper/formWrapper";
import InputElement from "@/elements/auth/inputElement/InputElement";
import CoolLabel from "@/elements/common/coolLabel/coolLabel";
import GoogleButton from "@/elements/common/googleButton/googleButton";
import SubmitButton from "@/elements/common/submitButton/button";
import { AppDispatch } from "@/redux/store";
import { signUserIn } from "@/redux/thunks/auth/signInThunk";
import { SignInDto } from "@/types/dto/user";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import styles from "./styles.module.scss";

const LoginForm = () => {
  const [user, setUser] = useState<SignInDto>({ email: "", password: "" });
  const emailRef = React.createRef<HTMLInputElement>();
  const passRef = React.createRef<HTMLInputElement>();

  const dispatch: AppDispatch = useDispatch();

  const handleLogin = () => {
    const { email, password } = user;
    console.log(emailRef?.current?.value, passRef?.current?.value);
    if (!email && !password) {
      toast.warn("Empty fields");
      return;
    }
    dispatch(signUserIn({ email, password }));
  };

  const handleInput = (key: keyof SignInDto, value: string) => {
    setUser((prevState) => ({ ...prevState, [key]: value }));
  };

  const emailChange = (val: string) => handleInput("email", val);
  const passwordChange = (val: string) => handleInput("password", val);

  return (
    <FormWrapper>
      <div>
        <div className={styles.inputs}>
          <InputElement ref={emailRef} type="text" placeholder="Email" onChange={emailChange} />
          <InputElement ref={passRef} type="password" placeholder="Password" onChange={passwordChange} />
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
          <CoolLabel>OR</CoolLabel>
          <GoogleButton />
        </div>
      </div>
    </FormWrapper>
  );
};

export default LoginForm;
