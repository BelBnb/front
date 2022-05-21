import FormWrapper from "@/elements/auth/formWrapper/formWrapper";
import InputElement from "@/elements/auth/inputElement/InputElement";
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

type Errors = Partial<SignUpDto>;

const SignUpForm = () => {
  const [dto, setDto] = useState<SignUpDto>({
    email: "",
    password: "",
    phone: "",
    sex: 0,
    birthDate: new Date(),
    firstName: "",
    lastName: "",
  });
  const [signUpStatus, setSignUpStatus] = useState(false);
  const [errors, setErrors] = useState<Errors>({});

  const user = useSelector<RootState, User>((app) => app.user);

  const onChangeDto = (value: string | number | Date, propName: keyof SignUpDto) => {
    setDto((prevState) => ({ ...prevState, [propName]: value }));
  };

  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const handleSubmit = () => {
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
          <InputElement onChange={(e) => onChangeDto(e, "email")} placeholder="Email" type="text" />
          <InputElement onChange={(e) => onChangeDto(e, "password")} type="password" placeholder="Password" />
        </div>
        <div className={styles.columns}>
          <div className={styles.singleColumn}>
            <div className={styles.columnsNested}>
              <InputElement type="phone" onChange={(e) => onChangeDto(e, "phone")} placeholder="Phone" />
              <div>
                <select onChange={(e) => onChangeDto(e.currentTarget.value, "sex")}>
                  <option value="0">Male</option>
                  <option value="1">Female</option>
                </select>
              </div>
            </div>
            <div className={styles.columnsNested}>
              <InputElement onChange={(e) => onChangeDto(e, "firstName")} placeholder="First name" type="text" />
              <InputElement onChange={(e) => onChangeDto(e, "lastName")} placeholder="Last name" type="text" />
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
