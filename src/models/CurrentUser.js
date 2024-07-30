import { jwtDecode } from "jwt-decode";
import LocalStorage from "./LocalStorage";
import SERVER_DOMAIN from "../services/enviroment";

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

  get id() {
    return this.toObject() ? this.toObject().id : null;
  }

  get name() {
    return this.toObject() ? this.toObject().name : null;
  }

  get username() {
    return this.toObject() ? this.toObject().username : null;
  }

  get telephone() {
    return this.toObject() ? this.toObject().telephone : null;
  }

  get gender() {
    return this.toObject() ? this.toObject().gender : null;
  }

  profileIMG() {
    const user = this.user.item;
    return user
      ? `${SERVER_DOMAIN}/${user.image}`
      : require("../assets/images/default-avatar.jpg");
  }

  isAdmin() {
    return this.toObject() ? this.toObject().admin : false;
  }

  getToken() {
    const token = this.token.item;
    return token ? token.token : null;
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
