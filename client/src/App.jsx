import React, { Suspense, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { MotionConfig } from "framer-motion";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import MobileDock from "./components/layout/MobileDock";
import Spinner from "./components/ui/Spinner";
import { useUserStore } from "./stores/useUserStore";
import { useCartStore } from "./stores/useCartStore";
import { useThemeStore } from "./stores/useThemeStore";
import { getAppRoutes } from "./Routes/routesConfig";

function App() {
  const { user, confirmAuth, confirmingAuth } = useUserStore();
  const getCartItems = useCartStore((s) => s.getCartItems);
  const motion = useThemeStore((s) => s.motion);

  useEffect(() => {
    confirmAuth();
  }, [confirmAuth]);

  useEffect(() => {
    if (user) {
      getCartItems();
    }
  }, [getCartItems, user]);

  if (confirmingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner label="Loading supperFastShop" />
      </div>
    );
  }

  return (
    <MotionConfig reducedMotion={motion ? "user" : "always"}>
      <div className="min-h-screen flex flex-col text-on-field transition-colors duration-300">
        <Header />
        <main className="flex-1 pb-20 md:pb-0">
          <Suspense
            fallback={
              <div className="py-20 flex justify-center">
                <Spinner />
              </div>
            }
          >
            <Routes>
              {getAppRoutes(user).map((route, index) => (
                <Route key={index} path={route.path} element={route.element} />
              ))}
            </Routes>
          </Suspense>
        </main>
        <Footer />
        <MobileDock />
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: "var(--ink, #0b0b0b)",
              color: "var(--paper, #f7f4ec)",
              fontFamily: "var(--font-label, monospace)",
              border: "2px solid var(--ink, #0b0b0b)",
              borderRadius: "4px",
            },
          }}
        />
      </div>
    </MotionConfig>
  );
}

export default App;
