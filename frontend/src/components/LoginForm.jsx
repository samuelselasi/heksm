import { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import Card from "./ui/card";

export default function LoginForm({ onLogin, error }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await onLogin(email, password);
    setIsSubmitting(false);
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const buttonVariants = {
    hover: {
      scale: 1.02,
      boxShadow: "0 10px 25px rgba(59, 130, 246, 0.3)",
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
    tap: {
      scale: 0.98,
      transition: {
        duration: 0.1,
      },
    },
  };

  const inputVariants = {
    focus: {
      scale: 1.02,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-200 p-4">
      <Card className="w-1/2">
        <motion.h1
          className="text-3xl font-extrabold text-blue-700 mb-8 text-center leading-tight"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
        >
          Homomorphic Encryption-based <br /> Keyword Search
        </motion.h1>

        <motion.form
          onSubmit={handleSubmit}
          className="w-full"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Email Address
            </label>
            <motion.input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="input-enhanced"
              required
              variants={inputVariants}
              whileFocus="focus"
              whileHover={{
                borderColor: "#3b82f6",
                boxShadow: "0 4px 12px rgba(59, 130, 246, 0.15)",
                transition: { duration: 0.2 },
              }}
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Password
            </label>
            <motion.input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="input-enhanced"
              required
              variants={inputVariants}
              whileFocus="focus"
              whileHover={{
                borderColor: "#3b82f6",
                boxShadow: "0 4px 12px rgba(59, 130, 246, 0.15)",
                transition: { duration: 0.2 },
              }}
            />
          </div>

          <motion.button
            type="submit"
            className="btn-primary w-full"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <motion.div
                className="flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <motion.div
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
                <span className="ml-2">Logging in...</span>
              </motion.div>
            ) : (
              "Sign In"
            )}
          </motion.button>
        </motion.form>

        {error && (
          <motion.div
            className="error-state mt-6 p-4 rounded-xl text-sm text-center font-medium"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {error}
          </motion.div>
        )}
      </Card>
    </div>
  );
}
