import { DELETE_API, GET_API, POST_API, PUT_API } from "../helper";

const GET_POSTS = ({ search, status, orderBy, pageNumber }) => {
  return GET_API(
    `posts?search=${search}&status=${status}&orderBy=${orderBy}&page=${pageNumber}`
  );
};

const ADD_POST = ({ body }) => {
  return POST_API(`posts`, body);
};

const UPDATE_POST = ({ body }) => {
  return PUT_API(`posts`, body);
};

const DELETE_POST = ({ id }) => {
  return DELETE_API(`posts/${id}`);
};

export { GET_POSTS, ADD_POST, UPDATE_POST, DELETE_POST };
