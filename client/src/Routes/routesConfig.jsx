import { Navigate } from "react-router-dom";
import {lazy} from 'react'

// Lazy imports for performance
const SignUpPage = lazy(() => import("../pages/SignUpPage"));
const Login = lazy(() => import("../pages/Login"));
const HomePage = lazy(() => import("../pages/HomePage"));
const AdminPage = lazy(() => import("../pages/AdminPage"));
const CartPage = lazy(() => import("../pages/CartPage"));
const CategoryPage = lazy(() => import("../pages/CategoryPage"));
const PurchaseSuccessPage = lazy(() => import("../pages/PurchaseSuccessPage"));
const PurchaseCancelPage = lazy(() => import("../pages/PurchaseCancelPage"));

export const getAppRoutes = (user) => [
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/signup",
    element: !user ? <SignUpPage /> : <Navigate to="/" />,
  },
  {
    path: "/login",
    element: !user ? <Login /> : <Navigate to="/" />,
  },
  {
    path: "/admin-dashboard",
    element: user?.role === "admin" ? <AdminPage /> : <Navigate to="/login" />,
  },
  {
    path: "/category/:category",
    element: <CategoryPage />,
  },
  {
    path: "/cart",
    element: user ? <CartPage /> : <Navigate to="/login" />,
  },
  {
    path: "/purchase-success",
    element: user ? <PurchaseSuccessPage /> : <Navigate to="/login" />,
  },
  {
    path: "/purchase-cancel",
    element: user ? <PurchaseCancelPage /> : <Navigate to="/login" />,
  },
];
