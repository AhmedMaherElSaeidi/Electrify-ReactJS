import qs from 'qs';
import axios from "axios";
import SERVER_DOMAIN from "./enviroment";

const API = (api) => `${SERVER_DOMAIN}/api/${api}`;

export const login = async (credentials) => {
  return await axios.post(API(`auth/login`), credentials, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
};

export const register = async (credentials) => {
  return await axios.post(`${API}/products`, credentials);
};
