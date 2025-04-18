import {
  ShoppingCart,
  UserPlus,
  LogIn,
  LogOut,
  Lock,
  Menu,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const { user, logout } = useUserStore();
  const { cart } = useCartStore();
  const isAdmin = user?.role === "admin";
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.1, ease: "easeOut" }}
      className="w-full bg-gray-900 border-b border-blue-900/30 shadow-xl"
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <ShoppingCart className="w-7 h-7 text-blue-400 group-hover:text-blue-300 transition-all duration-300" />
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent group-hover:from-blue-300 group-hover:to-blue-500 transition-all duration-300">
              supperFastShop
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-4">
            <Link
              to={"/"}
              className="text-gray-300 hover:text-blue-400 px-3 py-2 rounded-md transition-all duration-200 hover:bg-gray-800/50 flex items-center gap-1"
            >
              <span className="text-gray-300 text-[1.2rem]">Home</span>
            </Link>

            {user && (
              <Link
                to={"/cart"}
                className="relative px-3 py-2 rounded-md text-gray-300 hover:text-blue-400 transition-all duration-200 hover:bg-gray-800/50 flex items-center gap-1"
              >
                <ShoppingCart size={20} />
                <span className="hidden sm:inline text-[1rem]">Cart</span>
                {cart.length > 0 && (
                  <span className="absolute -top-[.4rem] -left-[.1rem] bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                    {cart.length}
                  </span>
                )}
              </Link>
            )}

            {isAdmin && (
              <Link
                to={"/admin-dashboard"}
                className="px-3 py-2 rounded-md bg-gradient-to-br from-blue-600 to-blue-800 text-white font-medium hover:from-blue-500 hover:to-blue-700 transition-all duration-300 flex items-center gap-1 shadow-lg shadow-blue-900/20"
              >
                <Lock size={18} />
                <span className="hidden sm:inline">Dashboard</span>
              </Link>
            )}

            {user ? (
              <button
                onClick={logout}
                className="px-3 py-2 rounded-md bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white transition-all duration-300 flex items-center gap-1 border border-gray-700 hover:border-gray-600"
              >
                <LogOut size={18} />
                <span className="hidden sm:inline">Log Out</span>
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to={"/login"}
                  className="px-3 py-2 rounded-md bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white transition-all duration-300 flex items-center gap-1 border border-gray-700 hover:border-gray-600"
                >
                  <LogIn size={18} />
                  <span className="hidden sm:inline">Login</span>
                </Link>
                <Link
                  to={"/signup"}
                  className="px-3 py-2 rounded-md bg-gradient-to-br from-blue-600 to-blue-800 text-white font-medium hover:from-blue-500 hover:to-blue-700 transition-all duration-300 flex items-center gap-1 shadow-lg shadow-blue-900/20"
                >
                  <UserPlus size={18} />
                  <span>Sign Up</span>
                </Link>
              </div>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            {user && (
              <Link
                to="/cart"
                className="relative p-2 text-gray-300 hover:text-blue-400"
              >
                <ShoppingCart size={22} />
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                    {cart.length}
                  </span>
                )}
              </Link>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-300 hover:text-blue-400"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <div className="md:hidden mt-3 border-t border-blue-900/30 pt-3">
                <div className="flex flex-col space-y-2">
                  <Link
                    to={"/"}
                    className="px-3 py-2.5 rounded-md text-[1.1rem] text-gray-300 hover:text-blue-400 hover:bg-gray-800/50 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Home
                  </Link>

                  {user && (
                    <Link
                      to={"/cart"}
                      className="px-3 py-2.5 rounded-md text-gray-300 hover:text-blue-400 hover:bg-gray-800/50 transition-colors flex items-center gap-3"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <ShoppingCart size={20} />
                      <span>Cart ({cart.length})</span>
                    </Link>
                  )}

                  {isAdmin && (
                    <Link
                      to={"/admin-dashboard"}
                      className="px-3 py-2.5 rounded-md text-gray-300 hover:text-blue-400 hover:bg-gray-800/50 transition-colors font-medium flex items-center gap-3"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Lock size={18} />
                      <span>Dashboard</span>
                    </Link>
                  )}

                  {user ? (
                    <button
                      onClick={() => {
                        logout();
                        setMobileMenuOpen(false);
                      }}
                      className="px-3 py-2.5 rounded-md text-gray-300 hover:text-white hover:bg-gray-800/50 transition-colors flex items-center gap-3 text-left"
                    >
                      <LogOut size={18} />
                      <span>Log Out</span>
                    </button>
                  ) : (
                    <>
                      <Link
                        to={"/login"}
                        className="px-3 py-2.5 rounded-md text-gray-300 hover:text-white hover:bg-gray-800/50 transition-colors flex items-center gap-3"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <LogIn size={18} />
                        <span>Login</span>
                      </Link>
                      <Link
                        to={"/signup"}
                        className="px-3 py-2.5 rounded-md text-gray-300 hover:text-blue-400 hover:bg-gray-800/50 transition-colors font-medium flex items-center gap-3"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <UserPlus size={18} />
                        <span>Sign Up</span>
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
      </div>
    </motion.header>
  );
};

export default Navbar;