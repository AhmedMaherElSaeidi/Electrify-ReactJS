import "./CartComponent.scss";
import React from "react";
import { FaTrashAlt } from "react-icons/fa";
import { FaMapLocationDot } from "react-icons/fa6";
import CartItemComponent from "../CartItemComponent/CartItemComponent";

const CartComponent = ({ cart, onClickEvent }) => {
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
  const { date, time } = formatISODateTime(cart.createdAt);
  const statusClass = {
    pending: "status-yellow",
    delivered: "status-green",
    canceled: "status-red",
  };

  const deleteCart = () => {
    onClickEvent(cart.id);
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
          return <CartItemComponent key={index} item={item} />;
        })}
      <div className="cart-component-footer mt-3">
        <p className="mb-1">
          <span className="fw-bold">{date}</span> at {time}
        </p>
        <a className="fs-5" href={cart.location} target="_blank" rel="noreferrer">
          <FaMapLocationDot />
        </a>
      </div>
    </div>
  );
};

export default CartComponent;
