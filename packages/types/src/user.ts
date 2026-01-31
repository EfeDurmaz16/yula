export type Tier = 'free' | 'pro' | 'max' | 'ultra'

export type BillingCycle = 'weekly' | 'monthly' | 'yearly'

export interface User {
  id: string
  email: string
  name: string
  image?: string
  tier: Tier
  billingCycle: BillingCycle
  polarCustomerId?: string
  createdAt: Date
  updatedAt: Date
}

export interface CreateUser {
  email: string
  name: string
  image?: string
  tier?: Tier
  billingCycle?: BillingCycle
  polarCustomerId?: string
}
