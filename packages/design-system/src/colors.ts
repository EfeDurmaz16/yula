/**
 * YULA Design System - Color Palette
 * Monochrom palette with 12-step hierarchy
 * NO BRIGHT COLORS. NO NEON. NO EMOJI.
 */

export const colors = {
  neutral: {
    0: '#FFFFFF',
    50: '#FAFAFA',
    100: '#F5F5F5',
    200: '#E5E5E5',
    300: '#D4D4D4',
    400: '#A3A3A3',
    500: '#737373',
    600: '#525252',
    700: '#404040',
    800: '#262626',
    900: '#171717',
    950: '#0A0A0A',
  },
} as const

export const semanticColors = {
  background: {
    primary: colors.neutral[0],
    secondary: colors.neutral[50],
    tertiary: colors.neutral[100],
    inverse: colors.neutral[900],
  },
  surface: {
    primary: colors.neutral[0],
    secondary: colors.neutral[50],
    elevated: colors.neutral[0],
    overlay: 'rgba(0, 0, 0, 0.5)',
  },
  border: {
    primary: colors.neutral[200],
    secondary: colors.neutral[100],
    focus: colors.neutral[900],
  },
  text: {
    primary: colors.neutral[900],
    secondary: colors.neutral[600],
    tertiary: colors.neutral[500],
    disabled: colors.neutral[400],
    inverse: colors.neutral[0],
  },
  interactive: {
    default: colors.neutral[900],
    hover: colors.neutral[800],
    active: colors.neutral[700],
    disabled: colors.neutral[300],
  },
} as const

export type ColorScale = typeof colors
export type SemanticColors = typeof semanticColors
