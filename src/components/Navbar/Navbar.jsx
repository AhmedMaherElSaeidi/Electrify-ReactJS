import "./Navbar.scss";
import { SiCodeblocks } from "react-icons/si";
import { FaLinesLeaning } from "react-icons/fa6";
import { BsSignpostSplit } from "react-icons/bs";
import CurrentUser from "../../models/CurrentUser";
import React, { useEffect, useState } from "react";
import NavDropdown from "../NavDropdown/NavDropdown";
import { Link, useLocation } from "react-router-dom";
import { FaShoppingCart, FaHome } from "react-icons/fa";
import { fetchAllCategories } from "../../services/categories";

const Navbar = () => {
  const location = useLocation();
  const user = new CurrentUser();
  const [navbarData, setNavbarData] = useState({
    categories: [],
  });

  const activePath = (paths) => {
    return paths.some((path) => location.pathname === path);
  };
  const options = () => {
    const sessionValid = user.sessionValid();
    const isAdmin = user.isAdmin();

    const validOptions = {
      customer: [
        { name: "logout", to: "/logout" },
        { name: "settings", to: "/settings" },
      ],
      admin: [
        { name: "logout", to: "/logout" },
        { name: "settings", to: "/settings" },
        { name: "users", to: "/list_users" },
        { name: "product", to: "/create_product" },
      ],
      anonymous: [{ name: "login", to: "/login" }],
    };

    return validOptions[
      sessionValid ? (isAdmin ? "admin" : "customer") : "anonymous"
    ];
  };
  const categories = [
    { name: "All Categories", to: "/products" },
    ...navbarData.categories.map((category) => {
      return {
        name: category.name,
        to: `/products/${category.id}`,
      };
    }),
  ];

  useEffect(() => {
    fetchAllCategories()
      .then((res) => {
        setNavbarData((prev) => {
          return { ...prev, categories: res.data.data };
        });
      })
      .catch((err) => {
        console.error("Error fetching categories:", err);
      });
  }, []);

  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container-fluid">
        <span className="navbar-brand">
          <img
            src={require("../../assets/images/electrify-logo.png")}
            alt="website_logo"
          />
          Electrify
        </span>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <FaLinesLeaning />
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav w-100">
            <li className="nav-item">
              <Link
                to="/home"
                className={
                  activePath(["", "/home"]) ? "nav-link active" : "nav-link"
                }
              >
                <FaHome /> Home
              </Link>
            </li>
            <li className="nav-item dropdown">
              <NavDropdown
                list={categories}
                class_name={activePath(["/products"]) ? "active" : ""}
              >
                <SiCodeblocks /> products
              </NavDropdown>
            </li>
            {!user.isAdmin() && user.sessionValid() && (
              <li className="nav-item">
                <Link
                  className={
                    activePath(["/cart"]) ? "nav-link active" : "nav-link"
                  }
                  to="/cart"
                >
                  <FaShoppingCart /> cart
                </Link>
              </li>
            )}
            {user.isAdmin() && (
              <li className="nav-item">
                <Link
                  className={
                    activePath(["/orders"]) ? "nav-link active" : "nav-link"
                  }
                  to="/orders"
                >
                  <BsSignpostSplit /> orders
                </Link>
              </li>
            )}
            <li className="nav-item dropdown ms-auto user-profile">
              <NavDropdown list={options()}>
                <img src={user.profileIMG()} alt="profile_image" />
              </NavDropdown>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
