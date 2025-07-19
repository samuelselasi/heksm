// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

export default function SearchResults({ result }) {
  if (!result) return null;

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      className="card-enhanced w-full max-w-2xl text-black"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      whileHover={{
        boxShadow: "0 25px 50px rgba(0, 0, 0, 0.15)",
        transition: { duration: 0.3 },
      }}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
        <h3 className="text-xl font-bold text-blue-700">Search Results</h3>
      </div>
      <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
        <pre className="whitespace-pre-line break-words text-base leading-relaxed text-black font-mono text-sm">
          {result}
        </pre>
      </div>
    </motion.div>
  );
}
