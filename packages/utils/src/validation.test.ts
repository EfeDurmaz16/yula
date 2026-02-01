import { describe, expect, it } from 'vitest'
import { emailSchema, idSchema, paginationSchema, passwordSchema } from './validation'

describe('emailSchema', () => {
  it('accepts valid emails', () => {
    expect(emailSchema.parse('test@example.com')).toBe('test@example.com')
  })

  it('rejects invalid emails', () => {
    expect(() => emailSchema.parse('not-an-email')).toThrow()
    expect(() => emailSchema.parse('')).toThrow()
  })
})

describe('passwordSchema', () => {
  it('accepts valid passwords', () => {
    expect(passwordSchema.parse('password123')).toBe('password123')
  })

  it('rejects too short passwords', () => {
    expect(() => passwordSchema.parse('short')).toThrow()
  })

  it('rejects too long passwords', () => {
    expect(() => passwordSchema.parse('a'.repeat(129))).toThrow()
  })

  it('accepts boundary lengths', () => {
    expect(passwordSchema.parse('a'.repeat(8))).toHaveLength(8)
    expect(passwordSchema.parse('a'.repeat(128))).toHaveLength(128)
  })
})

describe('paginationSchema', () => {
  it('uses defaults', () => {
    const result = paginationSchema.parse({})
    expect(result).toEqual({ page: 1, limit: 20 })
  })

  it('parses valid values', () => {
    const result = paginationSchema.parse({ page: '2', limit: '50' })
    expect(result).toEqual({ page: 2, limit: 50 })
  })

  it('rejects non-positive page', () => {
    expect(() => paginationSchema.parse({ page: 0 })).toThrow()
  })

  it('rejects limit over 100', () => {
    expect(() => paginationSchema.parse({ limit: 101 })).toThrow()
  })
})

describe('idSchema', () => {
  it('accepts valid ids', () => {
    expect(idSchema.parse('abc123')).toBe('abc123')
  })

  it('rejects empty strings', () => {
    expect(() => idSchema.parse('')).toThrow()
  })
})
