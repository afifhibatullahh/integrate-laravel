import React from "react";
import Login from "../views/authentication/Login";
import { GET_USER } from "../services/users";
import { useQuery } from "react-query";

const MainGuard = ({ children }) => {
  const { isSuccess } = useQuery(["isLogin"], GET_USER);

  if (!isSuccess) return <Login />;
  return <>{children}</>;
};

export default MainGuard;
