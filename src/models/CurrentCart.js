import LocalStorage from "./LocalStorage";

class CurrentCart {
  constructor() {
    this.cart = new LocalStorage("cart");
    if (!this.toObject()) this.initializeCart();
  }

  initializeCart() {
    this.cart.item = {
      id: null,
      location: "",
      products: [],
    };
  }

  set cartID(id) {
    const cart = this.cart.item;
    cart.id = id;
    this.cart.item = cart;
  }

  set location(loc) {
    const cart = this.cart.item;
    cart.location = loc;
    this.cart.item = cart;
  }

  get cartID() {
    const cart = this.cart.item;
    return cart ? cart.id : null;
  }

  get location() {
    const cart = this.cart.item;
    return cart ? cart.location : "";
  }

  get products() {
    const cart = this.cart.item;
    return cart ? cart.products : [];
  }

  getProduct(id) {
    const cart = this.cart.item;
    const productIndex = this.productIndex(id);

    return productIndex !== -1 ? cart.products[productIndex] : null;
  }

  addProduct(id, quantity) {
    const cart = this.cart.item;
    const productIndex = this.productIndex(id);

    if (productIndex !== -1) {
      cart.products[productIndex].quantity = quantity;
    } else {
      cart.products.push({ id, quantity });
    }

    this.cart.item = cart;
  }

  deleteProduct(productID) {
    const cart = this.cart.item;
    cart.products = cart.products.filter((product) => product.id !== productID);

    this.cart.item = cart;
  }

  productIndex(productID) {
    const productIndex = this.products.findIndex(
      (product) => product.id === productID
    );

    return productIndex;
  }

  productExists(productID) {
    return this.productIndex(productID) !== -1 ? true : false;
  }

  toObject() {
    return this.cart.item;
  }

  clearSession() {
    this.cart.remove();
  }
}

export default CurrentCart;
