'use client'

import { ContextMenuProvider, ToastProvider } from '@repo/ui'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ToastProvider>
      <ContextMenuProvider>{children}</ContextMenuProvider>
    </ToastProvider>
  )
}
