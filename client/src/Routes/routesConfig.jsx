import { Navigate, useParams } from "react-router-dom";
import { lazy } from "react";

// Lazy imports for performance
const SignUpPage = lazy(() => import("../pages/SignUpPage"));
const Login = lazy(() => import("../pages/Login"));
const HomePage = lazy(() => import("../pages/HomePage"));
const AdminPage = lazy(() => import("../pages/AdminPage"));
const CartPage = lazy(() => import("../pages/CartPage"));
const ShopPage = lazy(() => import("../pages/ShopPage"));
const ProductPage = lazy(() => import("../pages/ProductPage"));
const SettingsPage = lazy(() => import("../pages/SettingsPage"));
const WishlistPage = lazy(() => import("../pages/WishlistPage"));
const OrdersPage = lazy(() => import("../pages/OrdersPage"));
const NotFoundPage = lazy(() => import("../pages/NotFoundPage"));
const PurchaseSuccessPage = lazy(() => import("../pages/PurchaseSuccessPage"));
const PurchaseCancelPage = lazy(() => import("../pages/PurchaseCancelPage"));

const CategoryRedirect = () => {
  const { category } = useParams();
  return <Navigate to={`/shop?category=${encodeURIComponent(category || "")}`} replace />;
};

export const getAppRoutes = (user) => [
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/shop",
    element: <ShopPage />,
  },
  {
    path: "/product/:id",
    element: <ProductPage />,
  },
  {
    path: "/category/:category",
    element: <CategoryRedirect />,
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
    path: "/settings",
    element: <SettingsPage />,
  },
  {
    path: "/wishlist",
    element: <WishlistPage />,
  },
  {
    path: "/orders",
    element: user ? <OrdersPage /> : <Navigate to="/login" />,
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
  {
    path: "*",
    element: <NotFoundPage />,
  },
];
