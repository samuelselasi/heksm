import { User2, LogOut, Shield, Clock, User, Power } from "lucide-react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

export default function UserBar({ email, onLogout }) {
  const containerVariants = {
    hidden: { opacity: 0, y: -20 },
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
      scale: 1.05,
      boxShadow: "0 8px 25px rgba(239, 68, 68, 0.4)",
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
    tap: {
      scale: 0.95,
      transition: {
        duration: 0.1,
      },
    },
  };

  const iconVariants = {
    hover: {
      rotate: 360,
      transition: {
        duration: 0.6,
        ease: "easeInOut",
      },
    },
  };

  return (
    <motion.div
      className="w-full max-w-4xl flex items-center justify-between px-8 py-8 bg-gradient-to-r from-slate-800 via-slate-900 to-slate-800 shadow-2xl rounded-3xl mb-12 mt-8 backdrop-blur-sm"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="flex items-center gap-4">
        <motion.div
          className="relative p-4 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full shadow-xl"
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ duration: 0.3 }}
        >
          <User size={24} className="text-white" />
          <motion.div
            className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full shadow-lg"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>

        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <Shield size={18} className="text-blue-400" />
            <span className="text-sm font-semibold text-slate-200">
              Authenticated User
            </span>
          </div>
          <span className="text-lg font-bold text-white">{email}</span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <motion.div
          className="flex items-center gap-2 px-4 py-2 bg-slate-700/50 rounded-2xl shadow-lg backdrop-blur-sm"
          whileHover={{
            scale: 1.05,
            boxShadow: "0 8px 20px rgba(59, 130, 246, 0.3)",
            backgroundColor: "rgba(71, 85, 105, 0.7)",
          }}
          transition={{ duration: 0.2 }}
        >
          <Clock size={16} className="text-blue-400" />
          <span className="text-sm text-slate-200 font-medium">
            {new Date().toLocaleTimeString()}
          </span>
        </motion.div>

        <motion.button
          onClick={onLogout}
          className="btn-logout"
          title="Logout"
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
        >
          <motion.div variants={iconVariants} whileHover="hover">
            <Power size={20} className="text-white" />
          </motion.div>
          <span className="hidden sm:inline font-bold text-white">
            Sign Out
          </span>
        </motion.button>
      </div>
    </motion.div>
  );
}
