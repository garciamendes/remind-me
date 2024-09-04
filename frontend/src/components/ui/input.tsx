import * as React from "react"

import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  withoutIcon?: boolean
  iconDirection?: "left" | "right"
  icon?: React.ReactNode
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, withoutIcon = true, ...props }, ref) => {

    if (!withoutIcon) {
      return (
        <input
          type={type}
          className={cn('flex items-center h-12 w-full bg-zinc-800 text-zinc-100 rounded-md border-none text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-zinc-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50', className)}
          ref={ref}
          {...props}
        />
      )
    }

    return (
      <div className={cn(
        "flex items-center h-12 w-full bg-zinc-800 text-zinc-100 rounded-md border-none px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-zinc-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}>
        {props.iconDirection === 'left' && (
          props.icon
        )}

        <input
          type={type}
          className='flex-1 bg-transparent border-none outline-none'
          ref={ref}
          {...props}
        />

        {props.iconDirection === 'right' && (
          props.icon
        )}
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }
