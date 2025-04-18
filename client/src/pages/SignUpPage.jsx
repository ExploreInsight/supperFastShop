import { useState } from "react";
import { Link } from "react-router-dom";
import { UserPlus, Mail, Lock, User, ArrowRight, Loader } from "lucide-react";
import { motion } from "framer-motion";
import { useUserStore } from "../stores/useUserStore";

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { signup, loading } = useUserStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate API call
    signup(formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f172a] to-blue-900 p-4 sm:p-6">
      <motion.div
        className="w-full max-w-lg"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-8">
          <motion.h2
            className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent"
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Join Our Community
          </motion.h2>
          <motion.p
            className="mt-2 text-blue-100"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Create your account to get started
          </motion.p>
        </div>

        <motion.div
          className="bg-white/5 backdrop-blur-sm   rounded-2xl shadow-xl overflow-hidden border border-blue-900/30"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {[
                {
                  id: "name",
                  label: "Full name",
                  icon: User,
                  placeholder: "John Doe",
                  autoId: "name"
                },
                {
                  id: "email",
                  label: "Email address",
                  icon: Mail,
                  placeholder: "you@example.com",
                  type: "email",
                  autoId: "email"
                },
                {
                  id: "password",
                  label: "Password",
                  icon: Lock,
                  placeholder: "••••••••",
                  type: "password",
                  autoId:"new-password"
                },
                {
                  id: "confirmPassword",
                  label: "Confirm Password",
                  icon: Lock,
                  placeholder: "••••••••",
                  type: "password",
                  autoId: "confirm-password"
                },
              ].map((field, index) => (
                <motion.div
                  key={field.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  <label
                    htmlFor={field.id}
                    className="block text-sm font-medium text-blue-100 mb-1"
                  >
                    {field.label}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-blue-400">
                      <field.icon className="h-5 w-5" />
                    </div>
                    <input
                      id={field.id}
                      type={field.type || "text"}
                      required
                      value={formData[field.id]}
                      onChange={(e) =>
                        setFormData({ ...formData, [field.id]: e.target.value })
                      }
                      className="block w-full pl-10 pr-4 py-3 bg-white/5 border border-blue-500/20 rounded-xl shadow-md 
           placeholder-blue-100 text-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder={field.placeholder}
                      autoComplete={field.autoId}
                    />
                  </div>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
              >
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center items-center py-3 px-4 rounded-lg shadow-lg
                    bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-500 hover:to-blue-700
                    text-white font-medium transition-all duration-300 transform hover:scale-[1.02]
                    disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <Loader className="mr-2 h-5 w-5 animate-spin" />
                      Creating Account...
                    </>
                  ) : (
                    <>
                      <UserPlus className="mr-2 h-5 w-5" />
                      Sign Up
                    </>
                  )}
                </button>
              </motion.div>
            </form>

            <motion.div
              className="mt-6 text-center text-sm text-blue-200"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold text-blue-300 hover:text-blue-100 hover:underline hover:underline-offset-4 inline-flex items-center transition duration-200"
              >
                Login here <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SignUpPage;
