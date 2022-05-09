import React from "react";
import styles from "./styles.module.scss";

interface UserInputsProps {
  firstNameValue: string;
  setFirstNameValue: (e: string) => void;
  lastNameValue: string;
  setLastNameValue: (e: string) => void;
}

const UserInputs: React.FC<UserInputsProps> = ({
  firstNameValue,
  setFirstNameValue,
  lastNameValue,
  setLastNameValue,
}) => (
  <div className={styles.content}>
    <input
      type={"text"}
      placeholder="First Name"
      name="text"
      value={firstNameValue}
      onChange={(event) => setFirstNameValue(event?.target?.value || "")}
    />
    <input
      type={"text"}
      placeholder="Last Name"
      name="text"
      value={lastNameValue}
      onChange={(event) => setLastNameValue(event?.target?.value || "")}
    />
  </div>
);

export default UserInputs;
