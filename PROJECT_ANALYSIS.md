# Scan Chan — Complete Project Analysis

## 1. Overall Architecture

**Scan Chan** is a gamified barcode scanning web app built on:

- **Next.js 16.2.9** (App Router) with React 19
- **Prisma 7.8** with PostgreSQL (via `pg` adapter) as the primary database
- **Supabase** for authentication (Arashu mode) and file storage (product images)
- **Zustand 5** (persisted to localStorage) for all client-side game state
- **Tailwind CSS 4** + shadcn/ui for a custom "bubbly" iOS-inspired design system
- **GSAP** (landing page scroll animations) + **Framer Motion/Motion** (UI transitions throughout)
- **react-zxing** for in-browser barcode scanning via camera
- **Zod 4** for API input validation

The architecture is a hybrid: a **server-backed product database** (shared across all users) with a **client-only game state** (per-device, no server sync for game progress).

---

## 2. Major Systems & Interactions

### A. Authentication Flow (Two Modes)

- **Guest Mode**: No server auth. `initializePlayer()` in `src/stores/player-store.ts` generates a `creatorId` (UUID), sets nickname/avatar, and persists everything to localStorage.
- **Arashu's Mode**: Supabase email/password login via `src/app/play/mode/arashu-login/page.tsx`. After login, it calls `initializePlayer('Arashu', '👑')` then overrides mode to `ARASHU`. Session is verified on the Game Hub page.

### B. Game Engine (`src/lib/game-engine.ts` + `src/lib/game-config.ts`)

- **XP System**: Scanning new products = 25 XP, existing = 10 XP, registering = 50 XP. Configurable in `GAME_CONFIG`.
- **Level Formula**: `(level - 1) * 150 + 100` XP per level. Level derived from cumulative XP via `levelFromXp()`.
- **Daily Missions**: 4 missions selected deterministically from 6 templates using a date-seed hash. Reset daily via `checkDailyReset()` which compares locale date strings.
- **Achievements**: 8 hardcoded achievements checked after every scan/register action.
- **Cooldowns**: 15s for same-barcode scan, 10s for register, 5s for delete — all client-enforced.

### C. State Management (`src/stores/player-store.ts`)

- Single Zustand store with `persist` middleware (localStorage key: `scan-chan-player-state`).
- Contains: mode, nickname, avatar, creatorId, XP, level, streak, registeredBarcodes, dailyMissions, unlockedAchievements, scanHistory, and pending UI triggers (`pendingXpGain`, `pendingAchievementUnlocks`).
- `recordScan()` is the core action: checks cooldown → awards base XP → evaluates missions → checks achievements → updates all derived state atomically.

### D. API Routes

| Route | Methods | Purpose |
|---|---|---|
| `/api/scan` | POST | Lookup barcode + create scan log |
| `/api/products` | GET (paginated/search), POST (create) | Product CRUD |
| `/api/products/[barcode]` | GET, PUT, DELETE | Single product by barcode |
| `/api/statistics` | GET | Global stats + 7-day trend |
| `/api/history` | GET | Paginated scan logs |
| `/api/upload` | POST | Supabase Storage image upload |

All routes use `force-dynamic` to avoid build-time DB calls. Serialization is manual (Date → ISO string).

### E. Scanner System

- `src/components/scanner/barcode-scanner.tsx` wraps `react-zxing` with camera selection, sound effects, and automatic API lookup.
- On scan: calls `/api/scan` → stores result → triggers `recordScan()` in player store → plays success/error sound.
- Scan result shows "Found" (product details + link) or "Not Found" (register prompt).

### F. UI Component Architecture

- **Custom design system** in `src/app/globals.css`: `btn-bubbly`, `card-bubbly`, `tab-bubbly`, `bg-mesh-soft` utility classes.
- **Brand colors**: cyan (`#22d3ee`), pink (`#f472b6`), yellow (`#fde047`), mint (`#86efac`).
- **`src/components/pixel-cat.tsx`**: 477-line SVG-based pixel art cat mascot with 8 variants and 10 action poses — used pervasively as the app's visual identity.
- **Fonts**: Fredoka (headings) + Nunito (body) from Google Fonts.

### G. Page Structure

| Route | Description |
|---|---|
| `/` | Landing page (GSAP scroll animations, parallax floating cats) |
| `/play/mode` | Mode selection (Guest vs Arashu) |
| `/play/mode/arashu-login` | Supabase login form |
| `/play` | Game Hub (profile card, tabbed interface: Missions/Stats/History/Achievements/Products) |
| `/scan` | Full-screen barcode scanner |
| `/product/[barcode]` | Server-rendered product detail page |

---

## 3. Current Strengths

1. **Strong visual identity** — The pixel cat mascot and bubbly design system give the app a distinctive, playful personality that feels intentional and cohesive.
2. **Clean separation of concerns** — Game logic (pure functions in `game-engine.ts`) is cleanly separated from state management (`player-store.ts`) and UI components.
3. **Deterministic daily missions** — Date-seeded hash ensures consistent missions per calendar day across devices.
4. **Well-structured API layer** — All routes follow consistent patterns: Zod validation → Prisma operation → serialized JSON response with `{ success, data, error }` envelope.
5. **Thoughtful UX details** — Sound effects (Web Audio API + MP3), XP popup animations, achievement unlock modals, cooldown timers, camera switching, and scan history with inline "Register" prompts.
6. **Prisma 7 done correctly** — Proper use of `pg` Pool adapter, global singleton pattern, and build-safe stub client.
7. **Type safety** — Shared types in `types/index.ts`, Zod schemas with inferred types, proper Prisma type usage.

---

## 4. Technical Debt & Potential Improvements

| Issue | Location | Severity |
|---|---|---|
| Duplicated `getBadgeCat()` function | `game-achievements.tsx` and `achievement-popup.tsx` | Low |
| Duplicated `getCategoryVariant()` function | `product-list.tsx` and `scan-history.tsx` | Low |
| Duplicated `serializeProduct()` | Defined in 3 API route files separately | Low |
| Broken "Edit Product" link | `product/[barcode]/page.tsx` links to `/admin/products/edit/${id}` which doesn't exist | Medium |
| Unbounded `scanHistory` growth | `scanHistory: string[]` in localStorage grows forever with every scan | Medium |
| No server-side game state persistence | Guest mode progress is device-only; clearing browser data loses everything | Design decision |
| Weak delete authorization | DELETE uses client-supplied `x-creator-id` header — anyone can spoof it | Medium |
| `initializePlayer` + `setMode` race in Arashu login | `arashu-login/page.tsx` calls `initializePlayer` (which sets mode to GUEST) then immediately overrides to ARASHU | Low |
| Level progress bar calculation is approximate | `game-stats.tsx` uses `(xp % 1000) / 10` instead of actual level thresholds | Medium |
| No debouncing on search inputs | `product-list.tsx` and `scan-history.tsx` fire API calls on every keystroke (though `useDebounce` hook exists unused) | Low |
| No test coverage | No test files found in the project | Medium |
| Statistics N+1 potential | `/api/statistics` runs 5 parallel queries (good), but `mostScannedProduct` requires a follow-up query | Low |

---

## 5. Concerns Before Future Development

1. **localStorage capacity** — The `scanHistory` array stores every barcode string ever scanned. A power user could accumulate thousands of entries. Consider capping or migrating to a server-side approach.

2. **Guest vs Arashu parity** — Arashu mode calls `initializePlayer` which resets all state, meaning re-logging in as Arashu wipes previous guest progress. This may be intentional but could surprise users.

3. **No rate limiting on API routes** — The scan and product creation endpoints have no server-side rate limiting, relying entirely on client-side cooldowns.

4. **Missing middleware/auth guard** — There's no Next.js middleware to protect routes or verify Supabase sessions server-side. The Arashu session check is client-only.

5. **The `Achievement` DB table is unused** — The Prisma schema has an `Achievement` model (seeded with data), but the game engine uses hardcoded `GAME_ACHIEVEMENTS` array instead. The DB table appears vestigial.

6. **React 19 + Next.js 16 edge cases** — These are cutting-edge versions. The `params: Promise<{}>` pattern in route handlers and pages is correctly implemented, but any third-party libraries may have compatibility issues.
