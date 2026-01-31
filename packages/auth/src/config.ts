import { betterAuth } from 'better-auth'

export const authConfig = {
  database: {
    provider: 'convex' as const,
  },
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
}

export const createAuth = () => betterAuth(authConfig)

export type Auth = ReturnType<typeof createAuth>
