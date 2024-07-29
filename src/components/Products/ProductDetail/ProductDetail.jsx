import "./ProductDetail.scss";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import CurrentUser from "../../../models/CurrentUser";
import SERVER_DOMAIN from "../../../services/enviroment";
import { fetchProduct } from "../../../services/products";
import RequestProduct from "../RequestProduct/RequestProduct";

const ProductDetail = () => {
  const { id } = useParams();
  const user = new CurrentUser();
  const [pageData, setPageData] = useState({
    product: [],
    err: null,
    loading: true,
  });

  const fetchProductData = () => {
    fetchProduct(id)
      .then((res) => {
        setPageData({ ...pageData, product: res.data.data, loading: false });
        setPageData((prev) => {
          return { ...prev, product: res.data.data, loading: false };
        });
      })
      .catch((err) => {
        setPageData((prev) => {
          return { ...prev, err, loading: false };
        });
        console.error("Error fetching product:", err);
      });
  };

  useEffect(() => {
    fetchProductData();
  });

  return (
    <div className="product-details">
      {pageData.product && (
        <div className="details mb-5">
          <div className="me-3 mb-3">
            <img
              src={`${SERVER_DOMAIN}/${pageData.product.image}`}
              alt="product_image"
            />
          </div>
          <div>
            <h4 className="fw-bold">{pageData.product.name}</h4>
            <ul className="list-group">
              <li className="list-group-item">
                <strong>Price: </strong>EGP{pageData.product.price}
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
      {user.sessionValid() && !user.isAdmin() && (
        <RequestProduct product={pageData.product} />
      )}
    </div>
  );
};

export default ProductDetail;
