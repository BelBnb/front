import React from "react";
import appWhiteLogo from "src/assets/images/logos/white-logo.svg";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { User } from "@/redux/reducers/userReducer";
import styles from "./styles.module.scss";
import headerLinks from "../router/constants/headerLinks";
import ProfileButton from "./ProfileButton/profileButton";

const Header = () => {
  const user = useSelector<RootState, User>((state) => state.user);
  return (
    <div className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <div className={styles.logoContainer}>
          <div className={styles.logoImage}>
            <img src={appWhiteLogo} alt="White Logo" />
          </div>
          <span className={styles.logoCaption}>NB</span>
          <div className={styles.linksContainer}>
            {headerLinks.map((el) => (
              <NavLink
                to={el.value}
                className={({ isActive }) => (isActive ? `${styles.active} ${styles.link} ` : `${styles.link} `)}
              >
                {el.label}
              </NavLink>
            ))}
          </div>
        </div>
        {!user.authorized ? (
          <div className={styles.buttons}>
            <NavLink
              to="/sign-in"
              className={({ isActive }) =>
                isActive ? `${styles.active} ${styles.link} ` : `${styles.link}  ${styles.highlight}`
              }
            >
              Sign in
            </NavLink>
            <NavLink
              to="/sign-up"
              className={({ isActive }) => (isActive ? `${styles.active} ${styles.link} ` : `${styles.link} `)}
            >
              Sign up
            </NavLink>
          </div>
        ) : (
          <ProfileButton user={user} />
        )}
      </div>
    </div>
  );
};

export default Header;
