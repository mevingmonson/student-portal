import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Student from "./Student";

const RouteList = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Student />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default RouteList;
