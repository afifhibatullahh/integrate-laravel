import React from "react";
import { useQuery } from "react-query";
import { GET_USER } from "../services/users";
import Home from "../views/Home";

const AuthGuard = ({ children }) => {
  const { isSuccess } = useQuery(["isLogin"], GET_USER);
  if (isSuccess) return <Home />;
  return <>{children}</>;
};

export default AuthGuard;
