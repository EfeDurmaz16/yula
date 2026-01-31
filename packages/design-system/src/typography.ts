/**
 * YULA Design System - Typography
 * Using Geist Sans and Geist Mono
 */

export const fontFamily = {
  sans: ['Geist', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
  mono: ['Geist Mono', 'SF Mono', 'Monaco', 'Consolas', 'monospace'],
} as const

export const fontSize = {
  xs: ['0.75rem', { lineHeight: '1rem' }],
  sm: ['0.875rem', { lineHeight: '1.25rem' }],
  base: ['1rem', { lineHeight: '1.5rem' }],
  lg: ['1.125rem', { lineHeight: '1.75rem' }],
  xl: ['1.25rem', { lineHeight: '1.75rem' }],
  '2xl': ['1.5rem', { lineHeight: '2rem' }],
  '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
  '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
  '5xl': ['3rem', { lineHeight: '1.1' }],
  '6xl': ['3.75rem', { lineHeight: '1.1' }],
} as const

export const fontWeight = {
  normal: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
} as const

export const letterSpacing = {
  tighter: '-0.05em',
  tight: '-0.025em',
  normal: '0em',
  wide: '0.025em',
  wider: '0.05em',
} as const

export const typography = {
  h1: {
    fontSize: '3rem',
    fontWeight: '700',
    lineHeight: '1.1',
    letterSpacing: '-0.025em',
  },
  h2: {
    fontSize: '2.25rem',
    fontWeight: '600',
    lineHeight: '1.2',
    letterSpacing: '-0.02em',
  },
  h3: {
    fontSize: '1.875rem',
    fontWeight: '600',
    lineHeight: '1.3',
    letterSpacing: '-0.015em',
  },
  h4: {
    fontSize: '1.5rem',
    fontWeight: '600',
    lineHeight: '1.4',
  },
  body: {
    fontSize: '1rem',
    fontWeight: '400',
    lineHeight: '1.5',
  },
  bodySmall: {
    fontSize: '0.875rem',
    fontWeight: '400',
    lineHeight: '1.5',
  },
  caption: {
    fontSize: '0.75rem',
    fontWeight: '400',
    lineHeight: '1.4',
  },
  mono: {
    fontSize: '0.875rem',
    fontWeight: '500',
    lineHeight: '1.6',
    letterSpacing: '0.02em',
    fontFamily: 'var(--font-geist-mono)',
  },
} as const
