import { motion } from "framer-motion";

export default function Card({ children, className = "", ...props }) {
  return (
    <motion.div
      className={`w-4/5 mx-auto bg-white/95 rounded-3xl shadow-2xl p-8 ${className}`}
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.6,
        ease: "easeOut",
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
