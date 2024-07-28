import "./Footer.scss";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-light mt-2 p-4 text-center">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <img
              className="website-logo"
              src={require("../../assets/images/electrify-logo.png")}
              alt="website_logo"
            />
            <p className="fw-bold">
              &copy; {new Date().getFullYear()} Electrify. All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
