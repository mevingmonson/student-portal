import React, { useCallback, useContext, useEffect, useState } from "react";
import { Route, useNavigate } from "react-router-dom";

import AuthContext from "./../context/AuthContext";
import Spinner from "./../components/Spinner/index";

function PrivateRoute({ history, Component, ...rest }) {
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

  const renderFn = () => (isSignedIn ? <Component /> : <Spinner />);

  // eslint-disable-next-line react/jsx-props-no-spreading
  return (
    <React.Fragment>
      <Route {...rest} element={renderFn()} />;
    </React.Fragment>
  );
}

export default PrivateRoute;
