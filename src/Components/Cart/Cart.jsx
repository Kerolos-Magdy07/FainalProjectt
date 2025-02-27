import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { CartContext } from './../../Context/CartContext';

export default function Cart() {
  let {
    getUserCart,
    updateCartQuantity,
    removeItemFromCart,
    clearItemsFromCart,
  } = useContext(CartContext);

  const [cartDetails, setCartDetails] = useState(null);
  const [loadingQty, setLoadingQty] = useState(false);
  const [loadingRemove, setLoadingRemove] = useState(false);
  const [loadingCart, setLoadingCart] = useState(false);
  const [currentIdQty, setCurrentIdQty] = useState("");
  const [loading, setLoading] = useState(false);

  async function GetUserCart(id) {
    setLoadingCart(true);
    let response = await getUserCart(id);
    if (response.data.status == "success") {
      setCartDetails(response.data.data);
      setLoadingCart(false);
    } else {
      setLoadingCart(false);
    }
  }

  async function UpdateCartQuantity(id, count) {
    setCurrentIdQty(id);
    setLoadingQty(true);
    let response = await updateCartQuantity(id, count);
    if (response.data.status == "success") {
      setCartDetails(response.data.data);
      toast.success("Product Updated Successfully");
      setLoadingQty(false);
    } else {
      toast.error("Something wronge");
      setLoadingQty(false);
    }
  }

  async function RemoveItemFromCart(id) {
    setCurrentIdQty(id);
    setLoadingRemove(true);
    let response = await removeItemFromCart(id);
    if (response.data.status == "success") {
      setCartDetails(response.data.data);
      toast.success("Product Removed Successfully");
      setLoadingRemove(false);
    } else {
      toast.error("Something wronge");
      setLoadingRemove(false);
    }
  }

  async function ClearItemsFromCart() {
    setLoading(true);
    let response = await clearItemsFromCart();
    if (response.data.message == "success") {
      setCartDetails(null);
      toast.success("Products Removed Successfully");
      setLoading(false);
    } else {
      toast.error("Something wronge");
      setLoading(false);
    }
  }

  useEffect(() => {
    GetUserCart();
  }, []);

  return (
    <>
      {loadingCart ? (
        <div className="mt-18 flex items-center justify-center">
          <span className="loader"></span>
        </div>
      ) : cartDetails?.products.length > 0 ? (
        <>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-left text-sm text-gray-500 rtl:text-right">
              <thead className="bg-gray-50 text-xs text-gray-700 uppercase">
                <tr>
                  <th scope="col" className="px-2 text-lg py-3 md:px-6 md:py-4">
                    Image
                  </th>
                  <th scope="col" className="px-2 text-lg py-3 md:px-6 md:py-4">
                    Product
                  </th>
                  <th scope="col" className="px-2 text-lg py-3 md:px-6 md:py-4">
                    Qty
                  </th>
                  <th scope="col" className="px-2 text-lg py-3 md:px-6 md:py-4">
                    Price
                  </th>
                  <th scope="col" className="px-2 text-lg py-3 md:px-6 md:py-4">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {cartDetails?.products.map((product) => (
                  <tr
                    key={product._id}
                    className="border-b border-gray-200 bg-white hover:bg-gray-50"
                  >
                    <td className="px-4 py-2 md:px-6 md:py-4">
                      <img
                        src={product.product.imageCover}
                        className="h-16 w-16 object-cover md:h-24 md:w-24"
                        alt={product.product.title}
                      />
                    </td>
                    <td className="px-4 py-2 text-xl font-semibold text-gray-900 md:px-6 md:py-4">
                      {product.product.title}
                    </td>
                    <td className="px-4 py-2 md:px-6 md:py-4">
                      <div className="flex items-center">
                        <button
                          className="me-2 inline-flex size-6 items-center justify-center rounded-full border border-gray-700 bg-white p-2 text-sm font-medium text-gray-700 hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 focus:outline-none"
                          type="button"
                          onClick={() =>
                            UpdateCartQuantity(
                              product.product.id,
                              product.count - 1,
                            )
                          }
                        >
                          <i className="fa-solid fa-minus"></i>
                        </button>
                        <div className="text-gray-700 font-semibold text-lg">
                          {loadingQty && currentIdQty == product.product.id ? (
                            <i className="fas fa-spinner fa-spin"></i>
                          ) : (
                            <span >{product.count}</span>
                          )}
                        </div>
                        <button
                          className="ms-2 inline-flex size-6 items-center justify-center rounded-full border border-gray-700 bg-white p-2 text-sm font-medium text-gray-700 hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 focus:outline-none"
                          type="button"
                          onClick={() =>
                            UpdateCartQuantity(
                              product.product.id,
                              product.count + 1,
                            )
                          }
                        >
                          <i className="fa-solid fa-plus"></i>
                        </button>
                      </div>
                    </td>
                    <td className="px-4 py-2 font-semibold  text-gray-900 md:px-6 md:py-4">
                      EGP {product.price}
                    </td>
                    <td className="px-4 py-2 md:px-6 md:py-4">
                      <button
                        type="button" className="text-red-700 cursor-pointer nterfont-medium hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                        onClick={() => RemoveItemFromCart(product.product.id)}
                      >
                        {loadingRemove && currentIdQty == product.product.id ? (
                          <i className="fas fa-spinner fa-spin"></i>
                        ) : (
                          <span>remove</span>
                        )}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex flex-col items-center justify-between gap-4 md:flex-row md:items-center">
              <button
                className="btn-clear-cart rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700 md:px-6 md:py-3"
                onClick={ClearItemsFromCart}
              >
                {loading ? (
                  <i className="fas fa-spinner fa-spin"></i>
                ) : (
                  <span>Clear Cart</span>
                )}
              </button>
              <h2 className="p-4 text-center font-[900] text-green-900 mx-20 md:text-end">
                <span className="font-[600] "><span className="text-gray-950  font-black text-lg">Total Price : </span> </span>
                {cartDetails?.totalCartPrice
                  ? cartDetails.totalCartPrice.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })
                  : "0.00"}{" "}
                EGP
              </h2>
            </div>
          </div>

          <div className="mt-4">
            <Link to={"/checkout"}>
              <button className="btn-specific-product md:px-6 md:py-3">
                CheckOut
              </button>
            </Link>
          </div>
        </>
      ) : (
        <div className="mt-4 flex items-center justify-center rounded bg-emerald-600 bg-linear-to-r to-emerald-500 to-45% p-8">
          <h2 className="text-2xl font-[600] text-white">Your cart is empty</h2>
        </div>
      )}
    </>
  );
}
