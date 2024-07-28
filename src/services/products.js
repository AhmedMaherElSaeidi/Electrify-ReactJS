import axios from "axios";
import SERVER_DOMAIN from "./enviroment";

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
    },
  });
};

export const updateProduct = async (id, productData) => {
  return await axios.put(API(`/${id}`), productData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deleteProduct = async (id) => {
  return await axios.delete(API(`/${id}`));
};
