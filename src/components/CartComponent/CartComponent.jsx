import "./CartComponent.scss";
import { RxCross1 } from "react-icons/rx";
import { FaPlus, FaMinus } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import CurrentCart from "../../models/CurrentCart";
import SERVER_DOMAIN from "../../services/enviroment";
import { fetchProduct } from "../../services/products";

const CartComponent = ({ id, sendProps, removeItem }) => {
  const cart = new CurrentCart();
  const [quantity, setQuantity] = useState(1);
  const [productData, setProductData] = useState({ data: null, err: null });

  const fetchProductData = async () => {
    await fetchProduct(id)
      .then((res) => {
        const product = res.data.data;
        sendProps(id, +product.price * +cart.getProduct(id).quantity);
        setProductData((prev) => {
          return { ...prev, data: product };
        });
      })
      .catch((err) => {
        setProductData((prev) => {
          return { ...prev, err };
        });
        console.log(err);
      });
  };
  const updateQuantity = (value) => {
    if (value > 0 && value <= productData.data.stock) {
      setQuantity(value);
      cart.addProduct(id, value);
      sendProps(id, productData.data.price * value);
    }
  };

  useEffect(() => {
    fetchProductData();
    setQuantity(cart.getProduct(id).quantity);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="cart-item">
      {productData.data && (
        <div>
          <hr />
          <div className="cart-row">
            <div className="cart-label">
              <img
                className="me-2"
                src={`${SERVER_DOMAIN}/${productData.data.image}`}
                alt="product_image"
              />
              <div>
                <h5>{productData.data.name}</h5>
                <h6>{productData.data.product_category.name}</h6>
                <span className="small">
                  {productData.data.stock} unit available
                </span>
              </div>
            </div>
            <div className="cart-body">
              <span className="clickable" onClick={() => removeItem(id)}>
                <RxCross1 />
              </span>
              <div className="quantity text-muted">
                <span
                  className="clickable"
                  onClick={() => updateQuantity(quantity - 1)}
                >
                  <FaMinus />
                </span>
                <span className="badge bg-white text-dark">{quantity}</span>
                <span
                  className="clickable"
                  onClick={() => updateQuantity(quantity + 1)}
                >
                  <FaPlus />
                </span>
              </div>
              <span className="fw-bold">EGP {productData.data.price}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartComponent;
