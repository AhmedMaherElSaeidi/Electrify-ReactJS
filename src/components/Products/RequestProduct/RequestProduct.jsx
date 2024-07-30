import "./RequestProduct.scss";
import React from "react";
import { useForm } from "react-hook-form";
import { saveCart } from "../../../services/carts";
import CurrentUser from "../../../models/CurrentUser";
import CurrentCart from "../../../models/CurrentCart";
import FormInput3 from "../../Form/FormInput3/FormInput3";
import { saveCartItem } from "../../../services/cartItems";

const RequestProduct = ({ product, handleEvent }) => {
  const cart = new CurrentCart();
  const user = new CurrentUser();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      // Getting cart id
      let cartID = cart.cartID;

      // Saving cart for current session
      if (!cartID) {
        const cartData = {};
        cartData.location = data.location;
        cartData.status = "pending";
        cartData.user_id = user.id;

        await saveCart(cartData)
          .then((res) => {
            cartID = res.data.data.id;
            cart.cartID = cartID;
          })
          .catch((err) => {
            console.error("Error saving cart:", err);
          });
      }

      // Saving product within cart.
      const cartItemData = {
        quantity: data.quantity,
        product_id: product.id,
        cart_id: cartID,
      };
      await saveCartItem(cartItemData).catch((err) => {
        console.error("Error saving cart:", err);
      });

      // Refreshing parent component
      handleEvent();

      // Reseting form
      alert("Ordered successfully.");
      reset();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form className="request-product-form" onSubmit={handleSubmit(onSubmit)}>
      <FormInput3
        id="quantity"
        type="number"
        label="Quantity"
        register={register}
        errors={errors}
        validation={{ min: 1, max: product.stock }}
      />
      {!cart.cartID && (
        <FormInput3
          id="location"
          type="text"
          label="Location"
          register={register}
          errors={errors}
        />
      )}
      <button className="btn btn-success" type="submit">
        Request
      </button>
    </form>
  );
};

export default RequestProduct;
