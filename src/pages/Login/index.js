/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
// import FormData from "form-data";
import EmailIcon from "@mui/icons-material/EmailOutlined";
import LockIcon from "@mui/icons-material/LockOutlined";

// import AuthContext from "../../context";
// import appServices from "../../api/appServices";
import styles from "./index.module.scss";

function FormInput({ icon: Icon, label, name, register, ...props }) {
  return (
    <div className={styles.formInputContainer}>
      <label className={styles.formInputLabel} htmlFor={name}>
        {label}
      </label>
      <div className={styles.formInputContent}>
        <input
          className={styles.formInputField}
          id={name}
          name={name}
          required
          // ref={register}
          {...props}
        />
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label className={styles.formInputIconContainer} htmlFor={name}>
          <Icon className={styles.formInputIcon} />
        </label>
      </div>
    </div>
  );
}

FormInput.propTypes = {
  icon: PropTypes.node.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  register: PropTypes.func.isRequired,
};

export default function Login({ history }) {
  // const {
  //   getAccessToken,
  //   setAccessToken,
  //   setSignIn,
  //   setUserDetails,
  //   setUserDetailsOnDevice,
  // } = useContext(AuthContext);
  const { register, handleSubmit } = useForm();
  const [isSigningin, setSigningIn] = useState(false);
  const [isInvalidCred, setInvalidCred] = useState({
    invalid: false,
    message: "",
  });

  const signIn = async ({ username, password }) => {
    setInvalidCred({
      invalid: false,
      message: "",
    });
    setSigningIn(true);

    const formdata = new FormData();

    formdata.append("username", username);
    formdata.append("password", password);
  };

  return (
    <div className={styles.page}>
      <div className={styles.pageContent}>
        <div className={styles.imageContainer}>
          {/* <img className={styles.icon} alt="logo" src="/assets/logo.svg" /> */}
        </div>
        <div className={styles.formContainer}>
          <form
            className={styles.form}
            onSubmit={handleSubmit((data) => {
              signIn(data);
            })}
          >
            <h4 className={styles.formSubtitle}>Welcome!</h4>
            <h2 className={styles.formTitle}>Employee Portal</h2>
            <p className={styles.formDescription}>Please login to continue.</p>

            <FormInput
              disabled={isSigningin}
              icon={EmailIcon}
              label="E-Mail"
              placeholder="Email"
              name="username"
              register={register}
              type="text"
            />
            <FormInput
              disabled={isSigningin}
              icon={LockIcon}
              label="Password"
              placeholder="e.g.: X Æ A-12"
              name="password"
              register={register}
              type="password"
            />
            {isInvalidCred.invalid && (
              <div className={styles.invalidCredentials}>
                {isInvalidCred.message}
              </div>
            )}

            <input
              disabled={isSigningin}
              className={styles.formSubmitButton}
              type="submit"
              value={isSigningin ? "Signing in..." : "Sign In"}
            />

            <div className={styles.resetLink}>
              <div>Forgot Password?</div>
              <Link to="/forgot-password">Reset&nbsp;it&nbsp;here →</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

// Login.propTypes = {
//   history: PropTypes.instanceOf(Object).isRequired,
// };
