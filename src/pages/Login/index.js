/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import FormInput from "./../../components/FormInput/index";
import EmailIcon from "@mui/icons-material/EmailOutlined";
import LockIcon from "@mui/icons-material/LockOutlined";

import styles from "./index.module.scss";
import AuthContext from "./../../context/AuthContext";
import appServices from "./../../api/appServices";
import { useNavigate } from "react-router-dom";

export default function Login({ history }) {
  const { setAccessToken, setSignIn, setUserDetails } = useContext(AuthContext);

  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [isSigningin, setSigningIn] = useState(false);
  const [isInvalidCred, setInvalidCred] = useState({
    invalid: false,
    message: "",
  });

  const signIn = async (data) => {
    setInvalidCred({
      invalid: false,
      message: "",
    });
    setSigningIn(true);
    try {
      const res = await appServices.loginUser(data);
      setSigningIn(false);
      console.log("res---", res);
      if (res?.isError) {
        setInvalidCred({
          invalid: true,
          message: res?.message || "something went wrong!",
        });
      } else {
        setAccessToken(res?.token);
        setSignIn(true);
        setUserDetails(res);
        navigate("/");
      }
    } catch (err) {
      console.log("error--", err);
      setSigningIn(false);
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
              name="email"
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
              <div>Don't have an account?</div>
              <Link to="/signup">Sign&nbsp;up&nbsp;here →</Link>
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
