import axios from "./index";

const authorization = `Bearer ${localStorage.getItem("token")}`;
const headers = {
  Authorization: authorization,
};

const GET_API = async (url, signal) => {
  return await axios
    .get(url, { headers, signal: signal })
    .then((response) => response);
};

const POST_API = async (url, body) => {
  return await axios.post(url, body, { headers }).then((response) => response);
};

const PUT_API = async (url, body) => {
  return await axios.put(url, body, { headers }).then((response) => response);
};

const DELETE_API = async (url) => {
  return await axios.delete(url, { headers }).then((response) => response);
};

export { GET_API, POST_API, DELETE_API, PUT_API };
