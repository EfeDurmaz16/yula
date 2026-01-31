'use client'

import { Button } from '@repo/ui'
import Link from 'next/link'

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-neutral-200 bg-neutral-0/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-bold tracking-tight text-neutral-900">YULA</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <Link
            href="#features"
            className="text-sm text-neutral-600 transition-colors hover:text-neutral-900"
          >
            Features
          </Link>
          <Link
            href="#pricing"
            className="text-sm text-neutral-600 transition-colors hover:text-neutral-900"
          >
            Pricing
          </Link>
          <Link
            href="/docs"
            className="text-sm text-neutral-600 transition-colors hover:text-neutral-900"
          >
            Docs
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/login">
            <Button variant="ghost" size="sm">
              Sign In
            </Button>
          </Link>
          <Link href="/signup">
            <Button size="sm">Get Started</Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
