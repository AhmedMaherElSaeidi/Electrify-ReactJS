import LocalStorage from "./LocalStorage";

class CurrentCart {
  constructor() {
    this.cart = new LocalStorage("cart");
  }

  set cartID(id) {
    this.cart.item = { id };
  }

  get cartID() {
    const cart = this.cart.item;
    return cart ? cart.id : null;
  }

  clearSession() {
    this.cart.remove();
  }
}

export default CurrentCart;
