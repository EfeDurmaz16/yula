/**
 * YULA Design System - Animations
 */

export const transitions = {
  fast: '150ms',
  normal: '200ms',
  slow: '300ms',
  slower: '500ms',
} as const

export const easings = {
  linear: 'linear',
  in: 'cubic-bezier(0.4, 0, 1, 1)',
  out: 'cubic-bezier(0, 0, 0.2, 1)',
  inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
} as const

export const keyframes = {
  fadeIn: {
    from: { opacity: '0' },
    to: { opacity: '1' },
  },
  fadeOut: {
    from: { opacity: '1' },
    to: { opacity: '0' },
  },
  slideUp: {
    from: { transform: 'translateY(10px)', opacity: '0' },
    to: { transform: 'translateY(0)', opacity: '1' },
  },
  slideDown: {
    from: { transform: 'translateY(-10px)', opacity: '0' },
    to: { transform: 'translateY(0)', opacity: '1' },
  },
  scaleIn: {
    from: { transform: 'scale(0.95)', opacity: '0' },
    to: { transform: 'scale(1)', opacity: '1' },
  },
  spin: {
    from: { transform: 'rotate(0deg)' },
    to: { transform: 'rotate(360deg)' },
  },
} as const
