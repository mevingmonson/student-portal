import React, { useMemo, useState } from "react";
import Cookies from "js-cookie";
import AuthContext from "./../context/AuthContext";

const setAccessToken = (AccessToken) => {
  Cookies.set("AccessToken", AccessToken, { expires: 7 });
};

const deleteAccessToken = () => {
  Cookies.set("AccessToken", "--", { expires: -1 });
};

const getAccessToken = () => Cookies.get("AccessToken");

export default function AuthProvider({ children }) {
  const [isSignedIn, setSignIn] = useState(false);
  const [userDetails, setUserDetails] = useState({
    name: "",
  });

  const contextValue = useMemo(
    () => ({
      isSignedIn,
      setSignIn,
      userDetails,
      setUserDetails,
      deleteAccessToken,
      getAccessToken,
      setAccessToken,
    }),
    [userDetails, isSignedIn]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}
