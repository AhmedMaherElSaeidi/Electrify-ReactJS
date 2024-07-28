import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CurrentUser from "../../models/CurrentUser";

const Logout = () => {
  const user = new CurrentUser();
  const navigate = useNavigate();

  const logout = () => {
    user.clearSession();
    navigate("/home");
  };

  useEffect(() => {
    logout();
  }, []);

  return <div>Loggin out...</div>;
};

export default Logout;
