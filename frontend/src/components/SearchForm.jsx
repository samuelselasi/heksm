import { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

export default function SearchForm({ onSearch, loading }) {
  const [keyword, setKeyword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(keyword);
  };

  const formVariants = {
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
    <motion.form
      onSubmit={handleSubmit}
      className="flex flex-col md:flex-row items-center justify-center gap-4 mb-8 w-full"
      variants={formVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="flex-1 w-full">
        <label
          htmlFor="keyword"
          className="block text-sm font-semibold text-gray-700 mb-2"
        >
          Search Keyword
        </label>
        <motion.input
          id="keyword"
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="input-enhanced"
          placeholder="Enter keyword to search in encrypted data..."
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
        className="btn-primary md:w-auto w-full"
        style={{ minWidth: 140 }}
        disabled={loading}
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
      >
        {loading ? (
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
            <span className="ml-2">Searching...</span>
          </motion.div>
        ) : (
          "Search"
        )}
      </motion.button>
    </motion.form>
  );
}
