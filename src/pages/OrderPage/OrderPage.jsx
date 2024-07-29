import "./OrderPage.scss";
import React, { useEffect, useState } from "react";
import { fetchAllCarts, updateCart } from "../../services/carts";
import OrderComponent from "../../components/Order/OrderComponent/OrderComponent";
import { updateProduct } from "../../services/products";

const OrderPage = () => {
  const [pageData, setPageData] = useState({
    orders: [],
    err: null,
    loading: true,
  });

  const fetchAllCartsData = async () => {
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
  const updateCartData = async (cartData, productsData) => {
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
    fetchAllCartsData();
  };

  useEffect(() => {
    fetchAllCartsData();
  }, []);

  return (
    <div>
      {pageData.orders &&
        pageData.orders.map((order, index) => {
          return (
            <OrderComponent
              key={index}
              order={order}
              updateCartStatus={updateCartData}
            />
          );
        })}
    </div>
  );
};

export default OrderPage;
