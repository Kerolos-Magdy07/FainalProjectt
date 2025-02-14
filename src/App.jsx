import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Home from "./Components/Home/Home";
import Cart from "./Components/Cart/Cart";
import Products from "./Components/Products/Products";
import Categories from "./Components/CategoriesComponents/Categories/Categories";
import Brands from "./Components/Brands/Brands";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import Notfound from "./Components/Notfound/Notfound";
import AuthContextProvider from "./Context/AuthContext";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import ProductDetails from "./Components/ProductDetails/ProductDetails";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "./../node_modules/@tanstack/react-query-devtools";
import CartContextProvider from "./Context/CartContext";
import { Toaster } from "react-hot-toast";
import Checkout from "./Components/Checkout/Checkout";
import OrdersContextProvider from "./Context/OrdersContext";
import CategoryDetails from "./Components/CategoriesComponents/CategoryDetails/CategoryDetails";
import ForgetPassword from "./Components/ForgetPassword/ForgetPassword";
import VerificationCode from "./Components/VerificationCode/VerificationCode";
import ResetPassword from "./Components/ResetPassword/ResetPassword";
import { ForgettenEmailContextProvider } from "./Context/ForgettenMailContext";
import WishListContextProvider from "./Context/WishListContext";
import WishList from "./Components/WishList/WishList";




let query = new QueryClient();

let routes = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "products",
        element: (
          <ProtectedRoute>
            <Products />
          </ProtectedRoute>
        ),
      },
      {
        path: "categories",
        element: (
          <ProtectedRoute>
            <Categories />
          </ProtectedRoute>
        ),
      },
      {
        path: "category/:categoryId",
        element: (
          <ProtectedRoute>
            <CategoryDetails />
          </ProtectedRoute>
        ),
      },
      
      {
        path: "brands",
        element: (
          <ProtectedRoute>
            <Brands />
          </ProtectedRoute>
        ),
      },
      {
        path: "cart",
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },
      {
        path: "wishlist",
        element: (
          <ProtectedRoute>
            <WishList />
          </ProtectedRoute>
        ),
      },
      {
        path: "/productdetails/:id/:category",
        element: (
          <ProtectedRoute>
            <ProductDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "checkout",
        element: (
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        ),
      },
      {
        path: "allorders",
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "forgetpassword",
        element: <ForgetPassword />,
      },
      {
        path: "verifycode",
        element: <VerificationCode />,
      },
      {
        path: "resetpassword",
        element: <ResetPassword />,
      },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "*", element: <Notfound /> },
    ],
  },
]);


function App() {
  return (
    <AuthContextProvider>
      <QueryClientProvider client={query}>
        <CartContextProvider>
          <OrdersContextProvider>
            <ForgettenEmailContextProvider>
              <WishListContextProvider>
                <RouterProvider router={routes}></RouterProvider>
              </WishListContextProvider>
            </ForgettenEmailContextProvider>
          </OrdersContextProvider>
          <Toaster />
        </CartContextProvider>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </AuthContextProvider>
  );
}

export default App;
