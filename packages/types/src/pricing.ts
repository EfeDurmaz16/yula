/**
 * YULA Pricing Tiers
 *
 * WARNING: THESE VALUES ARE LOCKED
 * DO NOT MODIFY UNDER ANY CIRCUMSTANCES
 * ANY CHANGES WILL BREAK BILLING CONSISTENCY
 */

export interface PricingTier {
  id: 'free' | 'pro' | 'max' | 'ultra'
  name: string
  monthlyPrice: number
  yearlyPrice: number
  weeklyPrice: number
  limits: {
    messagesPerMonth: number
    memoryStorageMB: number
    maxConversations: number
    toolConnections: number
  }
}

export const PRICING = {
  free: {
    id: 'free',
    name: 'Free',
    monthlyPrice: 0,
    yearlyPrice: 0,
    weeklyPrice: 0,
    limits: {
      messagesPerMonth: 100,
      memoryStorageMB: 10,
      maxConversations: 10,
      toolConnections: 1,
    },
  },
  pro: {
    id: 'pro',
    name: 'Pro',
    monthlyPrice: 20,
    yearlyPrice: 200,
    weeklyPrice: 7.5,
    limits: {
      messagesPerMonth: 10000,
      memoryStorageMB: 1000,
      maxConversations: 100,
      toolConnections: 10,
    },
  },
  max: {
    id: 'max',
    name: 'Max',
    monthlyPrice: 50,
    yearlyPrice: 500,
    weeklyPrice: 15,
    limits: {
      messagesPerMonth: 100000,
      memoryStorageMB: 10000,
      maxConversations: 1000,
      toolConnections: 50,
    },
  },
  ultra: {
    id: 'ultra',
    name: 'Ultra',
    monthlyPrice: 150,
    yearlyPrice: 1500,
    weeklyPrice: 45,
    limits: {
      messagesPerMonth: -1,
      memoryStorageMB: -1,
      maxConversations: -1,
      toolConnections: -1,
    },
  },
} as const satisfies Record<string, PricingTier>

export type PricingTierId = keyof typeof PRICING
