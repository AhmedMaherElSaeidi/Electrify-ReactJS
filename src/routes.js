import Layout from "./layout/Layout";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Logout from "./components/Logout/Logout";
import Products from "./pages/Products/Products";
import { createHashRouter } from "react-router-dom";
import ProductDetail from "./components/Products/ProductDetail/ProductDetail";

const router = createHashRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      { path: "", element: <Home /> },
      { path: "/home", element: <Home /> },
      { path: "/products", element: <Products /> },
      { path: "/products/:id", element: <Products /> },
      { path: "/product/:id", element: <ProductDetail /> },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/logout", element: <Logout /> },
  { path: "/register", element: <Signup /> },
]);

export default router;
