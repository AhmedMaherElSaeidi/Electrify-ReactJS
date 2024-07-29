import "./CartItemComponent.scss";
import React from "react";
import SERVER_DOMAIN from "../../../services/enviroment";

const CartItemComponent = ({ item }) => {
  const quantity = item.quantity;
  const itemPrice = item.product_items.price;
  const totalPrice = itemPrice * quantity;

  return (
    <div className="cart-item-component">
      <span className="fw-bold d-block">{item.product_items.name}</span>
      <img
        src={`${SERVER_DOMAIN}/${item.product_items.image}`}
        alt="product_image"
      />
      <span className="d-block">Quantity: {quantity}</span>
      <span className="d-block">Price: ${itemPrice}</span>
      <span className="d-block">Total: ${totalPrice}</span>
    </div>
  );
};

export default CartItemComponent;
