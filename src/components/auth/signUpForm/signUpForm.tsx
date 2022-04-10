import FormWrapper from "@/elements/auth/formWrapper/formWrapper";
import InputElement from "@/elements/auth/inputElement/InputElement";
import CoolLabel from "@/elements/common/coolLabel/coolLabel";
import GoogleButton from "@/elements/common/googleButton/googleButton";
import SubmitButton from "@/elements/common/submitButton/button";
import React from "react";
import styles from "./styles.module.scss";

const SignUpForm = () => (
  <FormWrapper>
    <div className={styles.inputContainer}>
      <InputElement placeholder="Email" />
      <InputElement placeholder="Password" />
      <InputElement placeholder="Phone (optional)" />
    </div>

    <div className={styles.bottomItems}>
      <SubmitButton
        text="sign up"
        onClick={() => {
          console.log("signUp");
        }}
      />
      <CoolLabel>OR</CoolLabel>

      <GoogleButton />
    </div>
  </FormWrapper>
);

export default SignUpForm;
