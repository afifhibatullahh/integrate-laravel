import axios from "../config";
import { DELETE_API, GET_API, PUT_API, POST_API } from "services/helper";

const GET_USERS = () => {
  return GET_API(`user`);
};
