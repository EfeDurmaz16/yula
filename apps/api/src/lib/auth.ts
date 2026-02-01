import { createConvexAdapter } from '@repo/auth/convex-adapter'
import { betterAuth } from 'better-auth'
import { ConvexHttpClient } from 'convex/browser'

const CONVEX_URL = process.env.CONVEX_URL || 'https://sensible-sturgeon-193.convex.cloud'
const convexClient = new ConvexHttpClient(CONVEX_URL)

export const auth = betterAuth({
  // biome-ignore lint/suspicious/noExplicitAny: Better Auth adapter type mismatch with Convex
  database: createConvexAdapter(convexClient) as any,
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URL || 'http://localhost:3001',
  basePath: '/api/auth',
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID || '',
      clientSecret: process.env.GITHUB_CLIENT_SECRET || '',
    },
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    },
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7,
    updateAge: 60 * 60 * 24,
  },
  user: {
    additionalFields: {
      tier: {
        type: 'string' as const,
        defaultValue: 'free',
      },
      billingCycle: {
        type: 'string' as const,
        defaultValue: 'monthly',
      },
      polarCustomerId: {
        type: 'string' as const,
        required: false,
      },
    },
  },
})
