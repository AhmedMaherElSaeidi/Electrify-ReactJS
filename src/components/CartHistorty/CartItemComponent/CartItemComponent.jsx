import SERVER_DOMAIN from "../../../services/enviroment";
import "./CartItemComponent.scss";
import React from "react";

const CartItemComponent = ({ item }) => {
  return (
    <div className="cart-history-item m-2">
      <div className="item-label">
        <img
          src={`${SERVER_DOMAIN}/${item.product_items.image}`}
          alt="product_image"
        />
        <div className="ms-2">
          <p className="mb-0">{item.product_items.name}</p>
          <p className="mb-0">{item.product_items.price} EGP</p>
          <p className="mb-0">{item.quantity} Requested</p>
        </div>
      </div>
    </div>
  );
};

export default CartItemComponent;
