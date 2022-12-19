import React, { useCallback, useContext, useEffect, useState } from "react";
import { Outlet, Route, useNavigate } from "react-router-dom";

import AuthContext from "./../context/AuthContext";
import Spinner from "./../components/Spinner/index";

function PrivateRoute() {
  const navigate = useNavigate();

  const { getAccessToken, setAccessToken, setSignIn, isSignedIn } =
    useContext(AuthContext);

  useEffect(() => {
    const AccessToken = getAccessToken();

    if (AccessToken) {
      setSignIn(true);
    } else {
      setSignIn(false);
      navigate("/login");
    }
  }, [getAccessToken, setAccessToken, setSignIn]);

  // eslint-disable-next-line react/jsx-props-no-spreading
  return (
    <>
      { isSignedIn && 
       <Outlet />
      }
    </>
  );
}

export default PrivateRoute;
