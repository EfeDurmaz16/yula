'use client'

import { AnimatePresence, motion } from 'framer-motion'
import * as React from 'react'
import { cn } from '../utils/cn'

interface ModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  children: React.ReactNode
}

interface ModalContentProps {
  children: React.ReactNode
  className?: string
}

const ModalContext = React.createContext<{
  open: boolean
  onOpenChange: (open: boolean) => void
}>({
  open: false,
  onOpenChange: () => {},
})

export function Modal({ open, onOpenChange, children }: ModalProps) {
  return <ModalContext.Provider value={{ open, onOpenChange }}>{children}</ModalContext.Provider>
}

export function ModalTrigger({ children }: { children: React.ReactNode }) {
  const { onOpenChange } = React.useContext(ModalContext)
  return (
    <button
      type="button"
      onClick={() => onOpenChange(true)}
      className="cursor-pointer appearance-none border-0 bg-transparent p-0"
    >
      {children}
    </button>
  )
}

export function ModalContent({ children, className }: ModalContentProps) {
  const { open, onOpenChange } = React.useContext(ModalContext)

  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onOpenChange(false)
      }
    }

    if (open) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [open, onOpenChange])

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            onClick={() => onOpenChange(false)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2 }}
            className={cn(
              'fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2',
              'rounded-xl border border-neutral-200 bg-neutral-0 p-6 shadow-xl',
              className,
            )}
          >
            {children}
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="absolute right-4 top-4 rounded-md opacity-70 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:ring-offset-2 transition-opacity"
              aria-label="Close modal"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export function ModalHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('flex flex-col space-y-1.5', className)} {...props} />
}

export function ModalTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={cn('text-lg font-semibold text-neutral-900', className)} {...props} />
}

export function ModalDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn('text-sm text-neutral-500', className)} {...props} />
}

export function ModalFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 mt-6',
        className,
      )}
      {...props}
    />
  )
}
