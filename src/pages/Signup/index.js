/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
// import FormData from "form-data";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import EmailIcon from "@mui/icons-material/EmailOutlined";
import LockIcon from "@mui/icons-material/LockOutlined";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";

// import AuthContext from "../../context";
// import appServices from "../../api/appServices";
import styles from "./index.module.scss";
import SelectBox from "./../../components/SelectBox/index";

const ROLE = ["admin", "user"];

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
          {...register(name)}
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

export default function Signup({ history }) {
  // const {
  //   getAccessToken,
  //   setAccessToken,
  //   setSignIn,
  //   setUserDetails,
  //   setUserDetailsOnDevice,
  // } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
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
              console.log("data--", data);
              // signIn(data);
            })}
          >
            <h4 className={styles.formSubtitle}>Sign Up!</h4>
            <h2 className={styles.formTitle}>Employee Portal</h2>
            {/* <p className={styles.formDescription}>Please Signup to continue.</p> */}

            <FormInput
              disabled={isSigningin}
              icon={AccountCircleOutlinedIcon}
              label="Name"
              placeholder="Name"
              name="name"
              register={register}
              type="text"
            />
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
            <SelectBox
              list={ROLE}
              label="Role"
              name="role"
              icon={WorkOutlineOutlinedIcon}
              register={register}
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
              value={isSigningin ? "Signing up..." : "Sign Up"}
            />

            <div className={styles.resetLink}>
              <div>Already have an account?</div>
              <Link to="/login">Login&nbsp;here →</Link>
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
