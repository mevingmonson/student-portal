import { createContext } from "react";

const AuthContext = createContext({
  isSignedIn: false,
  setSignIn: () => {},
  userDetails: {},
  setUserDetails: () => {},
  deleteAccessToken: () => {},
  getAccessToken: () => {},
  setAccessToken: () => {},
});

export default AuthContext;
