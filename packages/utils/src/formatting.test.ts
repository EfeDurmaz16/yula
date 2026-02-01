import { describe, expect, it, vi } from 'vitest'
import { formatDate, formatNumber, formatRelativeTime, truncate } from './formatting'

describe('formatDate', () => {
  it('formats Date objects', () => {
    const date = new Date('2024-01-15T00:00:00Z')
    const result = formatDate(date)
    expect(result).toContain('Jan')
    expect(result).toContain('15')
    expect(result).toContain('2024')
  })

  it('formats date strings', () => {
    const result = formatDate('2024-06-01T00:00:00Z')
    expect(result).toContain('Jun')
    expect(result).toContain('2024')
  })

  it('accepts custom options', () => {
    const result = formatDate(new Date('2024-01-15'), { month: 'long' })
    expect(result).toContain('January')
  })
})

describe('formatRelativeTime', () => {
  it('returns "just now" for recent dates', () => {
    expect(formatRelativeTime(new Date())).toBe('just now')
  })

  it('returns minutes ago', () => {
    const date = new Date(Date.now() - 5 * 60 * 1000)
    expect(formatRelativeTime(date)).toBe('5m ago')
  })

  it('returns hours ago', () => {
    const date = new Date(Date.now() - 3 * 60 * 60 * 1000)
    expect(formatRelativeTime(date)).toBe('3h ago')
  })

  it('returns days ago', () => {
    const date = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
    expect(formatRelativeTime(date)).toBe('2d ago')
  })

  it('returns formatted date for older dates', () => {
    const date = new Date(Date.now() - 14 * 24 * 60 * 60 * 1000)
    const result = formatRelativeTime(date)
    expect(result).not.toContain('ago')
  })

  it('handles string input', () => {
    const result = formatRelativeTime(new Date().toISOString())
    expect(result).toBe('just now')
  })
})

describe('formatNumber', () => {
  it('formats small numbers', () => {
    expect(formatNumber(42)).toBe('42')
    expect(formatNumber(999)).toBe('999')
  })

  it('formats thousands', () => {
    expect(formatNumber(1500)).toBe('1.5K')
    expect(formatNumber(10000)).toBe('10.0K')
  })

  it('formats millions', () => {
    expect(formatNumber(1500000)).toBe('1.5M')
    expect(formatNumber(2000000)).toBe('2.0M')
  })
})

describe('truncate', () => {
  it('returns short strings unchanged', () => {
    expect(truncate('hello', 10)).toBe('hello')
  })

  it('truncates long strings', () => {
    expect(truncate('hello world', 5)).toBe('hello...')
  })

  it('handles exact length', () => {
    expect(truncate('hello', 5)).toBe('hello')
  })
})
