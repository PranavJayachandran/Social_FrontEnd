import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../pages/Login";

const AuthLayout = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Login />} />
    </Routes>
  );
};

export default AuthLayout;
