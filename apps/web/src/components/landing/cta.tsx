'use client'

import { Button } from '@repo/ui'
import Link from 'next/link'

export function CTASection() {
  return (
    <section className="py-24 bg-neutral-900">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-neutral-0 sm:text-4xl">
            Ready to remember everything?
          </h2>
          <p className="mt-4 text-lg text-neutral-400">
            Join thousands of users who are building their second brain with YULA.
          </p>
          <div className="mt-10">
            <Link href="/signup">
              <Button
                size="lg"
                className="bg-neutral-0 text-neutral-900 hover:bg-neutral-100 min-w-[200px]"
              >
                Get Started Free
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
