/* eslint-disable prefer-regex-literals */
import FormWrapper from "@/elements/auth/formWrapper/formWrapper";
import InputElement from "@/elements/auth/inputElement/InputElement";
import InputErrorContainer from "@/elements/common/InputErrorContainer/InputErrorContainer";
import SubmitButton from "@/elements/common/submitButton/button";
import { AppDispatch, RootState } from "@/redux/store";
import { signUserUp } from "@/redux/thunks/auth/signUpThunk";
import { SignUpDto } from "@/types/dto/user";
import { User } from "@/types/redux/initStates";
import React, { useEffect, useState } from "react";
import { Calendar } from "react-date-range";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.scss";

type Errors = {
  email: string;
  password: string;
  phone: string;
  firstName: string;
  lastName: string;
};

const SignUpForm = () => {
  const [dto, setDto] = useState<SignUpDto>({
    email: "",
    password: "",
    phone: "",
    sex: 0,
    birthDate: new Date("2001-09-06"),
    firstName: "",
    lastName: "",
  });
  const [signUpStatus, setSignUpStatus] = useState(false);
  const [errors, setErrors] = useState<Errors>({ email: "", firstName: "", lastName: "", password: "", phone: "" });

  const user = useSelector<RootState, User>((app) => app.user);

  const validEmailRegex = RegExp(
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
  );
  const validPhoneRegex = RegExp(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im);

  const onChangeDto = (value: string | number | Date, propName: keyof SignUpDto) => {
    setDto((prevState) => ({ ...prevState, [propName]: value }));
  };

  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const handleEmailChange = (e: string) => {
    errors.email = validEmailRegex.test(e) ? "" : "Email is not valid!";
    onChangeDto(e, "email");
  };
  const handlePasswordChange = (e: string) => {
    errors.password = e.length < 8 ? "Password must be at least 8 characters long!" : "";
    onChangeDto(e, "password");
  };
  const handlePhoneChange = (e: string) => {
    errors.phone = validPhoneRegex.test(e) ? "" : "Phone is not valid";
    onChangeDto(e, "phone");
  };
  const handleFNameChange = (e: string) => {
    errors.firstName = e.length > 0 ? "" : "Field is required";
    onChangeDto(e, "firstName");
  };
  const handleLNameChange = (e: string) => {
    errors.lastName = e.length > 0 ? "" : "Field is required";

    onChangeDto(e, "lastName");
  };

  const handleSubmit = () => {
    const cond = Object.keys(errors).reduce(
      (prev: number, current: string) => prev + (errors[current].length > 0 ? 1 : 0),
      0
    );
    if (cond) {
      return;
    }
    dispatch(
      signUserUp({
        user: dto,
        setStatus(e) {
          setSignUpStatus(e);
        },
      })
    );
  };

  useEffect(() => {
    if (signUpStatus) {
      navigate("/sign-in");
    }
  }, [signUpStatus]);

  console.log(dto);
  return (
    <FormWrapper>
      <div className={styles.inputContainer}>
        <div className={styles.columns}>
          <InputErrorContainer isErrorr={errors.email?.length > 0} message={errors.email}>
            <InputElement onChange={handleEmailChange} placeholder="Email" type="text" />
          </InputErrorContainer>
          <InputErrorContainer isErrorr={errors.password.length > 0} message={errors.password}>
            <InputElement onChange={handlePasswordChange} type="password" placeholder="Password" />
          </InputErrorContainer>
        </div>
        <div className={styles.columns}>
          <div className={styles.singleColumn}>
            <div className={styles.columnsNested}>
              <InputErrorContainer isErrorr={errors.phone.length > 0} message={errors.phone}>
                <InputElement type="phone" onChange={handlePhoneChange} placeholder="Phone" />
              </InputErrorContainer>
              <div>
                <select onChange={(e) => onChangeDto(e.currentTarget.value, "sex")}>
                  <option value="0">Male</option>
                  <option value="1">Female</option>
                </select>
              </div>
            </div>
            <div className={styles.columnsNested}>
              <InputErrorContainer isErrorr={errors.firstName.length > 0} message={errors.firstName}>
                <InputElement onChange={handleFNameChange} placeholder="First name" type="text" />
              </InputErrorContainer>
              <InputErrorContainer isErrorr={errors.lastName.length > 0} message={errors.lastName}>
                <InputElement onChange={handleLNameChange} placeholder="Last name" type="text" />
              </InputErrorContainer>
            </div>
          </div>
          <Calendar color="#2d2d2d" date={dto.birthDate} onChange={(e) => onChangeDto(e, "birthDate")} />
        </div>
      </div>

      <div className={styles.bottomItems}>
        <SubmitButton text="sign up" onClick={() => handleSubmit()} />
      </div>
    </FormWrapper>
  );
};

export default SignUpForm;
