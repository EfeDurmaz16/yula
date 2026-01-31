import type { Config } from 'tailwindcss'
import { keyframes, transitions } from './animations'
import { colors, semanticColors } from './colors'
import { borderRadius } from './radius'
import { shadows } from './shadows'
import { spacing } from './spacing'
import { fontFamily, fontSize, fontWeight, letterSpacing } from './typography'

export const designSystemPreset: Partial<Config> = {
  theme: {
    colors: {
      ...colors,
      ...semanticColors,
      transparent: 'transparent',
      current: 'currentColor',
    },
    fontFamily,
    fontSize,
    fontWeight,
    letterSpacing,
    spacing,
    boxShadow: shadows,
    borderRadius,
    extend: {
      keyframes,
      animation: {
        'fade-in': `fadeIn ${transitions.normal} ease-out`,
        'fade-out': `fadeOut ${transitions.normal} ease-out`,
        'slide-up': `slideUp ${transitions.normal} ease-out`,
        'slide-down': `slideDown ${transitions.normal} ease-out`,
        'scale-in': `scaleIn ${transitions.normal} ease-out`,
        spin: 'spin 1s linear infinite',
      },
      transitionDuration: transitions,
    },
  },
}

export default designSystemPreset
