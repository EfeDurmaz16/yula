import { describe, expect, it } from 'vitest'
import { authConfig } from './config'

describe('authConfig', () => {
  it('has email and password enabled', () => {
    expect(authConfig.emailAndPassword.enabled).toBe(true)
  })

  it('does not require email verification', () => {
    expect(authConfig.emailAndPassword.requireEmailVerification).toBe(false)
  })

  it('has social providers configured', () => {
    expect(authConfig.socialProviders.github).toBeDefined()
    expect(authConfig.socialProviders.google).toBeDefined()
  })

  it('has session config', () => {
    expect(authConfig.session.expiresIn).toBe(60 * 60 * 24 * 7)
    expect(authConfig.session.updateAge).toBe(60 * 60 * 24)
  })

  it('has user additional fields', () => {
    expect(authConfig.user.additionalFields.tier.defaultValue).toBe('free')
    expect(authConfig.user.additionalFields.billingCycle.defaultValue).toBe('monthly')
  })
})
