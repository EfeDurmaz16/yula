import { defineSchema, defineTable } from 'convex/server'
import { v } from 'convex/values'

export default defineSchema({
  users: defineTable({
    email: v.string(),
    name: v.string(),
    image: v.optional(v.string()),
    passwordHash: v.optional(v.string()),
    emailVerified: v.optional(v.boolean()),
    tier: v.union(v.literal('free'), v.literal('pro'), v.literal('max'), v.literal('ultra')),
    billingCycle: v.union(v.literal('weekly'), v.literal('monthly'), v.literal('yearly')),
    polarCustomerId: v.optional(v.string()),
    lastLoginAt: v.optional(v.number()),
  })
    .index('by_email', ['email'])
    .index('by_polar_id', ['polarCustomerId']),

  sessions: defineTable({
    userId: v.id('users'),
    token: v.string(),
    expiresAt: v.number(),
    ipAddress: v.optional(v.string()),
    userAgent: v.optional(v.string()),
  })
    .index('by_token', ['token'])
    .index('by_user', ['userId']),

  accounts: defineTable({
    userId: v.id('users'),
    accountId: v.string(),
    providerId: v.string(),
    accessToken: v.optional(v.string()),
    refreshToken: v.optional(v.string()),
    accessTokenExpiresAt: v.optional(v.number()),
    refreshTokenExpiresAt: v.optional(v.number()),
    scope: v.optional(v.string()),
    idToken: v.optional(v.string()),
    password: v.optional(v.string()),
  })
    .index('by_user', ['userId'])
    .index('by_provider_account', ['providerId', 'accountId']),

  verification: defineTable({
    identifier: v.string(),
    value: v.string(),
    expiresAt: v.number(),
  }).index('by_identifier', ['identifier']),

  conversations: defineTable({
    userId: v.id('users'),
    title: v.string(),
    summary: v.optional(v.string()),
    messageCount: v.number(),
    lastMessageAt: v.number(),
  })
    .index('by_user', ['userId'])
    .index('by_user_recent', ['userId', 'lastMessageAt']),

  messages: defineTable({
    userId: v.id('users'),
    conversationId: v.id('conversations'),
    role: v.union(v.literal('user'), v.literal('assistant'), v.literal('system')),
    content: v.string(),
    metadata: v.optional(v.any()),
  })
    .index('by_conversation', ['conversationId'])
    .index('by_user', ['userId']),

  memories: defineTable({
    userId: v.id('users'),
    content: v.string(),
    embedding: v.array(v.float64()),
    source: v.union(
      v.literal('import'),
      v.literal('conversation'),
      v.literal('proactive'),
      v.literal('tool'),
    ),
    metadata: v.optional(v.any()),
  })
    .index('by_user', ['userId'])
    .vectorIndex('by_embedding', {
      vectorField: 'embedding',
      dimensions: 1536,
      filterFields: ['userId'],
    }),

  tools: defineTable({
    userId: v.id('users'),
    name: v.string(),
    description: v.string(),
    endpoint: v.string(),
    schema: v.any(),
    isActive: v.boolean(),
  }).index('by_user', ['userId']),

  subscriptions: defineTable({
    userId: v.id('users'),
    polarSubscriptionId: v.string(),
    status: v.string(),
    currentPeriodEnd: v.number(),
    tier: v.string(),
    billingCycle: v.string(),
  })
    .index('by_user', ['userId'])
    .index('by_polar_id', ['polarSubscriptionId']),
})
