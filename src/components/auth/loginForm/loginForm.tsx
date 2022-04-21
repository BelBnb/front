import FormWrapper from "@/elements/auth/formWrapper/formWrapper";
import InputElement from "@/elements/auth/inputElement/InputElement";
import CoolLabel from "@/elements/common/coolLabel/coolLabel";
import GoogleButton from "@/elements/common/googleButton/googleButton";
import SubmitButton from "@/elements/common/submitButton/button";
import { SignInDto } from "@/types/dto/user";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import LoginButtons from "./loginButtons/loginButtons";
import styles from "./styles.module.scss";

const LoginForm = () => {
  const [user, setUser] = useState<SignInDto>({email:"", password:""})

  const handleInput = (key: keyof SignInDto, value: string) => {
    setUser(prevState => ({...prevState, [key]: value}))
    console.log(key, value, user)
  }

  const emailChange = (val: string) => handleInput("email", val);
  const passwordChange = (val: string) => handleInput("password", val);


  return (
    <FormWrapper>
      <div>
        <div className={styles.inputs}>
          <InputElement placeholder="Email" onChange={emailChange}/>
          <InputElement placeholder="Password" onChange={passwordChange}/>
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
        <SubmitButton text="Login" onClick={() => console.log("prikol")} />
        <CoolLabel>OR</CoolLabel>
        <GoogleButton />
      </div>
      </div>
    </FormWrapper>
  );
};

export default LoginForm;
