import axios from "axios";
import SERVER_DOMAIN from "./enviroment";
import CurrentUser from "../models/CurrentUser";

const user = new CurrentUser();
const API = (api) => `${SERVER_DOMAIN}/api/products${api || ""}`;

export const fetchAllProducts = async () => {
  return await axios.get(API());
};

export const fetchProduct = async (id) => {
  return await axios.get(API(`/${id}`));
};

export const saveProduct = async (productData) => {
  return await axios.post(API(), productData, {
    headers: {
      "Content-Type": "multipart/form-data",
      "x-auth-token": user.getToken(),
    },
  });
};

export const updateProduct = async (id, productData) => {
  return await axios.put(API(`/${id}`), productData, {
    headers: {
      "Content-Type": "multipart/form-data",
      "x-auth-token": user.getToken(),
    },
  });
};

export const deleteProduct = async (id) => {
  return await axios.delete(API(`/${id}`), {
    headers: {
      "x-auth-token": user.getToken(),
    },
  });
};
