# Scan Chan — Implementation Plan

**Version**: 1.0  
**Last Updated**: June 30, 2026  
**Status**: Planning Phase  
**Document Type**: Technical Implementation Details

---

## Table of Contents

- [1. Overview](#1-overview)
- [2. System Architecture](#2-system-architecture)
- [3. Database Design](#3-database-design)
- [4. State Management](#4-state-management)
- [5. API Design](#5-api-design)
- [6. Component Architecture](#6-component-architecture)
- [7. Performance Considerations](#7-performance-considerations)
- [8. Security Considerations](#8-security-considerations)

---

## 1. Overview

This document provides detailed technical specifications for implementing the systems described in the Game Design Document. It serves as the reference for developers during implementation.

### 1.1 Documentation Standards

- All technical decisions are recorded here before implementation
- Changes to architecture require updating this document
- Code should match the specifications described here
- Discrepancies between code and documentation must be resolved immediately

---

## 2. System Architecture

### 2.1 High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Client (Browser)                      │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐ │
│  │ Pet Display │  │ Scanner     │  │ UI Components       │ │
│  │ (Canvas/DOM)│  │ (Camera)    │  │ (shadcn/ui)         │ │
│  └──────┬──────┘  └──────┬──────┘  └──────────┬──────────┘ │
│         │                │                     │            │
│  ┌──────▼──────────────────────────────────────▼──────────┐ │
│  │              State Management (Zustand)                 │ │
│  │  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────────┐  │ │
│  │  │Pet Store│ │Game Store│ │UI Store │ │Persist Layer│  │ │
│  │  └─────────┘ └─────────┘ └─────────┘ └─────────────┘  │ │
│  └────────────────────────┬───────────────────────────────┘ │
└───────────────────────────┼─────────────────────────────────┘
                            │
                    ┌───────▼───────┐
                    │   API Layer   │
                    └───────┬───────┘
                            │
            ┌───────────────┴───────────────┐
            │                               │
    ┌───────▼───────┐               ┌───────▼───────┐
    │ Guest Database│               │Arashu Database│
    │   (Public)    │               │   (Private)   │
    └───────────────┘               └───────────────┘
```

### 2.2 Mode Separation

Guest and Arashu modes use completely separate data paths:

| Aspect | Guest Mode | Arashu Mode |
|--------|------------|-------------|
| Authentication | None (device-based) | Supabase Auth |
| Database | Public Prisma client | Private Prisma client |
| State Storage | localStorage | Server-synced |
| Product Pool | Shared | Private |
| Features | Standard | Standard + Exclusive |

### 2.3 Data Flow

1. User scans barcode
2. Scanner component captures code
3. API validates and processes scan
4. Pet store updates stats based on product category
5. Memory is recorded
6. XP is awarded
7. Missions are checked for completion
8. Achievements are evaluated
9. UI reflects all changes

---

## 3. Database Design

### 3.1 Core Models

#### Pet Model

```prisma
model Pet {
  id            String   @id @default(cuid())
  creatorId     String
  mode          String   // 'guest' | 'arashu'
  name          String
  stage         Int      // 1-5 (evolution stage)
  level         Int      @default(1)
  xp            Int      @default(0)
  
  // Stats (0-100)
  hunger        Int      @default(80)
  mood          Int      @default(80)
  energy        Int      @default(100)
  affection     Int      @default(50)
  curiosity     Int      @default(70)
  
  // Personality (calculated from care patterns)
  personality   Json?
  
  // Timestamps
  lastFedAt     DateTime?
  lastActiveAt  DateTime @default(now())
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
  
  // Relations
  memories      Memory[]
  achievements  Achievement[]
  products      Product[]
  
  @@index([creatorId, mode])
}
```

#### Memory Model

```prisma
model Memory {
  id          String   @id @default(cuid())
  petId       String
  type        String   // 'first_feed', 'favorite', 'milestone', 'special'
  title       String
  description String?
  productCode String?
  metadata    Json?
  createdAt   DateTime @default(now())
  
  pet         Pet      @relation(fields: [petId], references: [id])
  
  @@index([petId, type])
}
```

#### Achievement Model

```prisma
model Achievement {
  id          String   @id @default(cuid())
  petId       String
  key         String   // unique achievement identifier
  unlockedAt  DateTime @default(now())
  
  pet         Pet      @relation(fields: [petId], references: [id])
  
  @@unique([petId, key])
}
```

### 3.2 Database Separation Strategy

Two separate database connections:

```typescript
// lib/prisma-guest.ts
export const prismaGuest = new PrismaClient({
  datasourceUrl: process.env.GUEST_DATABASE_URL,
})

// lib/prisma-arashu.ts
export const prismaArashu = new PrismaClient({
  datasourceUrl: process.env.ARASHU_DATABASE_URL,
})

// lib/prisma.ts (router)
export function getPrismaClient(mode: 'guest' | 'arashu') {
  return mode === 'arashu' ? prismaArashu : prismaGuest
}
```

---

## 4. State Management

### 4.1 Store Architecture

```typescript
// stores/pet-store.ts
interface PetState {
  // Pet identity
  pet: Pet | null
  mode: 'guest' | 'arashu'
  
  // Stats
  stats: {
    hunger: number
    mood: number
    energy: number
    affection: number
    curiosity: number
  }
  
  // Progression
  level: number
  xp: number
  stage: number
  
  // Collections
  memories: Memory[]
  achievements: Achievement[]
  products: Product[]
  
  // Actions
  feedPet: (product: Product) => void
  updateStats: () => void // called periodically for decay
  addXP: (amount: number) => void
  checkEvolution: () => void
  recordMemory: (memory: MemoryInput) => void
  unlockAchievement: (key: string) => void
}
```

### 4.2 Stat Decay Calculation

```typescript
// lib/stat-decay.ts
export function calculateStatDecay(
  currentStats: PetStats,
  lastActiveAt: Date,
  now: Date
): PetStats {
  const hoursElapsed = (now.getTime() - lastActiveAt.getTime()) / (1000 * 60 * 60)
  
  return {
    hunger: Math.max(0, currentStats.hunger - (hoursElapsed * 5)),
    mood: Math.max(0, currentStats.mood - (hoursElapsed * 3)),
    energy: calculateEnergyDecay(currentStats.energy, hoursElapsed, lastActiveAt),
    affection: Math.max(25, currentStats.affection - (hoursElapsed / 24)), // -1 per day, min 25
    curiosity: Math.max(0, currentStats.curiosity - (hoursElapsed * 4)),
  }
}
```

### 4.3 Persistence Strategy

| Data Type | Storage | Sync Frequency |
|-----------|---------|----------------|
| Pet identity | Server + Local | On change |
| Stats | Server + Local | Every action |
| Memories | Server | On creation |
| Achievements | Server | On unlock |
| Products | Server | On scan |
| UI preferences | Local only | N/A |

---

## 5. API Design

### 5.1 Core Endpoints

#### Pet Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/pet` | Create new pet |
| GET | `/api/pet` | Get current pet |
| PATCH | `/api/pet` | Update pet (name, etc.) |
| POST | `/api/pet/feed` | Feed pet (scan product) |
| POST | `/api/pet/sync` | Sync local state with server |

#### Product Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/products` | Register new product |
| GET | `/api/products` | List products (paginated) |
| GET | `/api/products/[barcode]` | Get product by barcode |
| DELETE | `/api/products/[barcode]` | Delete product (admin) |

#### Memory Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/memories` | List memories |
| GET | `/api/memories/[id]` | Get memory details |

#### Mission Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/missions/daily` | Get daily missions |
| GET | `/api/missions/weekly` | Get weekly missions |
| POST | `/api/missions/[id]/complete` | Mark mission complete |

#### Achievement Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/achievements` | List all achievements |
| GET | `/api/achievements/unlocked` | List unlocked achievements |

### 5.2 Mode-Aware Middleware

```typescript
// middleware/mode-aware.ts
export async function modeAwareHandler(req: Request) {
  const mode = await getModeFromRequest(req) // 'guest' | 'arashu'
  const prisma = getPrismaClient(mode)
  
  // Continue with mode-specific prisma client
}
```

---

## 6. Component Architecture

### 6.1 Component Hierarchy

```
App
├── Layout
│   ├── ModeProvider (context)
│   └── PetProvider (context)
├── Pages
│   ├── LandingPage
│   ├── ModeSelection
│   ├── GameHub
│   │   ├── PetDisplay (main focus)
│   │   ├── StatsPanel (ambient)
│   │   ├── QuickActions
│   │   └── TabNavigation
│   │       ├── MissionsTab
│   │       ├── StatsTab
│   │       ├── HistoryTab
│   │       ├── AchievementsTab
│   │       └── ProductsTab
│   ├── ScannerPage
│   │   ├── CameraView
│   │   ├── ScanOverlay
│   │   └── PetReaction (shows pet during scan)
│   ├── MemoryPage
│   │   └── ScrapbookView
│   └── ProductDetailPage
└── Shared
    ├── PetSprite
    ├── StatIndicator
    ├── AchievementPopup
    └── XPPopup
```

### 6.2 Key Components

#### PetSprite

```typescript
interface PetSpriteProps {
  stage: 1 | 2 | 3 | 4 | 5
  mood: 'happy' | 'content' | 'sad' | 'sleepy' | 'excited'
  personality: PersonalityTraits
  size?: 'small' | 'medium' | 'large'
  interactive?: boolean
}
```

#### StatIndicator

```typescript
interface StatIndicatorProps {
  stat: 'hunger' | 'mood' | 'energy' | 'affection' | 'curiosity'
  value: number // 0-100
  showValue?: boolean // hidden by default
  size?: 'small' | 'large'
}
```

---

## 7. Performance Considerations

### 7.1 Performance Targets

| Metric | Target |
|--------|--------|
| First Contentful Paint | < 1.5s |
| Time to Interactive | < 3s |
| Pet animation FPS | 60fps |
| API response time | < 200ms |
| Bundle size (initial) | < 200KB |

### 7.2 Optimization Strategies

**Image Optimization**:
- Sprite sheets for pet animations
- WebP format for all assets
- Lazy loading for off-screen elements

**Code Splitting**:
- Route-based splitting
- Dynamic imports for scanner
- Lazy load heavy components

**Caching**:
- Product data cached client-side
- Pet state persisted to localStorage
- API responses cached where appropriate

---

## 8. Security Considerations

### 8.1 Authentication

**Guest Mode**:
- No authentication required
- Device-based identity (fingerprint or localStorage)
- Rate limiting by IP

**Arashu Mode**:
- Supabase authentication required
- JWT tokens for API access
- Refresh token rotation

### 8.2 Data Protection

- Product data validated on input
- File uploads limited to 5MB, JPEG/PNG/WebP only
- No sensitive data in client state
- API keys stored in environment variables

### 8.3 Rate Limiting

| Endpoint | Limit |
|----------|-------|
| Scan | 10 per minute |
| Product create | 5 per minute |
| General API | 60 per minute |

---

**Document Status**: This document will be expanded as implementation begins. Each system will have detailed specifications before development.

**Document End**
