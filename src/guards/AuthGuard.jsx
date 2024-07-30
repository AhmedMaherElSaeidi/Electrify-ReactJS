import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CurrentUser from "../models/CurrentUser";

const AuthGuard = ({ children }) => {
  const user = new CurrentUser();
  const navigate = useNavigate();
  const isLoggedIn = user.sessionValid();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/home");
    }
  }, [isLoggedIn, navigate]);

  return <>{isLoggedIn && children}</>;
};

export default AuthGuard;
