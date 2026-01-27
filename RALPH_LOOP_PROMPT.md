# YULA Production MVP - Ralph Wiggum Overnight Loop
# Maximum Iteration: 300 | Completion Promise: YULA_PRODUCTION_MVP_COMPLETE

You are an elite AI development agent executing the YULA production MVP build.
Your mission: Build a complete, production-ready YULA MVP. Do not stop until done.

## CRITICAL RULES (NEVER VIOLATE)

1. **NO SKIPPING**: Every phase, every file, every line matters
2. **NO TODOs**: All code is complete, working, production-ready
3. **NO PLACEHOLDERS**: Real implementations only
4. **NO EMOJI**: Anywhere in the codebase, ever
5. **MONOCHROM ONLY**: Pure grayscale design system
6. **PRICING LOCKED**: Never modify pricing constants
7. **ITERATE UNTIL SUCCESS**: If something fails, fix it and continue
8. **USE ALL TOOLS**: Playwright, Context7, 21st.dev, Biome, MCP, Serena
9. **TEST EVERYTHING**: Run tests, verify functionality
10. **SHIP READY**: This is production code, not a prototype

## Tools at Your Disposal

- **Context7**: Look up documentation for ANY library
- **Playwright**: Browser automation, screenshots, testing
- **21st.dev Magic**: Build UI components
- **Biome**: Lint and format code
- **Serena**: Semantic code analysis and editing
- **MCP Servers**: Memory retrieval, tool orchestration
- **Bash**: Run commands, tests, builds
- **Write/Edit**: Create and modify files

## Project Overview

**YULA**: Memory as Infrastructure
- AI assistant with persistent memory
- Multi-platform: Web, Mobile, API
- Features: Chat, Memory, Tools, Payments

**Tech Stack**:
- Frontend: Next.js 16 + React 19 + Tailwind v4
- Backend: Bun + Hono + Convex
- Mobile: React Native + Expo
- UI: Custom components + shadcn/ui
- Auth: BetterAuth
- Payments: Polar.sh
- AI: Anthropic Claude + Vercel AI SDK

---

# PHASE 1: INFRASTRUCTURE SETUP
## Signal: INFRASTRUCTURE_DONE

### Step 1.1: Initialize Monorepo

```bash
# Create project structure
mkdir -p apps/web apps/api apps/mobile
mkdir -p packages/design-system packages/types packages/ui packages/auth packages/mcp-servers
```

Create `/package.json`:
```json
{
  "name": "yula",
  "private": true,
  "workspaces": [
    "apps/*",
    "packages/*"
  ],
  "scripts": {
    "dev": "turbo run dev",
    "build": "turbo run build",
    "lint": "turbo run lint",
    "test": "turbo run test",
    "format": "biome format --write .",
    "check": "biome check --write ."
  },
  "devDependencies": {
    "@biomejs/biome": "^1.9.0",
    "turbo": "^2.3.0",
    "typescript": "^5.7.0"
  },
  "packageManager": "bun@1.1.0"
}
```

### Step 1.2: Create Turborepo Config

Create `/turbo.json`:
```json
{
  "$schema": "https://turbo.build/schema.json",
  "globalDependencies": ["**/.env.*local"],
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": [".next/**", "!.next/cache/**", "dist/**"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    },
    "lint": {
      "dependsOn": ["^build"]
    },
    "test": {
      "dependsOn": ["build"]
    }
  }
}
```

### Step 1.3: Create Biome Config

Create `/biome.json`:
```json
{
  "$schema": "https://biomejs.dev/schemas/1.9.0/schema.json",
  "organizeImports": {
    "enabled": true
  },
  "linter": {
    "enabled": true,
    "rules": {
      "recommended": true
    }
  },
  "formatter": {
    "enabled": true,
    "indentStyle": "space",
    "indentWidth": 2,
    "lineWidth": 100
  },
  "javascript": {
    "formatter": {
      "quoteStyle": "single",
      "semicolons": "asNeeded"
    }
  }
}
```

### Step 1.4: Create TypeScript Config

Create `/tsconfig.json`:
```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "incremental": true,
    "baseUrl": ".",
    "paths": {
      "@repo/design-system": ["packages/design-system/src"],
      "@repo/types": ["packages/types/src"],
      "@repo/ui": ["packages/ui/src"],
      "@repo/auth": ["packages/auth/src"]
    }
  },
  "exclude": ["node_modules"]
}
```

### Step 1.5: Create .gitignore

Create `/.gitignore`:
```
# Dependencies
node_modules
.pnp
.pnp.js

# Build
dist
build
.next
out
.turbo

# Testing
coverage

# Environment
.env
.env.local
.env.*.local

# IDE
.idea
.vscode
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# Logs
*.log
npm-debug.log*

# Misc
.cache
*.tsbuildinfo
```

### Step 1.6: Verify Infrastructure

```bash
bun install
bun run lint
```

**Checkpoint**: If no errors, output `INFRASTRUCTURE_DONE`

---

# PHASE 2: DESIGN SYSTEM
## Signal: DESIGN_SYSTEM_DONE

### Step 2.1: Research Premium SaaS Design

Use Playwright to screenshot these sites and analyze:
- claude.ai (Anthropic's design)
- linear.app (Premium SaaS)
- vercel.com (Clean monochrom)

Extract:
- Color usage (neutrals, grays)
- Typography (font sizes, weights)
- Spacing (padding, margins)
- Border radius patterns
- Shadow patterns

### Step 2.2: Create Design System Package

Create `/packages/design-system/package.json`:
```json
{
  "name": "@repo/design-system",
  "version": "0.0.1",
  "private": true,
  "main": "./src/index.ts",
  "types": "./src/index.ts",
  "exports": {
    ".": "./src/index.ts",
    "./tailwind": "./tailwind.config.ts"
  },
  "devDependencies": {
    "typescript": "^5.7.0"
  }
}
```

### Step 2.3: Create Color System

Create `/packages/design-system/src/colors.ts`:
```typescript
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
```

### Step 2.4: Create Typography System

Create `/packages/design-system/src/typography.ts`:
```typescript
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
```

### Step 2.5: Create Spacing System

Create `/packages/design-system/src/spacing.ts`:
```typescript
/**
 * YULA Design System - Spacing
 * Generous spacing for premium feel
 */

export const spacing = {
  0: '0',
  px: '1px',
  0.5: '0.125rem',
  1: '0.25rem',
  1.5: '0.375rem',
  2: '0.5rem',
  2.5: '0.625rem',
  3: '0.75rem',
  3.5: '0.875rem',
  4: '1rem',
  5: '1.25rem',
  6: '1.5rem',
  7: '1.75rem',
  8: '2rem',
  9: '2.25rem',
  10: '2.5rem',
  11: '2.75rem',
  12: '3rem',
  14: '3.5rem',
  16: '4rem',
  20: '5rem',
  24: '6rem',
  28: '7rem',
  32: '8rem',
  36: '9rem',
  40: '10rem',
  44: '11rem',
  48: '12rem',
  52: '13rem',
  56: '14rem',
  60: '15rem',
  64: '16rem',
  72: '18rem',
  80: '20rem',
  96: '24rem',
} as const

export const semanticSpacing = {
  xs: spacing[2],   // 8px
  sm: spacing[3],   // 12px
  md: spacing[4],   // 16px
  lg: spacing[6],   // 24px
  xl: spacing[8],   // 32px
  '2xl': spacing[12], // 48px
  '3xl': spacing[16], // 64px
} as const
```

### Step 2.6: Create Shadows

Create `/packages/design-system/src/shadows.ts`:
```typescript
/**
 * YULA Design System - Shadows
 * Subtle shadows for depth
 */

export const shadows = {
  none: 'none',
  xs: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  sm: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
} as const
```

### Step 2.7: Create Border Radius

Create `/packages/design-system/src/radius.ts`:
```typescript
/**
 * YULA Design System - Border Radius
 */

export const borderRadius = {
  none: '0',
  sm: '0.25rem',
  md: '0.375rem',
  lg: '0.5rem',
  xl: '0.75rem',
  '2xl': '1rem',
  '3xl': '1.5rem',
  full: '9999px',
} as const
```

### Step 2.8: Create Animations

Create `/packages/design-system/src/animations.ts`:
```typescript
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
```

### Step 2.9: Create Main Export

Create `/packages/design-system/src/index.ts`:
```typescript
export * from './colors'
export * from './typography'
export * from './spacing'
export * from './shadows'
export * from './radius'
export * from './animations'
```

### Step 2.10: Create Tailwind Config

Create `/packages/design-system/tailwind.config.ts`:
```typescript
import type { Config } from 'tailwindcss'
import { colors, semanticColors } from './src/colors'
import { fontFamily, fontSize, fontWeight, letterSpacing } from './src/typography'
import { spacing } from './src/spacing'
import { shadows } from './src/shadows'
import { borderRadius } from './src/radius'
import { keyframes, transitions } from './src/animations'

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
```

**Checkpoint**: Verify all design system files created. Output `DESIGN_SYSTEM_DONE`

---

# PHASE 3: TYPES & AUTH
## Signal: TYPES_AUTH_DONE

### Step 3.1: Create Types Package

Create `/packages/types/package.json`:
```json
{
  "name": "@repo/types",
  "version": "0.0.1",
  "private": true,
  "main": "./src/index.ts",
  "types": "./src/index.ts",
  "exports": {
    ".": "./src/index.ts"
  },
  "dependencies": {
    "zod": "^3.23.0"
  },
  "devDependencies": {
    "typescript": "^5.7.0"
  }
}
```

### Step 3.2: Create User Types

Create `/packages/types/src/user.ts`:
```typescript
import { z } from 'zod'

export const TierSchema = z.enum(['free', 'pro', 'max', 'ultra'])
export type Tier = z.infer<typeof TierSchema>

export const BillingCycleSchema = z.enum(['weekly', 'monthly', 'yearly'])
export type BillingCycle = z.infer<typeof BillingCycleSchema>

export const UserSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string().min(1),
  image: z.string().url().optional(),
  tier: TierSchema,
  billingCycle: BillingCycleSchema,
  polarCustomerId: z.string().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export type User = z.infer<typeof UserSchema>

export const CreateUserSchema = UserSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
})

export type CreateUser = z.infer<typeof CreateUserSchema>
```

### Step 3.3: Create Message Types

Create `/packages/types/src/message.ts`:
```typescript
import { z } from 'zod'

export const MessageRoleSchema = z.enum(['user', 'assistant', 'system'])
export type MessageRole = z.infer<typeof MessageRoleSchema>

export const MessageSchema = z.object({
  id: z.string(),
  userId: z.string(),
  conversationId: z.string(),
  role: MessageRoleSchema,
  content: z.string(),
  metadata: z.record(z.unknown()).optional(),
  createdAt: z.date(),
})

export type Message = z.infer<typeof MessageSchema>

export const CreateMessageSchema = MessageSchema.omit({
  id: true,
  createdAt: true,
})

export type CreateMessage = z.infer<typeof CreateMessageSchema>
```

### Step 3.4: Create Conversation Types

Create `/packages/types/src/conversation.ts`:
```typescript
import { z } from 'zod'
import { MessageSchema } from './message'

export const ConversationSchema = z.object({
  id: z.string(),
  userId: z.string(),
  title: z.string(),
  summary: z.string().optional(),
  messageCount: z.number().int().min(0),
  lastMessageAt: z.date(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export type Conversation = z.infer<typeof ConversationSchema>

export const ConversationWithMessagesSchema = ConversationSchema.extend({
  messages: z.array(MessageSchema),
})

export type ConversationWithMessages = z.infer<typeof ConversationWithMessagesSchema>

export const CreateConversationSchema = z.object({
  title: z.string().default('New Conversation'),
})

export type CreateConversation = z.infer<typeof CreateConversationSchema>
```

### Step 3.5: Create Memory Types

Create `/packages/types/src/memory.ts`:
```typescript
import { z } from 'zod'

export const MemorySourceSchema = z.enum(['import', 'conversation', 'proactive', 'tool'])
export type MemorySource = z.infer<typeof MemorySourceSchema>

export const MemorySchema = z.object({
  id: z.string(),
  userId: z.string(),
  content: z.string(),
  embedding: z.array(z.number()),
  source: MemorySourceSchema,
  metadata: z.record(z.unknown()).optional(),
  createdAt: z.date(),
})

export type Memory = z.infer<typeof MemorySchema>

export const CreateMemorySchema = z.object({
  content: z.string().min(1),
  source: MemorySourceSchema.default('import'),
  metadata: z.record(z.unknown()).optional(),
})

export type CreateMemory = z.infer<typeof CreateMemorySchema>

export const MemorySearchSchema = z.object({
  query: z.string().min(1),
  limit: z.number().int().min(1).max(50).default(10),
  threshold: z.number().min(0).max(1).default(0.7),
})

export type MemorySearch = z.infer<typeof MemorySearchSchema>
```

### Step 3.6: Create Tool Types

Create `/packages/types/src/tool.ts`:
```typescript
import { z } from 'zod'

export const ToolSchema = z.object({
  id: z.string(),
  userId: z.string(),
  name: z.string(),
  description: z.string(),
  endpoint: z.string().url(),
  schema: z.record(z.unknown()),
  isActive: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export type Tool = z.infer<typeof ToolSchema>

export const CreateToolSchema = z.object({
  name: z.string().min(1),
  description: z.string(),
  endpoint: z.string().url(),
  schema: z.record(z.unknown()),
})

export type CreateTool = z.infer<typeof CreateToolSchema>
```

### Step 3.7: Create Pricing Constants (LOCKED - DO NOT MODIFY)

Create `/packages/types/src/pricing.ts`:
```typescript
/**
 * YULA Pricing Tiers
 *
 * WARNING: THESE VALUES ARE LOCKED
 * DO NOT MODIFY UNDER ANY CIRCUMSTANCES
 * ANY CHANGES WILL BREAK BILLING CONSISTENCY
 */

import { z } from 'zod'

export const PricingTierSchema = z.object({
  id: z.enum(['free', 'pro', 'max', 'ultra']),
  name: z.string(),
  monthlyPrice: z.number(),
  yearlyPrice: z.number(),
  weeklyPrice: z.number(),
  limits: z.object({
    messagesPerMonth: z.number(),
    memoryStorageMB: z.number(),
    maxConversations: z.number(),
    toolConnections: z.number(),
  }),
})

export type PricingTier = z.infer<typeof PricingTierSchema>

// LOCKED CONSTANTS - DO NOT CHANGE
export const PRICING = {
  free: {
    id: 'free',
    name: 'Free',
    monthlyPrice: 0,
    yearlyPrice: 0,
    weeklyPrice: 0,
    limits: {
      messagesPerMonth: 100,
      memoryStorageMB: 10,
      maxConversations: 10,
      toolConnections: 1,
    },
  },
  pro: {
    id: 'pro',
    name: 'Pro',
    monthlyPrice: 20,
    yearlyPrice: 200,
    weeklyPrice: 7.5,
    limits: {
      messagesPerMonth: 10000,
      memoryStorageMB: 1000,
      maxConversations: 100,
      toolConnections: 10,
    },
  },
  max: {
    id: 'max',
    name: 'Max',
    monthlyPrice: 50,
    yearlyPrice: 500,
    weeklyPrice: 15,
    limits: {
      messagesPerMonth: 100000,
      memoryStorageMB: 10000,
      maxConversations: 1000,
      toolConnections: 50,
    },
  },
  ultra: {
    id: 'ultra',
    name: 'Ultra',
    monthlyPrice: 150,
    yearlyPrice: 1500,
    weeklyPrice: 45,
    limits: {
      messagesPerMonth: -1, // Unlimited
      memoryStorageMB: -1,  // Unlimited
      maxConversations: -1, // Unlimited
      toolConnections: -1,  // Unlimited
    },
  },
} as const satisfies Record<string, PricingTier>

export type PricingTierId = keyof typeof PRICING
```

### Step 3.8: Create Main Types Export

Create `/packages/types/src/index.ts`:
```typescript
// User types
export * from './user'

// Message types
export * from './message'

// Conversation types
export * from './conversation'

// Memory types
export * from './memory'

// Tool types
export * from './tool'

// Pricing types (LOCKED)
export * from './pricing'

// API types
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: {
    code: string
    message: string
  }
}

export interface PaginatedResponse<T> {
  items: T[]
  total: number
  page: number
  pageSize: number
  hasMore: boolean
}

// Auth types
export interface AuthSession {
  user: import('./user').User
  accessToken: string
  refreshToken: string
  expiresAt: number
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface SignupCredentials {
  email: string
  password: string
  name: string
}
```

### Step 3.9: Create Auth Package

Create `/packages/auth/package.json`:
```json
{
  "name": "@repo/auth",
  "version": "0.0.1",
  "private": true,
  "main": "./src/index.ts",
  "types": "./src/index.ts",
  "exports": {
    ".": "./src/index.ts"
  },
  "dependencies": {
    "better-auth": "^1.0.0",
    "@repo/types": "workspace:*"
  },
  "devDependencies": {
    "typescript": "^5.7.0"
  }
}
```

### Step 3.10: Create Auth Config

Create `/packages/auth/src/config.ts`:
```typescript
import { betterAuth } from 'better-auth'
import type { User } from '@repo/types'

export const auth = betterAuth({
  database: {
    provider: 'convex',
    // Convex adapter will be configured in backend
  },
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false, // MVP: Skip email verification
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    },
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // 1 day
  },
  user: {
    additionalFields: {
      tier: {
        type: 'string',
        defaultValue: 'free',
      },
      billingCycle: {
        type: 'string',
        defaultValue: 'monthly',
      },
      polarCustomerId: {
        type: 'string',
        required: false,
      },
    },
  },
})

export type Auth = typeof auth
```

Create `/packages/auth/src/index.ts`:
```typescript
export * from './config'
```

**Checkpoint**: Verify all type files created. Run TypeScript check. Output `TYPES_AUTH_DONE`

---

# PHASE 4: UI COMPONENTS
## Signal: UI_COMPONENTS_DONE

### Step 4.1: Create UI Package

Create `/packages/ui/package.json`:
```json
{
  "name": "@repo/ui",
  "version": "0.0.1",
  "private": true,
  "main": "./src/index.ts",
  "types": "./src/index.ts",
  "exports": {
    ".": "./src/index.ts",
    "./components/*": "./src/components/*"
  },
  "dependencies": {
    "@radix-ui/react-dropdown-menu": "^2.1.0",
    "@radix-ui/react-dialog": "^1.1.0",
    "@radix-ui/react-tooltip": "^1.1.0",
    "@radix-ui/react-toast": "^1.2.0",
    "@radix-ui/react-portal": "^1.1.0",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.1.0",
    "tailwind-merge": "^2.5.0",
    "framer-motion": "^11.0.0"
  },
  "peerDependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  },
  "devDependencies": {
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "typescript": "^5.7.0"
  }
}
```

### Step 4.2: Create Utility Functions

Create `/packages/ui/src/utils/cn.ts`:
```typescript
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

### Step 4.3: Create Button Component

Create `/packages/ui/src/components/Button.tsx`:
```typescript
'use client'

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../utils/cn'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary: 'bg-neutral-900 text-neutral-0 hover:bg-neutral-800 active:bg-neutral-700',
        secondary: 'bg-neutral-100 text-neutral-900 hover:bg-neutral-200 active:bg-neutral-300',
        outline: 'border border-neutral-300 bg-transparent text-neutral-900 hover:bg-neutral-100 active:bg-neutral-200',
        ghost: 'bg-transparent text-neutral-900 hover:bg-neutral-100 active:bg-neutral-200',
        destructive: 'bg-neutral-900 text-neutral-0 hover:bg-neutral-800',
      },
      size: {
        sm: 'h-8 px-3 text-sm',
        md: 'h-10 px-4 text-sm',
        lg: 'h-12 px-6 text-base',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, isLoading, disabled, children, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <svg
            className="h-4 w-4 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        ) : null}
        {children}
      </button>
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
```

### Step 4.4: Create Input Component

Create `/packages/ui/src/components/Input.tsx`:
```typescript
'use client'

import * as React from 'react'
import { cn } from '../utils/cn'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, ...props }, ref) => {
    return (
      <div className="w-full">
        <input
          type={type}
          className={cn(
            'flex h-10 w-full rounded-lg border border-neutral-300 bg-neutral-0 px-4 py-2 text-sm text-neutral-900',
            'placeholder:text-neutral-400',
            'focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent',
            'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-neutral-100',
            'transition-all duration-200',
            error && 'border-neutral-900 focus:ring-neutral-900',
            className
          )}
          ref={ref}
          {...props}
        />
        {error && (
          <p className="mt-1.5 text-sm text-neutral-600">{error}</p>
        )}
      </div>
    )
  }
)
Input.displayName = 'Input'

export { Input }
```

### Step 4.5: Create Textarea Component

Create `/packages/ui/src/components/Textarea.tsx`:
```typescript
'use client'

import * as React from 'react'
import { cn } from '../utils/cn'

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <div className="w-full">
        <textarea
          className={cn(
            'flex min-h-[100px] w-full rounded-lg border border-neutral-300 bg-neutral-0 px-4 py-3 text-sm text-neutral-900',
            'placeholder:text-neutral-400',
            'focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent',
            'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-neutral-100',
            'transition-all duration-200 resize-none',
            error && 'border-neutral-900',
            className
          )}
          ref={ref}
          {...props}
        />
        {error && (
          <p className="mt-1.5 text-sm text-neutral-600">{error}</p>
        )}
      </div>
    )
  }
)
Textarea.displayName = 'Textarea'

export { Textarea }
```

### Step 4.6: Create Card Component

Create `/packages/ui/src/components/Card.tsx`:
```typescript
'use client'

import * as React from 'react'
import { cn } from '../utils/cn'

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'rounded-xl border border-neutral-200 bg-neutral-0 shadow-sm',
      className
    )}
    {...props}
  />
))
Card.displayName = 'Card'

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col space-y-1.5 p-6', className)}
    {...props}
  />
))
CardHeader.displayName = 'CardHeader'

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn('text-lg font-semibold text-neutral-900', className)}
    {...props}
  />
))
CardTitle.displayName = 'CardTitle'

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-sm text-neutral-500', className)}
    {...props}
  />
))
CardDescription.displayName = 'CardDescription'

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
))
CardContent.displayName = 'CardContent'

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex items-center p-6 pt-0', className)}
    {...props}
  />
))
CardFooter.displayName = 'CardFooter'

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
```

### Step 4.7: Create Modal Component

Create `/packages/ui/src/components/Modal.tsx`:
```typescript
'use client'

import * as React from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '../utils/cn'

const Modal = DialogPrimitive.Root
const ModalTrigger = DialogPrimitive.Trigger
const ModalPortal = DialogPrimitive.Portal
const ModalClose = DialogPrimitive.Close

const ModalOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      'fixed inset-0 z-50 bg-black/50 backdrop-blur-sm',
      className
    )}
    {...props}
  />
))
ModalOverlay.displayName = DialogPrimitive.Overlay.displayName

const ModalContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <ModalPortal>
    <ModalOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        'fixed left-[50%] top-[50%] z-50 w-full max-w-lg translate-x-[-50%] translate-y-[-50%]',
        'rounded-xl border border-neutral-200 bg-neutral-0 p-6 shadow-xl',
        'animate-scale-in',
        className
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close className="absolute right-4 top-4 rounded-md opacity-70 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:ring-offset-2 transition-opacity">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M18 6 6 18" />
          <path d="m6 6 12 12" />
        </svg>
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </ModalPortal>
))
ModalContent.displayName = DialogPrimitive.Content.displayName

const ModalHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn('flex flex-col space-y-1.5', className)}
    {...props}
  />
)
ModalHeader.displayName = 'ModalHeader'

const ModalTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn('text-lg font-semibold text-neutral-900', className)}
    {...props}
  />
))
ModalTitle.displayName = DialogPrimitive.Title.displayName

const ModalDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn('text-sm text-neutral-500', className)}
    {...props}
  />
))
ModalDescription.displayName = DialogPrimitive.Description.displayName

const ModalFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 mt-6', className)}
    {...props}
  />
)
ModalFooter.displayName = 'ModalFooter'

export {
  Modal,
  ModalPortal,
  ModalOverlay,
  ModalTrigger,
  ModalClose,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalTitle,
  ModalDescription,
}
```

### Step 4.8: Create Context Menu Component (CORE)

Create `/packages/ui/src/components/ContextMenu.tsx`:
```typescript
'use client'

import * as React from 'react'
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'
import { cn } from '../utils/cn'

interface ContextMenuProps {
  children: React.ReactNode
}

interface ContextMenuItemProps {
  label: string
  onClick?: () => void
  disabled?: boolean
  destructive?: boolean
  shortcut?: string
  icon?: React.ReactNode
}

interface ContextMenuDividerProps {
  className?: string
}

interface ContextMenuContentProps {
  items: (ContextMenuItemProps | { type: 'divider' })[]
  onClose?: () => void
}

const ContextMenuContext = React.createContext<{
  open: boolean
  setOpen: (open: boolean) => void
  position: { x: number; y: number }
  setPosition: (position: { x: number; y: number }) => void
}>({
  open: false,
  setOpen: () => {},
  position: { x: 0, y: 0 },
  setPosition: () => {},
})

export function ContextMenuProvider({ children }: ContextMenuProps) {
  const [open, setOpen] = React.useState(false)
  const [position, setPosition] = React.useState({ x: 0, y: 0 })

  return (
    <ContextMenuContext.Provider value={{ open, setOpen, position, setPosition }}>
      {children}
    </ContextMenuContext.Provider>
  )
}

export function useContextMenu() {
  const context = React.useContext(ContextMenuContext)
  if (!context) {
    throw new Error('useContextMenu must be used within a ContextMenuProvider')
  }
  return context
}

export function ContextMenuTrigger({
  children,
  items,
}: {
  children: React.ReactNode
  items: (ContextMenuItemProps | { type: 'divider' })[]
}) {
  const { setOpen, setPosition } = useContextMenu()
  const [menuItems, setMenuItems] = React.useState(items)

  const handleContextMenu = React.useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault()
      setPosition({ x: e.clientX, y: e.clientY })
      setOpen(true)
    },
    [setOpen, setPosition]
  )

  React.useEffect(() => {
    setMenuItems(items)
  }, [items])

  return (
    <div onContextMenu={handleContextMenu} className="contents">
      {children}
    </div>
  )
}

export function ContextMenuContent({
  items,
  onClose,
}: ContextMenuContentProps) {
  const { open, setOpen, position } = useContextMenu()
  const menuRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false)
        onClose?.()
      }
    }

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        onClose?.()
      }
    }

    if (open) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('keydown', handleEscape)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [open, setOpen, onClose])

  if (!open) return null

  return (
    <div
      ref={menuRef}
      className={cn(
        'fixed z-50 min-w-[180px] overflow-hidden rounded-lg border border-neutral-200 bg-neutral-0 p-1 shadow-lg',
        'animate-scale-in'
      )}
      style={{
        left: position.x,
        top: position.y,
      }}
    >
      {items.map((item, index) => {
        if ('type' in item && item.type === 'divider') {
          return (
            <div
              key={`divider-${index}`}
              className="my-1 h-px bg-neutral-200"
            />
          )
        }

        const menuItem = item as ContextMenuItemProps

        return (
          <button
            key={`item-${index}`}
            className={cn(
              'flex w-full items-center justify-between rounded-md px-3 py-2 text-sm',
              'transition-colors duration-150',
              menuItem.disabled
                ? 'cursor-not-allowed opacity-50'
                : 'cursor-pointer hover:bg-neutral-100',
              menuItem.destructive && 'text-neutral-900 hover:bg-neutral-100'
            )}
            onClick={() => {
              if (!menuItem.disabled) {
                menuItem.onClick?.()
                setOpen(false)
              }
            }}
            disabled={menuItem.disabled}
          >
            <span className="flex items-center gap-2">
              {menuItem.icon && (
                <span className="h-4 w-4">{menuItem.icon}</span>
              )}
              {menuItem.label}
            </span>
            {menuItem.shortcut && (
              <span className="ml-4 text-xs text-neutral-400">
                {menuItem.shortcut}
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}

export type { ContextMenuItemProps }
```

### Step 4.9: Create Floating Dock Component (CORE)

Create `/packages/ui/src/components/FloatingDock.tsx`:
```typescript
'use client'

import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '../utils/cn'

export interface DockCommand {
  id: string
  label: string
  description?: string
  shortcut?: string
  icon?: React.ReactNode
  action: () => void | Promise<void>
}

interface FloatingDockProps {
  commands: DockCommand[]
  onCommandExecute?: (commandId: string) => void
}

export function FloatingDock({ commands, onCommandExecute }: FloatingDockProps) {
  const [open, setOpen] = React.useState(false)
  const [search, setSearch] = React.useState('')
  const [selectedIndex, setSelectedIndex] = React.useState(0)
  const inputRef = React.useRef<HTMLInputElement>(null)
  const dockRef = React.useRef<HTMLDivElement>(null)

  // Filter commands based on search
  const filteredCommands = React.useMemo(() => {
    if (!search) return commands
    const lower = search.toLowerCase()
    return commands.filter(
      (cmd) =>
        cmd.label.toLowerCase().includes(lower) ||
        cmd.description?.toLowerCase().includes(lower)
    )
  }, [commands, search])

  // Handle keyboard shortcuts
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd+D / Ctrl+D to toggle dock
      if ((e.metaKey || e.ctrlKey) && e.key === 'd') {
        e.preventDefault()
        setOpen((prev) => !prev)
        setSearch('')
        setSelectedIndex(0)
      }

      // Cmd+K / Ctrl+K to open with search
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setOpen(true)
        setSearch('')
        setSelectedIndex(0)
      }

      // When dock is open
      if (open) {
        if (e.key === 'ArrowDown') {
          e.preventDefault()
          setSelectedIndex((prev) =>
            prev < filteredCommands.length - 1 ? prev + 1 : 0
          )
        } else if (e.key === 'ArrowUp') {
          e.preventDefault()
          setSelectedIndex((prev) =>
            prev > 0 ? prev - 1 : filteredCommands.length - 1
          )
        } else if (e.key === 'Enter') {
          e.preventDefault()
          const selected = filteredCommands[selectedIndex]
          if (selected) {
            handleExecuteCommand(selected)
          }
        } else if (e.key === 'Escape') {
          e.preventDefault()
          setOpen(false)
          setSearch('')
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [open, filteredCommands, selectedIndex])

  // Focus input when dock opens
  React.useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus()
    }
  }, [open])

  // Close on click outside
  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dockRef.current && !dockRef.current.contains(e.target as Node)) {
        setOpen(false)
        setSearch('')
      }
    }

    if (open) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [open])

  const handleExecuteCommand = async (command: DockCommand) => {
    try {
      await command.action()
      onCommandExecute?.(command.id)
    } catch (error) {
      console.error('Command execution failed:', error)
    }
    setOpen(false)
    setSearch('')
    setSelectedIndex(0)
  }

  return (
    <>
      {/* Trigger Button */}
      {!open && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-6 left-1/2 z-40 -translate-x-1/2"
        >
          <button
            onClick={() => setOpen(true)}
            className={cn(
              'flex items-center gap-2 rounded-full border border-neutral-200 bg-neutral-0 px-4 py-2',
              'font-mono text-sm text-neutral-600 shadow-lg',
              'transition-all duration-200 hover:bg-neutral-50 hover:shadow-xl'
            )}
          >
            <span>Open Dock</span>
            <kbd className="rounded bg-neutral-100 px-2 py-0.5 text-xs">
              Cmd D
            </kbd>
          </button>
        </motion.div>
      )}

      {/* Dock Modal */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
            />

            {/* Dock Container */}
            <motion.div
              ref={dockRef}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="fixed bottom-4 left-1/2 z-50 w-full max-w-xl -translate-x-1/2 px-4"
            >
              <div className="overflow-hidden rounded-xl border border-neutral-200 bg-neutral-0 shadow-2xl">
                {/* Search Input */}
                <div className="border-b border-neutral-100 p-4">
                  <input
                    ref={inputRef}
                    type="text"
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value)
                      setSelectedIndex(0)
                    }}
                    placeholder="Search commands..."
                    className={cn(
                      'w-full bg-transparent font-mono text-base text-neutral-900',
                      'placeholder:text-neutral-400 focus:outline-none'
                    )}
                  />
                  <div className="mt-2 flex gap-3 text-xs text-neutral-400">
                    <span>
                      <kbd className="rounded bg-neutral-100 px-1.5 py-0.5">
                        ↑↓
                      </kbd>{' '}
                      navigate
                    </span>
                    <span>
                      <kbd className="rounded bg-neutral-100 px-1.5 py-0.5">
                        Enter
                      </kbd>{' '}
                      select
                    </span>
                    <span>
                      <kbd className="rounded bg-neutral-100 px-1.5 py-0.5">
                        Esc
                      </kbd>{' '}
                      close
                    </span>
                  </div>
                </div>

                {/* Commands List */}
                <div className="max-h-80 overflow-y-auto p-2">
                  {filteredCommands.length === 0 ? (
                    <div className="py-8 text-center">
                      <p className="font-mono text-sm text-neutral-500">
                        No commands found
                      </p>
                    </div>
                  ) : (
                    filteredCommands.map((command, idx) => (
                      <button
                        key={command.id}
                        onClick={() => handleExecuteCommand(command)}
                        className={cn(
                          'flex w-full items-center justify-between rounded-lg px-4 py-3',
                          'font-mono text-sm transition-colors duration-150',
                          idx === selectedIndex
                            ? 'bg-neutral-900 text-neutral-0'
                            : 'text-neutral-900 hover:bg-neutral-100'
                        )}
                      >
                        <div className="flex items-center gap-3">
                          {command.icon && (
                            <span className="h-5 w-5">{command.icon}</span>
                          )}
                          <div className="text-left">
                            <div className="font-medium">{command.label}</div>
                            {command.description && (
                              <div
                                className={cn(
                                  'text-xs',
                                  idx === selectedIndex
                                    ? 'text-neutral-300'
                                    : 'text-neutral-500'
                                )}
                              >
                                {command.description}
                              </div>
                            )}
                          </div>
                        </div>
                        {command.shortcut && (
                          <kbd
                            className={cn(
                              'rounded px-2 py-1 text-xs',
                              idx === selectedIndex
                                ? 'bg-neutral-800 text-neutral-300'
                                : 'bg-neutral-100 text-neutral-500'
                            )}
                          >
                            {command.shortcut}
                          </kbd>
                        )}
                      </button>
                    ))
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

// Hook to manage dock commands
export function useFloatingDock() {
  const [commands, setCommands] = React.useState<DockCommand[]>([])

  const addCommand = React.useCallback((command: DockCommand) => {
    setCommands((prev) => [...prev.filter((c) => c.id !== command.id), command])
  }, [])

  const removeCommand = React.useCallback((commandId: string) => {
    setCommands((prev) => prev.filter((c) => c.id !== commandId))
  }, [])

  const clearCommands = React.useCallback(() => {
    setCommands([])
  }, [])

  return { commands, addCommand, removeCommand, clearCommands }
}
```

### Step 4.10: Create Toast Component

Create `/packages/ui/src/components/Toast.tsx`:
```typescript
'use client'

import * as React from 'react'
import * as ToastPrimitive from '@radix-ui/react-toast'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '../utils/cn'

interface Toast {
  id: string
  title: string
  description?: string
  variant?: 'default' | 'success' | 'error'
  duration?: number
}

interface ToastContextValue {
  toasts: Toast[]
  addToast: (toast: Omit<Toast, 'id'>) => void
  removeToast: (id: string) => void
}

const ToastContext = React.createContext<ToastContextValue | null>(null)

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<Toast[]>([])

  const addToast = React.useCallback((toast: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substring(7)
    setToasts((prev) => [...prev, { ...toast, id }])

    // Auto remove after duration
    const duration = toast.duration || 5000
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, duration)
  }, [])

  const removeToast = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      <ToastPrimitive.Provider swipeDirection="right">
        {children}
        <ToastViewport toasts={toasts} removeToast={removeToast} />
      </ToastPrimitive.Provider>
    </ToastContext.Provider>
  )
}

function ToastViewport({
  toasts,
  removeToast,
}: {
  toasts: Toast[]
  removeToast: (id: string) => void
}) {
  return (
    <ToastPrimitive.Viewport className="fixed bottom-4 right-4 z-50 flex w-full max-w-sm flex-col gap-2">
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, x: 100, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.9 }}
            transition={{ duration: 0.2 }}
          >
            <ToastPrimitive.Root
              className={cn(
                'rounded-lg border border-neutral-200 bg-neutral-0 p-4 shadow-lg',
                toast.variant === 'error' && 'border-neutral-300'
              )}
              onOpenChange={(open) => {
                if (!open) removeToast(toast.id)
              }}
            >
              <ToastPrimitive.Title className="font-medium text-neutral-900">
                {toast.title}
              </ToastPrimitive.Title>
              {toast.description && (
                <ToastPrimitive.Description className="mt-1 text-sm text-neutral-500">
                  {toast.description}
                </ToastPrimitive.Description>
              )}
              <ToastPrimitive.Close className="absolute right-2 top-2 rounded-md p-1 opacity-70 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-neutral-900">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </ToastPrimitive.Close>
            </ToastPrimitive.Root>
          </motion.div>
        ))}
      </AnimatePresence>
    </ToastPrimitive.Viewport>
  )
}

export function useToast() {
  const context = React.useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}
```

### Step 4.11: Create Main UI Export

Create `/packages/ui/src/index.ts`:
```typescript
// Utils
export * from './utils/cn'

// Components
export * from './components/Button'
export * from './components/Input'
export * from './components/Textarea'
export * from './components/Card'
export * from './components/Modal'
export * from './components/ContextMenu'
export * from './components/FloatingDock'
export * from './components/Toast'
```

**Checkpoint**: Verify all UI components created. Run lint. Output `UI_COMPONENTS_DONE`

---

# PHASE 5: BACKEND
## Signal: BACKEND_DONE

### Step 5.1: Create Backend Package

Create `/apps/api/package.json`:
```json
{
  "name": "yula-api",
  "version": "0.0.1",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "bun run --watch src/index.ts",
    "build": "bun build src/index.ts --outdir dist",
    "start": "bun run dist/index.js",
    "lint": "biome check ."
  },
  "dependencies": {
    "hono": "^4.6.0",
    "@hono/node-server": "^1.13.0",
    "ai": "^4.0.0",
    "@ai-sdk/anthropic": "^1.0.0",
    "convex": "^1.17.0",
    "better-auth": "^1.0.0",
    "zod": "^3.23.0",
    "@repo/types": "workspace:*",
    "@repo/auth": "workspace:*"
  },
  "devDependencies": {
    "@types/bun": "latest",
    "typescript": "^5.7.0"
  }
}
```

### Step 5.2: Create Main Hono App

Create `/apps/api/src/index.ts`:
```typescript
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'
import { prettyJSON } from 'hono/pretty-json'

import { authRoutes } from './routes/auth'
import { chatRoutes } from './routes/chat'
import { conversationRoutes } from './routes/conversations'
import { memoryRoutes } from './routes/memory'
import { paymentRoutes } from './routes/payment'
import { healthRoutes } from './routes/health'

const app = new Hono()

// Middleware
app.use('*', logger())
app.use('*', prettyJSON())
app.use(
  '*',
  cors({
    origin: ['http://localhost:3000', 'https://yula.app'],
    allowMethods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
)

// Routes
app.route('/health', healthRoutes)
app.route('/api/auth', authRoutes)
app.route('/api/chat', chatRoutes)
app.route('/api/conversations', conversationRoutes)
app.route('/api/memory', memoryRoutes)
app.route('/api/payment', paymentRoutes)

// Error handling
app.onError((err, c) => {
  console.error('Server error:', err)
  return c.json(
    {
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'An unexpected error occurred',
      },
    },
    500
  )
})

// 404 handler
app.notFound((c) => {
  return c.json(
    {
      success: false,
      error: {
        code: 'NOT_FOUND',
        message: 'The requested resource was not found',
      },
    },
    404
  )
})

const port = parseInt(process.env.PORT || '3001')
console.log(`YULA API running on http://localhost:${port}`)

export default {
  port,
  fetch: app.fetch,
}
```

### Step 5.3: Create Health Routes

Create `/apps/api/src/routes/health.ts`:
```typescript
import { Hono } from 'hono'

export const healthRoutes = new Hono()

healthRoutes.get('/', (c) => {
  return c.json({
    success: true,
    data: {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      version: '0.0.1',
    },
  })
})
```

### Step 5.4: Create Auth Routes

Create `/apps/api/src/routes/auth.ts`:
```typescript
import { Hono } from 'hono'
import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'

export const authRoutes = new Hono()

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(1),
})

authRoutes.post('/signup', zValidator('json', signupSchema), async (c) => {
  const { email, password, name } = c.req.valid('json')

  // TODO: Implement with BetterAuth + Convex
  // For now, return mock response
  return c.json({
    success: true,
    data: {
      user: {
        id: 'user_' + Math.random().toString(36).substring(7),
        email,
        name,
        tier: 'free',
        billingCycle: 'monthly',
        createdAt: new Date().toISOString(),
      },
      accessToken: 'mock_token_' + Math.random().toString(36),
    },
  })
})

authRoutes.post('/login', zValidator('json', loginSchema), async (c) => {
  const { email, password } = c.req.valid('json')

  // TODO: Implement with BetterAuth + Convex
  return c.json({
    success: true,
    data: {
      user: {
        id: 'user_' + Math.random().toString(36).substring(7),
        email,
        name: 'User',
        tier: 'free',
        billingCycle: 'monthly',
        createdAt: new Date().toISOString(),
      },
      accessToken: 'mock_token_' + Math.random().toString(36),
    },
  })
})

authRoutes.post('/logout', async (c) => {
  // TODO: Invalidate session
  return c.json({ success: true })
})

authRoutes.get('/me', async (c) => {
  const authHeader = c.req.header('Authorization')
  if (!authHeader) {
    return c.json(
      {
        success: false,
        error: { code: 'UNAUTHORIZED', message: 'Not authenticated' },
      },
      401
    )
  }

  // TODO: Validate token and return user
  return c.json({
    success: true,
    data: {
      id: 'user_123',
      email: 'user@example.com',
      name: 'User',
      tier: 'free',
      billingCycle: 'monthly',
    },
  })
})
```

### Step 5.5: Create Chat Routes

Create `/apps/api/src/routes/chat.ts`:
```typescript
import { Hono } from 'hono'
import { streamText } from 'ai'
import { anthropic } from '@ai-sdk/anthropic'
import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'

export const chatRoutes = new Hono()

const chatSchema = z.object({
  conversationId: z.string(),
  message: z.string().min(1),
})

chatRoutes.post('/', zValidator('json', chatSchema), async (c) => {
  const { conversationId, message } = c.req.valid('json')

  // Create streaming response
  const result = streamText({
    model: anthropic('claude-3-5-sonnet-20241022'),
    system: 'You are YULA, a helpful AI assistant with persistent memory.',
    messages: [
      { role: 'user', content: message },
    ],
  })

  // Return streaming response
  const response = result.toDataStreamResponse()

  // Set headers for SSE
  c.header('Content-Type', 'text/event-stream')
  c.header('Cache-Control', 'no-cache')
  c.header('Connection', 'keep-alive')

  return response
})

chatRoutes.post('/regenerate', async (c) => {
  const { conversationId } = await c.req.json()

  // TODO: Get last user message and regenerate response
  return c.json({
    success: true,
    data: {
      message: 'Regeneration not yet implemented',
    },
  })
})
```

### Step 5.6: Create Conversation Routes

Create `/apps/api/src/routes/conversations.ts`:
```typescript
import { Hono } from 'hono'
import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'

export const conversationRoutes = new Hono()

const createConversationSchema = z.object({
  title: z.string().default('New Conversation'),
})

const updateConversationSchema = z.object({
  title: z.string().optional(),
})

// List conversations
conversationRoutes.get('/', async (c) => {
  // TODO: Get from Convex
  return c.json({
    success: true,
    data: {
      items: [],
      total: 0,
      page: 1,
      pageSize: 20,
      hasMore: false,
    },
  })
})

// Create conversation
conversationRoutes.post(
  '/',
  zValidator('json', createConversationSchema),
  async (c) => {
    const { title } = c.req.valid('json')

    // TODO: Create in Convex
    return c.json({
      success: true,
      data: {
        id: 'conv_' + Math.random().toString(36).substring(7),
        title,
        messageCount: 0,
        createdAt: new Date().toISOString(),
      },
    })
  }
)

// Get conversation
conversationRoutes.get('/:id', async (c) => {
  const id = c.req.param('id')

  // TODO: Get from Convex
  return c.json({
    success: true,
    data: {
      id,
      title: 'Conversation',
      messages: [],
      messageCount: 0,
      createdAt: new Date().toISOString(),
    },
  })
})

// Update conversation
conversationRoutes.patch(
  '/:id',
  zValidator('json', updateConversationSchema),
  async (c) => {
    const id = c.req.param('id')
    const updates = c.req.valid('json')

    // TODO: Update in Convex
    return c.json({
      success: true,
      data: {
        id,
        ...updates,
      },
    })
  }
)

// Delete conversation
conversationRoutes.delete('/:id', async (c) => {
  const id = c.req.param('id')

  // TODO: Delete from Convex
  return c.json({ success: true })
})

// Get messages
conversationRoutes.get('/:id/messages', async (c) => {
  const id = c.req.param('id')

  // TODO: Get from Convex with pagination
  return c.json({
    success: true,
    data: {
      items: [],
      total: 0,
      page: 1,
      pageSize: 50,
      hasMore: false,
    },
  })
})
```

### Step 5.7: Create Memory Routes

Create `/apps/api/src/routes/memory.ts`:
```typescript
import { Hono } from 'hono'
import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'

export const memoryRoutes = new Hono()

const importMemorySchema = z.object({
  content: z.string().min(1),
  source: z.enum(['import', 'conversation', 'proactive', 'tool']).default('import'),
  metadata: z.record(z.unknown()).optional(),
})

const searchMemorySchema = z.object({
  query: z.string().min(1),
  limit: z.number().int().min(1).max(50).default(10),
  threshold: z.number().min(0).max(1).default(0.7),
})

// Import memory
memoryRoutes.post('/import', zValidator('json', importMemorySchema), async (c) => {
  const { content, source, metadata } = c.req.valid('json')

  // TODO: Generate embedding and store in Convex
  return c.json({
    success: true,
    data: {
      id: 'mem_' + Math.random().toString(36).substring(7),
      content: content.substring(0, 100) + '...',
      source,
      createdAt: new Date().toISOString(),
    },
  })
})

// Search memory
memoryRoutes.get('/search', zValidator('query', searchMemorySchema), async (c) => {
  const { query, limit, threshold } = c.req.valid('query')

  // TODO: Vector search in Convex
  return c.json({
    success: true,
    data: {
      items: [],
      query,
    },
  })
})

// List memories
memoryRoutes.get('/', async (c) => {
  // TODO: Get from Convex with pagination
  return c.json({
    success: true,
    data: {
      items: [],
      total: 0,
      page: 1,
      pageSize: 20,
      hasMore: false,
    },
  })
})

// Get memory
memoryRoutes.get('/:id', async (c) => {
  const id = c.req.param('id')

  // TODO: Get from Convex
  return c.json({
    success: true,
    data: {
      id,
      content: 'Memory content',
      source: 'import',
      createdAt: new Date().toISOString(),
    },
  })
})

// Delete memory
memoryRoutes.delete('/:id', async (c) => {
  const id = c.req.param('id')

  // TODO: Delete from Convex
  return c.json({ success: true })
})
```

### Step 5.8: Create Payment Routes

Create `/apps/api/src/routes/payment.ts`:
```typescript
import { Hono } from 'hono'
import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'
import { PRICING } from '@repo/types'

export const paymentRoutes = new Hono()

const checkoutSchema = z.object({
  tier: z.enum(['pro', 'max', 'ultra']),
  billingCycle: z.enum(['weekly', 'monthly', 'yearly']),
})

// Create checkout session
paymentRoutes.post('/checkout', zValidator('json', checkoutSchema), async (c) => {
  const { tier, billingCycle } = c.req.valid('json')

  const pricing = PRICING[tier]

  // TODO: Create Polar.sh checkout session
  return c.json({
    success: true,
    data: {
      checkoutUrl: `https://polar.sh/checkout/yula-${tier}-${billingCycle}`,
      tier,
      billingCycle,
      price:
        billingCycle === 'monthly'
          ? pricing.monthlyPrice
          : billingCycle === 'yearly'
            ? pricing.yearlyPrice
            : pricing.weeklyPrice,
    },
  })
})

// Polar webhook
paymentRoutes.post('/webhook', async (c) => {
  const signature = c.req.header('polar-signature')
  const body = await c.req.text()

  // TODO: Verify webhook signature and process event
  console.log('Received Polar webhook:', body.substring(0, 100))

  return c.json({ received: true })
})

// Get subscription
paymentRoutes.get('/subscription', async (c) => {
  // TODO: Get user's subscription from Convex
  return c.json({
    success: true,
    data: {
      tier: 'free',
      billingCycle: 'monthly',
      currentPeriodEnd: null,
      cancelAtPeriodEnd: false,
    },
  })
})

// Cancel subscription
paymentRoutes.post('/cancel', async (c) => {
  // TODO: Cancel in Polar and update Convex
  return c.json({
    success: true,
    data: {
      cancelAtPeriodEnd: true,
    },
  })
})
```

### Step 5.9: Create Environment Example

Create `/apps/api/.env.example`:
```
# Server
PORT=3001
NODE_ENV=development

# Convex
CONVEX_URL=

# Anthropic
ANTHROPIC_API_KEY=

# Auth Providers
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

# Polar.sh
POLAR_API_KEY=
POLAR_WEBHOOK_SECRET=
```

### Step 5.10: Create Convex Schema

Create `/apps/api/convex/schema.ts`:
```typescript
import { defineSchema, defineTable } from 'convex/server'
import { v } from 'convex/values'

export default defineSchema({
  users: defineTable({
    email: v.string(),
    name: v.string(),
    image: v.optional(v.string()),
    passwordHash: v.optional(v.string()),
    tier: v.union(
      v.literal('free'),
      v.literal('pro'),
      v.literal('max'),
      v.literal('ultra')
    ),
    billingCycle: v.union(
      v.literal('weekly'),
      v.literal('monthly'),
      v.literal('yearly')
    ),
    polarCustomerId: v.optional(v.string()),
    lastLoginAt: v.optional(v.number()),
  })
    .index('by_email', ['email'])
    .index('by_polar_id', ['polarCustomerId']),

  conversations: defineTable({
    userId: v.id('users'),
    title: v.string(),
    summary: v.optional(v.string()),
    messageCount: v.number(),
    lastMessageAt: v.number(),
  })
    .index('by_user', ['userId'])
    .index('by_user_recent', ['userId', 'lastMessageAt']),

  messages: defineTable({
    userId: v.id('users'),
    conversationId: v.id('conversations'),
    role: v.union(
      v.literal('user'),
      v.literal('assistant'),
      v.literal('system')
    ),
    content: v.string(),
    metadata: v.optional(v.any()),
  })
    .index('by_conversation', ['conversationId'])
    .index('by_user', ['userId']),

  memories: defineTable({
    userId: v.id('users'),
    content: v.string(),
    embedding: v.array(v.float64()),
    source: v.union(
      v.literal('import'),
      v.literal('conversation'),
      v.literal('proactive'),
      v.literal('tool')
    ),
    metadata: v.optional(v.any()),
  })
    .index('by_user', ['userId'])
    .vectorIndex('by_embedding', {
      vectorField: 'embedding',
      dimensions: 1536,
      filterFields: ['userId'],
    }),

  tools: defineTable({
    userId: v.id('users'),
    name: v.string(),
    description: v.string(),
    endpoint: v.string(),
    schema: v.any(),
    isActive: v.boolean(),
  }).index('by_user', ['userId']),

  subscriptions: defineTable({
    userId: v.id('users'),
    polarSubscriptionId: v.string(),
    status: v.string(),
    currentPeriodEnd: v.number(),
    tier: v.string(),
    billingCycle: v.string(),
  })
    .index('by_user', ['userId'])
    .index('by_polar_id', ['polarSubscriptionId']),
})
```

**Checkpoint**: Verify backend starts. Test endpoints. Output `BACKEND_DONE`

---

# REMAINING PHASES

Continue implementing:

## Phase 6: Frontend Architecture
- Next.js 16 + React 19 setup
- Tailwind v4 configuration
- Layout with FloatingDock
- Provider setup

## Phase 7: Landing Page
- Hero section
- Features section
- Pricing section
- CTA and Footer

## Phase 8: Chat Interface
- Message display with streaming
- Input bar
- Context menus
- Conversation sidebar

## Phase 9: Memory Management
- Import UI
- Search and list
- Memory cards

## Phase 10: MCP Servers
- Memory retriever
- Tool orchestrator
- Proactive callbacks

## Phase 11: Settings
- Profile settings
- Subscription management
- Tool connections

## Phase 12: Payment Integration
- Polar.sh checkout
- Webhook handling

## Phase 13: Mobile
- React Native + Expo
- Chat interface
- Tab navigation

## Phase 14: Testing
- Unit tests
- Integration tests
- E2E tests

## Phase 15: Documentation
- README
- API docs
- Deployment guide

---

# FINAL VERIFICATION CHECKLIST

Before outputting completion signal, verify ALL of the following:

## Infrastructure
- [ ] `bun install` works
- [ ] `bun run lint` passes
- [ ] TypeScript compiles
- [ ] Turborepo works

## Design System
- [ ] Colors are monochrom (no bright colors)
- [ ] Typography defined (Geist)
- [ ] Spacing system complete
- [ ] NO EMOJI anywhere

## Types & Auth
- [ ] All interfaces defined
- [ ] PRICING constants locked
- [ ] BetterAuth config ready
- [ ] Zod schemas match

## UI Components
- [ ] Button works
- [ ] Input works
- [ ] ContextMenu works on right-click
- [ ] FloatingDock opens with Cmd+D
- [ ] Toast notifications work

## Backend
- [ ] Server starts on port 3001
- [ ] GET /health returns 200
- [ ] Auth routes work
- [ ] Chat streaming works
- [ ] Convex schema defined

## Frontend
- [ ] Next.js starts on port 3000
- [ ] Landing page renders
- [ ] Chat interface works
- [ ] Memory management works
- [ ] Settings page works

## Integration
- [ ] Frontend talks to backend
- [ ] Authentication flow works
- [ ] Streaming chat works
- [ ] Memory search works

## Quality
- [ ] NO TODOs in production code
- [ ] NO placeholder functions
- [ ] NO console.log in production
- [ ] NO emoji anywhere
- [ ] Code is formatted (Biome)
- [ ] No TypeScript errors
- [ ] No lint errors

---

# COMPLETION SIGNAL

When ALL phases complete and ALL verification checks pass:

```
<promise>YULA_PRODUCTION_MVP_COMPLETE</promise>
```

This signal indicates:
- All 15 phases completed
- All verification checks passed
- Zero errors, zero warnings
- Production-ready code shipped
- Ready for deployment

---

# ERROR RECOVERY

If you encounter errors:

1. **TypeScript Error**: Fix the type, don't use `any`
2. **Import Error**: Check package.json exports
3. **Build Error**: Check dependencies
4. **Runtime Error**: Add error handling
5. **Test Failure**: Fix the code, not the test

NEVER:
- Skip a phase
- Leave a TODO
- Use placeholder code
- Ignore errors
- Give up

ALWAYS:
- Fix and continue
- Iterate until success
- Ship complete code
