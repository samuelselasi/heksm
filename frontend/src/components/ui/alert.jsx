import * as React from "react"

const Alert = React.forwardRef(
  ({ className = "", variant = "default", ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="alert"
        className={`relative w-full rounded-lg border p-4 [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-2xl flex items-start gap-4
          ${variant === "destructive"
            ? "border-red-500 bg-red-50 text-red-900"
            : "border-blue-200 bg-blue-50 text-blue-900"}
          ${className}`}
        {...props}
      />
    )
  }
)
Alert.displayName = "Alert"

const AlertTitle = React.forwardRef(({ className = "", ...props }, ref) => (
  <h5
    ref={ref}
    className={`mb-1 font-semibold leading-none tracking-tight ${className}`}
    {...props}
  />
))
AlertTitle.displayName = "AlertTitle"

const AlertDescription = React.forwardRef(({ className = "", ...props }, ref) => (
  <div ref={ref} className={`text-sm opacity-80 ${className}`} {...props} />
))
AlertDescription.displayName = "AlertDescription"

export { Alert, AlertTitle, AlertDescription }
