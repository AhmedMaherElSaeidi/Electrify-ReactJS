import React, { useEffect } from "react";
import Spinner from "../Spinner/Spinner";
import { useNavigate } from "react-router-dom";
import CurrentUser from "../../models/CurrentUser";
import CurrentCart from "../../models/CurrentCart";

const Logout = () => {
  const user = new CurrentUser();
  const cart = new CurrentCart();
  const navigate = useNavigate();

  const logout = () => {
    user.clearSession();
    cart.clearSession();
    navigate("/home");
  };

  useEffect(() => {
    if (!user.sessionValid()) {
      navigate("/home");
      return;
    }

    logout();
  });

  return <Spinner />;
};

export default Logout;
