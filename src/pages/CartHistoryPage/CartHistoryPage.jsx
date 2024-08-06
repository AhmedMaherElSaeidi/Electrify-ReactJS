import React, { useEffect, useState } from "react";
import CurrentUser from "../../models/CurrentUser";
import { deleteCart, fetchUserCarts } from "../../services/carts";
import CartComponent from "../../components/CartHistorty/CartComponent/CartComponent";

const CartHistoryPage = () => {
  const user = new CurrentUser();
  const [pageData, setPageData] = useState({
    err: null,
    carts: [],
    loading: true,
  });

  const fetchUserCartsData = async () => {
    await fetchUserCarts(user.id)
      .then((res) => {
        const carts = res.data.data;
        setPageData({ ...pageData, carts, loading: false });
      })
      .catch((err) => {
        setPageData({ ...pageData, err, loading: false });
        console.log(err);
      });
  };
  const deleteUserCartData = async (id) => {
    setPageData({ ...pageData, loading: true });
    await deleteCart(id).catch((err) => {
      console.log(err);
      setPageData({ ...pageData, err, loading: false });
    });

    fetchUserCartsData();
  };

  useEffect(() => {
    fetchUserCartsData();
  }, []);

  return (
    <div>
      {pageData.carts &&
        pageData.carts.map((cart, index) => {
          return (
            <CartComponent
              key={index}
              cart={cart}
              onDelete={deleteUserCartData}
            />
          );
        })}
    </div>
  );
};

export default CartHistoryPage;
