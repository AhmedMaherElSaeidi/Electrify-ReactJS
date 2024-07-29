import axios from "axios";
import SERVER_DOMAIN from "./enviroment";
import CurrentUser from "../models/CurrentUser";

const user = new CurrentUser();
const API = (api) => `${SERVER_DOMAIN}/api/carts${api || ""}`;

export const fetchAllCarts = async () => {
  return await axios.get(API(), {
    headers: {
      "x-auth-token": user.getToken(),
    },
  });
};

export const fetchUserCarts = async (id) => {
  return await axios.get(API(`/user_carts/${id}`), {
    headers: {
      "x-auth-token": user.getToken(),
    },
  });
};

export const fetchCart = async (id) => {
  return await axios.get(API(`/${id}`), {
    headers: {
      "x-auth-token": user.getToken(),
    },
  });
};

export const saveCart = async (cart) => {
  return await axios.post(API(), cart, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "x-auth-token": user.getToken(),
    },
  });
};

export const updateCart = async (id, cart) => {
  return await axios.put(API(`/${id}`), cart, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "x-auth-token": user.getToken(),
    },
  });
};

export const deleteCart = async (id) => {
  return await axios.delete(API(`/${id}`), {
    headers: {
      "x-auth-token": user.getToken(),
    },
  });
};
