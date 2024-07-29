import axios from "axios";
import SERVER_DOMAIN from "./enviroment";
import CurrentUser from "../models/CurrentUser";

const user = new CurrentUser();
const API = (api) => `${SERVER_DOMAIN}/api/cartItems${api || ""}`;

export const fetchAllCartItems = async () => {
  return await axios.get(API());
};

export const fetchCartItem = async (id) => {
  return await axios.get(API(`/${id}`));
};

export const saveCartItem = async (cartItem) => {
  return await axios.post(API(), cartItem, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "x-auth-token": user.getToken(),
    },
  });
};

export const updateCartItem = async (id, cartItem) => {
  return await axios.put(API(`/${id}`), cartItem, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
};

export const deleteCartItem = async (id) => {
  return await axios.delete(API(`/${id}`));
};
