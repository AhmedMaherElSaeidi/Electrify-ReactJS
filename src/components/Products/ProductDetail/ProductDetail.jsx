import "./ProductDetail.scss";
import { FaTrashAlt } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import CurrentCart from "../../../models/CurrentCart";
import CurrentUser from "../../../models/CurrentUser";
import SERVER_DOMAIN from "../../../services/enviroment";
import { useNavigate, useParams } from "react-router-dom";
import ProductUpdate from "../ProductUpdate/ProductUpdate";
import RequestProduct from "../RequestProduct/RequestProduct";
import { fetchSpecificCartItem } from "../../../services/cartItems";
import { deleteProduct, fetchProduct } from "../../../services/products";

const ProductDetail = () => {
  const { id } = useParams();
  const user = new CurrentUser();
  const cart = new CurrentCart();
  const navigate = useNavigate();
  const [pageData, setPageData] = useState({
    product: [],
    err: null,
    inCart: false,
    loading: true,
  });

  const fetchProductData = async () => {
    await fetchProduct(id)
      .then((res) => {
        const product = res.data.data;
        setPageData((prev) => {
          return { ...prev, product };
        });

        fetchSpecificCartItem(cart.cartID, product.id)
          .then(() => {
            setPageData((prev) => {
              return { ...prev, inCart: true, loading: false };
            });
          })
          .catch((err) => {
            setPageData((prev) => {
              return { ...prev, inCart: false, loading: false };
            });
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

  useEffect(() => {
    fetchProductData();
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
      {user.sessionValid() &&
        !user.isAdmin() &&
        !pageData.inCart &&
        pageData.product && <RequestProduct product={pageData.product} handleEvent={fetchProductData}/>}
      {user.isAdmin() && pageData.product && (
        <ProductUpdate handleEvent={fetchProductData} />
      )}
    </div>
  );
};

export default ProductDetail;
