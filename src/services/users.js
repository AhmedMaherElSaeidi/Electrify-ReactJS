import axios from "axios";
import SERVER_DOMAIN from "./enviroment";

const API = (api) => `${SERVER_DOMAIN}/api/users${api || ""}`;

export const fetchAllUsers = async () => {
  return await axios.get(API());
};

export const fetchUser = async (id) => {
  return await axios.get(API(`/${id}`));
};

export const saveUser = async (user) => {
  return await axios.post(API(), user, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
};

export const updateUser = async (id, user) => {
  return await axios.put(API(`/${id}`), user, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deleteUser = async (id) => {
  return await axios.delete(API(`/${id}`));
};
