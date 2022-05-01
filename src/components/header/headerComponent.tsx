import React from "react";
import appWhiteLogo from "src/assets/images/logos/white-logo.svg";
import { Link } from "react-router-dom";
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
              <Link to={el.value} className={`${styles.link} ${styles.highlight}`}>
                {el.label}
              </Link>
            ))}
          </div>
        </div>
        {!user.authorized ? (
          <div className={styles.buttons}>
            <Link to="/sign-in" className={`${styles.link} ${styles.highlight}`}>
              Sign in
            </Link>
            <button type="button">
              <Link to="/sign-up" className={styles.link}>
                Sign up
              </Link>
            </button>
          </div>
        ) : (
          <ProfileButton user={user} />
        )}
      </div>
    </div>
  );
};

export default Header;
