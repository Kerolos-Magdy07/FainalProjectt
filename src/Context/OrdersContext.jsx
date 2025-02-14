import React, { createContext, useContext } from "react";
import { CartContext } from "./CartContext";
import axios from "axios";

export const ordersContext = createContext();

export default function OrdersContextProvider({ children }) {
  let { setNumCart, cartId } = useContext(CartContext);
  let headers = {
    token: localStorage.getItem("userToken"),
  };

  function checkoutCart(cartId, url, formData) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}`,
        {
          shippingAddress: formData,
        },
        {
          headers,
        },
      )
      .then((res) => {
        setNumCart(res.data.numOfCartItems);
        return res;
      })
      .catch((err) => err);
  }

  return (
    <ordersContext.Provider value={{ checkoutCart }}>
      {children}
    </ordersContext.Provider>
  );
}
