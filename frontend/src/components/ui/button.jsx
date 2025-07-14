import * as React from "react"

const VARIANTS = {
  default: "bg-blue-600 hover:bg-blue-700 text-white",
  outline: "border border-blue-600 text-blue-700 bg-transparent hover:bg-blue-50",
  destructive: "bg-red-600 hover:bg-red-700 text-white",
  ghost: "bg-transparent hover:bg-blue-100 text-blue-700",
}

const Button = React.forwardRef(
  (
    { className = "", variant = "default", type = "button", ...props },
    ref
  ) => {
    return (
      <button
        type={type}
        ref={ref}
        className={`inline-flex items-center justify-center rounded-xl px-5 py-2 font-semibold shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-150 ${VARIANTS[variant] || VARIANTS.default} ${className}`}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
