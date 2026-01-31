'use client'

import type { PricingTierId } from '@repo/types'
import { PricingCard } from '@repo/ui'
import { useState } from 'react'

export function PricingSection() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly')

  const handleSelect = (tierId: PricingTierId) => {
    if (tierId === 'free') {
      window.location.href = '/signup'
    } else {
      window.location.href = `/signup?tier=${tierId}&billing=${billingCycle}`
    }
  }

  return (
    <section id="pricing" className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
            Simple, transparent pricing
          </h2>
          <p className="mt-4 text-lg text-neutral-600">
            Start free and scale as you grow. No hidden fees.
          </p>
        </div>

        <div className="mt-8 flex justify-center">
          <div className="inline-flex rounded-lg border border-neutral-200 p-1">
            <button
              type="button"
              onClick={() => setBillingCycle('monthly')}
              className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                billingCycle === 'monthly'
                  ? 'bg-neutral-900 text-neutral-0'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              Monthly
            </button>
            <button
              type="button"
              onClick={() => setBillingCycle('yearly')}
              className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                billingCycle === 'yearly'
                  ? 'bg-neutral-900 text-neutral-0'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              Yearly
              <span className="ml-1 text-xs opacity-70">Save 17%</span>
            </button>
          </div>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <PricingCard tierId="free" billingCycle={billingCycle} onSelect={handleSelect} />
          <PricingCard tierId="pro" billingCycle={billingCycle} onSelect={handleSelect} />
          <PricingCard tierId="max" billingCycle={billingCycle} onSelect={handleSelect} />
          <PricingCard tierId="ultra" billingCycle={billingCycle} onSelect={handleSelect} />
        </div>
      </div>
    </section>
  )
}
