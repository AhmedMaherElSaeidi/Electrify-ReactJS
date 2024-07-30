import "./CartComponent.scss";
import React from "react";
import { FaTrashAlt } from "react-icons/fa";
import { FaMapLocationDot } from "react-icons/fa6";
import { deleteCartItem } from "../../../services/cartItems";
import CartItemComponent from "../CartItemComponent/CartItemComponent";

const CartComponent = ({ cart, onClickEvent, handleEvent }) => {
  const formatISODateTime = (isoString) => {
    const date = new Date(isoString);

    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Months are zero-indexed
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    const formattedDate = `${year}-${String(month).padStart(2, "0")}-${String(
      day
    ).padStart(2, "0")}`;
    const formattedTime = `${String(hours).padStart(2, "0")}:${String(
      minutes
    ).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

    return { date: formattedDate, time: formattedTime };
  };
  const calculateTotal = () => {
    const total = cart.cart_items.reduce((cumm, curr) => {
      return cumm + curr.quantity * curr.product_items.price;
    }, 0);

    return total;
  };
  const removeItem = async (id) => {
    await deleteCartItem(id)
      .then(() => handleEvent())
      .catch((err) => {
        console.log("Error deleting cart item...", err);
      });
  };
  const deleteCart = () => {
    onClickEvent(cart.id);
  };

  const { date, time } = formatISODateTime(cart.createdAt);
  const statusClass = {
    pending: "status-yellow",
    delivered: "status-green",
    canceled: "status-red",
  };

  return (
    <div className="cart-component">
      <div className="cart-component-header">
        <span className={statusClass[cart.status]}>{cart.status}</span>
        <span className="delete-cart" onClick={deleteCart}>
          <FaTrashAlt />
        </span>
      </div>
      {cart.cart_items &&
        cart.cart_items.map((item, index) => {
          return (
            <CartItemComponent
              key={index}
              item={item}
              removeItem={removeItem}
            />
          );
        })}
      <div className="cart-component-footer mt-3">
        <p className="mb-1">
          <span className="fw-bold">Total: </span>
          EGP{calculateTotal()}
        </p>
        <p className="mb-1">
          <span className="fw-bold">{date}</span> at {time}
        </p>
        <a
          className="fs-5"
          href={cart.location}
          target="_blank"
          rel="noreferrer"
        >
          <FaMapLocationDot />
        </a>
      </div>
    </div>
  );
};

export default CartComponent;
