'use client'

import { Button } from '@repo/ui'
import Link from 'next/link'

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-5xl font-bold tracking-tight text-neutral-900 sm:text-6xl lg:text-7xl">
            Memory as
            <br />
            <span className="text-neutral-500">Infrastructure</span>
          </h1>

          <p className="mt-6 text-lg text-neutral-600 sm:text-xl">
            YULA remembers everything. Your context persists across conversations, devices, and
            time. The AI assistant that truly knows you.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/signup">
              <Button size="lg" className="min-w-[160px]">
                Start Free
              </Button>
            </Link>
            <Link href="#features">
              <Button variant="outline" size="lg" className="min-w-[160px]">
                Learn More
              </Button>
            </Link>
          </div>

          <p className="mt-6 text-sm text-neutral-500">
            No credit card required. 100 messages free.
          </p>
        </div>

        <div className="mt-20 rounded-xl border border-neutral-200 bg-neutral-50 p-2 shadow-2xl">
          <div className="aspect-video rounded-lg bg-neutral-100 flex items-center justify-center">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-neutral-900">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M12 2v4" />
                  <path d="M12 18v4" />
                  <path d="M4.93 4.93l2.83 2.83" />
                  <path d="M16.24 16.24l2.83 2.83" />
                  <path d="M2 12h4" />
                  <path d="M18 12h4" />
                  <path d="M4.93 19.07l2.83-2.83" />
                  <path d="M16.24 7.76l2.83-2.83" />
                </svg>
              </div>
              <p className="text-neutral-500">Interactive Demo</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
