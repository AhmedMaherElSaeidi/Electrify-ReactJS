import "./OrderItem.scss";
import React from "react";
import SERVER_DOMAIN from "../../../services/enviroment";

const OrderItem = ({ item }) => {
  const quantity = item.quantity;
  const itemPrice = item.product_items.price;
  const totalPrice = itemPrice * quantity;

  return (
    <div className="order-item-component">
      <div>
        <img
          src={`${SERVER_DOMAIN}/${item.product_items.image}`}
          alt="product_image"
        />
      </div>
      <div>
        <span className="fw-bold d-block">{item.product_items.name}</span>
        <span className="d-block">
          Stock Quantity: {item.product_items.stock}
        </span>
        <span className="d-block">Requested Quantity: {quantity}</span>
        <span className="d-block">Price: EGP{itemPrice}</span>
        <span className="d-block">Total: EGP{totalPrice}</span>
      </div>
    </div>
  );
};

export default OrderItem;
