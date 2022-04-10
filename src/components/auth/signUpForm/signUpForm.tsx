import FormWrapper from "@/elements/auth/formWrapper/formWrapper";
import InputElement from "@/elements/auth/inputElement/InputElement";
import React from "react";
import LoginButtons from "../loginForm/loginButtons/loginButtons";

const SignUpForm = () => (
  <FormWrapper>
    <div>
      <InputElement placeholder="Email" />
      <InputElement placeholder="Password" />
    </div>

    <div>
      <LoginButtons />
    </div>
  </FormWrapper>
);

export default SignUpForm;
