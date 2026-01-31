'use client'

import * as React from 'react'
import { cn } from '../utils/cn'

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <div className="w-full">
        <textarea
          className={cn(
            'flex min-h-[100px] w-full rounded-lg border border-neutral-300 bg-neutral-0 px-4 py-3 text-sm text-neutral-900',
            'placeholder:text-neutral-400',
            'focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent',
            'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-neutral-100',
            'transition-all duration-200 resize-none',
            error && 'border-neutral-900',
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

Textarea.displayName = 'Textarea'
