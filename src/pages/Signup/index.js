/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import EmailIcon from "@mui/icons-material/EmailOutlined";
import LockIcon from "@mui/icons-material/LockOutlined";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";

import styles from "./index.module.scss";
import SelectBox from "./../../components/SelectBox/index";
import appServices from "./../../api/appServices";
import showAlert from "./../../utils/showAlert";
import FormInput from "./../../components/FormInput/index";

const ROLE = ["admin", "user"];

export default function Signup({ history }) {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const [isSigningin, setSigningIn] = useState(false);
  const [isInvalidCred, setInvalidCred] = useState({
    invalid: false,
    message: "",
  });

  // sign up api call
  const signup = async (data) => {
    // clearing the state
    setInvalidCred({
      invalid: false,
      message: "",
    });
    setSigningIn(true);

    // api call
    try {
      const res = await appServices.signupUser(data);
      setSigningIn(false);
      console.log("res---", res);

      if (res?.isError)
        setInvalidCred({
          invalid: true,
          message: res?.message || "Signup failed!",
        });
      else {
        showAlert("User created successfullt!", "success");
        navigate("/login");
      }
    } catch (err) {
      setSigningIn(false);
      console.log("error--", err);
    }
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
              signup(data);
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
              name="email"
              register={register}
              type="email"
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
