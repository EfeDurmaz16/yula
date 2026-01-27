# YULA Production MVP - Agent Architecture

## Overview

This document defines all agents, subagents, and their execution order for the YULA production MVP.
Each agent is responsible for a specific domain and outputs are passed to dependent agents.

**Tools Available to All Agents:**
- Context7 (documentation lookup)
- Playwright (browser automation, screenshots)
- Biome (linting, formatting)
- MCP Servers (memory retrieval, tool orchestration)
- Serena (semantic code tools)
- 21st.dev Magic (UI component builder)
- Greptile (code reviews, PR management)

---

## Project Structure

```
yula/
├── apps/
│   ├── web/                    # Next.js 16 + React 19 frontend
│   ├── api/                    # Bun + Hono backend
│   └── mobile/                 # React Native / Expo
├── packages/
│   ├── design-system/          # Colors, typography, spacing
│   ├── types/                  # Shared TypeScript interfaces
│   ├── ui/                     # Reusable components
│   ├── auth/                   # BetterAuth configuration
│   └── mcp-servers/            # MCP server implementations
├── AGENTS.md                   # This file
├── README.md                   # Project documentation
├── turbo.json                  # Turborepo config
├── package.json                # Root package.json
├── biome.json                  # Biome linting config
└── tsconfig.json               # Root TypeScript config
```

---

## Phase 1: Infrastructure Setup Agent
**Status**: Independent (first phase)
**Duration**: ~10 iterations
**Owner**: Infrastructure Subagent

### Responsibilities
1. Initialize monorepo with Turborepo
2. Configure Biome for linting/formatting
3. Setup TypeScript configuration
4. Create base package.json files
5. Initialize git repository

### Tools to Use
- Bash (project initialization)
- Write (config files)
- Context7 (Turborepo, Biome docs)

### Outputs
```
/turbo.json
/package.json
/biome.json
/tsconfig.json
/.gitignore
/apps/.gitkeep
/packages/.gitkeep
```

### Success Criteria
- [ ] `bun install` works without errors
- [ ] `bun run lint` works (Biome)
- [ ] TypeScript compiles without errors
- [ ] Turborepo detects all workspaces

### Completion Signal
```
INFRASTRUCTURE_DONE
```

---

## Phase 2: Design System Agent
**Status**: Depends on Phase 1
**Duration**: ~20 iterations
**Owner**: Design System Subagent

### Responsibilities
1. Research premium SaaS design patterns using Playwright
2. Create monochrom color palette (11-step hierarchy)
3. Define typography system (Geist Sans, Geist Mono)
4. Define spacing/sizing system
5. Create reusable design tokens
6. Generate Tailwind v4 configuration

### Subagents Involved
- **Playwright Research Subagent**: Screenshot premium AI sites
  - claude.ai
  - chatgpt.com
  - perplexity.ai
  - notebooklm.google.com
  - linear.app
  - vercel.com
- **Color Theory Subagent**: Analyze extracted colors, create monochrom hierarchy
- **Typography Subagent**: Define font sizes, weights, line heights

### Tools to Use
- Playwright (browser_navigate, browser_snapshot, browser_take_screenshot)
- Context7 (Tailwind v4 docs)
- Write (create config files)
- 21st.dev Magic (component inspiration)

### Outputs
```
/packages/design-system/
├── src/
│   ├── index.ts               # Main exports
│   ├── colors.ts              # Color palette + Tailwind config
│   ├── typography.ts          # Typography scale
│   ├── spacing.ts             # Spacing system
│   ├── shadows.ts             # Shadow definitions
│   ├── animations.ts          # Animation presets
│   └── components/
│       ├── Button.demo.tsx
│       ├── Card.demo.tsx
│       ├── Input.demo.tsx
│       ├── Modal.demo.tsx
│       └── ContextMenu.demo.tsx
├── tailwind.config.ts
└── package.json
```

### Color Palette (LOCKED)
```typescript
neutral: {
  0: '#FFFFFF',     // Pure white
  50: '#FAFAFA',    // Near white
  100: '#F5F5F5',   // Light gray
  200: '#E8E8E8',   // Border light
  300: '#D4D4D4',   // Border
  400: '#A3A3A3',   // Disabled text
  500: '#737373',   // Secondary text
  600: '#525252',   // Primary text light
  700: '#404040',   // Primary text
  800: '#262626',   // Dark surface
  900: '#171717',   // Near black
  950: '#0A0A0A',   // Pure black
}
```

### Success Criteria
- [ ] Colors: Monochrom with 11-step hierarchy
- [ ] Typography: H1-H4, body, bodySmall, mono all defined
- [ ] Spacing: xs-xxl (4px-64px) with generous gaps
- [ ] Tailwind config: Ready for integration
- [ ] Components: 5 examples with proper styling
- [ ] NO EMOJI ANYWHERE
- [ ] Premium SaaS aesthetic confirmed

### Completion Signal
```
DESIGN_SYSTEM_DONE
```

---

## Phase 3: Shared Types & Auth Config Agent
**Status**: Depends on Phase 1
**Duration**: ~15 iterations
**Owner**: Type Definition Subagent

### Responsibilities
1. Define all TypeScript interfaces
2. Create pricing tiers + constants (LOCKED)
3. Setup BetterAuth configuration
4. Define Convex database schemas
5. Create Zod validation schemas

### Tools to Use
- Context7 (BetterAuth docs, Convex docs, Zod docs)
- Write (type files)

### Outputs
```
/packages/types/
├── src/
│   ├── index.ts               # All interfaces + PRICING constant
│   ├── user.ts                # User types
│   ├── message.ts             # Message types
│   ├── memory.ts              # Memory types
│   ├── conversation.ts        # Conversation types
│   ├── pricing.ts             # Pricing tiers (LOCKED)
│   └── schemas.ts             # Zod schemas
└── package.json

/packages/auth/
├── src/
│   ├── index.ts               # Main exports
│   ├── config.ts              # BetterAuth setup
│   ├── providers.ts           # OAuth providers
│   └── middleware.ts          # Auth middleware
└── package.json
```

### Types to Define
```typescript
interface User {
  id: string
  email: string
  name: string
  image?: string
  tier: 'free' | 'pro' | 'max' | 'ultra'
  billingCycle: 'weekly' | 'monthly' | 'yearly'
  stripeCustomerId?: string
  polarCustomerId?: string
  createdAt: Date
  updatedAt: Date
}

interface Message {
  id: string
  userId: string
  conversationId: string
  role: 'user' | 'assistant' | 'system'
  content: string
  metadata?: Record<string, unknown>
  createdAt: Date
}

interface Memory {
  id: string
  userId: string
  embedding: number[]
  content: string
  source: 'import' | 'conversation' | 'proactive' | 'tool'
  metadata?: Record<string, unknown>
  createdAt: Date
}

interface Conversation {
  id: string
  userId: string
  title: string
  summary?: string
  messageCount: number
  lastMessageAt: Date
  createdAt: Date
  updatedAt: Date
}

interface Tool {
  id: string
  name: string
  description: string
  schema: Record<string, unknown>
  endpoint: string
  isActive: boolean
}
```

### Pricing Constants (ABSOLUTELY LOCKED - DO NOT MODIFY)
```typescript
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
} as const
```

### Success Criteria
- [ ] All interfaces defined and exported
- [ ] Pricing constants locked (no changes)
- [ ] BetterAuth config ready
- [ ] Zod schemas match interfaces
- [ ] No TypeScript errors
- [ ] Package exports work correctly

### Completion Signal
```
TYPES_AUTH_DONE
```

---

## Phase 4: UI Component Library Agent
**Status**: Depends on Phase 2 (Design System)
**Duration**: ~30 iterations
**Owner**: Component Library Subagent

### Responsibilities
1. Build reusable UI components
2. Implement custom context menu system
3. Create floating dock component
4. Integrate design tokens
5. Setup component testing

### Subagents Involved
- **Button Component Subagent**: Button variants (primary, secondary, ghost, outline)
- **Context Menu Subagent**: Custom right-click menus with submenus
- **Floating Dock Subagent**: Command palette-style dock with keyboard shortcuts
- **Modal Subagent**: Modal dialog component with animations
- **Card Subagent**: Card layout component with variants
- **Input Subagent**: Input field component with validation states
- **Dropdown Subagent**: Dropdown/select component
- **Toast Subagent**: Toast notification system

### Tools to Use
- Context7 (React 19 docs, Radix UI docs)
- 21st.dev Magic (component inspiration and building)
- Write (component files)
- Biome (lint components)

### Outputs
```
/packages/ui/
├── src/
│   ├── index.ts
│   ├── components/
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   ├── Textarea.tsx
│   │   ├── Modal.tsx
│   │   ├── Dropdown.tsx
│   │   ├── ContextMenu.tsx          # CORE
│   │   ├── FloatingDock.tsx         # CORE
│   │   ├── Toast.tsx
│   │   ├── Tooltip.tsx
│   │   ├── Avatar.tsx
│   │   ├── Badge.tsx
│   │   ├── Skeleton.tsx
│   │   └── Spinner.tsx
│   ├── hooks/
│   │   ├── useContextMenu.ts
│   │   ├── useFloatingDock.ts
│   │   ├── useKeyboardShortcut.ts
│   │   ├── useClickOutside.ts
│   │   └── useToast.ts
│   ├── providers/
│   │   ├── ContextMenuProvider.tsx
│   │   ├── ToastProvider.tsx
│   │   └── ThemeProvider.tsx
│   └── utils/
│       ├── cn.ts                    # Class name utility
│       └── portal.tsx               # Portal component
├── package.json
└── tsconfig.json
```

### Context Menu Requirements
- Right-click anywhere triggers custom menu
- Prevent default browser context menu
- Monochrom styling (no emoji)
- Supports nested submenus
- Divider support
- Disabled states
- Keyboard navigation (arrow keys)
- Click outside to close
- Escape to close
- Icons support (from huge-icons)

### Floating Dock Requirements
- **Triggers**:
  - Cmd+D / Ctrl+D: Toggle dock
  - Cmd+K / Ctrl+K: Open with search focused
- **Appearance**:
  - Floating pill-shaped dock at bottom center
  - Backdrop blur effect
  - Smooth slide-up animation
- **Commands**:
  - `N` / `New`: New chat
  - `S` / `Settings`: Open settings
  - `M` / `Memory`: Import memory
  - `T` / `Tools`: Connect tools
  - `H` / `Help`: Show help
  - Search/filter commands
- **Keyboard Navigation**:
  - Arrow up/down: Navigate
  - Enter: Execute selected
  - Escape: Close
  - Tab: Focus next
- **Appearance**:
  - Smooth animations (framer-motion)
  - Monochrom design
  - No emoji
- **Accessibility**:
  - ARIA labels
  - Focus management
  - Screen reader support

### Success Criteria
- [ ] All components render without errors
- [ ] Context menu works on right-click
- [ ] Context menu has no browser fallback
- [ ] Floating dock opens with Cmd+D
- [ ] All dock commands functional
- [ ] Keyboard navigation works
- [ ] Monochrom design throughout
- [ ] Smooth animations
- [ ] NO EMOJI ANYWHERE
- [ ] All hooks work correctly
- [ ] TypeScript types exported

### Completion Signal
```
UI_COMPONENTS_DONE
```

---

## Phase 5: Backend Architecture Agent
**Status**: Depends on Phase 3 (Types)
**Duration**: ~35 iterations
**Owner**: Backend Setup Subagent

### Responsibilities
1. Setup Bun project structure
2. Configure Hono routing with middleware
3. Setup Convex database
4. Implement authentication routes
5. Implement chat routes (streaming)
6. Implement memory routes
7. Implement payment webhooks
8. Implement MCP routing

### Subagents Involved
- **Hono Router Subagent**: Setup routing, middleware, error handling
- **Convex Schema Subagent**: Define database tables and indexes
- **Auth Routes Subagent**: Signup, login, logout, token refresh
- **Chat Routes Subagent**: Message creation, streaming, conversation management
- **Memory Routes Subagent**: Import, search, retrieval, embeddings
- **Payment Subagent**: Polar.sh integration, webhooks
- **MCP Routes Subagent**: Tool orchestration, subagent routing

### Tools to Use
- Context7 (Hono docs, Convex docs, AI SDK docs)
- Write (route files)
- Bash (test endpoints with curl)

### Outputs
```
/apps/api/
├── src/
│   ├── index.ts                    # Main Hono app
│   ├── routes/
│   │   ├── auth.ts                 # POST /api/auth/*
│   │   ├── chat.ts                 # POST /api/chat, streaming
│   │   ├── conversations.ts        # CRUD /api/conversations
│   │   ├── memory.ts               # POST /api/memory/*
│   │   ├── payment.ts              # POST /api/payment/*
│   │   ├── mcp.ts                  # POST /api/mcp/call
│   │   ├── tools.ts                # CRUD /api/tools
│   │   └── health.ts               # GET /health
│   ├── middleware/
│   │   ├── auth.ts                 # Authorization middleware
│   │   ├── cors.ts                 # CORS configuration
│   │   ├── rateLimit.ts            # Rate limiting
│   │   └── errorHandler.ts         # Error handling
│   ├── services/
│   │   ├── anthropic.ts            # Claude API client
│   │   ├── convex.ts               # Convex client
│   │   ├── embeddings.ts           # Vector embeddings
│   │   └── polar.ts                # Polar.sh client
│   └── lib/
│       ├── env.ts                  # Environment validation
│       └── logger.ts               # Logging utility
├── convex/
│   ├── schema.ts                   # Database schema
│   ├── _generated/                 # Auto-generated
│   ├── users.ts
│   ├── messages.ts
│   ├── conversations.ts
│   ├── memories.ts
│   └── tools.ts
├── package.json
├── tsconfig.json
└── .env.example
```

### Routes to Implement

**Auth Routes**
```
POST /api/auth/signup         - Create account (email/password)
POST /api/auth/login          - Authenticate
POST /api/auth/logout         - Logout (invalidate session)
POST /api/auth/refresh        - Refresh access token
GET  /api/auth/me             - Get current user
POST /api/auth/oauth/:provider - OAuth callback
```

**Chat Routes**
```
POST /api/chat                - Send message (streaming response)
POST /api/chat/regenerate     - Regenerate last response
```

**Conversation Routes**
```
GET    /api/conversations           - List user's conversations
POST   /api/conversations           - Create new conversation
GET    /api/conversations/:id       - Get conversation + messages
PATCH  /api/conversations/:id       - Update conversation (title)
DELETE /api/conversations/:id       - Delete conversation
GET    /api/conversations/:id/messages - Get messages (paginated)
```

**Memory Routes**
```
POST   /api/memory/import           - Import memory from file/text
GET    /api/memory/search           - Vector search memory
GET    /api/memory                  - List all memories
GET    /api/memory/:id              - Get specific memory
DELETE /api/memory/:id              - Delete memory entry
POST   /api/memory/embeddings       - Generate embeddings
```

**Payment Routes**
```
POST /api/payment/checkout          - Create Polar checkout session
POST /api/payment/webhook           - Polar.sh webhook handler
GET  /api/payment/subscription      - Get current subscription
POST /api/payment/cancel            - Cancel subscription
POST /api/payment/change-plan       - Change subscription plan
```

**MCP Routes**
```
POST /api/mcp/call                  - Call MCP subagent tool
GET  /api/mcp/tools                 - List available MCP tools
POST /api/mcp/connect               - Connect external MCP server
```

**Tool Routes**
```
GET    /api/tools                   - List connected tools
POST   /api/tools                   - Connect new tool
DELETE /api/tools/:id               - Disconnect tool
POST   /api/tools/:id/test          - Test tool connection
```

### Convex Schema
```typescript
// convex/schema.ts
import { defineSchema, defineTable } from "convex/server"
import { v } from "convex/values"

export default defineSchema({
  users: defineTable({
    email: v.string(),
    name: v.string(),
    image: v.optional(v.string()),
    tier: v.union(v.literal("free"), v.literal("pro"), v.literal("max"), v.literal("ultra")),
    billingCycle: v.union(v.literal("weekly"), v.literal("monthly"), v.literal("yearly")),
    polarCustomerId: v.optional(v.string()),
    passwordHash: v.optional(v.string()),
    lastLoginAt: v.optional(v.number()),
  })
    .index("by_email", ["email"])
    .index("by_polar_id", ["polarCustomerId"]),

  conversations: defineTable({
    userId: v.id("users"),
    title: v.string(),
    summary: v.optional(v.string()),
    messageCount: v.number(),
    lastMessageAt: v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_user_recent", ["userId", "lastMessageAt"]),

  messages: defineTable({
    userId: v.id("users"),
    conversationId: v.id("conversations"),
    role: v.union(v.literal("user"), v.literal("assistant"), v.literal("system")),
    content: v.string(),
    metadata: v.optional(v.any()),
  })
    .index("by_conversation", ["conversationId"])
    .index("by_user", ["userId"]),

  memories: defineTable({
    userId: v.id("users"),
    content: v.string(),
    embedding: v.array(v.float64()),
    source: v.union(
      v.literal("import"),
      v.literal("conversation"),
      v.literal("proactive"),
      v.literal("tool")
    ),
    metadata: v.optional(v.any()),
  })
    .index("by_user", ["userId"])
    .vectorIndex("by_embedding", {
      vectorField: "embedding",
      dimensions: 1536,
      filterFields: ["userId"],
    }),

  tools: defineTable({
    userId: v.id("users"),
    name: v.string(),
    description: v.string(),
    endpoint: v.string(),
    schema: v.any(),
    isActive: v.boolean(),
  })
    .index("by_user", ["userId"]),

  subscriptions: defineTable({
    userId: v.id("users"),
    polarSubscriptionId: v.string(),
    status: v.string(),
    currentPeriodEnd: v.number(),
    tier: v.string(),
    billingCycle: v.string(),
  })
    .index("by_user", ["userId"])
    .index("by_polar_id", ["polarSubscriptionId"]),
})
```

### Success Criteria
- [ ] Hono app starts on port 3001
- [ ] All routes return proper status codes
- [ ] Convex schema synced and working
- [ ] Authentication working (JWT tokens)
- [ ] Chat streaming works (SSE)
- [ ] Memory import/search works
- [ ] Payment webhook receives Polar events
- [ ] Rate limiting active
- [ ] CORS configured
- [ ] No console errors
- [ ] `.env.example` complete
- [ ] All endpoints tested with curl

### Completion Signal
```
BACKEND_DONE
```

---

## Phase 6: Frontend Architecture Agent
**Status**: Depends on Phase 2 (Design) + Phase 4 (UI)
**Duration**: ~25 iterations
**Owner**: Frontend Setup Subagent

### Responsibilities
1. Initialize Next.js 16 + React 19
2. Configure Tailwind v4 with design tokens
3. Setup component providers
4. Setup authentication layer
5. Create app structure
6. Setup API client with react-query

### Tools to Use
- Context7 (Next.js 16 docs, React 19 docs)
- Write (component files)
- Bash (project setup)

### Outputs
```
/apps/web/
├── app/
│   ├── layout.tsx                  # Root layout
│   ├── globals.css                 # Global styles
│   ├── page.tsx                    # Landing page
│   ├── (auth)/
│   │   ├── layout.tsx
│   │   ├── login/page.tsx
│   │   └── signup/page.tsx
│   ├── (dashboard)/
│   │   ├── layout.tsx              # Dashboard layout with sidebar
│   │   ├── chat/
│   │   │   ├── page.tsx            # Chat interface
│   │   │   └── [id]/page.tsx       # Specific conversation
│   │   ├── memory/
│   │   │   └── page.tsx            # Memory management
│   │   ├── tools/
│   │   │   └── page.tsx            # Tool connections
│   │   └── settings/
│   │       └── page.tsx            # User settings
│   └── pricing/
│       └── page.tsx                # Pricing page
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Sidebar.tsx
│   │   ├── Footer.tsx
│   │   └── DashboardShell.tsx
│   ├── chat/
│   │   ├── ChatInterface.tsx
│   │   ├── MessageList.tsx
│   │   ├── MessageBubble.tsx
│   │   ├── InputBar.tsx
│   │   ├── ConversationList.tsx
│   │   └── TypingIndicator.tsx
│   ├── memory/
│   │   ├── MemoryImport.tsx
│   │   ├── MemoryList.tsx
│   │   ├── MemoryCard.tsx
│   │   └── MemorySearch.tsx
│   ├── pricing/
│   │   ├── PricingSection.tsx
│   │   ├── PricingCard.tsx
│   │   └── BillingToggle.tsx
│   ├── landing/
│   │   ├── Hero.tsx
│   │   ├── Features.tsx
│   │   ├── CTA.tsx
│   │   └── Testimonials.tsx
│   └── providers/
│       ├── AuthProvider.tsx
│       ├── QueryProvider.tsx
│       └── Providers.tsx           # Combined providers
├── hooks/
│   ├── useAuth.ts
│   ├── useChat.ts
│   ├── useMemory.ts
│   ├── useConversations.ts
│   └── useSubscription.ts
├── lib/
│   ├── api.ts                      # API client
│   ├── auth.ts                     # Auth utilities
│   ├── constants.ts                # App constants
│   └── utils.ts                    # Utility functions
├── package.json
├── next.config.ts
├── tailwind.config.ts
└── tsconfig.json
```

### Success Criteria
- [ ] Next.js 16 + React 19 running on port 3000
- [ ] Tailwind v4 configured with design tokens
- [ ] All providers set up correctly
- [ ] ContextMenuProvider wraps app
- [ ] FloatingDock functional (Cmd+D opens)
- [ ] Authentication flow works
- [ ] API client configured with react-query
- [ ] No console errors
- [ ] No TypeScript errors
- [ ] Responsive design works

### Completion Signal
```
FRONTEND_ARCHITECTURE_DONE
```

---

## Phase 7: Landing Page Agent
**Status**: Depends on Phase 6 (Frontend)
**Duration**: ~20 iterations
**Owner**: Landing Page Subagent

### Responsibilities
1. Create hero section with animated gradient
2. Create features section with icons
3. Create pricing section with tier cards
4. Create CTA section
5. Create footer
6. Add scroll animations
7. Integrate Polar.sh checkout links

### Tools to Use
- 21st.dev Magic (component builder for sections)
- Context7 (Framer Motion docs)
- Write (page components)

### Components to Build
- `Hero.tsx` - Title, subtitle, CTA buttons, gradient animation
- `FeaturesSection.tsx` - Grid of 6 features with icons
- `PricingSection.tsx` - Billing toggle + 4 tier cards
- `CTASection.tsx` - Call to action with email capture
- `Footer.tsx` - Links, copyright, social icons

### Hero Content
```
Title: "Memory as Infrastructure"
Subtitle: "Build AI agents that remember everything.
          Import your knowledge, connect your tools,
          and let AI work for you."
CTA Primary: "Start Building"
CTA Secondary: "View Pricing"
```

### Features (6 items)
1. **Persistent Memory** - "Your AI remembers every conversation, every document, every insight."
2. **Tool Integration** - "Connect any API, any service. Your AI orchestrates them all."
3. **Multi-Agent** - "Specialized subagents for research, coding, writing, and more."
4. **Proactive Callbacks** - "Set rules, triggers, and schedules. AI acts on your behalf."
5. **Cross-Platform** - "Web, mobile, API. Your memory syncs everywhere."
6. **Privacy-First** - "Your data stays yours. End-to-end encryption available."

### Success Criteria
- [ ] Landing page at `/` (root)
- [ ] Hero section with gradient animation
- [ ] All 6 features displayed with icons
- [ ] All 4 pricing tiers displayed
- [ ] Billing cycle toggle works (weekly/monthly/yearly)
- [ ] Pricing numbers NEVER CHANGE (locked constants)
- [ ] Checkout links point to Polar.sh
- [ ] Footer with all links
- [ ] Responsive on mobile/tablet/desktop
- [ ] Scroll animations smooth
- [ ] Monochrom design throughout
- [ ] NO EMOJI ANYWHERE

### Completion Signal
```
LANDING_PAGE_DONE
```

---

## Phase 8: Chat Interface Agent
**Status**: Depends on Phase 6 (Frontend) + Phase 4 (UI)
**Duration**: ~30 iterations
**Owner**: Chat UI Subagent

### Responsibilities
1. Build chat message display with streaming
2. Build input bar with send/stop buttons
3. Integrate Vercel AI SDK for streaming
4. Implement context menus for messages
5. Implement context menus for conversations
6. Build conversation sidebar
7. Add typing indicator
8. Handle markdown rendering

### Subagents Involved
- **Message List Subagent**: Display messages with streaming support
- **Input Bar Subagent**: Text input + send/stop button + attachments
- **Chat Context Menu Subagent**: Copy, edit, delete, regenerate
- **Conversation Context Menu Subagent**: Rename, duplicate, archive, delete
- **Sidebar Subagent**: Conversation list with search

### Tools to Use
- Context7 (Vercel AI SDK docs)
- Write (chat components)

### Components to Build
```
/apps/web/components/chat/
├── ChatInterface.tsx           # Main chat container
├── MessageList.tsx             # Messages display (streaming)
├── MessageBubble.tsx           # Single message (user/assistant)
├── InputBar.tsx                # Input + send/stop + attachments
├── ConversationList.tsx        # Sidebar conversation list
├── ConversationItem.tsx        # Single conversation item
├── TypingIndicator.tsx         # Animation while awaiting
├── CodeBlock.tsx               # Syntax highlighted code
├── MarkdownRenderer.tsx        # Markdown to React
└── EmptyState.tsx              # No messages state
```

### Context Menu Items

**Message Context Menu**
- Copy text
- Copy as Markdown
- Edit message (user only)
- Regenerate response (assistant only)
- Delete message
- ---
- Continue from here
- Branch conversation

**Conversation Context Menu**
- Rename
- Duplicate
- Archive
- Export as JSON
- Export as Markdown
- ---
- Delete

### Keyboard Shortcuts
```
Enter          - Send message
Shift+Enter    - New line
Cmd+Enter      - Send (alternative)
Escape         - Stop generation / Close
Cmd+Shift+C    - Copy last response
Cmd+/          - Toggle sidebar
```

### Success Criteria
- [ ] Messages display correctly
- [ ] Streaming responses work (word by word)
- [ ] Stop generation button works
- [ ] Right-click on message shows context menu
- [ ] Right-click on conversation shows context menu
- [ ] Conversation sidebar shows all chats
- [ ] Search conversations works
- [ ] Code blocks have syntax highlighting
- [ ] Markdown renders correctly
- [ ] Keyboard shortcuts work
- [ ] Monochrom design
- [ ] Mobile responsive
- [ ] NO EMOJI IN UI
- [ ] Empty state shows correctly

### Completion Signal
```
CHAT_INTERFACE_DONE
```

---

## Phase 9: Memory Management Agent
**Status**: Depends on Phase 6 (Frontend) + Phase 5 (Backend)
**Duration**: ~20 iterations
**Owner**: Memory UI Subagent

### Responsibilities
1. Create memory import UI (file upload, paste text, URL)
2. Create memory list/grid view
3. Create memory search with filters
4. Add memory context menus
5. Implement memory preview/detail view

### Components to Build
```
/apps/web/components/memory/
├── MemoryImport.tsx            # File upload + paste + URL
├── MemoryList.tsx              # List/grid view toggle
├── MemoryCard.tsx              # Single memory display
├── MemoryDetail.tsx            # Full memory view
├── MemorySearch.tsx            # Search bar + filters
├── MemoryFilters.tsx           # Filter by source, date
└── ImportProgress.tsx          # Upload progress indicator
```

### Import Methods
1. **File Upload**: PDF, TXT, JSON, MD, DOCX
2. **Paste Text**: Direct text input
3. **URL Import**: Fetch content from URL
4. **API Import**: Connect to external APIs

### Memory Context Menu
- View full content
- Copy to clipboard
- Edit memory
- Re-embed (regenerate vectors)
- ---
- Delete

### Success Criteria
- [ ] File upload works (drag & drop)
- [ ] Text paste works
- [ ] URL import fetches content
- [ ] Search returns relevant results
- [ ] List/grid toggle works
- [ ] Context menus functional
- [ ] Delete removes from system
- [ ] Progress indicator shows during import
- [ ] UI is monochrom
- [ ] Mobile responsive
- [ ] NO EMOJI

### Completion Signal
```
MEMORY_INTERFACE_DONE
```

---

## Phase 10: MCP Servers Agent
**Status**: Depends on Phase 5 (Backend)
**Duration**: ~25 iterations
**Owner**: MCP Integration Subagent

### Responsibilities
1. Implement memory retriever MCP server
2. Implement tool orchestrator MCP server
3. Implement proactive callback MCP server
4. Setup MCP routing in backend
5. Create MCP client for frontend

### Subagents Involved
- **Memory Retriever Subagent**: Vector search, context injection
- **Tool Orchestrator Subagent**: Tool selection, execution
- **Proactive Callback Subagent**: Scheduled actions, triggers

### Tools to Use
- Context7 (MCP SDK docs)
- Write (server files)

### Outputs
```
/packages/mcp-servers/
├── src/
│   ├── index.ts
│   ├── memory-retriever/
│   │   ├── index.ts
│   │   ├── tools.ts
│   │   └── handlers.ts
│   ├── tool-orchestrator/
│   │   ├── index.ts
│   │   ├── tools.ts
│   │   └── handlers.ts
│   └── proactive-callback/
│       ├── index.ts
│       ├── tools.ts
│       └── scheduler.ts
├── package.json
└── tsconfig.json
```

### Memory Retriever Tools
```typescript
// search_memory - Vector search through user's memories
{
  name: "search_memory",
  description: "Search user's memory using semantic similarity",
  parameters: {
    query: { type: "string", description: "Search query" },
    limit: { type: "number", default: 5 },
    threshold: { type: "number", default: 0.7 }
  }
}

// get_memory - Get specific memory by ID
{
  name: "get_memory",
  description: "Retrieve a specific memory entry",
  parameters: {
    memoryId: { type: "string" }
  }
}

// inject_context - Add relevant memories to conversation
{
  name: "inject_context",
  description: "Automatically inject relevant memories into context",
  parameters: {
    conversationId: { type: "string" },
    maxTokens: { type: "number", default: 2000 }
  }
}
```

### Tool Orchestrator Tools
```typescript
// select_tools - AI-powered tool selection
{
  name: "select_tools",
  description: "Select appropriate tools based on user intent",
  parameters: {
    intent: { type: "string" },
    availableTools: { type: "array" }
  }
}

// execute_tool - Execute a selected tool
{
  name: "execute_tool",
  description: "Execute a tool with given parameters",
  parameters: {
    toolId: { type: "string" },
    params: { type: "object" }
  }
}
```

### Proactive Callback Tools
```typescript
// schedule_callback - Schedule an action
{
  name: "schedule_callback",
  description: "Schedule a proactive action",
  parameters: {
    userId: { type: "string" },
    trigger: {
      type: { type: "string", enum: ["cron", "event", "condition"] },
      value: { type: "string" }
    },
    action: { type: "object" }
  }
}

// check_triggers - Check if any triggers are met
{
  name: "check_triggers",
  description: "Evaluate pending triggers"
}
```

### Success Criteria
- [ ] All MCP servers compile without errors
- [ ] Memory retriever returns relevant results
- [ ] Tool orchestrator selects correct tools
- [ ] Proactive callbacks execute on schedule
- [ ] Integration with backend working
- [ ] MCP protocol compliant
- [ ] Error handling robust

### Completion Signal
```
MCP_SERVERS_DONE
```

---

## Phase 11: Settings & Profile Agent
**Status**: Depends on Phase 6 (Frontend)
**Duration**: ~15 iterations
**Owner**: Settings Subagent

### Responsibilities
1. Create settings page layout
2. Implement profile settings
3. Implement appearance settings
4. Implement subscription management
5. Implement connected tools management
6. Implement keyboard shortcuts customization

### Components to Build
```
/apps/web/components/settings/
├── SettingsLayout.tsx          # Tab-based layout
├── ProfileSettings.tsx         # Name, email, avatar
├── AppearanceSettings.tsx      # Theme (future), font size
├── SubscriptionSettings.tsx    # Current plan, upgrade/downgrade
├── ToolSettings.tsx            # Connected tools list
├── ShortcutsSettings.tsx       # Customize keyboard shortcuts
└── DangerZone.tsx              # Delete account, export data
```

### Settings Sections
1. **Profile**: Name, email, avatar, password change
2. **Appearance**: Font size, density (future: themes)
3. **Subscription**: Current plan, billing history, change plan
4. **Tools**: Connected tools, add new, remove
5. **Shortcuts**: View/customize keyboard shortcuts
6. **Data**: Export all data, delete account

### Success Criteria
- [ ] Settings page at `/settings`
- [ ] Profile updates work
- [ ] Subscription info displays
- [ ] Plan change redirects to Polar
- [ ] Tools list shows connected tools
- [ ] Shortcuts are customizable
- [ ] Export data works
- [ ] Delete account with confirmation
- [ ] Mobile responsive
- [ ] Monochrom design

### Completion Signal
```
SETTINGS_DONE
```

---

## Phase 12: Payment Integration Agent
**Status**: Depends on Phase 5 (Backend) + Phase 7 (Landing)
**Duration**: ~15 iterations
**Owner**: Payment Subagent

### Responsibilities
1. Setup Polar.sh products/prices
2. Implement checkout flow
3. Implement webhook handling
4. Update user tier on subscription events
5. Show payment status in dashboard
6. Handle plan changes

### Tools to Use
- Context7 (Polar.sh docs)
- Bash (test webhooks with curl)

### Polar.sh Setup
```
Products to Create:
- YULA Pro ($20/mo, $200/yr, $7.50/wk)
- YULA Max ($50/mo, $500/yr, $15/wk)
- YULA Ultra ($150/mo, $1500/yr, $45/wk)
```

### Webhook Events to Handle
```typescript
subscription.created    - Create subscription record
subscription.updated    - Update tier/cycle
subscription.cancelled  - Mark cancelled, keep until period end
subscription.ended      - Downgrade to free
checkout.completed      - Track conversion
```

### Success Criteria
- [ ] Polar checkout link works
- [ ] Webhook receives events
- [ ] User tier updates correctly
- [ ] Billing info displays in dashboard
- [ ] Cancel subscription works
- [ ] Plan change works
- [ ] Downgrade at period end
- [ ] No double-charging issues

### Completion Signal
```
PAYMENT_DONE
```

---

## Phase 13: Mobile Frontend Agent
**Status**: Depends on Phase 4 (UI Components)
**Duration**: ~25 iterations
**Owner**: React Native Subagent

### Responsibilities
1. Setup React Native + Expo
2. Create mobile chat interface
3. Create mobile memory interface
4. Create mobile profile page
5. Implement bottom tab navigation
6. Handle mobile-specific interactions

### Tools to Use
- Context7 (React Native docs, Expo docs)
- Write (mobile components)
- Bash (expo start)

### Outputs
```
/apps/mobile/
├── app/
│   ├── (tabs)/
│   │   ├── _layout.tsx             # Tab navigator
│   │   ├── index.tsx               # Chat tab (default)
│   │   ├── memory.tsx              # Memory tab
│   │   └── profile.tsx             # Profile tab
│   ├── (auth)/
│   │   ├── _layout.tsx
│   │   ├── login.tsx
│   │   └── signup.tsx
│   ├── conversation/
│   │   └── [id].tsx                # Specific conversation
│   └── _layout.tsx                 # Root layout
├── components/
│   ├── ChatInterface.tsx
│   ├── MessageBubble.tsx
│   ├── InputBar.tsx
│   ├── ConversationList.tsx
│   ├── MemoryList.tsx
│   └── common/
│       ├── Button.tsx
│       ├── Input.tsx
│       └── Card.tsx
├── hooks/
│   ├── useAuth.ts
│   └── useChat.ts
├── lib/
│   ├── api.ts
│   └── storage.ts                  # AsyncStorage utils
├── app.json
├── package.json
└── tsconfig.json
```

### Mobile-Specific Features
- Swipe to delete conversation
- Pull to refresh
- Haptic feedback
- Voice input (future)
- Share extension (future)

### Success Criteria
- [ ] Expo app starts without errors
- [ ] Chat tab functional
- [ ] Memory tab functional
- [ ] Profile tab functional
- [ ] Bottom tab navigation works
- [ ] Authentication works
- [ ] API client works
- [ ] Responsive to device sizes
- [ ] Keyboard avoidance works
- [ ] Smooth animations

### Completion Signal
```
MOBILE_DONE
```

---

## Phase 14: Testing Agent
**Status**: Depends on all previous phases
**Duration**: ~20 iterations
**Owner**: QA Subagent

### Responsibilities
1. Write unit tests for utilities
2. Write component tests with React Testing Library
3. Write integration tests for API
4. Write E2E tests with Playwright
5. Run all tests
6. Generate coverage report

### Tools to Use
- Playwright (E2E testing)
- Bash (run tests)
- Write (test files)

### Test Files
```
/apps/web/__tests__/
├── components/
│   ├── Button.test.tsx
│   ├── Input.test.tsx
│   ├── ContextMenu.test.tsx
│   └── FloatingDock.test.tsx
├── hooks/
│   ├── useAuth.test.ts
│   └── useChat.test.ts
└── pages/
    ├── landing.test.tsx
    └── chat.test.tsx

/apps/api/__tests__/
├── routes/
│   ├── auth.test.ts
│   ├── chat.test.ts
│   └── memory.test.ts
└── services/
    ├── anthropic.test.ts
    └── convex.test.ts

/e2e/
├── auth.spec.ts
├── chat.spec.ts
├── memory.spec.ts
└── payment.spec.ts
```

### E2E Test Scenarios
1. **Auth Flow**: Signup → Login → Logout
2. **Chat Flow**: New chat → Send message → Receive response → Delete
3. **Memory Flow**: Import → Search → Delete
4. **Payment Flow**: View pricing → Checkout (mock) → Verify tier

### Success Criteria
- [ ] All unit tests pass
- [ ] All component tests pass
- [ ] All API tests pass
- [ ] All E2E tests pass
- [ ] Coverage > 80%
- [ ] No console errors in tests
- [ ] No flaky tests

### Completion Signal
```
TESTING_DONE
```

---

## Phase 15: Documentation Agent
**Status**: Final phase
**Duration**: ~10 iterations
**Owner**: Documentation Subagent

### Responsibilities
1. Write README
2. Document API endpoints
3. Document environment variables
4. Create setup guide
5. Create deployment guide

### Documentation Files
```
/README.md                      # Project overview + quick start
/docs/
├── ARCHITECTURE.md             # System architecture
├── API.md                      # API documentation
├── DEPLOYMENT.md               # Deployment guide
├── ENVIRONMENT.md              # Environment variables
├── CONTRIBUTING.md             # Contribution guidelines
└── KEYBOARD_SHORTCUTS.md       # Keyboard shortcuts reference
```

### README Sections
1. Overview
2. Quick Start
3. Features
4. Tech Stack
5. Project Structure
6. Development
7. Deployment
8. Contributing
9. License

### Success Criteria
- [ ] README complete with all sections
- [ ] API documentation covers all endpoints
- [ ] Environment variables documented
- [ ] Setup instructions work
- [ ] Deployment guide tested
- [ ] No broken links

### Completion Signal
```
DOCUMENTATION_DONE
```

---

## Execution Order (CRITICAL)

```
┌─────────────────────────────────────┐
│ Phase 1: Infrastructure Setup       │
└────────────┬────────────────────────┘
             │
    ┌────────┴────────┐
    │                 │
    ▼                 ▼
┌─────────────┐  ┌─────────────┐
│ Phase 2:    │  │ Phase 3:    │
│ Design      │  │ Types &     │
│ System      │  │ Auth        │
└─────┬───────┘  └──────┬──────┘
      │                 │
      │    ┌────────────┤
      ▼    ▼            ▼
┌─────────────┐  ┌─────────────┐
│ Phase 4:    │  │ Phase 5:    │
│ UI          │  │ Backend     │
│ Components  │  │             │
└─────┬───────┘  └──────┬──────┘
      │                 │
      ├────────┬────────┤
      │        │        │
      ▼        ▼        ▼
┌─────────┐ ┌─────────┐ ┌─────────┐
│Phase 6: │ │Phase 10:│ │Phase 12:│
│Frontend │ │ MCP     │ │ Payment │
│Arch     │ │Servers  │ │         │
└────┬────┘ └────┬────┘ └────┬────┘
     │           │           │
     ├───────────┼───────────┤
     │           │           │
     ▼           ▼           ▼
┌─────────┐ ┌─────────┐ ┌─────────┐
│Phase 7: │ │Phase 8: │ │Phase 9: │
│Landing  │ │ Chat    │ │ Memory  │
│Page     │ │Interface│ │ Mgmt    │
└────┬────┘ └────┬────┘ └────┬────┘
     │           │           │
     └─────┬─────┴─────┬─────┘
           │           │
           ▼           ▼
     ┌─────────┐ ┌─────────┐
     │Phase 11:│ │Phase 13:│
     │Settings │ │ Mobile  │
     └────┬────┘ └────┬────┘
          │           │
          └─────┬─────┘
                │
                ▼
          ┌─────────┐
          │Phase 14:│
          │ Testing │
          └────┬────┘
               │
               ▼
          ┌─────────┐
          │Phase 15:│
          │  Docs   │
          └─────────┘
```

---

## Agent Execution Summary

| Phase | Agent | Duration | Dependencies | Output Signal |
|-------|-------|----------|--------------|---------------|
| 1 | Infrastructure | 10 | None | `INFRASTRUCTURE_DONE` |
| 2 | Design System | 20 | Phase 1 | `DESIGN_SYSTEM_DONE` |
| 3 | Types & Auth | 15 | Phase 1 | `TYPES_AUTH_DONE` |
| 4 | UI Components | 30 | Phase 2 | `UI_COMPONENTS_DONE` |
| 5 | Backend | 35 | Phase 3 | `BACKEND_DONE` |
| 6 | Frontend Arch | 25 | Phase 2, 4 | `FRONTEND_ARCHITECTURE_DONE` |
| 7 | Landing Page | 20 | Phase 6 | `LANDING_PAGE_DONE` |
| 8 | Chat Interface | 30 | Phase 6, 4 | `CHAT_INTERFACE_DONE` |
| 9 | Memory Mgmt | 20 | Phase 6, 5 | `MEMORY_INTERFACE_DONE` |
| 10 | MCP Servers | 25 | Phase 5 | `MCP_SERVERS_DONE` |
| 11 | Settings | 15 | Phase 6 | `SETTINGS_DONE` |
| 12 | Payment | 15 | Phase 5, 7 | `PAYMENT_DONE` |
| 13 | Mobile | 25 | Phase 4 | `MOBILE_DONE` |
| 14 | Testing | 20 | All | `TESTING_DONE` |
| 15 | Documentation | 10 | All | `DOCUMENTATION_DONE` |

**Total Estimated Iterations**: ~315

---

## Critical Notes

1. **NEVER SKIP PHASES**: Each phase must complete fully before dependents start
2. **NO PLACEHOLDERS**: All code must be production-ready
3. **PRICING IS LOCKED**: Do not modify pricing constants under any circumstances
4. **NO EMOJI**: Check every component, every file, no emoji anywhere
5. **MONOCHROM ONLY**: Pure grayscale, premium SaaS aesthetic
6. **USE ALL TOOLS**: Playwright, Context7, 21st.dev, Biome, MCP - use them all
7. **ITERATE UNTIL PERFECT**: Loop until zero errors, zero warnings
8. **TEST EVERYTHING**: Every feature must have corresponding tests

---

## Final Output

When ALL phases complete:

```
YULA_PRODUCTION_MVP_COMPLETE

All 15 phases completed successfully.
Zero errors. Zero warnings. Zero TODOs.
Production-ready code shipped.
```
