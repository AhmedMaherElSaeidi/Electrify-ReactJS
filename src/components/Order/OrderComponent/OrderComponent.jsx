import "./OrderComponent.scss";
import React from "react";
import { useForm } from "react-hook-form";
import { FaMapLocationDot } from "react-icons/fa6";
import OrderItemComponent from "../OrderItem/OrderItem";
import SERVER_DOMAIN from "../../../services/enviroment";
import FormSelect2 from "../../Form/FormSelect2/FormSelect2";

const OrderComponent = ({ order, updateCartStatus }) => {
  const { register, handleSubmit } = useForm();

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
  const calculateTotal = () => {
    const total = order.cart_items.reduce((cumm, curr) => {
      return cumm + curr.quantity * curr.product_items.price;
    }, 0);

    return Number(total.toFixed(2));
  };
  const onSubmit = (data) => {
    data.id = order.id;
    data.user_id = order.user_id;
    data.location = order.location;

    updateCartStatus(data, order.cart_items);
  };

  const { date, time } = formatISODateTime(order.createdAt);
  const actionTaken = ["canceled", "delivered"].some(
    (status) => status === order.status
  );
  const user = order.user_cart;
  const badgeClass = {
    delivered: "bg-success",
    pending: "bg-warning",
    canceled: "bg-danger",
  };

  return (
    <div className="order-component">
      <div className="order-component-header">
        <img
          className="mb-1"
          src={`${SERVER_DOMAIN}/${user.image}`}
          alt="user_profile"
        />
        <p className="mb-1">
          <span className="fw-bold">{date}</span> at {time}
        </p>
        <p className="mb-1">
          <span className="fw-bold">Requested by: </span>
          {`${user.fname} ${user.lname}`}
        </p>
        <p className="mb-1">
          <span className="fw-bold">Telephone: </span>
          {`${user.telephone}`}
        </p>
        <a
          className="fs-5"
          href={order.location}
          target="_blank"
          rel="noreferrer"
        >
          <FaMapLocationDot />
        </a>
      </div>
      {order.cart_items &&
        order.cart_items.map((item, index) => {
          return <OrderItemComponent key={index} item={item} />;
        })}
      {!actionTaken && (
        <div className="order-component-body">
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormSelect2
              id="status"
              labels={["pending", "delivered", "canceled"]}
              values={["pending", "delivered", "canceled"]}
              register={register}
            />
            <button type="submit" className="btn btn-secondary">
              Confirm
            </button>
          </form>
        </div>
      )}
      <div className="order-component-footer mt-3">
        <p className="mb-1">
          <span className="fw-bold">Total: </span>
          EGP{calculateTotal()}
        </p>
        <span className={`badge ${badgeClass[order.status]}`}>
          {order.status}
        </span>
      </div>
    </div>
  );
};

export default OrderComponent;
