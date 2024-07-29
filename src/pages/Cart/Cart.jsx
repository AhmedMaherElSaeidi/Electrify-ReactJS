import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import CurrentUser from "../../models/CurrentUser";
import { fetchUserCarts } from "../../services/carts";
import CartComponent from "../../components/Cart/CartComponent/CartComponent";

const Cart = () => {
  const user = new CurrentUser();
  const navigate = useNavigate();
  const [pageData, setPageData] = useState({
    carts: [],
    err: null,
    loadig: true,
  });

  useEffect(() => {
    if (!user.sessionValid() && !user.isAdmin()) {
      navigate("/home");
      return;
    }

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
  }, []);

  return (
    <div className="cart-page">
      {pageData.carts &&
        pageData.carts.map((cart, index) => {
          return <CartComponent key={index} cart={cart} />;
        })}
    </div>
  );
};

export default Cart;
