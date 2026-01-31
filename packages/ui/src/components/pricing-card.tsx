'use client'

import { PRICING, type PricingTierId } from '@repo/types'
import * as React from 'react'
import { cn } from '../utils/cn'
import { Button } from './button'

function CheckIcon() {
  return (
    <svg
      className="h-4 w-4 text-neutral-900"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  )
}

interface PricingCardProps {
  tierId: PricingTierId
  billingCycle: 'weekly' | 'monthly' | 'yearly'
  isCurrentPlan?: boolean
  onSelect?: (tierId: PricingTierId) => void
  className?: string
}

export function PricingCard({
  tierId,
  billingCycle,
  isCurrentPlan,
  onSelect,
  className,
}: PricingCardProps) {
  const tier = PRICING[tierId]

  const price =
    billingCycle === 'monthly'
      ? tier.monthlyPrice
      : billingCycle === 'yearly'
        ? tier.yearlyPrice
        : tier.weeklyPrice

  const periodLabel =
    billingCycle === 'monthly' ? '/month' : billingCycle === 'yearly' ? '/year' : '/week'

  const isPopular = tierId === 'pro'

  const formatLimit = (value: number) => {
    if (value === -1) return 'Unlimited'
    if (value >= 1000) return `${(value / 1000).toFixed(0)}K`
    return value.toString()
  }

  return (
    <div
      className={cn(
        'relative flex flex-col rounded-2xl border bg-neutral-0 p-6',
        isPopular ? 'border-neutral-900 shadow-lg' : 'border-neutral-200',
        className,
      )}
    >
      {isPopular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="rounded-full bg-neutral-900 px-3 py-1 text-xs font-medium text-neutral-0">
            Most Popular
          </span>
        </div>
      )}

      <div className="mb-4">
        <h3 className="text-lg font-semibold text-neutral-900">{tier.name}</h3>
        <div className="mt-2 flex items-baseline gap-1">
          <span className="text-4xl font-bold text-neutral-900">${price === 0 ? '0' : price}</span>
          <span className="text-neutral-500">{periodLabel}</span>
        </div>
        {billingCycle === 'yearly' && tier.monthlyPrice > 0 && (
          <p className="mt-1 text-sm text-neutral-500">
            Save ${tier.monthlyPrice * 12 - tier.yearlyPrice}/year
          </p>
        )}
      </div>

      <ul className="mb-6 flex-1 space-y-3">
        <li className="flex items-center gap-2 text-sm text-neutral-600">
          <CheckIcon />
          {formatLimit(tier.limits.messagesPerMonth)} messages/month
        </li>
        <li className="flex items-center gap-2 text-sm text-neutral-600">
          <CheckIcon />
          {formatLimit(tier.limits.memoryStorageMB)} MB memory storage
        </li>
        <li className="flex items-center gap-2 text-sm text-neutral-600">
          <CheckIcon />
          {formatLimit(tier.limits.maxConversations)} conversations
        </li>
        <li className="flex items-center gap-2 text-sm text-neutral-600">
          <CheckIcon />
          {formatLimit(tier.limits.toolConnections)} tool connections
        </li>
      </ul>

      <Button
        variant={isCurrentPlan ? 'outline' : isPopular ? 'primary' : 'secondary'}
        onClick={() => onSelect?.(tierId)}
        disabled={isCurrentPlan}
        className="w-full"
      >
        {isCurrentPlan ? 'Current Plan' : tierId === 'free' ? 'Get Started' : 'Upgrade'}
      </Button>
    </div>
  )
}
