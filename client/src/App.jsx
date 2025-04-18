import React, { Suspense, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";
import { useUserStore } from "./stores/useUserStore";
import { useCartStore } from "./stores/useCartStore";
import LoadingSpinner from "./components/LoadingSpinner";

// lazy imports for performance
import { getAppRoutes } from "./Routes/routesConfig";

function App() {
  const { user, confirmAuth, confirmingAuth } = useUserStore();
  const { getCartItems } = useCartStore();

  useEffect(() => {
    confirmAuth();
  }, [confirmAuth]);

  useEffect(() => {
    if (!user) return;
    getCartItems();
  }, [getCartItems, user]);

  if (confirmingAuth) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden">
      {/* Enhanced Background Gradient */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.25)_0%,rgba(29,78,216,0.15)_50%,rgba(0,0,0,0.05)_100%)]" />
        </div>
      </div>

      {/* Content with proper layering */}
      <div className="relative z-10">
        {/* Changed from z-50 to z-10 (still works but more conventional) */}
        <Navbar />
        <main>
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              {getAppRoutes(user).map((route, index) => (
                <Route key={index} path={route.path} element={route.element} />
              ))}
            </Routes>
          </Suspense>
        </main>
        <Toaster />
      </div>
    </div>
  );
}

export default App;
