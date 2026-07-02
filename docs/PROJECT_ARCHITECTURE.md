# Scan Chan — Project Architecture

**Version**: 1.0  
**Last Updated**: June 29, 2026  
**Status**: Active — Mandatory Reference for All Engineering Decisions  
**Document Type**: Engineering Blueprint & Technical Architecture

---

## Table of Contents

- [1. Architecture Philosophy](#1-architecture-philosophy)
- [2. Complete Folder Structure](#2-complete-folder-structure)
- [3. Application Layers](#3-application-layers)
- [4. Route Architecture](#4-route-architecture)
- [5. Component Architecture](#5-component-architecture)
- [6. State Management](#6-state-management)
- [7. Database Architecture](#7-database-architecture)
- [8. API Architecture](#8-api-architecture)
- [9. Scan Pipeline](#9-scan-pipeline)
- [10. Feeding Pipeline](#10-feeding-pipeline)
- [11. Evolution Pipeline](#11-evolution-pipeline)
- [12. Asset Pipeline](#12-asset-pipeline)
- [13. Animation Architecture](#13-animation-architecture)
- [14. Performance Strategy](#14-performance-strategy)
- [15. Error Handling](#15-error-handling)
- [16. Offline Strategy](#16-offline-strategy)
- [17. Security Strategy](#17-security-strategy)
- [18. Logging & Analytics](#18-logging--analytics)
- [19. Testing Strategy](#19-testing-strategy)
- [20. Coding Standards](#20-coding-standards)
- [21. Scalability Roadmap](#21-scalability-roadmap)
- [22. Technical Debt Policy](#22-technical-debt-policy)
- [23. Engineering Checklist](#23-engineering-checklist)
- [24. Development Workflow](#24-development-workflow)
- [25. Engineering Principles](#25-engineering-principles)

---

## 1. Architecture Philosophy

### 1.1 Why the Architecture Exists

The architecture exists to serve one purpose: **enabling Scan Chan to be a warm, living companion for years without degrading**.

Every architectural decision must answer: *"Does this make Scan Chan better for the player in the long run?"*

Architecture is not about frameworks, patterns, or clever abstractions. It is about ensuring that when a player opens Scan Chan two years from now, the app loads instantly, their pet remembers them, every animation is smooth, and nothing feels broken.

### 1.2 Core Engineering Goals

| Goal | Definition | Measurement |
|------|-----------|-------------|
| **Correctness** | Every feature behaves exactly as the Game Design Document specifies | Zero discrepancies between docs and implementation |
| **Reliability** | The app never crashes, loses data, or enters an invalid state | Zero data loss events, zero unhandled exceptions |
| **Performance** | Every interaction feels instant and every animation feels smooth | < 100ms interaction response, 60fps animations, < 2s initial load |
| **Maintainability** | Any engineer can understand any part of the system within minutes | Consistent patterns, comprehensive documentation, clear naming |
| **Scalability** | New features integrate without refactoring existing systems | Zero breaking changes when adding features |
| **Developer Experience** | Building Scan Chan is enjoyable and productive | Fast builds, clear errors, hot reload, intuitive APIs |
| **Longevity** | The codebase remains healthy for 5+ years without rewrites | Zero "legacy" modules, consistent quality throughout |

### 1.3 Scalability Philosophy

Scan Chan is designed to grow. The architecture must accommodate:

- **Horizontal feature growth**: New game systems (furniture, mini-games, trading) must plug in without modifying core systems
- **Vertical data growth**: Database queries must remain fast as scan logs grow from hundreds to hundreds of thousands
- **Platform growth**: The web app must eventually support mobile wrappers (Capacitor/Tauri) without rewriting
- **Multiplayer growth**: The architecture must allow future real-time features without restructuring the data layer

### 1.4 Maintainability Philosophy

Maintainability is achieved through:

1. **Single Responsibility**: Every file, function, and module does exactly one thing
2. **Explicit Dependencies**: No hidden side effects, no implicit coupling between modules
3. **Convention Over Configuration**: Consistent patterns reduce cognitive load
4. **Documentation as Code**: The code itself is documentation; comments explain *why*, not *what*
5. **Type Safety**: TypeScript strict mode everywhere; no `any` types permitted
6. **Small Surface Areas**: Public APIs of modules are minimal; internals are private

### 1.5 Performance Philosophy

Performance is a feature, not an optimization.

- **Perceived performance**: Skeleton screens, optimistic updates, and instant feedback make everything *feel* fast
- **Actual performance**: Lazy loading, code splitting, image optimization, and efficient queries make everything *be* fast
- **Animation performance**: GPU-accelerated transforms only; no layout-triggering animations
- **Network performance**: Minimal payloads, caching, and prefetching reduce wait times

### 1.6 Developer Experience Philosophy

Developer experience directly impacts code quality. Happy engineers write better code.

- **Fast iteration**: Hot module replacement, instant type checking, fast test runs
- **Clear errors**: Every error message tells the engineer exactly what went wrong and how to fix it
- **Predictable behavior**: Same input always produces same output; no flaky tests, no race conditions
- **Good tooling**: Linting, formatting, and type checking catch problems before they reach production

### 1.7 Long-Term Sustainability

The codebase must remain healthy for years. This means:

- **No shortcuts**: Technical debt accumulates interest; pay the full cost now
- **Dependency discipline**: Every dependency must justify its existence; remove unused ones immediately
- **Regular maintenance**: Update dependencies, clean dead code, and refactor continuously
- **Knowledge preservation**: Every decision is documented; no knowledge lives only in one person's head

### 1.8 Forbidden Anti-Patterns

These patterns are **strictly forbidden** and must never appear in the Scan Chan codebase:

| Anti-Pattern | Why Forbidden | Alternative |
|-------------|---------------|-------------|
| **God Objects** | Single files/functions doing too many things | Split into focused modules |
| **Magic Numbers** | Hardcoded values with no explanation | Named constants in `game-config.ts` |
| **Callback Hell** | Deeply nested callbacks | Async/await with proper error handling |
| **Prop Drilling** | Passing data through 5+ component levels | Zustand stores or React Context |
| **Premature Optimization** | Optimizing before measuring | Profile first, optimize second |
| **Premature Abstraction** | Creating abstractions before patterns emerge | Wait for 3+ usages before abstracting |
| **Silent Failures** | Catching errors without handling them | Always log, always recover, always inform |
| **Mutable Shared State** | Multiple modules modifying the same object | Immutable state via Zustand |
| **Side Effects in Render** | API calls or mutations in component render | useEffect with proper cleanup |
| **Framework Coupling** | Business logic tied to React components | Pure functions in `lib/` layer |
| **Comment Rot** | Comments describing what code does (not why) | Self-documenting code + why-comments only |
| **Copy-Paste Programming** | Duplicated logic across files | Shared utilities in `lib/` |
| **SaaS Patterns** | Dashboard layouts, admin panels, CRUD tables | Cozy, warm, pet-first interfaces |
| **AI-Generated Defaults** | Generic shadcn/ui without customization | Every component customized per UI Production Guide |

---

## 2. Complete Folder Structure

### 2.1 Root Structure

```
barcode-adventure/
├── docs/                          # All project documentation (single source of truth)
├── prisma/                        # Database schema, migrations, seeds
├── public/                        # Static assets served at root
├── src/                           # Application source code
├── .env.local                     # Environment variables (never committed)
├── .env.example                   # Environment variable template
├── AGENTS.md                      # AI agent rules and mandatory references
├── next.config.ts                 # Next.js configuration
├── package.json                   # Dependencies and scripts
├── postcss.config.mjs             # PostCSS configuration
├── tsconfig.json                  # TypeScript configuration
├── eslint.config.mjs              # ESLint configuration
├── prisma.config.ts               # Prisma configuration
└── components.json                # shadcn/ui configuration
```

### 2.2 Source Code Structure (`src/`)

```
src/
├── app/                           # Next.js App Router (pages and API routes)
│   ├── (landing)/                 # Landing page route group
│   │   └── page.tsx               # Landing page
│   ├── (game)/                    # Game route group
│   │   ├── home/                  # Home Hub (pet's room)
│   │   │   └── page.tsx
│   │   ├── scan/                  # Scanner screen
│   │   │   └── page.tsx
│   │   ├── collection/            # Product collection
│   │   │   └── page.tsx
│   │   ├── missions/              # Daily missions
│   │   │   └── page.tsx
│   │   ├── achievements/          # Achievement gallery
│   │   │   └── page.tsx
│   │   ├── settings/              # Settings screen
│   │   │   └── page.tsx
│   │   └── product/               # Product detail
│   │       └── [barcode]/
│   │           └── page.tsx
│   ├── (auth)/                    # Authentication route group
│   │   ├── login/                 # Arashu login
│   │   │   └── page.tsx
│   │   └── callback/              # Auth callback
│   │       └── page.tsx
│   ├── (onboarding)/              # Onboarding route group
│   │   ├── mode/                  # Mode selection (Guest/Arashu)
│   │   │   └── page.tsx
│   │   └── setup/                 # Nickname and avatar setup
│   │       └── page.tsx
│   ├── api/                       # API routes
│   │   ├── scan/                  # Scan endpoint
│   │   │   └── route.ts
│   │   ├── products/              # Product CRUD
│   │   │   ├── route.ts           # GET (list) + POST (create)
│   │   │   └── [barcode]/
│   │   │       └── route.ts       # GET + PUT + DELETE
│   │   ├── history/               # Scan history
│   │   │   └── route.ts
│   │   ├── statistics/            # Game statistics
│   │   │   └── route.ts
│   │   ├── pet/                   # Pet state sync (Arashu Mode)
│   │   │   └── route.ts
│   │   ├── missions/              # Mission state sync (Arashu Mode)
│   │   │   └── route.ts
│   │   ├── achievements/          # Achievement sync (Arashu Mode)
│   │   │   └── route.ts
│   │   └── upload/                # Image upload
│   │       └── route.ts
│   ├── favicon.ico
│   ├── globals.css                # Global styles, CSS variables, animations
│   └── layout.tsx                 # Root layout (fonts, theme, analytics)
│
├── components/                    # React components
│   ├── ui/                        # Atomic UI primitives (shadcn-based, customized)
│   │   ├── alert.tsx
│   │   ├── badge.tsx
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   ├── select.tsx
│   │   ├── separator.tsx
│   │   ├── sonner.tsx
│   │   ├── table.tsx
│   │   └── textarea.tsx
│   │
│   ├── pet/                       # Pet rendering components
│   │   ├── pet-canvas.tsx         # Main pet rendering surface
│   │   ├── pet-sprite.tsx         # Sprite animation controller
│   │   ├── pet-reaction.tsx       # Reaction animations (feeding, petting)
│   │   ├── pet-idle.tsx           # Idle state animations
│   │   └── pet-evolution.tsx      # Evolution sequence presentation
│   │
│   ├── hud/                       # Heads-Up Display elements
│   │   ├── xp-bar.tsx             # XP progress bar
│   │   ├── pet-stats.tsx          # Five stat indicators
│   │   ├── level-badge.tsx        # Level display
│   │   ├── coin-counter.tsx       # Coin/currency display
│   │   ├── streak-badge.tsx       # Daily streak display
│   │   ├── mission-tracker.tsx    # Active mission overlay
│   │   └── notification-bell.tsx  # Notification indicator
│   │
│   ├── scanner/                   # Barcode scanning components
│   │   ├── barcode-scanner.tsx    # Camera + detection logic
│   │   ├── scan-overlay.tsx       # Viewfinder overlay
│   │   ├── scan-result.tsx        # Scan result display
│   │   └── scan-feedback.tsx      # Success/failure animations
│   │
│   ├── game/                      # Game feature components
│   │   ├── daily-missions.tsx     # Mission list + progress
│   │   ├── achievement-grid.tsx   # Achievement gallery
│   │   ├── achievement-popup.tsx  # Achievement unlock popup
│   │   ├── xp-popup.tsx           # XP gain popup
│   │   ├── evolution-modal.tsx    # Evolution sequence modal
│   │   ├── reward-modal.tsx       # Generic reward presentation
│   │   ├── product-list.tsx       # Product collection list
│   │   ├── register-product-modal.tsx # Product registration form
│   │   ├── scan-history.tsx       # Scan history timeline
│   │   ├── nickname-setup.tsx     # Onboarding nickname screen
│   │   └── game-stats.tsx         # Statistics display
│   │
│   ├── room/                      # Pet's room environment
│   │   ├── room-background.tsx    # Room background + time-of-day
│   │   ├── room-furniture.tsx     # Furniture rendering
│   │   └── room-particles.tsx     # Ambient particles
│   │
│   ├── product/                   # Product-related components
│   │   ├── product-form.tsx       # Product create/edit form
│   │   ├── product-card.tsx       # Product display card
│   │   └── webcam-capture.tsx     # Webcam photo capture
│   │
│   ├── layout/                    # Layout wrapper components
│   │   ├── game-shell.tsx         # Main game layout (HUD + content + nav)
│   │   ├── bottom-nav.tsx         # Bottom navigation bar
│   │   └── page-transition.tsx    # Page transition wrapper
│   │
│   ├── shared/                    # Shared composite components
│   │   ├── loading-screen.tsx     # Full-screen loading state
│   │   ├── error-boundary.tsx     # Error boundary wrapper
│   │   ├── empty-state.tsx        # Empty state template
│   │   └── confirm-dialog.tsx     # Confirmation dialog
│   │
│   └── pixel-cat.tsx              # Legacy pixel cat SVG component (v1)
│
├── hooks/                         # Custom React hooks
│   ├── use-debounce.ts            # Debounce utility
│   ├── use-sound.ts               # Sound effect playback
│   ├── use-pet-state.ts           # Pet state subscription
│   ├── use-time-of-day.ts         # Current time-of-day calculation
│   ├── use-daily-reset.ts         # Daily reset detection
│   ├── use-media-query.ts         # Responsive breakpoint detection
│   └── use-reduced-motion.ts      # Reduced motion preference
│
├── lib/                           # Core logic and utilities
│   ├── game-config.ts             # Game constants and configuration
│   ├── game-engine.ts             # Game logic (missions, achievements, XP)
│   ├── game-utils.ts              # Game utility helpers
│   ├── pet-engine.ts              # Pet stat decay, personality, memory
│   ├── evolution-engine.ts        # Evolution trigger and stage management
│   ├── food-engine.ts             # Food generation from scan data
│   ├── prisma.ts                  # Prisma client singleton
│   ├── utils.ts                   # General utility functions
│   ├── constants.ts               # App-wide constants
│   ├── supabase/                  # Supabase client factories
│   │   ├── client.ts              # Browser client
│   │   ├── server.ts              # Server client
│   │   └── middleware.ts          # Auth middleware
│   └── validations/               # Zod validation schemas
│       ├── product.ts
│       ├── scan.ts
│       ├── pet.ts
│       └── common.ts
│
├── stores/                        # Zustand state stores
│   ├── pet-store.ts               # Pet state (stats, personality, memory)
│   ├── game-store.ts              # Game state (XP, level, missions, achievements)
│   ├── ui-store.ts                # UI state (modals, overlays, themes)
│   ├── settings-store.ts          # Settings (sound, motion, notifications)
│   └── player-store.ts            # Legacy combined store (v1, to be split)
│
├── types/                         # TypeScript type definitions
│   ├── index.ts                   # Core types (Product, ScanLog, etc.)
│   ├── pet.ts                     # Pet-specific types
│   ├── game.ts                    # Game-specific types
│   └── api.ts                     # API request/response types
│
└── styles/                        # Additional style utilities
    └── animations.css             # Keyframe animations
```

### 2.3 Folder Responsibilities

| Folder | Responsibility | Never Place Here |
|--------|---------------|-----------------|
| `app/` | Route definitions, page composition, API endpoints | Business logic, game rules, reusable components |
| `components/ui/` | Atomic, style-only primitives with no game logic | Business logic, API calls, game state |
| `components/pet/` | Pet rendering, sprite animation, reactions | Game logic, API calls, state management |
| `components/hud/` | Ambient information display elements | Game logic, mutation triggers |
| `components/scanner/` | Camera interaction, barcode detection, scan UI | Game logic, database operations |
| `components/game/` | Feature-specific game UI | Database queries, API client code |
| `components/room/` | Pet room environment rendering | Game logic, state mutations |
| `components/layout/` | Page structure, navigation, transitions | Feature-specific UI, game logic |
| `components/shared/` | Reusable composite patterns | Feature-specific implementations |
| `hooks/` | Reusable React state/behavior abstractions | UI rendering, direct DOM manipulation |
| `lib/` | Pure functions, game logic, utilities | React components, hooks, JSX |
| `stores/` | Zustand store definitions and selectors | React components, hooks, UI logic |
| `types/` | TypeScript interfaces and type aliases | Runtime code, logic, implementations |
| `styles/` | CSS utilities and animation keyframes | Component styles (use Tailwind) |
| `prisma/` | Database schema, migrations, seeds | Application logic, validation schemas |

### 2.3.1 Sprint 1.1 Boundary Folders

Sprint 1.1 introduces explicit architecture boundary folders without implementing gameplay, scanner flow, pet behavior, persistence sync, or final UI. These folders exist to make future placement decisions unambiguous.

| Folder | Responsibility | Never Place Here |
|--------|----------------|------------------|
| `domains/` | Domain-level exports and pure boundary modules for pet, game, scanner, UI, inventory, profile, settings, and shared concerns | React components, database clients, API handlers |
| `services/` | Service interfaces that describe domain operations before implementations exist | Prisma queries, React state, route handlers |
| `repositories/` | Repository interfaces that describe persistence boundaries before implementations exist | UI code, business workflows, concrete sync logic |
| `providers/` | Provider boundary types and future provider placement | Gameplay logic, database access, concrete app shell behavior before Sprint 1.2 |
| `assets/` | Source-side asset organization boundaries for generated or imported asset modules | Public URL assets that belong in `public/` |
| `shared/` | Cross-domain shared boundary exports that are not UI components | Feature-specific domain logic |

The approved Sprint 1.1 domain set is:

- `pet`
- `game`
- `scanner`
- `ui`
- `inventory`
- `profile`
- `settings`
- `shared`

All Sprint 1.1 files in these folders must remain shells, interfaces, placeholders, or barrel exports. Implementations belong to later milestones.

### 2.3.2 Sprint 1.2 Data Foundation

Sprint 1.2 introduces the first concrete persistence boundary without implementing gameplay, scanner behavior, sync logic, UI state, or pet behavior.

The approved Sprint 1.2 data foundation is:

- One shared Prisma client factory in `src/lib/database/create-prisma-client.ts`
- One isolated Guest Prisma client in `src/lib/database/guest-prisma.ts`
- One isolated Arashu Prisma client in `src/lib/database/arashu-prisma.ts`
- One database provider selector in `src/lib/database/database-provider.ts`
- Constructor-injected Prisma repository classes under `src/repositories/`
- Prisma-generated domain model exports in `src/types/database.ts`
- Zod validation schemas in `src/lib/validations/`

Sprint 1.2 repository implementations may hold a Prisma client and expose their domain boundary. They must not implement gameplay rules, scanner pipeline behavior, sync behavior, reward calculations, XP calculations, feeding, evolution, animation, or UI state logic.

### 2.3.3 Sprint 1.5 Composition Root

Sprint 1.5 centralizes application dependency wiring without implementing gameplay, scanner behavior, sync, UI, or business rules.

The approved Sprint 1.5 composition foundation is:

- One composition root in `src/providers/composition-root.ts`
- One typed app container per selected mode
- Database provider selection through `getPrismaClient(mode)`
- Testable construction through `createAppContainerFromPrisma(mode, prisma)`
- Repository construction through `createRepositories(prisma)`
- Service construction through `createServices(repositories)`

The composition root is the single approved place to wire database providers, repositories, and services together. Future stores, API routes, server actions, background jobs, and sync engine entry points should receive dependencies from this boundary instead of constructing repositories or services ad hoc.

### 2.3.4 Sprint 1.6 Application Flow Layer

Sprint 1.6 introduces deterministic application-flow orchestration without implementing gameplay, scanner logic, feeding, evolution, rewards, synchronization, UI, or business rules.

The approved Sprint 1.6 flow foundation is:

- One flow controller factory in `src/providers/application-flows.ts`
- Typed flow contracts for startup, mode initialization, scanner, product, inventory, pet, mission, achievement, settings, and shutdown lifecycle flows
- Future event sequence definitions for scan success, scan failure, feeding, evolution, rewards, and synchronization
- Flow construction through `createApplicationFlows(services)`
- Composition through `createAppContainer(mode)`

Application flows may coordinate services only. They must not import or access Prisma clients, repositories, Zustand stores, API routes, UI components, or game engines. Future business logic belongs in documented service, game, or pipeline layers, not in the flow controller.

### 2.3.5 Sprint 1.7 Testing Foundation

Sprint 1.7 introduces the testing foundation without implementing gameplay, scanner logic, feeding, evolution, rewards, synchronization, Home Hub, animations, UI snapshots, or business rules.

The approved Sprint 1.7 testing foundation is:

- Vitest configuration in `vitest.config.ts` for unit and integration tests
- Playwright configuration in `playwright.config.ts` for future E2E tests
- Test folders under `tests/unit/`, `tests/integration/`, `tests/e2e/`, `tests/mocks/`, `tests/fixtures/`, and `tests/helpers/`
- Mock factories for Prisma, repositories, services, and store state
- Test bootstrap utilities that compose app dependencies through the existing composition root

Tests must preserve layer boundaries. Store, flow, service, and repository tests should use explicit mocks or injected dependencies instead of reaching across layers.

### 2.4 Public Assets Structure

```
public/
├── audio/                         # Sound effects
│   ├── beep.mp3                   # Scan beep
│   ├── success.mp3                # Success chime
│   ├── level-up.mp3               # Level up fanfare
│   ├── evolution.mp3              # Evolution sequence music
│   ├── purr.mp3                   # Pet purring
│   └── meow.mp3                   # Pet meow
├── sprites/                       # Pet sprite assets
│   ├── kitten/                    # Stage 1 sprites
│   ├── young-cat/                 # Stage 2 sprites
│   ├── adult-cat/                 # Stage 3 sprites
│   ├── wise-cat/                  # Stage 4 sprites
│   └── legendary-cat/             # Stage 5 sprites
├── illustrations/                 # Empty states, onboarding, etc.
├── icons/                         # Custom SVG icons
└── og-image.png                   # Open Graph social card
```

---

## 3. Application Layers

### 3.1 Layer Overview

```
┌─────────────────────────────────────────────────┐
│                 Presentation Layer               │
│   (React components, pages, hooks, styles)       │
├─────────────────────────────────────────────────┤
│                   Game Layer                     │
│   (Pet engine, game engine, evolution engine)    │
├─────────────────────────────────────────────────┤
│                  Business Layer                  │
│   (Validation, authorization, business rules)    │
├─────────────────────────────────────────────────┤
│                 Persistence Layer                │
│   (Prisma, Supabase, localStorage, IndexedDB)   │
├─────────────────────────────────────────────────┤
│               Infrastructure Layer               │
│   (Next.js, Vercel, Supabase, PostgreSQL)        │
├─────────────────────────────────────────────────┤
│                   Shared Layer                   │
│   (Types, constants, utilities, validations)     │
└─────────────────────────────────────────────────┘
```

### 3.2 Presentation Layer

**Location**: `src/app/`, `src/components/`, `src/hooks/`, `src/styles/`

**Responsibility**: Render the user interface and respond to user interaction.

**Rules**:
- Contains all React components, hooks, and page compositions
- Must never contain raw game logic; delegates to Game Layer
- Must never make direct database calls; delegates to API Layer
- All styling follows the UI Production Guide specifications
- Components are composed, not inherited
- Every component passes the UI Production Guide Component Checklist

**Communication**:
- Calls **Game Layer** for game state and logic
- Calls **Business Layer** for validation before sending data
- Receives state updates from **Zustand stores**

### 3.3 Game Layer

**Location**: `src/lib/game-engine.ts`, `src/lib/game-config.ts`, `src/lib/pet-engine.ts`, `src/lib/evolution-engine.ts`, `src/lib/food-engine.ts`

**Responsibility**: All game logic, rules, formulas, and state transitions.

**Rules**:
- Pure functions wherever possible; no side effects
- No React imports; this layer is framework-agnostic
- All constants defined in `game-config.ts`
- All formulas documented and testable
- No direct database or API access

**Communication**:
- Receives inputs from **Presentation Layer**
- Returns outputs consumed by **Presentation Layer**
- May call **Persistence Layer** for state restoration

**Sub-Engines**:

| Engine | Responsibility |
|--------|---------------|
| `game-engine.ts` | Mission generation, mission evaluation, achievement checking, XP calculations |
| `pet-engine.ts` | Stat decay, personality calculation, memory recording, mood reactions |
| `evolution-engine.ts` | Evolution threshold checking, stage transitions, evolution event data |
| `food-engine.ts` | Food generation from scan data, food-to-stat mapping, food variety |

Sprint 2.1 implements the pet foundation as pure domain logic under `src/lib/pet/`. The pet engine owns typed stat boundaries, direct stat updates, passive stat decay, lifecycle calculation, status calculation, personality signal weighting, memory normalization, and pet state normalization. Passive decay must remain non-punitive: it never drives stats to zero through absence, and affection keeps the documented permanent floor. Scanner, feeding, rewards, evolution, animation, synchronization, and UI behavior remain outside Sprint 2.1.

### 3.4 Service And Business Layer

**Location**: `src/services/`, `src/lib/validations/`, API route handlers

**Responsibility**: Service orchestration, input validation, authorization, business rule enforcement.

**Rules**:
- UI, stores, and routes communicate with repositories through services.
- Services receive repositories through dependency injection.
- Services must not import stores, Prisma clients, API routes, or other services unless a future sprint explicitly documents an orchestration need.
- Sprint 1.4 services expose typed placeholder methods only; gameplay, scanner behavior, feeding, evolution, rewards, and sync remain deferred.
- All input validated through Zod schemas before processing
- Authorization checks before any data mutation
- Business rules enforced consistently (cooldowns, limits, caps)
- Error responses are structured and informative

**Communication**:
- Receives requests from **Presentation Layer** via API routes
- Validates and delegates to **Repository/Persistence Layer**
- Returns structured responses to **Presentation Layer**

Sprint 1.4 establishes these service implementations:

- `PetService`
- `GameService`
- `ScannerService`
- `UIService`
- `InventoryService`
- `ProfileService`
- `SettingsService`
- `SharedService`

Each service is constructed with its matching repository. `createServices(repositories)` wires the service bundle without creating global repository access or service singletons.

Sprint 1.5 establishes `createAppContainer(mode)` as the application composition root. It selects the Guest or Arashu Prisma client, creates repositories, and creates services in one place. Tests may use `createAppContainerFromPrisma(mode, prisma)` to inject a replacement Prisma-compatible client. The container must remain a factory output, not a service locator; consumers receive the dependencies they need through explicit parameters or framework boundaries.

Sprint 1.6 adds application flows to the composition root. Flows sequence service calls for lifecycle and future gameplay events, but they remain deterministic placeholders until later sprints define actual gameplay, scanner, reward, and sync behavior.

Sprint 2.1 adds `PetService` methods for pet normalization, stat updates, passive decay, status calculation, personality signals, and memory creation. These methods wrap the pure pet domain engine and keep UI, stores, repositories, Prisma, scanner logic, feeding, rewards, evolution, and animations out of the pet foundation. `petUpdate` application flow now targets the pet state foundation only; future feeding and evolution sequences remain deferred.

### 3.5 Persistence Layer

**Location**: `src/lib/prisma.ts`, `src/lib/supabase/`, `prisma/schema.prisma`

**Responsibility**: All data storage, retrieval, and synchronization.

**Rules**:
- All database access through Prisma ORM
- All Supabase access through typed client factories
- Guest Mode data stored in `localStorage` (via Zustand persist)
- Arashu Mode data synced to server
- No raw SQL in application code (only in migrations)
- All date fields stored as UTC

**Communication**:
- Receives queries from **Business Layer**
- Returns typed data to **Business Layer**
- Never called directly from **Presentation Layer**

### 3.6 Infrastructure Layer

**Location**: `next.config.ts`, `package.json`, deployment configuration

**Responsibility**: Build system, deployment, hosting, CDN, analytics.

**Rules**:
- Next.js App Router for routing and server-side rendering
- Vercel for hosting and deployment
- Supabase for authentication and managed PostgreSQL
- Vercel Analytics for performance monitoring
- Environment variables for all configuration

### 3.7 Shared Layer

**Location**: `src/types/`, `src/lib/constants.ts`, `src/lib/utils.ts`, `src/lib/validations/`

**Responsibility**: Cross-cutting concerns used by all other layers.

**Rules**:
- Types are the contract between layers
- Constants are defined once, imported everywhere
- Utilities are pure functions with no side effects
- Validation schemas are shared between client and server
- No layer-specific imports in shared code

### 3.8 Layer Communication Rules

```
Presentation -> Zustand Stores -> Application Flow Layer -> Services -> Repositories -> Persistence Layer
Presentation -> API Routes -> Services -> Repositories -> Persistence Layer
Services -> Game Layer (for future pure gameplay calculations only)
Game Layer -> Shared Layer (for types, constants)
Persistence Layer -> Shared Layer (for types)
Service And Business Layer -> Shared Layer (for validations, types)
```

**Forbidden communication**:
- Persistence Layer must never call Presentation Layer
- Game Layer must never call Persistence Layer directly
- Presentation Layer must never access Persistence Layer directly
- Stores must never access repositories, Prisma, or APIs directly
- Application flows must never access repositories, Prisma, stores, API routes, or UI components directly
- Services must not mutate stores directly
- Repositories must never import stores or services
- No layer may import from a layer above it

---

## 4. Route Architecture

### 4.1 Route Map

| Route | Type | Auth | Purpose |
|-------|------|------|---------|
| `/` | Landing | None | Marketing page, introduces Scan Chan |
| `/mode` | Onboarding | None | Mode selection (Guest or Arashu) |
| `/setup` | Onboarding | Mode | Nickname and avatar selection |
| `/home` | Game | Mode | Home Hub — pet's room, primary screen |
| `/scan` | Game | Mode | Barcode scanner screen |
| `/collection` | Game | Mode | Product collection gallery |
| `/missions` | Game | Mode | Daily missions list |
| `/achievements` | Game | Mode | Achievement gallery |
| `/settings` | Game | Mode | Settings (sound, motion, account) |
| `/product/[barcode]` | Game | Mode | Product detail page |
| `/login` | Auth | None | Arashu Mode login |
| `/callback` | Auth | None | Supabase auth callback |

### 4.2 Route Groups

```
(landing)/        → Public marketing page, no game state required
(game)/           → Game screens, all require mode selection
(auth)/           → Authentication flows, no game state
(onboarding)/     → First-time setup, requires mode but not full setup
```

### 4.3 Navigation Flow

```
Landing (/)
  └─→ Mode Selection (/mode)
       ├─→ Guest Mode
       │    └─→ Setup (/setup) → Home Hub (/home)
       └─→ Arashu Mode
            └─→ Login (/login) → Home Hub (/home)

Home Hub (/home) ←→ Scanner (/scan)
Home Hub (/home) ←→ Collection (/collection)
Home Hub (/home) ←→ Missions (/missions)
Home Hub (/home) ←→ Achievements (/achievements)
Home Hub (/home) ←→ Settings (/settings)
Home Hub (/home) → Product Detail (/product/[barcode])
```

### 4.4 Protected Routes

All `(game)/` routes require:
1. A valid mode (`GameMode.GUEST` or `GameMode.ARASHU`) stored in player state
2. For Arashu Mode: a valid Supabase session
3. Completed onboarding (nickname set)

**Protection mechanism**:
- Client-side redirect to `/mode` if no mode is selected
- Client-side redirect to `/setup` if nickname is not set (Guest Mode)
- Client-side redirect to `/login` if Supabase session is invalid (Arashu Mode)

### 4.5 Route Transition Rules

| Transition | Animation | Duration |
|-----------|-----------|----------|
| Landing → Mode | Fade + slide up | 400ms |
| Mode → Setup | Crossfade | 300ms |
| Setup → Home | Slide up + reveal | 500ms |
| Home → Scanner | Zoom in (camera feel) | 400ms |
| Scanner → Home | Zoom out + settle | 500ms |
| Home → Tab screens | Slide in from right | 300ms |
| Tab screens → Home | Slide out to right | 250ms |
| Any → Product | Push up (sheet feel) | 350ms |
| Product → Back | Pull down | 300ms |

### 4.6 Future Routes

| Route | Purpose | Timeline |
|-------|---------|----------|
| `/room` | Dedicated room customization | Post-launch |
| `/furniture` | Furniture shop/collection | Post-launch |
| `/mini-games` | Mini-game selection | 6-month |
| `/friends` | Social features | 12-month |
| `/events` | Seasonal events | 6-month |
| `/memories` | Memory cinema / scrapbook | 6-month |

---

## 5. Component Architecture

### 5.1 Atomic Structure

Components follow an atomic design hierarchy:

```
Atoms          → ui/button.tsx, ui/badge.tsx, ui/input.tsx
Molecules      → hud/xp-bar.tsx, hud/level-badge.tsx, hud/pet-stats.tsx
Organisms      → components/pet/pet-canvas.tsx, components/scanner/barcode-scanner.tsx
Templates      → components/layout/game-shell.tsx, components/layout/bottom-nav.tsx
Pages          → app/(game)/home/page.tsx, app/(game)/scan/page.tsx
```

### 5.2 Component Categories

#### UI Components (`components/ui/`)

Atomic primitives. No game logic. Fully reusable. All customized per UI Production Guide.

- `button.tsx` — Primary, secondary, ghost, icon, FAB variants
- `card.tsx` — Container with radius, shadow, padding
- `badge.tsx` — Status indicators, level badges, category tags
- `dialog.tsx` — Modal overlays
- `input.tsx` — Text inputs with validation states
- `select.tsx` — Dropdown selectors
- `alert.tsx` — Informational messages
- `separator.tsx` — Visual dividers

#### Pet Components (`components/pet/`)

Everything related to rendering and animating the pet.

- `pet-canvas.tsx` — Main pet rendering surface (sprite or SVG-based)
- `pet-sprite.tsx` — Sprite sheet animation controller
- `pet-reaction.tsx` — Reaction animations when fed, petted, etc.
- `pet-idle.tsx` — Idle state loops (breathing, blinking, tail swish)
- `pet-evolution.tsx` — Full evolution sequence presentation

#### HUD Components (`components/hud/`)

Ambient information overlays. Never interactive (except tap-to-expand).

- `xp-bar.tsx` — Current XP progress to next level
- `pet-stats.tsx` — Five stat bars (Hunger, Mood, Energy, Affection, Curiosity)
- `level-badge.tsx` — Current level display
- `streak-badge.tsx` — Daily streak counter
- `mission-tracker.tsx` — Active mission progress overlay
- `notification-bell.tsx` — Notification indicator

#### Scanner Components (`components/scanner/`)

Camera interaction and barcode detection.

- `barcode-scanner.tsx` — Camera initialization, detection loop, result callback
- `scan-overlay.tsx` — Viewfinder frame, corner brackets, laser line
- `scan-result.tsx` — Product found/not-found display
- `scan-feedback.tsx` — Success/failure animation sequence

#### Game Components (`components/game/`)

Feature-specific game UI. Each maps to a game system.

- `daily-missions.tsx` — Mission list, progress bars, completion states
- `achievement-grid.tsx` — Achievement gallery with locked/unlocked states
- `achievement-popup.tsx` — Achievement unlock celebration
- `xp-popup.tsx` — XP gain floating number
- `evolution-modal.tsx` — Evolution sequence presentation
- `reward-modal.tsx` — Generic reward presentation template
- `product-list.tsx` — Product collection with search and filters
- `register-product-modal.tsx` — New product registration form
- `scan-history.tsx` — Scan history timeline
- `nickname-setup.tsx` — Onboarding nickname and avatar selection
- `game-stats.tsx` — Statistics display

#### Room Components (`components/room/`)

Pet's room environment.

- `room-background.tsx` — Room background with time-of-day lighting
- `room-furniture.tsx` — Furniture item rendering and placement
- `room-particles.tsx` — Ambient particle system (dust, sparkles, leaves)

#### Layout Components (`components/layout/`)

Page structure and navigation.

- `game-shell.tsx` — Main game layout wrapper (HUD + content area + bottom nav)
- `bottom-nav.tsx` — Bottom navigation bar (Home, Scan, Collection, More)
- `page-transition.tsx` — Page transition animation wrapper

#### Shared Components (`components/shared/`)

Reusable composite patterns.

- `loading-screen.tsx` — Full-screen loading with pet animation
- `error-boundary.tsx` — React error boundary with recovery UI
- `empty-state.tsx` — Empty state template (illustration + message + action)
- `confirm-dialog.tsx` — Confirmation dialog template

### 5.3 Component Rules

1. **Every component has a single responsibility** — one component, one job
2. **Props are typed explicitly** — no `any`, no spreading `...rest` without typed interfaces
3. **Components are composable** — small components compose into larger ones
4. **Styling follows UI Production Guide** — tokens, spacing, radius, shadows from design system
5. **No side effects in render** — all effects in `useEffect` with proper cleanup
6. **Event handlers are memoized** — `useCallback` for handlers passed to children
7. **Derived state is computed, not stored** — use `useMemo` for expensive computations
8. **Every interactive element has accessible labels** — `aria-label` on all buttons
9. **Animation uses GPU-accelerated properties only** — `transform`, `opacity`, not `width`, `top`
10. **Every component has a loading state, empty state, and error state** where applicable

### 5.4 Reusable Rules

- **Never duplicate a component** — if you need it in two places, it belongs in `shared/` or `ui/`
- **Never inline game logic in components** — call a function from `lib/`
- **Never hardcode colors** — use CSS variables or Tailwind theme tokens
- **Never hardcode text** — all user-facing strings are constants or i18n-ready
- **Never skip prop types** — every prop has a TypeScript type
- **Never bypass the design system** — every visual property comes from UI Production Guide

---

## 6. State Management

### 6.1 State Architecture Overview

```
┌──────────────────────────────────────────┐
│              Zustand Stores              │
├──────────┬──────────┬──────────┬─────────┤
│ Pet      │ Game     │ UI       │ Settings│
│ Store    │ Store    │ Store    │ Store   │
├──────────┴──────────┴──────────┴─────────┤
│           Persistence Layer              │
├──────────────┬───────────────────────────┤
│ localStorage │ Supabase (Arashu Mode)    │
│ (Guest Mode) │ Server-synced             │
└──────────────┴───────────────────────────┘
```

Sprint 1.3 expands the foundation to eight independent Zustand stores:

- `usePetStore`
- `useGameStore`
- `useUIStore`
- `useScannerStore`
- `useInventoryStore`
- `useProfileStore`
- `useSettingsStore`
- `useSharedStore`

Stores do not import each other, call repositories, call Prisma, or call APIs. Cross-store orchestration belongs in services in later sprints.

### 6.2 Store Definitions

#### Pet Store (`stores/pet-store.ts`)

Manages all pet-specific state.

```typescript
interface PetState {
  name: string;
  stage: EvolutionStage;          // 'kitten' | 'young' | 'adult' | 'wise' | 'legendary'
  hunger: number;                 // 0-100
  mood: number;                   // 0-100
  energy: number;                 // 0-100
  affection: number;              // 0-100
  curiosity: number;              // 0-100
  personality: PetPersonalityState; // Emergent from care patterns
  memories: PetMemory[];          // Emotional moments recorded
  lifecycle: PetLifecycleState;    // awake | resting | sleeping | greeting
  status: PetStatus;              // Derived display state
  lastDecayTimestamp: number;     // When stats were last decayed
  accessories: string[];          // Equipped accessories
  furniture: string[];            // Placed furniture items
}
```

**Persistence**: `localStorage` (Guest), Supabase sync (Arashu)  
**Update frequency**: Every stat change, every 5 minutes for decay

Sprint 2.1 store actions may call pure pet-domain functions to keep persisted state normalized, but the store must not access repositories, Prisma, APIs, or other stores. Cross-store orchestration and persistence synchronization remain future service/flow responsibilities.

#### Game Store (`stores/game-store.ts`)

Manages all progression state.

```typescript
interface GameState {
  xp: number;
  level: number;
  streak: number;
  lastActiveDate: string;
  registeredBarcodes: string[];
  scanHistory: string[];
  dailyMissions: MissionProgress[];
  unlockedAchievements: string[];
  pendingXpGain: number;
  pendingAchievementUnlocks: string[];
  lastScanTime: Record<string, number>;
  lastRegisterTime: number;
}
```

**Persistence**: `localStorage` (Guest), Supabase sync (Arashu)  
**Update frequency**: Every scan, every register, daily reset

#### UI Store (`stores/ui-store.ts`)

Manages ephemeral UI state. Not persisted.

```typescript
interface UIState {
  activeModal: ModalType | null;
  activeSheet: SheetType | null;
  toastQueue: Toast[];
  isLoading: boolean;
  isScanning: boolean;
  showEvolutionSequence: boolean;
  activeTab: TabType;
}
```

**Persistence**: None (reset on page refresh)  
**Update frequency**: Every UI interaction

#### Settings Store (`stores/settings-store.ts`)

Manages user preferences.

```typescript
interface SettingsState {
  soundEnabled: boolean;
  musicEnabled: boolean;
  reducedMotion: boolean;
  notificationsEnabled: boolean;
  hapticFeedback: boolean;
  theme: 'light' | 'warm' | 'dark';
  language: string;
}
```

**Persistence**: `localStorage`  
**Update frequency**: User changes settings

#### Scanner Store (`stores/scanner-store.ts`)

Manages scanner UI/session state only. It does not implement camera access, barcode parsing, scan pipeline behavior, product lookup, reward logic, or persistence.

**Persistence**: None  
**Update frequency**: Scanner screen interactions

#### Inventory Store (`stores/inventory-store.ts`)

Manages inventory selection and placeholder item state. It does not implement item generation, feeding, rewards, product conversion, or persistence.

**Persistence**: None in Sprint 1.3  
**Update frequency**: Inventory screen interactions

#### Profile Store (`stores/profile-store.ts`)

Manages current profile identity placeholders and selected mode. It does not authenticate, sync, or access Guest/Arashu repositories.

**Persistence**: None in Sprint 1.3  
**Update frequency**: Onboarding/profile interactions

#### Shared Store (`stores/shared-store.ts`)

Manages shared loading, error, and offline flags that are not owned by a narrower domain store.

**Persistence**: None  
**Update frequency**: App-level loading/error state changes

### 6.3 Persistence Strategy

| Mode | Store | Storage | Sync |
|------|-------|---------|------|
| Guest | Pet | `localStorage` | None |
| Guest | Game | `localStorage` | None |
| Guest | UI | None | None |
| Guest | Scanner | None | None |
| Guest | Inventory | None in Sprint 1.3 | None |
| Guest | Profile | None in Sprint 1.3 | None |
| Guest | Settings | `localStorage` | None |
| Guest | Shared | None | None |
| Arashu | Pet | `localStorage`; Supabase in Sprint 6 | Future sync |
| Arashu | Game | `localStorage`; Supabase in Sprint 6 | Future sync |
| Arashu | UI | None | None |
| Arashu | Scanner | None | None |
| Arashu | Inventory | None in Sprint 1.3 | None |
| Arashu | Profile | None in Sprint 1.3 | None |
| Arashu | Settings | `localStorage`; Supabase in Sprint 6 | Future sync |
| Arashu | Shared | None | None |

### 6.4 Migration Strategy

Zustand persist middleware includes version-based migration:

```typescript
persist(
  (set, get) => ({ /* store */ }),
  {
    name: 'scan-chan-pet-state',
    version: 1,
    migrate: (persistedState: unknown, version: number) => {
      if (version === 0) {
        // Migration from v0 to v1
        return { ...persistedState, newField: defaultValue };
      }
      return persistedState;
    },
  }
);
```

**Rules**:
- Every store schema change increments the version number
- Migration functions handle every previous version
- Failed migration resets to initial state with user notification
- Migration functions are tested before deployment

### 6.5 Hydration Rules

1. **On app load**: All persisted stores hydrate from `localStorage` synchronously
2. **On mode selection**: Sprint 1.3 switches store persistence keys for mode-specific persisted stores; server fetch and sync remain future work
3. **On daily reset**: Game store checks date, resets missions, updates streak
4. **On stat decay**: Pet store applies time-based decay since last timestamp
5. **On conflict** (Arashu Mode): Server state takes precedence; client reconciles

### 6.6 Future Multiplayer Store

When multiplayer features are added:

```typescript
interface MultiplayerStore {
  connectedPlayers: string[];
  pendingGifts: Gift[];
  petVisits: PetVisit[];
  leaderboard: LeaderboardEntry[];
}
```

This store would be real-time synced via Supabase Realtime or WebSocket.

---

## 7. Database Architecture

### 7.1 Dual Database Philosophy

Guest Mode and Arashu Mode use **completely separate databases** that share a schema but never share data.

```
┌────────────────────────────────┐
│         Guest Database         │
│   Public, shared by all guests │
│   Products, ScanLogs, etc.     │
└────────────────────────────────┘

┌────────────────────────────────┐
│        Arashu Database         │
│   Private, one player only     │
│   Separate Products, ScanLogs  │
└────────────────────────────────┘
```

### 7.2 Why Complete Separation

1. **Privacy**: Arashu's data is never mixed with public data
2. **Exclusivity**: Arashu Mode feels special and personal
3. **Flexibility**: Developer can experiment with Arashu without affecting public
4. **Security**: A breach in one database does not affect the other
5. **Performance**: Each database can be optimized independently
6. **Emotional**: Arashu Mode is a love letter, not a feature

### 7.3 Entity Relationships

```
┌─────────────┐     ┌─────────────┐
│   Product    │────<│   ScanLog   │
│              │     │              │
│ id (UUID)    │     │ id (UUID)    │
│ barcodeNumber│     │ barcodeNumber│
│ productName  │     │ productId    │
│ brand        │     │ deviceType   │
│ category     │     │ scannedAt    │
│ description  │     └─────────────┘
│ imageUrl     │
│ creatorId    │     ┌─────────────┐
│ createdAt    │     │ Achievement │
│ updatedAt    │     │              │
└─────────────┘     │ id (UUID)    │
                    │ title        │
                    │ description  │
                    │ badgeImage   │
                    └─────────────┘
```

### 7.4 Target Schema (v2.0)

The current schema is expanded for the virtual pet experience through the Sprint 1.2 data foundation:

```
User                        → id, mode, nickname, avatar, createdAt, updatedAt
Pet                         → id, userId, name, stage, mood, createdAt, updatedAt
PetStats                    → id, petId, hunger, mood, energy, affection, curiosity, updatedAt
Inventory                   → id, userId, createdAt, updatedAt
InventoryItem               → id, inventoryId, type, itemKey, quantity, metadata, createdAt, updatedAt
Product                     → barcode catalog extended with foodValue, rarity, petReaction
ScanHistory                 → scan record mapped to the legacy scan_logs table during migration
Mission                     → id, userId, templateId, progress, target, status, xpReward, date
Achievement                 → id, userId, title, category, threshold, xpReward, unlockedAt
Progress                    → id, userId, xp, level, streak, lastActiveDate
Settings                    → id, userId, sound, music, motion, theme
SyncMetadata                → id, userId, lastSyncedAt, version, source
```

Guest Mode and Arashu Mode use the same schema through separate Prisma clients and separate database URLs. No table, repository, service, or API may use a mode flag as a substitute for physical database separation.

### 7.5 Indexes

| Table | Index | Type | Purpose |
|-------|-------|------|---------|
| Product | `barcodeNumber` | Unique | Barcode lookup (primary query path) |
| Product | `category` | B-tree | Category filtering |
| Product | `createdAt` | B-tree | Chronological ordering |
| ScanHistory | `barcodeNumber` | B-tree | Scan history per product |
| ScanHistory | `scannedAt` | B-tree | Chronological ordering |
| ScanHistory | `userId` | B-tree | Scan history per user |
| User | `mode + nickname` | Unique | User lookup |
| Pet | `userId` | Unique | Pet per user |
| PetStats | `petId` | Unique | One stat record per pet |
| Inventory | `userId` | Unique | Inventory per user |
| InventoryItem | `inventoryId + type + itemKey` | Unique | Item stack lookup |
| Mission | `userId + templateId + date` | Unique | Daily mission lookup |

### 7.6 Future Migrations

Migration strategy:
1. **Never drop columns** — deprecate with nullable, then remove in next major version
2. **Add columns as nullable** — then backfill, then add NOT NULL constraint
3. **Rename in two steps** — add new column, migrate data, drop old column
4. **Always have rollback** — every migration has a down migration
5. **Test migrations** — run on copy of production data before deploying

### 7.7 Scalability

- **Read replicas**: Add read replicas for heavy query workloads (statistics, trends)
- **Connection pooling**: Use PgBouncer or Supabase connection pooler
- **Query optimization**: All queries use indexes; no full table scans
- **Pagination**: All list endpoints paginate; no unbounded queries
- **Archival**: Old scan logs archived to cold storage after 2 years

---

## 8. API Architecture

### 8.1 Folder Organization

```
src/app/api/
├── scan/
│   └── route.ts              # POST — record scan, lookup product
├── products/
│   ├── route.ts              # GET — list products, POST — create product
│   └── [barcode]/
│       └── route.ts          # GET — single product, PUT — update, DELETE — remove
├── history/
│   └── route.ts              # GET — paginated scan history
├── statistics/
│   └── route.ts              # GET — aggregate statistics
├── pet/
│   └── route.ts              # GET/PUT — pet state sync (Arashu Mode)
├── missions/
│   └── route.ts              # GET/PUT — mission state sync (Arashu Mode)
├── achievements/
│   └── route.ts              # GET — unlocked achievements (Arashu Mode)
└── upload/
    └── route.ts              # POST — image upload to Supabase Storage
```

### 8.2 Naming Conventions

| Convention | Rule | Example |
|-----------|------|---------|
| **Endpoints** | Lowercase, plural nouns | `/api/products`, `/api/achievements` |
| **Dynamic segments** | Square brackets, singular | `/api/products/[barcode]` |
| **HTTP methods** | Standard REST semantics | GET (read), POST (create), PUT (update), DELETE (remove) |
| **Query params** | camelCase | `?search=snack&category=Drink&page=2` |
| **Request bodies** | camelCase JSON | `{ "barcodeNumber": "123", "productName": "Cola" }` |
| **Response bodies** | camelCase JSON wrapped in `ApiResponse<T>` | `{ "success": true, "data": { ... } }` |

### 8.3 Versioning

Current version: No explicit version prefix (v1 implicit).

Future versioning strategy:
- Prefix routes with `/api/v2/` when breaking changes are introduced
- Old routes remain functional for 6 months after deprecation
- Version migrations documented in CHANGELOG.md
- Client code uses a centralized API client, making version changes trivial

### 8.4 Validation

All request bodies validated through Zod schemas before processing:

```typescript
// 1. Define schema in src/lib/validations/
export const scanRequestSchema = z.object({
  barcodeNumber: z.string().min(1).max(20),
  deviceType: z.string().max(100).optional(),
});

// 2. Validate in route handler
const parsed = scanRequestSchema.safeParse(body);
if (!parsed.success) {
  return NextResponse.json(
    { success: false, error: parsed.error.issues[0].message },
    { status: 400 }
  );
}
```

**Rules**:
- Every endpoint validates its input — no exceptions
- Validation schemas live in `src/lib/validations/`
- Client and server share the same schemas
- Validation errors return 400 with specific field-level messages

### 8.5 Authentication

| Mode | Auth | Mechanism |
|------|------|-----------|
| Guest | None | Creator ID header for ownership |
| Arashu | Supabase Auth | JWT token in Authorization header |

**Arashu Mode authentication flow**:
1. User logs in via Supabase Auth (email/password or OAuth)
2. Supabase returns JWT access token
3. Client includes token in API requests
4. Server validates token via `createServerClient()`
5. Server extracts `userId` from token for authorization

### 8.6 Authorization

| Action | Guest | Arashu |
|--------|-------|--------|
| Scan any product | Allowed | Allowed |
| Register product | Creator ID ownership | User ID ownership |
| Edit product | Creator ID match | User ID match |
| Delete product | Creator ID match | User ID match |
| View statistics | Global | Personal |
| Sync pet state | Not applicable | User ID scoped |

**Authorization rules**:
- Creator ID (`x-creator-id` header) for Guest Mode ownership
- Supabase JWT for Arashu Mode ownership
- Never trust client-side claims; always verify server-side
- Authorization failures return 403

### 8.7 Error Responses

All errors follow a consistent format:

```typescript
// Standard error response
{
  success: false,
  error: "Human-readable error message",
  code?: "ERROR_CODE",          // Machine-readable code for client handling
  details?: Record<string, string>  // Field-level validation errors
}
```

**Status code conventions**:

| Status | Meaning | When |
|--------|---------|------|
| 200 | Success | GET, PUT, DELETE |
| 201 | Created | POST (new resource) |
| 400 | Bad Request | Validation failure |
| 401 | Unauthorized | Missing/invalid auth |
| 403 | Forbidden | Authenticated but not authorized |
| 404 | Not Found | Resource doesn't exist |
| 409 | Conflict | Duplicate resource |
| 429 | Too Many Requests | Rate limited |
| 500 | Internal Server Error | Unexpected server error |

### 8.8 Response Format

All successful responses:

```typescript
// Single resource
{ success: true, data: Resource }

// List with pagination
{ success: true, data: Resource[], total: number, page: number, limit: number, totalPages: number }

// Mutation confirmation
{ success: true, message: "Resource updated successfully" }
```

### 8.9 Logging

Every API route logs:
- **Method and path**: `[POST /api/scan]`
- **Errors**: Full error with stack trace in development, sanitized in production
- **Slow queries**: Any database query exceeding 500ms
- **Rate limits**: When a request is rate-limited

```typescript
console.error('[POST /api/scan]', error);  // Error logging
console.warn('[GET /api/products] Slow query: 723ms');  // Performance warning
```

---

## 9. Scan Pipeline

### 9.1 Complete Lifecycle

```
Camera → Detection → Validation → Database Lookup → Registration/New → 
XP Reward → Food Reward → Animation → Home Return → Saving
```

### 9.2 Step-by-Step

#### Step 1: Camera Initialization
- Request camera permission
- Initialize `react-zxing` or native camera API
- Display scanner overlay with viewfinder frame
- Show idle pet animation on scan screen

#### Step 2: Barcode Detection
- Continuous frame analysis via `react-zxing`
- Detect barcode pattern (EAN-13, EAN-8, UPC-A, Code 128)
- Extract barcode string
- Play detection beep sound

#### Step 3: Validation
- Check barcode is not empty
- Check barcode length (1-20 characters)
- Check barcode format (alphanumeric + hyphens)
- Check cooldown (same barcode scanned within 15 seconds)
- If validation fails: show error overlay, return to scanning

#### Step 4: Database Lookup
- Send POST request to `/api/scan` with `{ barcodeNumber, deviceType }`
- Server looks up product in database by `barcodeNumber`
- Server creates `ScanLog` entry
- Server returns `{ found: boolean, product: Product | null, scanLog: ScanLog }`

#### Step 5: Result Handling
- **Product Found**: Show product card with name, brand, category, image
- **Product Not Found**: Show "New Discovery!" prompt with "Register" button

#### Step 6: XP Reward
- Calculate XP: `isNewProduct ? 25 : 10`
- Evaluate daily missions for scan action
- Check achievements for scan milestones
- Add mission XP + base XP to total
- Update player store with new XP, level, missions, achievements
- Trigger XP popup animation
- Trigger achievement popup if any unlocked

#### Step 7: Food Reward (v2.0)
- Generate food item from product category
- Map food to stat restoration values
- Queue food item for feeding animation

#### Step 8: Animation (v2.0)
- Transition from scan screen to Home Hub
- Play feeding animation (pet receives food)
- Play pet reaction (happy, eating, satisfied)
- Update pet stat bars visually
- Play particle effects

#### Step 9: Home Return
- Navigate back to Home Hub
- Pet displays updated stats
- HUD shows updated XP, level, missions
- If product was new: show "Added to Collection" toast

#### Step 10: Saving
- Guest Mode: Zustand auto-persists to `localStorage`
- Arashu Mode: Zustand triggers sync to Supabase
- Scan log already saved server-side during Step 4

---

## 10. Feeding Pipeline

### 10.1 Overview (v2.0)

Everything that happens after a successful scan that feeds the pet.

### 10.2 Food Generation

```typescript
// src/lib/food-engine.ts
interface FoodItem {
  id: string;
  name: string;
  emoji: string;
  category: FoodCategory;
  hungerRestore: number;    // 15-30
  moodRestore: number;      // 5-15
  energyRestore: number;    // 0-10
  curiosityRestore: number; // 0-20
  rarity: 'common' | 'uncommon' | 'rare' | 'legendary';
}
```

**Generation rules**:
- Product category determines food type (Drink → beverage, Snack → treat)
- Product rarity affects food rarity
- New products generate rarer food
- Food variety is encouraged (same category produces different food items)

### 10.3 Pet Reaction

Pet reaction is determined by current stats and food type:

| Condition | Reaction | Animation |
|-----------|----------|-----------|
| Hunger < 30 | Very hungry, eats eagerly | `eating_fast` |
| Hunger 30-70 | Normal appetite | `eating_normal` |
| Hunger > 70 | Full, eats politely | `eating_slow` |
| Mood < 30 | Distracted but eats | `eating_sad` |
| Mood > 70 | Happy and enthusiastic | `eating_happy` |
| New food type | Curious and excited | `curious_inspect` → `eating_curious` |
| Favorite food | Pure joy | `eating_favorite` + sparkle particles |

### 10.4 Stat Update

After feeding:
```
hunger = clamp(hunger + food.hungerRestore, 0, 100)
mood = clamp(mood + food.moodRestore, 0, 100)
energy = clamp(energy + food.energyRestore, 0, 100)
curiosity = clamp(curiosity + food.curiosityRestore, 0, 100)
affection = clamp(affection + 5, 0, 100)  // Every scan increases affection
```

### 10.5 Mission Update

After feeding:
1. Evaluate all active daily missions against the scan action
2. Check category-specific missions (e.g., "Scan a Drink" matches Drink food)
3. Update mission progress counters
4. If any mission completes: award mission XP, mark as complete, show celebration

### 10.6 Achievement Update

After feeding:
1. Check total scan count against scan milestones
2. Check total registered products against registration milestones
3. Check current level against level milestones
4. Check current streak against streak milestones
5. If any achievement unlocks: add to unlocked list, show celebration popup

### 10.7 Animation Sequence

```
1. Scan success → transition to Home Hub (400ms)
2. Food item appears above pet (200ms fade in)
3. Pet looks at food (200ms)
4. Pet eats food (600ms eating animation)
5. Pet shows satisfaction (400ms reaction)
6. Stat bars update with smooth animation (300ms)
7. XP number floats up (500ms)
8. Particles burst (300ms)
Total: ~2.5 seconds
```

### 10.8 Persistence

After all updates:
1. Pet store saves new stat values
2. Game store saves new XP, level, missions, achievements
3. Guest Mode: `localStorage` auto-persist
4. Arashu Mode: debounced sync to Supabase (1-second delay to batch changes)

---

## 11. Evolution Pipeline

### 11.1 XP Thresholds

| Stage | Level Range | Cumulative XP (approx) |
|-------|------------|----------------------|
| Kitten | 1-5 | 0 - 1,100 |
| Young Cat | 6-15 | 1,100 - 9,350 |
| Adult Cat | 16-35 | 9,350 - 66,350 |
| Wise Cat | 36-60 | 66,350 - 341,350 |
| Legendary Cat | 61-100 | 341,350 - 1,091,350 |

**Level formula**: `xpForLevel(level) = (level - 1) * 150 + 100`

### 11.2 Evolution Trigger

Evolution is triggered when the player's level crosses a stage boundary:

```typescript
// src/lib/evolution-engine.ts
function checkEvolution(oldLevel: number, newLevel: number): EvolutionStage | null {
  const stageBoundaries = [5, 15, 35, 60];
  for (const boundary of stageBoundaries) {
    if (oldLevel <= boundary && newLevel > boundary) {
      return getNextStage(currentStage);
    }
  }
  return null;
}
```

### 11.3 Evolution Animation Sequence

```
1. Pet senses change → confused/curious animation (1s)
2. Glow builds around pet (1.5s)
3. Screen dims slightly, focus on pet (0.5s)
4. Flash of light — pet transforms (0.5s)
5. New pet revealed with sparkle particles (2s)
6. New pet idle animation with celebration (1.5s)
Total: ~7 seconds
```

### 11.4 State Update

After evolution:
1. `pet.stage` updated to new evolution stage
2. Pet sprite set changes to new stage assets
3. Room background may update (new furniture unlocked)
4. HUD reflects new stage name
5. Achievement may unlock (evolution milestone)
6. Memory entry created: "Evolved into [stage]!"

### 11.5 Persistence

Evolution is saved immediately:
1. Pet store persists new stage
2. Game store persists new level
3. Memory entry created
4. Arashu Mode: immediate sync (not debounced)

### 11.6 Future Scalability

The evolution engine supports:
- **Custom evolution paths**: Branching evolutions based on personality
- **Special evolutions**: Seasonal or event-based evolutions
- **Visual variations**: Different appearances within the same stage
- **Post-legendary content**: Level 100+ prestige system

---

## 12. Asset Pipeline

### 12.1 Asset Types

| Type | Format | Location | Usage |
|------|--------|----------|-------|
| **Pixel sprites** | PNG (transparent) | `public/sprites/` | Pet animations |
| **SVG icons** | Inline SVG or `.svg` files | `src/components/` | UI icons |
| **Audio** | MP3 (compressed) | `public/audio/` | Sound effects |
| **Particles** | CSS or Canvas | Runtime | Ambient effects |
| **Illustrations** | PNG/WebP | `public/illustrations/` | Empty states, onboarding |
| **Fonts** | Google Fonts (CDN) | `next/font` | Fredoka + Nunito |
| **Product images** | Supabase Storage | CDN URL | User-uploaded product photos |

### 12.2 Pixel Asset Pipeline

```
1. Design in Aseprite (48×48 base grid)
2. Export as PNG at 1x resolution
3. Place in public/sprites/[stage]/[animation]/
4. Sprite sheet generated from individual frames
5. Sprite component loads sheet and animates via frame stepping
6. CSS `image-rendering: pixelated` for crisp upscaling
```

**Rules**:
- All pixel art drawn on 48×48 grid (per Mascot Production Guide)
- Export at 1x, upscale at render time (2x, 3x, 4x)
- No anti-aliasing on pixel art
- Consistent palette across all sprites
- Clean pixels only (no stray pixels, no anti-aliased edges)

### 12.3 SVG Asset Pipeline

```
1. Design in Figma or Illustrator
2. Export as optimized SVG
3. Either inline as React component (small icons) or place in public/icons/
4. Optimize: remove metadata, minimize paths, consistent viewBox
5. Use currentColor for fill/stroke to support theming
```

### 12.4 Audio Pipeline

```
1. Design in Audacity or similar
2. Export as MP3 (128kbps for effects, 192kbps for music)
3. Place in public/audio/
4. Use useSound hook for playback
5. Compress: effects < 50KB, music < 500KB
```

**Rules**:
- Sound effects: short, non-looping, < 2 seconds
- Background music: looping, gentle, < 2 minutes
- All audio respects user's sound settings
- Audio preloaded on first interaction to avoid delay

### 12.5 Image Optimization

- **Next.js Image component** for all product images and illustrations
- **Responsive images**: `sizes` attribute for responsive loading
- **Lazy loading**: Below-fold images use `loading="lazy"`
- **Blur placeholders**: Low-quality image placeholders during load
- **WebP format**: Prefer WebP for illustrations (smaller file size)
- **CDN delivery**: All images served through Supabase CDN or Next.js Image Optimization

### 12.6 Loading Strategy

| Asset | Loading | Priority |
|-------|---------|----------|
| Fonts | `next/font` (preload) | Critical |
| Pet sprites (current stage) | Preloaded on Home Hub | High |
| UI icons (current page) | Loaded with page | High |
| Audio effects | Lazy loaded on first interaction | Medium |
| Product images | Lazy loaded per viewport | Medium |
| Illustrations | Lazy loaded when needed | Low |
| Pet sprites (other stages) | Loaded on evolution | Low |

### 12.7 Caching Strategy

| Asset | Cache | Duration |
|-------|-------|----------|
| Static assets (sprites, audio) | Browser cache | 1 year (immutable) |
| Product images | CDN cache | 30 days |
| API responses | No cache | Fresh every request |
| Fonts | CDN + browser | 1 year |

---

## 13. Animation Architecture

### 13.1 Animation Organization

```
animations/
├── pet/                    # Pet-specific animations
│   ├── idle/               # Breathing, blinking, tail swish
│   ├── reactions/          # Eating, happy, sad, curious, sleepy
│   ├── evolution/          # Evolution sequence
│   └── interactions/       # Petting, feeding, playing
├── ui/                     # UI element animations
│   ├── transitions/        # Page transitions, modal open/close
│   ├── feedback/           # Button press, XP popup, toast
│   └── loading/            # Skeleton shimmer, spinner, progress
├── particles/              # Particle system animations
│   ├── sparkles/           # Achievement, level up, evolution
│   ├── hearts/             # Affection increase
│   ├── food/               # Feeding particles
│   └── ambient/            # Dust motes, leaves, stars
└── room/                   # Room environment animations
    ├── time-of-day/        # Lighting transitions
    └── furniture/          # Furniture placement, interaction
```

### 13.2 Animation State Machine

The pet animation system uses a priority-based state machine:

```
Priority (highest to lowest):
1. Evolution      — Cannot be interrupted
2. Feeding        — Cannot be interrupted during eating
3. Reaction       — Can be interrupted by higher priority
4. Interaction    — Can be interrupted by reactions
5. Idle Loop      — Default state, always returns here
```

**State transitions**:
```
Idle → [trigger] → Animation → [complete] → Idle
Idle → [scan detected] → Feeding → [eating done] → Reaction → Idle
Idle → [level threshold] → Evolution → [complete] → New Idle (new stage)
Idle → [pet interaction] → Interaction → [done] → Idle
```

### 13.3 Priority Rules

| Event | Priority | Interrupts | Interrupted By |
|-------|----------|-----------|---------------|
| Evolution sequence | 1 (highest) | Nothing | Nothing |
| Feeding animation | 2 | Idle, Interaction | Nothing until eating phase complete |
| Reaction animation | 3 | Idle | Feeding, Evolution |
| Interaction (petting) | 4 | Idle | Feeding, Reaction, Evolution |
| Idle loop | 5 (lowest) | Nothing | Everything |

### 13.4 Interrupt Rules

1. **Evolution**: Never interrupted. Queue all other animations.
2. **Feeding**: Play to completion of eating phase. Reaction phase can be interrupted by new feeding.
3. **Reactions**: Play for minimum 500ms before allowing interruption.
4. **Interactions**: Can be interrupted immediately by higher priority.
5. **Idle**: Always resumes when no higher-priority animation is playing.

### 13.5 Queue System

When multiple animations are triggered simultaneously:

```typescript
interface AnimationQueue {
  current: AnimationState | null;
  pending: AnimationState[];
  
  enqueue(animation: AnimationState): void;
  dequeue(): AnimationState | undefined;
  interrupt(animation: AnimationState): void;
}
```

**Queue rules**:
- Higher priority animations jump the queue
- Same priority animations play in order
- Queued animations are discarded if they become irrelevant (e.g., old reaction when new one queued)
- Maximum queue size: 5 animations

### 13.6 Performance Rules

1. **GPU acceleration only**: Use `transform` and `opacity` — never `width`, `height`, `top`, `left`
2. **CSS animations for simple loops**: Idle breathing, floating particles
3. **GSAP for complex sequences**: Evolution, feeding, page transitions
4. **Framer Motion for React transitions**: Page changes, modal open/close
5. **requestAnimationFrame for custom**: Particle systems, sprite stepping
6. **Will-change sparingly**: Only during active animation, removed after
7. **Reduced motion support**: All animations respect `prefers-reduced-motion`
8. **60fps target**: All animations must maintain 60fps on mid-range devices

### 13.7 Animation Timing Table

| Animation | Duration | Easing | Loop |
|-----------|----------|--------|------|
| Idle breathing | 3000ms | ease-in-out | Yes |
| Idle blinking | 200ms | ease-out | Random interval |
| Tail swish | 1500ms | ease-in-out | Yes (slow) |
| Eating | 600ms | ease-out | 3 frames |
| Happy bounce | 400ms | spring(300, 15) | No |
| Sad droop | 500ms | ease-in | No |
| Curious tilt | 300ms | ease-out | No |
| Evolution glow | 1500ms | ease-in | No |
| Evolution flash | 500ms | ease-out | No |
| Page slide in | 300ms | ease-out | No |
| Page slide out | 250ms | ease-in | No |
| Modal open | 350ms | spring(400, 25) | No |
| Modal close | 250ms | ease-in | No |
| XP popup | 1500ms | ease-out-up | No |
| Achievement popup | 4000ms | spring + fade | No |
| Toast appear | 300ms | spring(300, 20) | No |
| Button press | 100ms | ease-out | No |
| Hover scale | 150ms | ease-out | No |

---

## 14. Performance Strategy

### 14.1 Rendering Performance

**Rules**:
- All animations use `transform` and `opacity` only — never layout-triggering properties
- `will-change` applied only during active animation, removed immediately after
- Virtual DOM reconciliation minimized through `React.memo`, `useMemo`, `useCallback`
- Pet canvas renders via `<canvas>` or optimized sprite `<img>` — not DOM nodes per frame
- Particle systems use `<canvas>` or CSS-only (no React re-renders per particle)
- Complex lists use virtualization (no more than 50 DOM items at once)

**Targets**:
| Metric | Target | Measurement |
|--------|--------|-------------|
| First Contentful Paint | < 1.2s | Lighthouse |
| Largest Contentful Paint | < 2.0s | Lighthouse |
| Time to Interactive | < 2.5s | Lighthouse |
| Cumulative Layout Shift | < 0.05 | Lighthouse |
| Animation frame rate | 60fps | Chrome DevTools Performance |
| Interaction response | < 100ms | User-perceived |

### 14.2 Image Optimization

- **Next.js `<Image>`** for all product images and illustrations
- **`image-rendering: pixelated`** for all pixel art sprites
- **Responsive `sizes`** attribute on all images
- **Lazy loading** for below-fold images (`loading="lazy"`)
- **Blur placeholders** using `placeholder="blur"` with tiny base64 previews
- **WebP format** for illustrations (30% smaller than PNG)
- **Sprite sheets** for pet animations (one HTTP request per animation set)
- **Maximum image sizes**: product photos < 200KB, illustrations < 100KB, sprites < 50KB per sheet

### 14.3 Asset Loading Strategy

| Phase | Assets | Strategy |
|-------|--------|----------|
| Critical | Fonts, globals.css, root layout | Next.js preloads automatically |
| Above-fold | Current page components | Static import (bundled) |
| Below-fold | Tab content, modals | `dynamic(() => import())` |
| On-demand | Audio, other-stage sprites | Loaded when first needed |
| Prefetch | Next likely page | `<Link prefetch>` (Next.js default) |

### 14.4 Lazy Loading

Components loaded lazily with `next/dynamic`:
- All modals (evolution, achievement, reward, settings)
- Statistics display (requires API call)
- Scan history (requires API call)
- Product list with images
- Barcode scanner (camera initialization)
- Particle systems

### 14.5 Memoization Rules

| Technique | When | Example |
|-----------|------|----------|
| `React.memo` | Pure components receiving props | `PetSprite`, `ProductCard`, `Badge` |
| `useMemo` | Expensive computations | Level calculation, mission progress, sorted lists |
| `useCallback` | Event handlers passed to children | `handleScan`, `handleFeed`, `handleRegister` |
| Zustand selectors | Narrow subscriptions | `usePetStore(state => state.hunger)` not `usePetStore()` |

**Rules**:
- Never memoize prematurely — measure first
- Always use narrow Zustand selectors to prevent unnecessary re-renders
- Memoize derived data that requires loops or sorting

### 14.6 Bundle Splitting

Next.js automatically splits bundles per route. Additional manual splitting:

```typescript
const BarcodeScanner = dynamic(() => import('@/components/scanner/barcode-scanner'), {
  loading: () => <LoadingScreen />,
  ssr: false,  // Camera not available server-side
});

const EvolutionModal = dynamic(() => import('@/components/game/evolution-modal'), {
  loading: null,
});
```

### 14.7 Caching Strategy

| Resource | Cache Type | Duration |
|----------|-----------|----------|
| Static assets | Browser + CDN | 1 year (content-hashed filenames) |
| Product images | CDN | 30 days |
| API responses | None | Always fresh |
| Zustand state | `localStorage` | Until cleared or migrated |
| Fonts | Browser + Google CDN | 1 year |

---

## 15. Error Handling

### 15.1 Client Errors

| Error Type | Handling | User Experience |
|-----------|---------|----------------|
| Component crash | Error boundary catches, shows recovery UI | Warm message with retry button |
| Network failure | Offline detection, queued requests | "You're offline" banner, retry when back |
| Invalid state | Store validation, reset to safe state | Automatic recovery, silent |
| Camera permission denied | Fallback to manual barcode input | "Enter barcode manually" prompt |
| JavaScript error | Global error handler, logged to console | Toast notification if user-facing |

### 15.2 Server Errors

| Error Type | Handling | Response |
|-----------|---------|----------|
| Database connection failure | Retry 3x with exponential backoff | 503 Service Unavailable |
| Query timeout | Abort after 10s, return error | 504 Gateway Timeout |
| Invalid input | Zod validation rejects | 400 Bad Request with field errors |
| Unauthorized access | Auth middleware rejects | 401 Unauthorized |
| Rate limit exceeded | Rate limiter rejects | 429 Too Many Requests |
| Unexpected error | Try/catch, logged, generic message | 500 Internal Server Error |

### 15.3 API Error Pattern

Every API route wraps its logic in try/catch:

```typescript
export async function GET(request: NextRequest) {
  try {
    // ... business logic
  } catch (error) {
    console.error('[GET /api/route]', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

### 15.4 Scanner Error Handling

| Error | Cause | Recovery |
|-------|-------|----------|
| Camera not available | Permission denied or no camera | Manual barcode input fallback |
| Detection timeout | No barcode found in 30s | "Try again" prompt with tips |
| Invalid barcode | Malformed data | "Invalid barcode" toast, continue scanning |
| Network failure | API call failed | Queue scan, retry when online |
| Duplicate scan | Same barcode within cooldown | Cooldown message with timer |

### 15.5 Offline Error Handling

When offline:
1. Show persistent "You're offline" banner
2. Queue scans in `localStorage`
3. Disable features requiring server (product registration, statistics)
4. Allow features using local state (pet stats, missions, achievements)
5. Auto-retry queued operations when connection restored

### 15.6 Recovery Strategy

**Three-tier recovery**:
1. **Automatic**: Transient errors retry silently (network blips, timeouts)
2. **User-assisted**: Persistent errors show recovery UI (retry button, manual input)
3. **Graceful degradation**: Unrecoverable errors disable feature, keep app functional

---

## 16. Offline Strategy

### 16.1 Cached Data

When offline, the following data is available from local state:
- Pet state (stats, personality, memories)
- Game state (XP, level, missions, achievements)
- Settings (sound, motion, theme)
- Recent scan history (last 50 entries)
- Registered products list

### 16.2 Guest Mode Offline

Guest Mode is inherently offline-first:
- All state stored in `localStorage`
- No server dependency for gameplay
- API calls (product lookup, registration) fail gracefully
- Manual barcode input available as fallback

### 16.3 Pending Scans

When offline, scans are queued:

```typescript
interface PendingScan {
  barcodeNumber: string;
  deviceType: string;
  timestamp: number;
  mode: GameMode;
}
```

**Queue behavior**:
- Stored in `localStorage` as `scan-chan-pending-scans`
- Maximum queue size: 100 scans
- Oldest scans dropped when queue is full
- Queue processed FIFO when connection restored
- Each scan sent to `/api/scan` endpoint
- Failed scans remain in queue for retry

### 16.4 Conflict Resolution

When syncing queued scans after offline period:
1. **Products already registered**: Skip registration, still log scan
2. **Duplicate barcodes**: Server handles deduplication (returns existing product)
3. **Stale missions**: Missions may have reset; scan still counts toward new missions
4. **Level changes**: XP from queued scans may trigger level-up; play evolution if needed

### 16.5 Synchronization (Arashu Mode)

Arashu Mode sync strategy:
1. **On change**: Debounced sync (1-second delay, batches changes)
2. **On reconnect**: Full state reconciliation with server
3. **On conflict**: Server state wins (server is source of truth)
4. **On error**: Retry with exponential backoff (1s, 2s, 4s, 8s, max 30s)
5. **On failure**: Notify user, offer manual sync button

---

## 17. Security Strategy

### 17.1 Input Validation

- All user input validated through Zod schemas before processing
- Barcode strings restricted to alphanumeric + hyphens, max 20 characters
- Product names restricted to 255 characters, HTML stripped
- URLs validated as proper URLs only
- File uploads restricted to images only (JPEG, PNG, WebP), max 5MB

### 17.2 Input Sanitization

- No raw HTML rendering (React default escaping prevents XSS)
- Product descriptions rendered as text, not HTML
- Image URLs validated before use in `<Image>` component
- No `dangerouslySetInnerHTML` anywhere in the codebase

### 17.3 Security Headers

Configured via Next.js middleware or `next.config.ts`:

| Header | Value | Purpose |
|--------|-------|----------|
| `X-Content-Type-Options` | `nosniff` | Prevent MIME sniffing |
| `X-Frame-Options` | `DENY` | Prevent clickjacking |
| `X-XSS-Protection` | `1; mode=block` | Legacy XSS protection |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | Control referrer info |
| `Permissions-Policy` | `camera=(self)` | Restrict API access |
| `Content-Security-Policy` | Configured for Supabase + Google Fonts | Prevent XSS |

### 17.4 Rate Limiting

| Endpoint | Limit | Window |
|----------|-------|--------|
| `/api/scan` | 60 requests | Per minute per IP |
| `/api/products` (POST) | 20 requests | Per minute per IP |
| `/api/products` (GET) | 120 requests | Per minute per IP |
| `/api/upload` | 10 requests | Per minute per IP |
| All other endpoints | 100 requests | Per minute per IP |

Implementation: Vercel rate limiting or custom middleware.

### 17.5 Authentication Security

- Supabase Auth handles all authentication
- JWT tokens expire after 1 hour
- Refresh tokens rotate on each use
- Passwords hashed with bcrypt (Supabase managed)
- No passwords stored in application code
- No sensitive data in JWT claims

### 17.6 Authorization Security

- Creator ID verified server-side for Guest Mode ownership
- Supabase user ID verified server-side for Arashu Mode
- Row-level security (RLS) enabled on Arashu database tables
- Never trust client-provided user IDs
- Every mutation checks ownership before executing

### 17.7 Secrets Management

| Secret | Storage | Access |
|--------|---------|--------|
| `DATABASE_URL` | `.env.local` | Server only |
| `NEXT_PUBLIC_SUPABASE_URL` | `.env.local` | Client + server |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `.env.local` | Client + server |
| `SUPABASE_SERVICE_ROLE_KEY` | `.env.local` | Server only (never expose) |

**Rules**:
- `.env.local` is never committed to git
- `.env.example` documents required variables (no values)
- Server-only secrets accessed only in API routes and server components
- No secrets in client-side code
- Secrets rotated on any suspected compromise

### 17.8 Future Security Improvements

- Web Application Firewall (WAF) rules
- DDoS protection via Vercel
- Content Security Policy tightening
- Automated dependency vulnerability scanning
- Security headers audit on every deployment
- Penetration testing before v2.0 launch

---

## 18. Logging & Analytics

### 18.1 Debug Logging (Development)

- `console.log` for development debugging only
- All debug logs prefixed with module name: `[PetEngine]`, `[GameEngine]`, `[Scanner]`
- Debug logs removed in production builds (Next.js strips `console.log`)
- `console.warn` for recoverable issues
- `console.error` for errors requiring attention

### 18.2 Production Logging

- `console.error` preserved in production for error tracking
- API route errors logged with method, path, and sanitized error message
- No user data in logs (no barcodes, no nicknames, no pet names)
- Server errors include request ID for debugging

### 18.3 Crash Reporting

- Unhandled exceptions caught by React error boundaries
- API errors logged to console (captured by Vercel logs)
- Future: Integrate Sentry for comprehensive error tracking

### 18.4 Performance Metrics

Vercel Analytics tracks:
- Web Vitals (FCP, LCP, CLS, TTI, FID)
- Page load times per route
- API response times
- Error rates

Custom metrics (future):
- Scanner initialization time
- Barcode detection time
- Animation frame rate drops
- Store hydration time

### 18.5 Gameplay Analytics (Future)

Privacy-respecting gameplay metrics:
- Average session duration
- Scans per session
- Most scanned categories
- Evolution timing distribution
- Mission completion rates
- Achievement unlock rates
- Return rate after absence

### 18.6 Privacy Rules

- **No PII collected**: No names, emails, or locations stored in analytics
- **No tracking cookies**: Analytics uses privacy-friendly methods
- **Guest Mode is anonymous**: No user identification possible
- **Arashu Mode is private**: Data never leaves the private database
- **Opt-out**: Users can disable analytics in settings
- **GDPR-ready**: No data retention beyond what is necessary

---

## 19. Testing Strategy

### 19.1 Test Pyramid

```
        /\
       /  \      E2E Tests (5%)
      /----\     Critical user flows
     /      \
    /--------\   Integration Tests (25%)
   /          \  API routes, store interactions
  /------------\
 /              \ Unit Tests (70%)
/----------------\ Game logic, utilities, validations
```

### 19.2 Unit Tests

**Scope**: Pure functions, game logic, validation schemas, utility functions

**Location**: `tests/unit/` during Sprint 1 foundation; adjacent `*.test.ts` files may be introduced later when feature modules need local tests.

**Coverage targets**:
- `game-engine.ts` — 100% (mission evaluation, achievement checking, XP math)
- `game-config.ts` — 100% (all constants verified)
- `pet-engine.ts` — 100% (stat decay, personality calculation)
- `evolution-engine.ts` — 100% (threshold checking)
- `food-engine.ts` — 100% (food generation)
- `validations/` — 100% (all schema paths)
- `utils.ts` — 90%+ (all utility functions)

**Framework**: Vitest (fast, TypeScript-native)

### 19.3 Integration Tests

**Scope**: API routes, store interactions, component + store integration

**Examples**:
- POST `/api/scan` with valid barcode returns product + scan log
- POST `/api/scan` with invalid barcode returns 400
- `recordScan` action updates XP, missions, achievements correctly
- Daily reset generates new missions and updates streak
- Arashu Mode sync persists state to server

**Framework**: Vitest + Supertest (for API routes)

### 19.4 Component Tests

**Scope**: React component rendering, user interactions, accessibility

**Examples**:
- Button renders with correct variant styles
- XP popup appears when `pendingXpGain > 0`
- Achievement popup displays correct achievement data
- Scanner overlay renders viewfinder frame
- Empty state shows illustration and action button

**Framework**: Vitest + React Testing Library

### 19.5 End-to-End Tests

**Scope**: Critical user flows from start to finish

**Critical flows**:
1. **First-time setup**: Landing to Mode to Setup to Home Hub
2. **Scan flow**: Home to Scanner to Scan to Result to Return Home
3. **Product registration**: Scan unknown to Register to Verify in collection
4. **Mission completion**: Scan products to Mission progress to Mission complete
5. **Level up**: Accumulate XP to Level up to Verify HUD update
6. **Daily reset**: Change date to Verify new missions to Verify streak

**Framework**: Playwright

### 19.6 Visual Regression Testing (Future)

- Screenshot comparison for key screens
- Component visual snapshots
- Animation frame captures
- Responsive breakpoint verification

### 19.7 Accessibility Testing

- Automated: `jest-axe` for component accessibility
- Manual: Keyboard navigation audit (Tab, Enter, Escape, Arrow keys)
- Manual: Screen reader testing (NVDA, VoiceOver)
- Automated: Lighthouse accessibility audit on every deploy
- Manual: Color contrast verification against UI Production Guide specs

### 19.8 Performance Testing

- Lighthouse performance score > 90 on every deploy
- Bundle size monitoring (alert if main bundle > 200KB gzipped)
- Animation frame rate testing (maintain 60fps on mid-range device)
- API response time monitoring (< 500ms p95)

### 19.9 Manual QA Checklist

Before every release:

- [ ] First-time onboarding flow works
- [ ] Guest Mode preserves state across refresh
- [ ] Arashu Mode login/logout works
- [ ] Scanner detects barcodes reliably
- [ ] Manual barcode input works as fallback
- [ ] XP calculation matches formula
- [ ] Level progression matches config
- [ ] Daily missions reset correctly
- [ ] Achievements unlock at correct thresholds
- [ ] Pet stats decay over time
- [ ] Pet stats restore on feeding
- [ ] Animations play at 60fps
- [ ] Sound effects play correctly
- [ ] Reduced motion mode disables animations
- [ ] All touch targets are 44x44px minimum
- [ ] Color contrast meets WCAG AA

### 19.10 Sprint 1.7 Test Foundation

Sprint 1.7 establishes these commands:

- `npm run test`
- `npm run test:unit`
- `npm run test:integration`
- `npm run test:e2e`

The first foundation test verifies dependency-injected app containers and deterministic flow controllers only. Feature tests for gameplay, scanner behavior, feeding, evolution, rewards, synchronization, Home Hub, animations, and UI snapshots belong to later sprints.
- [ ] No console errors in production
- [ ] Offline mode works gracefully
- [ ] All API endpoints return correct status codes
- [ ] Error boundaries catch component crashes

---

## 20. Coding Standards

### 20.1 Naming Conventions

| Element | Convention | Example |
|---------|-----------|----------|
| **Files (components)** | kebab-case | `pet-canvas.tsx`, `xp-bar.tsx` |
| **Files (utilities)** | kebab-case | `game-engine.ts`, `utils.ts` |
| **Files (stores)** | kebab-case | `pet-store.ts`, `game-store.ts` |
| **Files (types)** | kebab-case or `index.ts` | `pet.ts`, `index.ts` |
| **Components** | PascalCase | `PetCanvas`, `XpBar` |
| **Functions** | camelCase | `calculateXp`, `generateFood` |
| **Variables** | camelCase | `petState`, `scanHistory` |
| **Constants** | SCREAMING_SNAKE_CASE | `GAME_CONFIG`, `EVOLUTION_STAGES` |
| **Types/Interfaces** | PascalCase | `PetState`, `MissionProgress` |
| **Enums** | PascalCase | `GameMode`, `EvolutionStage` |
| **CSS classes** | Tailwind utilities | `bg-honey text-white rounded-2xl` |
| **CSS variables** | kebab-case | `--color-honey`, `--radius-lg` |

### 20.2 Folder Conventions

- `app/` follows Next.js App Router conventions (route groups, dynamic segments)
- `components/` organized by domain (pet, hud, scanner, game, room, layout, shared, ui)
- `lib/` contains only pure logic — no React imports
- `stores/` contains only Zustand store definitions
- `types/` contains only TypeScript type definitions
- `hooks/` contains only custom React hooks

### 20.3 Component Conventions

```typescript
// 1. Imports (ordered: React, Next.js, external libs, internal modules)
import { useState, useCallback } from 'react';
import { motion } from 'motion/react';
import { usePetStore } from '@/stores/pet-store';
import { cn } from '@/lib/utils';

// 2. Type definitions (component-specific)
interface PetCanvasProps {
  stage: EvolutionStage;
  size: 'small' | 'medium' | 'large';
  interactive?: boolean;
}

// 3. Component definition
export function PetCanvas({ stage, size, interactive = true }: PetCanvasProps) {
  // 4. Hooks first
  const hunger = usePetStore((state) => state.hunger);
  const [isAnimating, setIsAnimating] = useState(false);

  // 5. Derived state
  const spriteSet = SPRITE_SETS[stage];
  const scale = SIZE_MAP[size];

  // 6. Event handlers
  const handleClick = useCallback(() => {
    if (!interactive || isAnimating) return;
    // ...
  }, [interactive, isAnimating]);

  // 7. Render
  return (
    <div className={cn('relative', sizeClasses[size])}>
      {/* JSX */}
    </div>
  );
}
```

### 20.4 Hook Conventions

- Prefix with `use` (React requirement)
- Return typed objects or tuples
- Document purpose in JSDoc comment
- Keep hooks small and focused

```typescript
/**
 * Tracks the current time of day for room lighting.
 * Updates every minute.
 */
export function useTimeOfDay(): TimeOfDay {
  const [timeOfDay, setTimeOfDay] = useState<TimeOfDay>(getTimeOfDay());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeOfDay(getTimeOfDay());
    }, 60_000);
    return () => clearInterval(interval);
  }, []);

  return timeOfDay;
}
```

### 20.5 Store Conventions

- One store per domain (pet, game, ui, settings)
- Narrow selectors to prevent unnecessary re-renders
- Actions defined as part of the store (not external functions)
- Persistence configured via Zustand middleware
- Migration functions documented and tested

```typescript
// Good: narrow selector
const hunger = usePetStore((state) => state.hunger);

// Bad: subscribes to entire store
const petState = usePetStore();
```

### 20.6 API Route Conventions

```typescript
// Every API route follows this template:
export async function GET(request: NextRequest) {
  try {
    // 1. Parse and validate input
    // 2. Authorization check
    // 3. Business logic
    // 4. Return typed response
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('[GET /api/route]', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

### 20.7 File Naming

| Type | Pattern | Example |
|------|---------|----------|
| React component | `component-name.tsx` | `pet-canvas.tsx` |
| Page | `page.tsx` | `app/(game)/home/page.tsx` |
| API route | `route.ts` | `app/api/scan/route.ts` |
| Hook | `use-hook-name.ts` | `use-time-of-day.ts` |
| Store | `domain-store.ts` | `pet-store.ts` |
| Utility | `utility-name.ts` | `game-engine.ts` |
| Type | `domain.ts` | `pet.ts` |
| Validation | `domain.ts` | `validations/product.ts` |
| Test | `name.test.ts` | `game-engine.test.ts` |

### 20.8 Import Ordering

```typescript
// 1. React
import { useState, useEffect, useCallback } from 'react';

// 2. Next.js
import { useRouter } from 'next/navigation';
import Image from 'next/image';

// 3. External libraries
import { motion } from 'motion/react';
import { toast } from 'sonner';
import { Sparkles } from 'lucide-react';

// 4. Internal modules (aliased with @/)
import { usePetStore } from '@/stores/pet-store';
import { calculateXp } from '@/lib/game-engine';
import { cn } from '@/lib/utils';
import type { PetState } from '@/types/pet';
```

### 20.9 Comment Philosophy

**Write comments that explain *why*, never *what*.**

```typescript
// BAD: This adds 1 to the counter
setCount(count + 1);

// GOOD: Streak increments only when exactly 1 day has passed;
// gaps of 2+ days reset to 1 to avoid punishing casual players
// (see PLAYER_EXPERIENCE_DOCUMENT.md Section 7 -- no guilt mechanics)
if (diffDays === 1) {
  nextStreak += 1;
} else if (diffDays > 1) {
  nextStreak = 1;
}
```

**Rules**:
- Every module has a JSDoc comment explaining its purpose
- Every exported function has a JSDoc comment explaining its behavior
- Complex algorithms have step-by-step comments
- Magic numbers replaced with named constants
- TODO comments include author and date: `// TODO(alice, 2026-07): Implement furniture placement`

---

## 21. Scalability Roadmap

### 21.1 Furniture System (Post-Launch)

**Architecture impact**:
- New `Furniture` and `PlayerFurniture` database tables
- New `furniture-store.ts` Zustand store
- New `components/room/room-furniture.tsx` component
- New `/api/furniture/` API route
- Pet store gains `furniture: string[]` field

### 21.2 Multiple Pets (Mid-Term)

**Architecture impact**:
- Pet store becomes array-based: `pets: PetState[]`
- Active pet selector in UI
- Each pet has independent stats, personality, memories
- Room layout supports multiple pet sprites
- Evolution engine handles per-pet progression

### 21.3 Cloud Save (Mid-Term)

**Architecture impact**:
- Guest Mode gains optional cloud backup
- Sync mechanism similar to Arashu Mode
- Conflict resolution strategy (merge or server-wins)
- Export/import pet data as JSON

### 21.4 Trading System (Long-Term)

**Architecture impact**:
- New `Trade` database table
- Real-time sync via Supabase Realtime
- Trade offer/accept/reject flow
- Item validation (ownership verification)
- Trade history logging

### 21.5 Seasonal Events (6-Month)

**Architecture impact**:
- Feature flag system for event toggling
- Time-based event activation
- Event-specific assets loaded conditionally
- Event-specific missions and achievements
- Event data stored separately from permanent data

### 21.6 Mini-Games (6-Month)

**Architecture impact**:
- New route group: `(mini-games)/`
- Self-contained game modules
- Shared reward system (mini-game results feed into game store)
- Independent animation contexts
- Performance isolation (mini-game crash does not affect main app)

### 21.7 Guilds/Social (12-Month)

**Architecture impact**:
- Real-time communication layer (WebSocket or Supabase Realtime)
- New `Guild`, `GuildMember` database tables
- Guild-specific features (shared missions, guild shop)
- Social feed component
- Privacy controls (opt-in social features)

### 21.8 Marketplace (Long-Term)

**Architecture impact**:
- New `Listing`, `Transaction` database tables
- Currency system (earned through gameplay, never purchased)
- Listing creation, search, purchase flows
- Transaction history
- Fraud prevention measures

### 21.9 Future Platform Support

**Mobile (Capacitor/Tauri)**:
- Current web app wrapped in native container
- Camera API bridged to native camera
- Push notifications via native bridge
- Offline-first architecture already supports this

**Desktop (Electron/Tauri)**:
- Same web app in desktop window
- Keyboard shortcuts added
- System tray integration (pet status)
- Native file system access for asset storage

---

## 22. Technical Debt Policy

### 22.1 Acceptable Technical Debt

| Type | Acceptable | Condition |
|------|-----------|------------|
| Temporary workarounds | Yes | Tracked in TODO with date and reason |
| Simplified implementations | Yes | Documented as "v1, improve in v2" |
| Legacy code during migration | Yes | Migration plan exists with timeline |
| Third-party library quirks | Yes | Isolated in adapter layer |

### 22.2 Forbidden Technical Debt

| Type | Forbidden | Reason |
|------|-----------|--------|
| Missing error handling | Always | Every error must be handled |
| Untested game logic | Always | Game logic is the core |
| Hardcoded values | Always | Use named constants |
| Copy-pasted code | Always | Extract shared utilities |
| Missing TypeScript types | Always | Strict mode everywhere |
| Console.log in production | Always | Use proper logging |
| Missing accessibility | Always | WCAG AA compliance required |
| Bypassing design system | Always | Follow UI Production Guide |
| Ignoring mobile | Always | Mobile-first always |
| Skipping animations | Always | Every interaction has feedback |

### 22.3 Refactoring Rules

1. **Boy Scout Rule**: Leave every file cleaner than you found it
2. **Strangler Fig Pattern**: Replace legacy code incrementally, not in big rewrites
3. **Test Before Refactor**: Ensure tests pass before changing structure
4. **Small Steps**: Refactor in small, reviewable increments
5. **Document Changes**: Update documentation when refactoring changes behavior
6. **No Feature + Refactor**: Never mix new features with refactoring in the same PR

### 22.4 Deprecation Policy

1. Mark deprecated with JSDoc `@deprecated` tag and replacement
2. Maintain deprecated code for at least 2 release cycles
3. Document in CHANGELOG.md
4. Remove after deprecation period
5. Never deprecate without providing a replacement

### 22.5 Migration Policy

1. Every data schema change has a migration script
2. Migrations are reversible (up and down)
3. Migrations tested on production-like data
4. Migrations documented in CHANGELOG.md
5. Store version tracked in Zustand persist config
6. Client migration functions handle every previous version

---

## 23. Engineering Checklist

Every new feature must pass this checklist before implementation begins and before it ships.

### Architecture
- [ ] Feature fits within existing layer structure
- [ ] No circular dependencies introduced
- [ ] Data flows in correct direction (no upward layer calls)
- [ ] State managed in appropriate store (not local state for global data)
- [ ] API routes follow REST conventions
- [ ] No business logic in components
- [ ] No game logic in API routes

### Performance
- [ ] No layout-triggering animations (only transform, opacity)
- [ ] Images use Next.js `<Image>` component
- [ ] Heavy components loaded dynamically
- [ ] Expensive computations memoized
- [ ] Zustand selectors are narrow
- [ ] No unnecessary re-renders
- [ ] Bundle size impact assessed

### Maintainability
- [ ] All functions have single responsibility
- [ ] All types defined explicitly (no `any`)
- [ ] Naming follows conventions
- [ ] Comments explain *why*, not *what*
- [ ] No magic numbers (named constants only)
- [ ] No duplicated code
- [ ] Import order follows conventions

### Scalability
- [ ] Feature does not block future expansion
- [ ] Data structures support future fields
- [ ] API responses include room for extension
- [ ] Store schema versioned with migration path
- [ ] No hardcoded limits that will need changing

### User Experience
- [ ] Feature passes Player Experience Document Experience Checklist
- [ ] Interaction takes < 100ms perceived response
- [ ] Loading state provided for async operations
- [ ] Error state provided with recovery action
- [ ] Empty state provided with guidance
- [ ] Pet reacts appropriately (if applicable)
- [ ] Sound effects included (if applicable)

### Brand Consistency
- [ ] UI follows UI Production Guide specifications
- [ ] Colors use design system tokens
- [ ] Typography uses Fredoka (headings) + Nunito (body)
- [ ] Copy follows Brand Book voice
- [ ] No SaaS patterns, no dashboard layouts
- [ ] Component passes UI Production Guide Component Checklist

### Animation
- [ ] Every interaction has animation feedback
- [ ] Animation duration matches UI Production Guide timing table
- [ ] Animation easing matches specifications
- [ ] Animation uses GPU-accelerated properties only
- [ ] Reduced motion mode disables/simplifies animation
- [ ] Animation state machine priority respected (pet animations)

### Accessibility
- [ ] All interactive elements have `aria-label`
- [ ] Touch targets are 44x44px minimum
- [ ] Color contrast meets WCAG AA (4.5:1 text, 3:1 UI)
- [ ] Keyboard navigation works (Tab, Enter, Escape)
- [ ] Focus indicators visible and styled
- [ ] Screen reader announces state changes

### Security
- [ ] All input validated through Zod schemas
- [ ] No `dangerouslySetInnerHTML`
- [ ] Authorization checked before mutations
- [ ] No secrets in client-side code
- [ ] Error messages do not leak internal details

### Testing
- [ ] Unit tests for game logic functions
- [ ] Integration tests for API routes
- [ ] Component tests for key interactions
- [ ] E2E test for critical user flow (if applicable)
- [ ] Manual QA checklist items added

---

## 24. Development Workflow

AI contributors must apply the permanent workspace skills before implementation:

- `scan-chan-core-rules` for source-of-truth, product guardrails, and conflict handling.
- `scan-chan-development-workflow` for planning, implementation policy, self-review, documentation updates, changelog updates, and PR readiness.
- `scan-chan-design-director` for visual, UX, motion, mascot, accessibility, emotional, and brand approval before implementation.

### 24.1 Feature Planning

1. **Read relevant documentation** — GDD, PED, VDD, UI Production Guide, and this architecture document
2. **Define scope** — What exactly is being built? What is NOT being built?
3. **Design review** — Does the feature pass the Engineering Checklist?
4. **Technical design** — What stores, API routes, components, and types are needed?
5. **Break into tasks** — Small, verifiable implementation steps

### 24.2 Branch Strategy

```
main                 -- Production-ready, protected branch
  develop            -- Integration branch for features
    feature/pet-feeding
    feature/scanner-redesign
    feature/evolution-system
    fix/xp-calculation
  release/v2.0       -- Release preparation
  hotfix/critical    -- Emergency production fixes
```

**Rules**:
- `main` is always deployable
- `develop` is the integration branch
- Feature branches from `develop`
- Merge via pull request with review
- Squash merge to keep history clean

### 24.3 Implementation Order

For each feature, implement in this order:

1. **Types** — Define all interfaces and types first
2. **Constants** — Define all configuration values
3. **Game Logic** — Pure functions in `lib/` (testable immediately)
4. **Validation Schemas** — Zod schemas for all inputs
5. **Store** — Zustand store with actions and persistence
6. **API Routes** — Server endpoints with validation
7. **Components** — UI components (atomic to composite)
8. **Pages** — Route pages composing components
9. **Animations** — Motion and transition polish
10. **Sound** — Audio effects integration
11. **Tests** — Unit, integration, component, E2E

### 24.4 Code Review Checklist

- [ ] Code follows all coding standards
- [ ] All documentation updated
- [ ] Engineering Checklist passes
- [ ] No console.log in production code
- [ ] No TODO without date and author
- [ ] Tests pass locally
- [ ] No TypeScript errors
- [ ] No ESLint warnings

### 24.5 Testing Workflow

1. Write tests alongside implementation (not after)
2. Run unit tests on every save (watch mode)
3. Run integration tests before committing
4. Run E2E tests before merging to develop
5. Run Lighthouse audit before release

### 24.6 Documentation Update

Every feature must update:
- **CHANGELOG.md** — What was added/changed
- **README.md** — If new documents created
- **AGENTS.md** — If new mandatory references
- **Relevant design document** — If behavior changes specs
- **This document** — If architecture changes

### 24.7 Deployment Process

1. **develop to release**: Feature freeze, QA testing
2. **Release QA**: Full manual QA checklist
3. **Fix issues**: Bug fixes on release branch
4. **Release to main**: Merge when QA passes
5. **Deploy**: Vercel auto-deploys from main
6. **Verify**: Smoke test production
7. **Tag**: Create version tag
8. **Announce**: Update changelog with version

### 24.8 Release Process

| Step | Action | Owner |
|------|--------|-------|
| 1 | Feature freeze on develop | Engineering |
| 2 | Create release branch | Engineering |
| 3 | Full QA pass | QA |
| 4 | Fix critical bugs | Engineering |
| 5 | Second QA pass | QA |
| 6 | Update CHANGELOG.md | Engineering |
| 7 | Merge to main | Engineering |
| 8 | Verify production deploy | Engineering |
| 9 | Tag release version | Engineering |
| 10 | Monitor error rates | Engineering |

---

## 25. Engineering Principles

### 25.1 Core Philosophy

Scan Chan's engineering philosophy mirrors its design philosophy: **the player's experience comes first, always**.

Engineering exists to make the pet feel alive, the world feel warm, and the interactions feel meaningful. Code quality directly impacts emotional quality. A laggy animation breaks immersion. A broken feature breaks trust. A slow load breaks the moment.

### 25.2 Optimization Priorities

Optimize for these qualities, in order:

1. **Longevity** — Code that remains healthy for 5+ years
2. **Readability** — Code that any engineer can understand immediately
3. **Consistency** — Code that follows the same patterns everywhere
4. **Emotional Experience** — Code that delivers the intended feeling
5. **Simplicity** — Code that does one thing well
6. **Scalability** — Code that grows without breaking

### 25.3 What We Never Optimize For

- **Speed of initial implementation** — Take the time to do it right
- **Cleverness** — Clear beats clever, always
- **Framework trends** — Use proven patterns, not bleeding-edge experiments
- **Short-term hacks** — No "we will fix it later" without a tracked plan
- **Engineering convenience over player experience** — Never sacrifice UX for easier code

### 25.4 The Long-Term Test

Before every architectural decision, ask:

> *"Will this decision still make sense in two years? Will a new engineer understand it? Will it support features we have not imagined yet?"*

If the answer to any question is no, redesign before proceeding.

### 25.5 The Emotional Test

Before every implementation, ask:

> *"Does this code help Scan Chan feel like a living companion? Or does it make Scan Chan feel like a web application?"*

If it feels like a web application, redesign before proceeding.

### 25.6 The Simplicity Test

Before every abstraction, ask:

> *"Is this the simplest solution that works? Am I solving a real problem or a theoretical one?"*

If it is solving a theoretical problem, wait until the real problem exists.

### 25.7 The Documentation Test

Before every merge, ask:

> *"Could a senior engineer joining the project tomorrow understand this without asking me questions?"*

If not, add documentation before merging.

### 25.8 The Brand Test

Before every UI change, ask:

> *"Does this look like it belongs in Scan Chan? Would it feel at home next to Nintendo, Supercell, or Apple quality?"*

If not, redesign before shipping.

### 25.9 Final Principle

> *Scan Chan is not a product. It is a companion. Build it like one.*

Every line of code is an act of care. Every function is a promise to the player. Every architecture decision is a commitment to longevity.

The architecture is not about technology. It is about ensuring that Scan Chan can keep remembering, keep growing, and keep being there — for every player, every scan, every day.

---

**Document Status**: This is the active engineering blueprint for Scan Chan. All technical decisions must align with this document. Update this document when architecture evolves.

**Document End**
