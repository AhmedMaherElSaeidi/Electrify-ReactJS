import "./CartPage.scss";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { saveCart } from "../../services/carts";
import { FaLocationDot } from "react-icons/fa6";
import CurrentCart from "../../models/CurrentCart";
import CurrentUser from "../../models/CurrentUser";
import { saveCartItem } from "../../services/cartItems";
import CartComponent from "../../components/CartComponent/CartComponent";
import GoogleMapComponent from "../../components/GoogleMapComponent/GoogleMapComponent";

const CartPage = () => {
  const navigate = useNavigate();
  const user = new CurrentUser();
  const cart = new CurrentCart();
  const [pageData, setPageData] = useState({
    err: null,
    cartItems: [],
    loading: false,
    location: cart.location,
  });

  const addCartItem = (id, totalPrice) => {
    setPageData({ ...pageData, loading: true });
    const itemIndex = pageData.cartItems.findIndex((item) => item.id === id);
    if (itemIndex !== -1) {
      pageData.cartItems[itemIndex].totalPrice = totalPrice;
      setPageData({ ...pageData, cartItems: pageData.cartItems });
    } else {
      setPageData({
        ...pageData,
        cartItems: pageData.cartItems.push({ id, totalPrice }),
      });
    }

    setPageData({ ...pageData, loading: false });
  };
  const removeCartItem = (id) => {
    setPageData({ ...pageData, loading: true });
    cart.deleteProduct(id);
    setPageData({
      ...pageData,
      cartItems: pageData.cartItems.filter((item) => item.id !== id),
      loading: false,
    });
  };
  const clearLocationSelect = () => {
    setPageData({ ...pageData, location: null });
  };
  const handleLocationSelect = (lat, lng) => {
    setPageData({ ...pageData, loading: true });
    const url = `https://www.google.com/maps?q=${lat},${lng}`;
    cart.location = url;
    setPageData({ ...pageData, location: url, loading: false });
  };
  const calculateTotal = () => {
    const total = pageData.cartItems.reduce(
      (cumm, curr) => cumm + curr.totalPrice,
      0
    );

    return Number(total.toFixed(2));
  };
  const onSubmit = async () => {
    if (!user.sessionValid()) {
      navigate("/home");
    }
    if (!pageData.location) {
      alert("Please set your checkout location.");
      return;
    }

    setPageData({ ...pageData, loading: true });
    const cartObject = {
      user_id: user.id,
      status: "pending",
      location: pageData.location,
    };

    await saveCart(cartObject)
      .then((res) => {
        const response = res.data.data;
        cart.cartID = response.id;

        cart.products.map(async (product) => {
          const cartItemObject = {
            cart_id: cart.cartID,
            product_id: product.id,
            quantity: product.quantity,
          };
          await saveCartItem(cartItemObject).catch((err) => {
            setPageData({ ...pageData, err, loading: false });
            console.log(err);
          });
        });
      })
      .catch((err) => {
        setPageData({ ...pageData, err, loading: false });
        console.log(err);
      });

    cart.clearSession();
    setPageData({ ...pageData, cartItems: [], location: null, loading: false });
    navigate("/cart-history");
  };
  const splice = (str, word) => {
    const index = str.indexOf(word);
    if (index === -1) {
      return str;
    }

    const spliceIndex = index + word.length;
    const splicedString = str.slice(0, spliceIndex);
    return splicedString;
  };

  return (
    <div className="cart-page">
      <div className="alert alert-warning text-center">
        In case map didn't show up refresh the page.
      </div>
      <div className="cart">
        <div className="cart-header">
          <h3 className="fw-bold">Shopping Cart</h3>
          <p className="fw-bold text-muted">{cart.products.length} items</p>
        </div>
        {cart.products.map((product, index) => {
          return (
            <CartComponent
              key={index}
              id={product.id}
              sendProps={addCartItem}
              removeItem={removeCartItem}
            />
          );
        })}
      </div>
      {pageData.cartItems.length !== 0 && (
        <div className="cart-summary">
          <h3 className="fw-bold">Summary</h3>
          <div className="fw-bold text-muted text-uppercase mb-3">
            <hr />
            <p className="mb-1">items {cart.products.length}</p>
            <p className="mb-1">
              Total Price:
              <span className="fw-normal">{` ${calculateTotal()} EGP`}</span>
            </p>
          </div>
          <div className="mb-3">
            <hr />
            <h6 className="fw-bold">Shipping location</h6>
            {pageData.location && (
              <div>
                <div className="mb-3">
                  <span className="me-2">
                    <FaLocationDot />
                  </span>
                  <a href={pageData.location} target="_blank" rel="noreferrer">
                    {splice(pageData.location, "maps")}
                  </a>
                </div>
                <button className="btn btn-dark" onClick={clearLocationSelect}>
                  Set location
                </button>
              </div>
            )}
            {!pageData.location && (
              <GoogleMapComponent onLocationSelect={handleLocationSelect} />
            )}
          </div>
          <div className="submit-container">
            <hr />
            <button className="btn btn-dark submit-btn" onClick={onSubmit}>
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
