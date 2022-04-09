import React from "react";
import appWhiteLogo from "src/assets/images/logos/white-logo.svg";
import { Link } from "react-router-dom";
import styles from "./styles.module.scss";
import headerLinks from "../router/constants/headerLinks";

const Header = () => (
  <div className={styles.headerContainer}>
    <div className={styles.headerContent}>
      <div className={styles.logoContainer}>
        <div className={styles.logoImage}>
          <img src={appWhiteLogo} alt="White Logo" />
        </div>
        <span className={styles.logoCaption}>NB</span>
      </div>
      <div className={styles.linksContainer}>
        {headerLinks.map((el) => (
          <Link to={el.value} className={`${styles.link} ${styles.highlight}`}>
            {el.label}
          </Link>
        ))}
      </div>
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
    </div>
  </div>
);

export default Header;
