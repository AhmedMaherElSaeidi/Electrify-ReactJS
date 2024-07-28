import SERVER_DOMAIN from "../services/enviroment";
import LocalStorage from "./LocalStorage";
import { jwtDecode } from "jwt-decode";

class CurrentUser {
  token = null;
  user = null;

  constructor() {
    this.token = new LocalStorage("token");
    this.user = new LocalStorage("user");
    if (!this.sessionValid()) this.clearSession();
  }

  authenticate(token) {
    if (token) {
      this.token.item = { token };
      this.user.item = jwtDecode(token);
    }
  }

  toObject() {
    return this.user.item;
  }

  profileIMG() {
    const user = this.user.item;
    return user
      ? `${SERVER_DOMAIN}/${user.image}`
      : require("../assets/images/default-avatar.jpg");
  }

  getToken() {
    const token = this.token.item;
    return token ? token.token : null;
  }

  isAdmin() {
    const user = this.user.item;
    return user ? user.admin : false;
  }

  sessionValid() {
    const currentTime = Date.now() / 1000; // current time in seconds
    return this.user.item && this.user.item.exp > currentTime;
  }

  clearSession() {
    this.token.remove();
    this.user.remove();
  }
}

export default CurrentUser;
