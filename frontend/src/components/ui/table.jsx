import * as React from "react"

const Table = React.forwardRef(({ className = "", ...props }, ref) => (
  <table
    ref={ref}
    className={`min-w-full bg-white border border-blue-100 rounded-2xl shadow ${className}`}
    {...props}
  />
))
Table.displayName = "Table"

const TableHead = React.forwardRef(({ className = "", ...props }, ref) => (
  <thead ref={ref} className={`bg-blue-50 text-blue-800 uppercase text-xs tracking-wider ${className}`} {...props} />
))
TableHead.displayName = "TableHead"

const TableBody = React.forwardRef(({ className = "", ...props }, ref) => (
  <tbody ref={ref} className={className} {...props} />
))
TableBody.displayName = "TableBody"

const TableRow = React.forwardRef(({ className = "", ...props }, ref) => (
  <tr ref={ref} className={`border-t border-blue-100 ${className}`} {...props} />
))
TableRow.displayName = "TableRow"

const TableCell = React.forwardRef(({ className = "", ...props }, ref) => (
  <td ref={ref} className={`px-3 py-2 ${className}`} {...props} />
))
TableCell.displayName = "TableCell"

const TableHeaderCell = React.forwardRef(({ className = "", ...props }, ref) => (
  <th ref={ref} className={`px-3 py-2 text-left ${className}`} {...props} />
))
TableHeaderCell.displayName = "TableHeaderCell"

export {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableHeaderCell,
}
