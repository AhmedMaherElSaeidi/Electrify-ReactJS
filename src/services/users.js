import axios from "axios";
import SERVER_DOMAIN from "./enviroment";
import CurrentUser from "../models/CurrentUser";

const user = new CurrentUser();
const API = (api) => `${SERVER_DOMAIN}/api/users${api || ""}`;

export const fetchAllUsers = async () => {
  return await axios.get(API());
};

export const fetchUser = async (id) => {
  return await axios.get(API(`/${id}`), {
    headers: {
      "x-auth-token": user.getToken(),
    },
  });
};

export const saveUser = async (userData) => {
  return await axios.post(API(), userData, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
};

export const updateUser = async (id, userData) => {
  return await axios.put(API(`/${id}`), userData, {
    headers: {
      "Content-Type": "multipart/form-data",
      "x-auth-token": user.getToken(),
    },
  });
};

export const deleteUser = async (id) => {
  return await axios.delete(API(`/${id}`));
};