import axios from "axios";
import SERVER_DOMAIN from "./enviroment";
import CurrentUser from "../models/CurrentUser";

const user = new CurrentUser();
const API = (api) => `${SERVER_DOMAIN}/api/categories${api || ""}`;

export const fetchAllCategories = async () => {
  return await axios.get(API());
};

export const fetchCategory = async (id) => {
  return await axios.get(API(`/${id}`));
};

export const saveCategory = async (productData) => {
  return await axios.post(API(), productData, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "x-auth-token": user.getToken(),
    },
  });
};

export const updateCategory = async (id, productData) => {
  return await axios.put(API(`/${id}`), productData, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "x-auth-token": user.getToken(),
    },
  });
};

export const deleteCategory = async (id) => {
  return await axios.delete(API(`/${id}`), {
    headers: {
      "x-auth-token": user.getToken(),
    },
  });
};
