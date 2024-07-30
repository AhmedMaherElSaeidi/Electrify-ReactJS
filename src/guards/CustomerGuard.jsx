import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CurrentUser from "../models/CurrentUser";

const CustomerGuard = ({children}) => {
  const user = new CurrentUser();
  const navigate = useNavigate();
  const condition = user.sessionValid() && !user.isAdmin();

  useEffect(() => {
    if (!user.sessionValid() && !user.isAdmin()) {
      navigate("/home");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <>{condition && children}</>;
};

export default CustomerGuard;
