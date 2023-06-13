import axios from "../index";
import { POST_API } from "../helper";

const LOGIN_API = ({ email, password }) => {
  const data = {
    email,
    password,
  };

  return POST_API("login", data);
};
const LOGOUT = () => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  const result = axios
    .post("logout", { headers })
    .then((response) => response)
    .catch((e) => e);

  return result;
};

export { LOGIN_API, LOGOUT };
