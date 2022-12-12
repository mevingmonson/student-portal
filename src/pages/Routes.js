import React from "react";
import { BrowserRouter, Routes, Switch, Route } from "react-router-dom";

import Login from "./Login";
import Student from "./Student";
import Dashboard from "./Dashboard";
import AzureTest from "./Test/index";
import Signup from "./Signup/index";

const RouteList = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* <Switch> */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="test" element={<AzureTest />} />
          {/* </Switch> */}
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default RouteList;
