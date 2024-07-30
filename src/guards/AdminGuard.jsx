import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CurrentUser from "../models/CurrentUser";

const AdminGuard = ({ children }) => {
  const user = new CurrentUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.isAdmin()) {
      navigate("/home");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <>{user.isAdmin() && children}</>;
};

export default AdminGuard;
