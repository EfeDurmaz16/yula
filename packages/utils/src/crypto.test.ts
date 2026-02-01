import { describe, expect, it } from 'vitest'
import { generateId, hashString } from './crypto'

describe('hashString', () => {
  it('returns a hex string', async () => {
    const hash = await hashString('hello')
    expect(hash).toMatch(/^[a-f0-9]+$/)
  })

  it('returns consistent results', async () => {
    const hash1 = await hashString('test')
    const hash2 = await hashString('test')
    expect(hash1).toBe(hash2)
  })

  it('returns different hashes for different inputs', async () => {
    const hash1 = await hashString('foo')
    const hash2 = await hashString('bar')
    expect(hash1).not.toBe(hash2)
  })

  it('returns 64 character SHA-256 hash', async () => {
    const hash = await hashString('test')
    expect(hash).toHaveLength(64)
  })
})

describe('generateId', () => {
  it('generates default length id', () => {
    const id = generateId()
    expect(id).toHaveLength(21)
  })

  it('generates custom length id', () => {
    const id = generateId(10)
    expect(id).toHaveLength(10)
  })

  it('generates alphanumeric ids', () => {
    const id = generateId()
    expect(id).toMatch(/^[A-Za-z0-9]+$/)
  })

  it('generates unique ids', () => {
    const ids = new Set(Array.from({ length: 100 }, () => generateId()))
    expect(ids.size).toBe(100)
  })
})
