import { setUser } from "@/redux/actions/userActions";
import { User } from "@/redux/reducers/userReducer";
import { AppDispatch } from "@/redux/store";
import { userInitState } from "@/types/redux/initStates";
import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.scss";

export interface ProfileButtonProps {
  user: User;
}

const ProfileButton: React.FC<ProfileButtonProps> = ({ user }) => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHanlder = () => {
    localStorage.clear();
    dispatch(setUser(userInitState));
    navigate("/");
  };

  return (
    <div role="button" className={styles.profileContainer} tabIndex={0}>
      <span className={styles.name}>{`${user.lastName} ${user.firstName[0]}.`}</span>
      <div className={styles.imgContainer}>
        <img src={user.profilePic} alt="" />
      </div>
      <div className={styles.dropdown}>
        <Link className={styles.drpItem} to="/profile">
          Profile
        </Link>
        <button type="button" className={styles.drpItem} onClick={logoutHanlder}>
          Log out
        </button>
      </div>
    </div>
  );
};

export default ProfileButton;
