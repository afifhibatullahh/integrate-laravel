import { GET_API } from "../helper";

const GET_USER = () => {
  return GET_API(`user`);
};

export { GET_USER };
