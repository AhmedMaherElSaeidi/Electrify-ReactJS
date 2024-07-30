import "./CartItemComponent.scss";
import React from "react";
import { FaTrashAlt } from "react-icons/fa";
import CurrentUser from "../../../models/CurrentUser";
import SERVER_DOMAIN from "../../../services/enviroment";

const CartItemComponent = ({ item, removeItem }) => {
  const user = new CurrentUser();
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
      {user.sessionValid() && !user.isAdmin() && (
        <span className="d-block remove-btn" onClick={() => removeItem(item.id)}>
          Remove: <FaTrashAlt />
        </span>
      )}
    </div>
  );
};

export default CartItemComponent;
