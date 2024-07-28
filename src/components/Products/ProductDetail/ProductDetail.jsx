import "./ProductDetail.scss";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { fetchProduct } from "../../../services/products";
import SERVER_DOMAIN from "../../../services/enviroment";

const ProductDetail = () => {
  const { id } = useParams();
  const [pageData, setPageData] = useState({
    product: [],
    err: null,
    loadig: true,
  });

  useEffect(() => {
    fetchProduct(id)
      .then((res) => {
        setPageData({ ...pageData, product: res.data.data, loadig: false });
        // console.log(res.data.data);
        setPageData((prevState) => ({
          ...prevState,
          product: res.data.data,
          loadig: false,
        }));
      })
      .catch((err) => {
        setPageData((prevState) => ({
          ...prevState,
          err,
          loadig: false,
        }));
        console.error("Error fetching product:", err);
      });
  }, []);

  return (
    <div className="product-details">
      {pageData.product && (
        <div className="details">
          <div className="me-3 mb-3">
            <img
              src={`${SERVER_DOMAIN}/${pageData.product.image}`}
              alt="product_image"
            />
          </div>
          <div>
            <h4>{pageData.product.name}</h4>
            <ul className="list-group">
              <li className="list-group-item">
                <strong>Price: </strong>${pageData.product.price}
              </li>
              <li className="list-group-item">
                <strong>Stock: </strong>
                {pageData.product.stock} units available
              </li>
              <li className="list-group-item">
                <strong>Description: </strong>
                {pageData.product.description}
              </li>
              <li className="list-group-item">
                <strong>Category: </strong>
                {pageData.product.product_category &&
                  pageData.product.product_category.name}
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
