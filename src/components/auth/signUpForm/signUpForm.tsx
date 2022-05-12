import FormWrapper from "@/elements/auth/formWrapper/formWrapper";
import InputElement from "@/elements/auth/inputElement/InputElement";
import SubmitButton from "@/elements/common/submitButton/button";
import React from "react";
import styles from "./styles.module.scss";

const SignUpForm = () => (
  <FormWrapper>
    <div className={styles.inputContainer}>
      <InputElement placeholder="Email" />
      <InputElement placeholder="Password" />
      <InputElement placeholder="Phone (optional)" />
      <InputElement placeholder="First name" />
      <InputElement placeholder="Last name" />
      <InputElement placeholder="Sex" />
      <InputElement placeholder="Birth date" />
    </div>

    <div className={styles.bottomItems}>
      <SubmitButton
        text="sign up"
        onClick={() => {
          console.log("signUp");
        }}
      />
    </div>
  </FormWrapper>
);

export default SignUpForm;
