import React, { useContext, useState } from "react";
import Logo from "../../assets/freshcart-logo.svg";
import NavbarCss from "./Navbar.module.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import HumburgerBotton from "../../assets/NavBar/burger-menu.svg";
import classNames from "classnames";
import { authContext } from "./../../Context/AuthContext";
import { MdLogout, MdOutlineLogin } from "react-icons/md";
import { HiMiniUserPlus } from "react-icons/hi2";
import { VscSignIn } from "react-icons/vsc";
import { CartContext } from "../../Context/CartContext";
import {
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaTiktok,
  FaYoutube,
} from "react-icons/fa";
import { WishListContext } from "../../Context/WishListContext";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { userToken, setuserToken } = useContext(authContext);
  const { numCart } = useContext(CartContext);
  const { numWishList } = useContext(WishListContext);
  const navigate = useNavigate();

  const menuClass = classNames(
    "p-0.5",
    "border",
    "rounded",
    "text-gray-600",
    "border-gray-500",
    "hover:text-gray-800",
    "hover:bg-slate-400/80",
    { "bg-slate-400": isMenuOpen },
  );

  const navLinks = [
    { name: "Home", path: "" },
    { name: "Products", path: "products" },
    { name: "Categories", path: "categories" },
    { name: "Brands", path: "brands" },
    { name: "Cart", path: "cart" },
    { name: "WishList", path: "wishlist" },
  ];

  const authLinks = [
    { name: "Login", path: "login" },
    { name: "Register", path: "register" },
  ];

  const iconClass = "text-xl text-gray-900 hover:text-gray-950";

  const socialIcons = {
    facebook: <FaFacebook className={iconClass} />,
    twitter: <FaTwitter className={iconClass} />,
    linkedin: <FaLinkedin className={iconClass} />,
    tiktok: <FaTiktok className={iconClass} />,
    youtube: <FaYoutube className={iconClass} />,
  };

  const socialLinks = ["facebook", "twitter", "linkedin", "tiktok", "youtube"];

  function hundelLogout() {
    localStorage.removeItem("userToken");
    setuserToken(null);
    navigate("/login");
    setIsMenuOpen(false);
  }

  return (
    <>
      <div>
  <nav className="mainNavbar fixed inset-x-0 top-0 drop-shadow-xl border-gray-600 z-[9999] min-h-18 border-gray-100 bg-slate-300 font-[EncodeSans]">
    <div className="container mx-auto max-w-screen-2xl px-[100px] flex flex-wrap items-center justify-between p-4">
      <div className="flex items-center gap-5">
        <NavLink to="" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src={Logo} className="h-8" alt="FreshCart-Logo" />
        </NavLink>

        {/* pages for lg Screen and higher */}
        {userToken && (
          <ul className="hidden gap-5 mx-7 text-slate-800 lg:flex">
            <li><NavLink to="/"> Home </NavLink></li>
            <li><NavLink to="/products"> Products </NavLink></li>
            <li><NavLink to="/categories"> Categories </NavLink></li>
            <li><NavLink to="/brands"> Brands </NavLink></li>
            <li>
              <NavLink to="/cart" className="relative">
                Cart
                {numCart > 0 && (
                  <div className="absolute -top-4 -right-4 flex size-5 items-center justify-center rounded-full bg-emerald-600 p-1 text-center font-normal text-white">
                    {numCart}
                  </div>
                )}
              </NavLink>
            </li>
            <li>
              <NavLink to="/wishlist" className="relative">
                Wishlist
                {numWishList > 0 && (
                  <div className="absolute -top-4 -right-4 flex size-5 items-center justify-center rounded-full bg-emerald-600 p-1 text-center font-normal text-white">
                    {numWishList}
                  </div>
                )}
              </NavLink>
            </li>
          </ul>
        )}
      </div>

      {/* SocialMedia and Login for large Screens */}
      <div className="hidden items-center space-x-6 lg:flex rtl:space-x-reverse">
        <ul className="flex hidden gap-3">
          {socialLinks.map((platform) => (
            <li key={platform}>{socialIcons[platform]}</li>
          ))}
        </ul>

        <ul className="hidden gap-3 lg:flex">
  {userToken ? (
    <li>
      <button 
        className="text-black hover:text-white border border-black hover:bg-black 
                   focus:ring-4 focus:outline-none font-medium rounded-lg text-lg 
                   px-3 py-1 text-center tracking-wide"
        onClick={hundelLogout}
      >
        Logout
      </button>
    </li>
  ) : (
    <>
      <li>
        <button 
          className="text-black hover:text-white border border-black hover:bg-black 
          focus:ring-4 focus:outline-none font-medium rounded-lg text-lg 
          px-3 py-1 text-center tracking-wide"
>
          <Link to="/login">Login</Link>
        </button>
      </li>
      <li>
        <button 
          className="text-black hover:text-white border border-black hover:bg-black 
                     focus:ring-4 focus:outline-none font-medium rounded-lg text-lg 
                     px-3 py-1 text-center tracking-wide"
        >
          <Link to="/register">Register</Link>
        </button>
      </li>
    </>
  )}
</ul>


      </div>

      {/* Mobile Menu Button */}
      <div className="lg:hidden">
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className={menuClass}>
          <figure>
            <img src={HumburgerBotton} alt="MenuHumburgerBotton" />
          </figure>
        </button>
      </div>
    </div>
  </nav>
</div>

    </>
  );
}
