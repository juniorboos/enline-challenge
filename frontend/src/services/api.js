import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3333/",
});

export const getResult = async (payload) => {
  return api
    .post("resolve", payload)
    .then((response) => response)
    .catch((error) => error);
};
