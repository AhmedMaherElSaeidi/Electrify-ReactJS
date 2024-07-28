import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

const Layout = () => {
  return (
    <div>
      <Navbar />
      <div className="p-1">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
