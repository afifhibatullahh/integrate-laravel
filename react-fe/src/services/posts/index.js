import { DELETE_API, GET_API, POST_API, PUT_API } from "../helper";
import axios from "../index";

const headers = {
  Authorization: `Bearer ${localStorage.getItem("token")}`,
  "Content-Type": "multipart/form-data",
};
const GET_POSTS = ({ search, status, orderBy, pageNumber }) => {
  return GET_API(
    `posts?search=${search}&status=${status}&orderBy=${orderBy}&page=${pageNumber}`
  );
};

const GET_POST = (id) => {
  return GET_API(`posts/${id}`);
};

const ADD_POST = async (body) => {
  return await axios
    .post("posts", body, { headers })
    .then((response) => response);
};

const UPDATE_POST = async ({ id, body }) => {
  return await axios
    .post(`posts/${id}?_method=PUT`, body, { headers })
    .then((response) => response);
};

const DELETE_POST = (id) => {
  return DELETE_API(`posts/${id}`);
};

export { GET_POSTS, ADD_POST, UPDATE_POST, DELETE_POST, GET_POST };
