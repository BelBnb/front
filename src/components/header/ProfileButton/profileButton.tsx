import { User } from "@/redux/reducers/userReducer";
import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.scss";

export interface ProfileButtonProps {
  user: User;
}

const ProfileButton: React.FC<ProfileButtonProps> = ({ user }) => {
  const navigate = useNavigate();
  const clickHandler = () => {
    navigate("/profile");
  };

  return (
    <div role="button" className={styles.profileContainer} onClick={clickHandler} onKeyDown={clickHandler} tabIndex={0}>
      <span className={styles.name}>{`${user.lastName} ${user.firstName[0]}.`}</span>
      <div className={styles.imgContainer}>
        <img src={user.profilePic} alt="" />
      </div>
    </div>
  );
};

export default ProfileButton;
