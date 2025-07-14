import * as React from "react"

const Input = React.forwardRef(
  ({ className = "", ...props }, ref) => (
    <input
      ref={ref}
      className={`block w-full rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-lg outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-150 ${className}`}
      {...props}
    />
  )
)
Input.displayName = "Input"

export { Input }
