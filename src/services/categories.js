import axios from "axios";
import SERVER_DOMAIN from "./enviroment";

const API = (api) => `${SERVER_DOMAIN}/api/${api}`;

export const fetchAllCategories = async () => {
  return await axios.get(API(`categories`));
};

export const fetchCategory = async (id) => {
  return await axios.get(API(`categories/${id}`));
};

export const saveCategory = async (productData) => {
  return await axios.post(`${API}/routes/post.php`, productData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const updateCategory = async (id, productData) => {
  return await axios.put(API(`categories/${id}`), productData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deleteCategory = async (id) => {
  return await axios.delete(API(`categories/${id}`));
};
