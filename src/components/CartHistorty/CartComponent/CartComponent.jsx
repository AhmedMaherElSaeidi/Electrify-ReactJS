import "./CartComponent.scss";
import React from "react";
import { FaTrash, FaLocationDot } from "react-icons/fa6";
import CartItemComponent from "../CartItemComponent/CartItemComponent";

const CartComponent = ({ cart, onDelete }) => {
  const badgeClass = {
    delivered: "bg-success",
    pending: "bg-warning",
    canceled: "bg-danger",
  };
  const splice = (str, word) => {
    const index = str.indexOf(word);
    if (index === -1) {
      return str;
    }

    const spliceIndex = index + word.length;
    const splicedString = str.slice(0, spliceIndex);
    return splicedString;
  };
  const calculateTotal = () => {
    const total = cart.cart_items.reduce((cumm, curr) => {
      return cumm + curr.quantity * curr.product_items.price;
    }, 0);

    return Number(total.toFixed(2));
  };
  const formatISODateTime = (isoString) => {
    const date = new Date(isoString);

    const formattedDate = `${date.getFullYear()}-${String(
      date.getMonth() + 1
    ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
    const formattedTime = `${String(date.getHours()).padStart(2, "0")}:${String(
      date.getMinutes()
    ).padStart(2, "0")}:${String(date.getSeconds()).padStart(2, "0")}`;

    return { date: formattedDate, time: formattedTime };
  };

  const totalPrice = calculateTotal();
  const { date, time } = formatISODateTime(cart.createdAt);

  return (
    <div className="cart-history-component">
      {cart.status.toLowerCase() === "pending" && (
        <div className="mb-1 remove-btn">
          <span onClick={() => onDelete(cart.id)}>
            <FaTrash />
          </span>
        </div>
      )}
      <div className="mb-1 fw-bold">
        <p className="mb-1">
          Status:
          <span className={`ms-2 badge ${badgeClass[cart.status]}`}>
            {cart.status}
          </span>
        </p>
        <p className="mb-1">
          CreatedAt:{" "}
          <span className="fw-normal">
            {date} | {time}
          </span>
        </p>
      </div>
      <div className="mb-2">
        <span className="me-2">
          <FaLocationDot />
        </span>
        <a href={cart.location} target="_blank" rel="noreferrer">
          {splice(cart.location, "maps")}
        </a>
      </div>
      <div className="mb-2 fw-bold text-uppercase text-muted">
        <hr />
        <p className="mb-1 small">Items: {cart.cart_items.length}</p>
        <p className="mb-1 small">TotalPrice: {totalPrice} EGP</p>
      </div>
      {cart.cart_items.length !== 0 && (
        <div className="mb-2">
          <hr />
          <div className="cart-items">
            {cart.cart_items.map((item, index) => {
              return <CartItemComponent key={index} item={item} />;
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default CartComponent;
