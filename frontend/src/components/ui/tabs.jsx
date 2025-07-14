import * as React from "react"

const Tabs = ({ value, onValueChange, className = "", children }) => {
  const tab = value || "";

  const handleTabClick = v => {
    if (onValueChange) onValueChange(v);
  };

  return (
    <div className={className}>
      {React.Children.map(children, child => {
        if (child?.type?.displayName === "TabsList") {
          return React.cloneElement(child, { tab, onTab: handleTabClick });
        }
        if (child?.type?.displayName === "TabsContent") {
          return React.cloneElement(child, { active: child.props.value === tab });
        }
        return child;
      })}
    </div>
  );
};
Tabs.displayName = "Tabs";

const TabsList = ({ tab, onTab, className = "", children }) => (
  <div className={`rounded-lg bg-blue-100/60 inline-flex gap-2 p-1 justify-center w-full ${className}`}>
    {React.Children.map(children, child =>
      React.cloneElement(child, {
        isActive: child.props.value === tab,
        onTab,
      })
    )}
  </div>
);
TabsList.displayName = "TabsList";

const TabsTrigger = ({ value, isActive, onTab, className = "", children }) => (
  <button
    type="button"
    onClick={() => onTab && onTab(value)}
    className={`px-4 py-2 rounded-lg font-semibold transition-all duration-150
      ${isActive
        ? "bg-blue-600 text-white shadow"
        : "bg-transparent text-blue-700 hover:bg-blue-200"
      } ${className}`}
    aria-selected={isActive}
    tabIndex={0}
  >
    {children}
  </button>
);
TabsTrigger.displayName = "TabsTrigger";

const TabsContent = ({ value, active, className = "", children }) =>
  active ? <div className={className}>{children}</div> : null;
TabsContent.displayName = "TabsContent";

export { Tabs, TabsList, TabsTrigger, TabsContent }
