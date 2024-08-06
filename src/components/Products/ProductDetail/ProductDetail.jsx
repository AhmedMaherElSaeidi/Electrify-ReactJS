import "./ProductDetail.scss";
import { FaTrashAlt } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import CurrentCart from "../../../models/CurrentCart";
import CurrentUser from "../../../models/CurrentUser";
import SERVER_DOMAIN from "../../../services/enviroment";
import { useNavigate, useParams } from "react-router-dom";
import ProductUpdate from "../ProductUpdate/ProductUpdate";
import { deleteProduct, fetchProduct } from "../../../services/products";

const ProductDetail = () => {
  const { id } = useParams();
  const user = new CurrentUser();
  const cart = new CurrentCart();
  const navigate = useNavigate();
  const [pageData, setPageData] = useState({
    product: [],
    err: null,
    loading: true,
  });

  const fetchProductData = async () => {
    await fetchProduct(id)
      .then((res) => {
        const product = res.data.data;
        setPageData((prev) => {
          return { ...prev, product, loading: false };
        });
      })
      .catch((err) => {
        setPageData((prev) => {
          return { ...prev, err, loading: false };
        });
        console.error("Error fetching product:", err);
      });
  };
  const deleteProductData = async () => {
    const confirm = prompt("If you wish to continue, type 'yes'...");
    if (confirm === "yes") {
      await deleteProduct(id)
        .then(() => {
          navigate("/products");
          return;
        })
        .catch((err) => {
          console.error("Error deleting product:", err);
        });
    }
  };
  const addToCart = () => {
    setPageData({ ...pageData, loading: true });
    cart.addProduct(pageData.product.id, 1);
    setPageData({ ...pageData, loading: false });
  };

  useEffect(() => {
    fetchProductData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
              <li className="list-group-item">
                {pageData.product.stock > 0 && (
                  <span className="badge bg-success me-1">In-Stock</span>
                )}
                {pageData.product.stock === 0 && (
                  <span className="badge bg-danger me-1">Out-of-Stock</span>
                )}
                {cart.productExists(pageData.product.id) && (
                  <span className="badge bg-warning text-dark me-1">
                    In-Cart
                  </span>
                )}
              </li>
              {user.sessionValid() &&
                !user.isAdmin() &&
                !cart.productExists(pageData.product.id) && (
                  <li className="list-group-item">
                    <span className="btn btn-secondary" onClick={addToCart}>
                      Add-to-Cart
                    </span>
                  </li>
                )}
              {user.isAdmin() && (
                <li className="list-group-item remove-btn">
                  <strong>Remove: </strong>
                  <FaTrashAlt onClick={deleteProductData} />
                </li>
              )}
            </ul>
          </div>
        </div>
      )}
      {user.isAdmin() && pageData.product && (
        <ProductUpdate handleEvent={fetchProductData} />
      )}
    </div>
  );
};

export default ProductDetail;
