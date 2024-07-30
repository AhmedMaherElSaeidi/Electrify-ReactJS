import Layout from "./layout/Layout";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Logout from "./components/Logout/Logout";
import Products from "./pages/Products/Products";
import CartPage from "./pages/CartPage/CartPage";
import OrderPage from "./pages/OrderPage/OrderPage";
import { createHashRouter } from "react-router-dom";
import UsersPage from "./pages/UsersPage/UsersPage";
import SettingsPage from "./pages/SettingsPage/SettingsPage";
import ProductDetail from "./components/Products/ProductDetail/ProductDetail";
import ProductCreate from "./components/Products/ProductCreate/ProductCreate";

const router = createHashRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      { path: "", element: <Home /> },
      { path: "/cart", element: <CartPage /> },
      { path: "/home", element: <Home /> },
      { path: "/orders", element: <OrderPage /> },
      { path: "/products", element: <Products /> },
      { path: "/settings", element: <SettingsPage /> },
      { path: "/products/:id", element: <Products /> },
      { path: "/product/:id", element: <ProductDetail /> },
      { path: "/create_product", element: <ProductCreate /> },
      { path: "/list_users", element: <UsersPage /> },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/logout", element: <Logout /> },
  { path: "/register", element: <Signup /> },
  { path: "*", element: <h1>404 Not Found</h1> },
]);

export default router;
