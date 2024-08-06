import "./OrderPage.scss";
import React, { useEffect, useState } from "react";
import Spinner from "../../components/Spinner/Spinner";
import { updateProduct } from "../../services/products";
import { FaSortAlphaUp, FaSortAlphaDown } from "react-icons/fa";
import { fetchAllCarts, updateCart } from "../../services/carts";
import OrderComponent from "../../components/Order/OrderComponent/OrderComponent";

const OrderPage = () => {
  const [pageData, setPageData] = useState({
    orders: [],
    err: null,
    loading: false,
    orderAlpha: "asc",
  });

  const fetchAllOrdersData = async () => {
    setPageData({ ...pageData, loading: true });
    await fetchAllCarts()
      .then((res) => {
        setPageData((prev) => {
          return { ...prev, orders: res.data.data, loading: false };
        });
      })
      .catch((err) => {
        setPageData((prev) => {
          return { ...prev, err, loading: false };
        });
        console.log(err);
      });
  };
  const updateOrderData = async (cartData, productsData) => {
    setPageData({ ...pageData, loading: true });
    const cartID = cartData.id;
    delete cartData.id;

    // Update cart status
    await updateCart(cartID, cartData).catch((err) => {
      console.log(err);
    });

    // Updating products qty in stock
    if (cartData.status === "delivered") {
      for (const index in productsData) {
        const productID = productsData[index].product_id;
        const requestedQty = productsData[index].quantity;
        const product = { ...productsData[index].product_items };

        // Updating product object
        delete product.id;
        product.stock = product.stock - requestedQty;

        // Updating product
        await updateProduct(productID, product).catch((err) => {
          console.log(err);
        });
      }
    }

    // Refreshing page
    setPageData({ ...pageData, loading: false });
    fetchAllOrdersData();
  };
  const sortOrderData = () => {
    setPageData((prev) => {
      const nextSort = pageData.orderAlpha === "asc" ? "desc" : "asc";
      const orders = pageData.orders.sort((a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        return nextSort === "asc" ? dateA - dateB : dateB - dateA;
      });

      return { ...prev, orders, orderAlpha: nextSort };
    });
  };

  useEffect(() => {
    fetchAllOrdersData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="orders-page">
      <div className="alert alert-light mb-4 p-2">
        <span className="sort-btn me-3" onClick={sortOrderData}>
          {pageData.orderAlpha === "asc" ? (
            <FaSortAlphaUp />
          ) : (
            <FaSortAlphaDown />
          )}
        </span>
      </div>
      {pageData.orders &&
        pageData.orders.map((order, index) => {
          return (
            <OrderComponent
              key={index}
              order={order}
              updateCartStatus={updateOrderData}
            />
          );
        })}
      {pageData.loading && <Spinner />}
    </div>
  );
};

export default OrderPage;
