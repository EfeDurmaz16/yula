'use client'

import * as React from 'react'
import { cn } from '../utils/cn'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, ...props }, ref) => {
    return (
      <div className="w-full">
        <input
          type={type}
          className={cn(
            'flex h-10 w-full rounded-lg border border-neutral-300 bg-neutral-0 px-4 py-2 text-sm text-neutral-900',
            'placeholder:text-neutral-400',
            'focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent',
            'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-neutral-100',
            'transition-all duration-200',
            error && 'border-neutral-900 focus:ring-neutral-900',
            className,
          )}
          ref={ref}
          {...props}
        />
        {error && <p className="mt-1.5 text-sm text-neutral-600">{error}</p>}
      </div>
    )
  },
)

Input.displayName = 'Input'
