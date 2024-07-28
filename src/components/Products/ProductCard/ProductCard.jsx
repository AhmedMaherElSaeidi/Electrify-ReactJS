import "./ProductCard.scss";
import React from "react";
import { Link } from "react-router-dom";
import { FaLongArrowAltRight } from "react-icons/fa";
import SERVER_DOMAIN from "../../../services/enviroment";

const ProductCard = ({ id, header, image, category }) => {
  return (
    <div className="card">
      <img src={`${SERVER_DOMAIN}/${image}`} alt="product_image" />
      <div className="card-content">
        <h4>{header}</h4>
        <p>{category}</p>
        <Link to={`/product/${id}`} className="button">
          Find out more <FaLongArrowAltRight />
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
