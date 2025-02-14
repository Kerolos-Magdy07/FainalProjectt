import React, { useContext, useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import useAllProducts from "../../Hooks/UseProducts";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import { WishListContext } from "../../Context/WishListContext";

export default function Products() {
  let { addToCart } = useContext(CartContext);
  let {
    addToWishList,
    wishlistdetails,
    numWishList,
    getUserWishList,
    removeItemFromWishList,
  } = useContext(WishListContext);
  let { data, isLoading, isError, error } = useAllProducts();
  const [loading, setLoading] = useState(false);
  const [currentIdBtn, setCurrentIdBtn] = useState("");
  const [wishL, setWishL] = useState();

  async function AddToCart(id) {
    setCurrentIdBtn(id);
    setLoading(true);
    let response = await addToCart(id);
    if (response?.data?.status == "success") {
      setLoading(false);
      toast.success(response.data.message, {
        duration: 2000,
        position: "top-center",
      });
      setLoading(false);
    } else {
      setLoading(false);
      toast.error(response.data.message);
    }
    setLoading(false);
  }

  async function handleWishListToggle(id) {
    if (wishlistdetails?.some((item) => item.id === id)) {
      let response = await removeItemFromWishList(id);
      if (response?.data?.status === "success") {
        await getUserWishList();
        toast.success(response.data.message);
      }
    }
    if (!wishlistdetails?.some((item) => item.id === id)) {
      let response = await addToWishList(id);
      if (response?.data?.status === "success") {
        await getUserWishList();
        toast.success(response.data.message);
      }
    }
  }

  if (isError) {
    return (
      <h3 className="my-12 text-center text-4xl font-[600] text-red-600">
        {error.message}
      </h3>
    );
  }

  if (isLoading) {
    return (
      <div className="mt-18 flex items-center justify-center">
        <span className="loader"></span>
      </div>
    );
  }

  return (
    <>
      <div className="mt-18 grid grid-cols-12 justify-items-center gap-x-4 gap-y-12">
        {data.map((product) => (
          <div
            key={product.id}
            className="group col-span-6 md:col-span-6 md:px-5 lg:col-span-3"
          >
            <div className="productBorder my-main-hover">
              <Link
                to={`/productdetails/${product.id}/${product.category.name}`}
              >
                <figure className="overflow-hidden">
                  <img
                    className="w-full object-cover"
                    src={product.imageCover}
                    alt=""
                  />
                </figure>
                <div className="p-2 md:p-5">
                  <h3 className="text-emerald-600">{product.category.name}</h3>
                  <h3>{product.title.split(" ").slice(0, 2).join(" ")}</h3>
                  <div className="flex items-center justify-between">
                    <span>{product.price} EGP</span>
                    <span className="flex items-center gap-0.5">
                      {product.ratingsAverage}{" "}
                      <FaStar className="text-yellow-400" />
                    </span>
                  </div>
                </div>
              </Link>

              <div className="flex items-center justify-center p-3 pe-3">
                <button
                  onClick={() => AddToCart(product.id)}
                  className="btn-add-product-sm md:btn-add-product my-2"
                >
                  {loading && currentIdBtn == product.id ? (
                    <i className="fas fa-spinner fa-spin"></i>
                  ) : (
                    `Add To Cart`
                  )}
                </button>

                <button onClick={() => handleWishListToggle(product.id)}>
                  {wishlistdetails?.some((item) => item.id === product.id) ? (
                    <i className="fa-solid fa-heart fa-xl md:fa-2xl cursor-pointer text-emerald-700"></i>
                  ) : (
                    <i className="fa-regular fa-heart fa-xl md:fa-2xl cursor-pointer"></i>
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="m-auto mt-8 hidden justify-center gap-6 text-center">
        <NavLink to="/">
          {" "}
          <button className="cursor-pointer border border-emerald-600 px-2">
            1
          </button>
        </NavLink>
        <NavLink to="/">
          {" "}
          <button className="cursor-pointer border border-emerald-600 px-2">
            2
          </button>
        </NavLink>
      </div>
    </>
  );
}
