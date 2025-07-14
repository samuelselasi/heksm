import * as React from "react"

const Card = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={
      "rounded-2xl border border-gray-200 bg-white/95 p-6 shadow-lg " +
      (className || "")
    }
    {...props}
  />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={"mb-4 " + (className || "")}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={"text-xl font-bold text-blue-700 mb-1 " + (className || "")}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={"text-gray-500 mb-2 " + (className || "")}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={"" + (className || "")} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={"mt-4 " + (className || "")} {...props} />
))
CardFooter.displayName = "CardFooter"

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
}
