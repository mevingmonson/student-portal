import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import styles from "./index.module.scss";
// import { withRouter } from "react-router";

const AdminHeader = ({ history }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();
  let isActive = false;
  if (location.pathname.includes("/dashboard")) {
    isActive = true;
  }

  const logOutHandler = () => {};

  const gotoDashBoard = () => {
    history.push("/dashboard");
  };
  const gotoFAQ = () => {
    // window.location.href = process.env.REACT_APP_FAQ_LINK;
    window.open(process.env.REACT_APP_FAQ_LINK, "_blank");
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <div className={styles.block1}>
          {/* <img
            className={styles.headerIcon}
            alt="logo"
            src="/assets/logo.svg"
          /> */}
          <p></p>
          <div className={styles.profileContainer}>
            <div className={styles.profileName}>John Mike</div>
            <div
              role="button"
              tabIndex="0"
              className={styles.dropdownContainer}
              onClick={() => {
                setDropdownOpen(!isDropdownOpen);
              }}
              onKeyPress={() => {
                setDropdownOpen(!isDropdownOpen);
              }}
            >
              <svg
                className={styles.dropdownIcon}
                style={{ ...(isDropdownOpen && { transform: "scaleY(-1)" }) }}
                viewBox="0 0 26 26"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="13" cy="13" r="13" fill="#8890B8" />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M8.85976 10.7726C8.60332 10.5322 8.20428 10.5322 7.94784 10.7726L7.39052 11.2951C7.10957 11.5585 7.10957 12.0044 7.39052 12.2678L11.9867 16.5767L12.544 17.0992C12.8005 17.3396 13.1995 17.3396 13.456 17.0992L14.0133 16.5767C14.0134 16.5766 14.0135 16.5765 14.0137 16.5764L18.6095 12.2678C18.8904 12.0044 18.8904 11.5585 18.6095 11.2951L18.0521 10.7726C17.7957 10.5322 17.3967 10.5322 17.1402 10.7726L13 14.6541L8.85976 10.7726Z"
                  fill="white"
                />
              </svg>
              {isDropdownOpen && (
                <>
                  <div
                    aria-label="closeDropdown"
                    role="button"
                    tabIndex="0"
                    className={styles.scrim}
                    onClick={() => {
                      setDropdownOpen(false);
                    }}
                    onKeyPress={() => {
                      setDropdownOpen(false);
                    }}
                  />
                  <div className={styles.dropdown}>
                    <button
                      type="button"
                      className={styles.logoutButton}
                      onClick={logOutHandler}
                    >
                      Log Out
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        <div className={styles.block2}>
          <div className={styles.navLinks}>
            <NavLink
              className={`${styles.link} ${isActive ? styles.activeLink : ""}`}
              to="/dashboard"
            >
              Employee Portal
            </NavLink>

            {/* <NavLink
              activeClassName={styles.activeLink}
              className={styles.link}
              to="/client-management"
            >          
        
            </NavLink> */}
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
