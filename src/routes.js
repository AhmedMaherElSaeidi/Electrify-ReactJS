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
import AuthGuard from "./guards/AuthGuard";
import GuestGuard from "./guards/GuestGuard";
import AdminGuard from "./guards/AdminGuard";
import CustomerGuard from "./guards/CustomerGuard";

const router = createHashRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      { path: "", element: <Home /> },
      { path: "/home", element: <Home /> },
      {
        path: "/cart",
        element: (
          <CustomerGuard>
            <CartPage />
          </CustomerGuard>
        ),
      },
      {
        path: "/orders",
        element: (
          <AdminGuard>
            <OrderPage />
          </AdminGuard>
        ),
      },
      { path: "/products", element: <Products /> },
      {
        path: "/settings",
        element: (
          <AuthGuard>
            <SettingsPage />
          </AuthGuard>
        ),
      },
      { path: "/products/:id", element: <Products /> },
      { path: "/product/:id", element: <ProductDetail /> },
      {
        path: "/create_product",
        element: (
          <AdminGuard>
            <ProductCreate />
          </AdminGuard>
        ),
      },
      {
        path: "/list_users",
        element: (
          <AdminGuard>
            <UsersPage />
          </AdminGuard>
        ),
      },
    ],
  },

  {
    path: "/login",
    element: (
      <GuestGuard>
        <Login />
      </GuestGuard>
    ),
  },
  {
    path: "/logout",
    element: (
      <AuthGuard>
        <Logout />
      </AuthGuard>
    ),
  },
  {
    path: "/register",
    element: (
      <GuestGuard>
        <Signup />
      </GuestGuard>
    ),
  },
  { path: "*", element: <h1>404 Not Found</h1> },
]);

export default router;
