import * as React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const Tabs = ({ value, onValueChange, className = "", children }) => {
  const tab = value || "";

  const handleTabClick = (v) => {
    if (onValueChange) onValueChange(v);
  };

  return (
    <div className={className}>
      {React.Children.map(children, (child) => {
        if (child?.type?.displayName === "TabsList") {
          return React.cloneElement(child, { tab, onTab: handleTabClick });
        }
        if (child?.type?.displayName === "TabsContent") {
          return React.cloneElement(child, {
            active: child.props.value === tab,
          });
        }
        return child;
      })}
    </div>
  );
};
Tabs.displayName = "Tabs";

const TabsList = ({ tab, onTab, className = "", children }) => (
  <motion.div
    className={`inline-flex gap-2 justify-center w-full ${className}`}
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, ease: "easeOut" }}
  >
    {React.Children.map(children, (child) =>
      React.cloneElement(child, {
        isActive: child.props.value === tab,
        onTab,
      })
    )}
  </motion.div>
);
TabsList.displayName = "TabsList";

const TabsTrigger = ({ value, isActive, onTab, className = "", children }) => {
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

  return (
    <motion.button
      type="button"
      onClick={() => onTab && onTab(value)}
      className={`${isActive ? "btn-primary" : "btn-secondary"} ${className}`}
      aria-selected={isActive}
      tabIndex={0}
      variants={buttonVariants}
      whileHover="hover"
      whileTap="tap"
    >
      <span className="flex items-center gap-2">
        {value === "search" && (
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        )}
        {value === "logs" && (
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        )}
        {children}
      </span>
    </motion.button>
  );
};
TabsTrigger.displayName = "TabsTrigger";

const TabsContent = ({ active, className = "", children }) => {
  const contentVariants = {
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

  return active ? (
    <motion.div
      className={className}
      variants={contentVariants}
      initial="hidden"
      animate="visible"
    >
      {children}
    </motion.div>
  ) : null;
};
TabsContent.displayName = "TabsContent";

export { Tabs, TabsList, TabsTrigger, TabsContent };
