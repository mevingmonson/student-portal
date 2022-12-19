import React from "react";
import { BrowserRouter, Routes, Switch, Route } from "react-router-dom";

import PrivateRoute from "./PrivateRoute";
import Login from "../pages/Login";
import Student from "../pages/Student";
import Dashboard from "../pages/Dashboard";
import AzureTest from "../pages/Test/index";
import Signup from "../pages/Signup/index";

const RouteList = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* <Switch> */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route element={<PrivateRoute/>}>
            <Route path="/" element={<Dashboard />} />
            <Route path="test" element={<AzureTest />} />
          </Route>
          {/* </Switch> */}
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default RouteList;
