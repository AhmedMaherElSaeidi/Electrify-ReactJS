import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import CurrentUser from "../../models/CurrentUser";
import { deleteCart, fetchUserCarts } from "../../services/carts";
import CartComponent from "../../components/Cart/CartComponent/CartComponent";

const Cart = () => {
  const user = new CurrentUser();
  const navigate = useNavigate();
  const [pageData, setPageData] = useState({
    carts: [],
    err: null,
    loadig: true,
  });

  const fetchCartData = () => {
    fetchUserCarts(user.toObject().id)
      .then((res) => {
        setPageData((prev) => {
          return { ...prev, carts: res.data.data, loadig: false };
        });
      })
      .catch((err) => {
        setPageData((prev) => {
          return { ...prev, err, loadig: false };
        });
        console.log("Error retrieving carts: ", err);
      });
  };

  useEffect(() => {
    if (!user.sessionValid() && !user.isAdmin()) {
      navigate("/home");
      return;
    }

    fetchCartData();
  });

  const removeCart = async (id) => {
    setPageData({ ...pageData, loadig: true });
    await deleteCart(id).catch((err) => {
      console.log(err);
    });

    setPageData({ ...pageData, loadig: false });
    fetchCartData();
  };

  return (
    <div className="cart-page">
      {pageData.carts &&
        pageData.carts.map((cart, index) => {
          return (
            <CartComponent key={index} cart={cart} onClickEvent={removeCart} />
          );
        })}
    </div>
  );
};

export default Cart;
