# Scan Chan — Changelog

All notable changes to the Scan Chan project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/), and this project adheres to [Semantic Versioning](https://semver.org/).

---

## [Unreleased]

### Planned for v2.0.0

- Complete game redesign as virtual pet experience
- Pet system with five evolution stages
- Five core pet stats (Hunger, Mood, Energy, Affection, Curiosity)
- Personality system emergent from care patterns
- Memory system recording scan history as emotional moments
- Mode separation (Guest vs Arashu)
- Daily missions redesigned around pet care
- Achievement system with milestone celebrations
- Collection philosophy (products as experiences)

### Added

- **Sprint 2.1 pet domain foundation** - Implemented the UI-independent pet domain foundation with strongly typed pet state, five core stats, stat clamping, passive non-punitive decay floors, lifecycle/status calculation, personality signal weighting, memory normalization, PetService domain methods, pet store normalization actions, application-flow integration for pet state, and unit coverage without adding scanner, feeding, rewards, evolution, Home Hub UI, animations, synchronization, or camera behavior.
- **Sprint 1.7 testing foundation** - Added Vitest, Supertest, and Playwright testing configuration; created `tests/unit`, `tests/integration`, `tests/e2e`, `tests/mocks`, `tests/fixtures`, and `tests/helpers`; added mock factories for Prisma, repositories, services, and store state; added test bootstrap utilities for dependency-injected app containers without implementing gameplay, scanner, UI snapshot, reward, sync, or business-rule tests.
- **Sprint 1.6 application flow layer** - Added typed application-flow controllers for startup, Guest initialization, Arashu initialization, scanner session, product lookup, inventory update, pet update, mission update, achievement update, settings load/save, and shutdown lifecycle orchestration. Added future event sequence placeholders for scan success, scan failure, feeding, evolution, rewards, and synchronization without implementing gameplay, scanner logic, rewards, sync, UI, or business rules.
- **Sprint 1.5 composition root** - Added the application dependency composition root for Guest and Arashu modes, wiring database providers, repositories, and services through constructor-based factories without adding gameplay, scanner behavior, sync, UI, or business logic.
- **Sprint Book v1.0** - Added `docs/SPRINT_BOOK.md` as the definitive production roadmap and mandatory sprint governance document for Scan Chan. It defines Sprint 0 through Sprint 9, sprint philosophy, immutable development rules, sprint dependencies, expected outcomes, sprint-specific boundaries, mandatory Definition of Done, timeline philosophy, and sprint approval checklist. Added the Sprint Book to `docs/README.md` and `AGENTS.md` as a mandatory reference before implementation planning.
- **Sprint 1.4 service foundation** - Completed the application service layer for pet, game, scanner, UI, inventory, profile, settings, and shared domains with constructor-injected repositories, typed public interfaces, deferred orchestration points, and dependency boundaries for future feeding, scanning, evolution, inventory, missions, achievements, rewards, and sync without implementing feature logic.
- **Sprint 1.3 state foundation** - Completed the Zustand state-management foundation for pet, game, UI, scanner, inventory, profile, settings, and shared domains with typed initial state, actions, selectors, hydration flags, versioned persistence for documented durable stores, and isolated store boundaries without adding gameplay, scanner pipeline, sync, UI, feeding, evolution, or rewards.
- **Sprint 1.2 data foundation** - Added the v2 Prisma schema for User, Pet, PetStats, Inventory, InventoryItem, Product, ScanHistory, Mission, Achievement, Progress, Settings, and SyncMetadata; wired isolated Guest and Arashu Prisma clients through a shared factory; added constructor-injected repository implementations, generated domain type exports, and validation schemas without adding gameplay, scanner behavior, sync logic, or UI work.
- **Scan Chan Design Director workspace skill** - Added a permanent Creative Director skill at `.agents/skills/scan-chan-design-director/` to review and approve visual, UX, animation, motion, pixel art, mascot expression, mascot animation, typography, color, design token, state, scanner, Home Hub, accessibility, emotional, and brand decisions against the authoritative design documents.
- **Scan Chan Development Workflow workspace skill** - Added a permanent workspace Codex skill at `.agents/skills/scan-chan-development-workflow/` defining mandatory AI contributor workflow for planning, documentation reads, component reuse, state management, file organization, naming, animation, design tokens, accessibility, performance, self-review, documentation updates, changelog entries, PR readiness, and feature completion.
- **Scan Chan Core Rules workspace skill** - Added a permanent workspace Codex skill at `.agents/skills/scan-chan-core-rules/` to enforce documentation-first implementation, pet-first product direction, anti-dashboard UI guidance, Guest/Arashu database isolation, maintainable architecture, purposeful animation, and documentation synchronization.
- **Project Architecture v1.0** — Definitive engineering blueprint defining the complete technical architecture for Scan Chan: architecture philosophy (core engineering goals, scalability, maintainability, performance, developer experience, longevity, 14 forbidden anti-patterns), complete folder structure (root, source code, public assets with responsibilities and restrictions for each folder), application layers (Presentation, Game, Business, Persistence, Infrastructure, Shared with communication rules and forbidden communication paths), route architecture (12 routes with route groups, navigation flow, protected routes, transition animations, future routes), component architecture (atomic structure, 8 component categories with rules and reusable rules), state management (4 Zustand stores: Pet, Game, UI, Settings with persistence strategy, migration strategy, hydration rules, future multiplayer store), database architecture (dual database philosophy, entity relationships, target v2.0 schema with 10+ new tables, indexes, migration strategy, scalability), API architecture (folder organization, naming conventions, versioning, Zod validation, authentication, authorization, error responses, response format, logging), scan pipeline (10-step lifecycle from camera through saving), feeding pipeline (food generation, pet reaction, stat/mission/achievement update, animation sequence, persistence), evolution pipeline (XP thresholds, trigger logic, 7-second animation sequence, state update, persistence, future scalability), asset pipeline (pixel/SVG/audio/image optimization, loading strategy, caching), animation architecture (organization, state machine with 5 priority levels, interrupt rules, queue system, performance rules, timing table), performance strategy (rendering targets, image optimization, asset loading, lazy loading, memoization, bundle splitting, caching), error handling (client/server/API/scanner/offline with 3-tier recovery), offline strategy (cached data, pending scans queue, conflict resolution, Arashu sync), security strategy (validation, sanitization, headers, rate limiting, auth, authorization, secrets management), logging and analytics (debug/production logging, crash reporting, performance metrics, gameplay analytics, privacy rules), testing strategy (pyramid: 70% unit, 25% integration, 5% E2E with coverage targets and manual QA checklist), coding standards (naming/folder/component/hook/store/API/file/import/comment conventions), scalability roadmap (furniture, multiple pets, cloud save, trading, seasonal events, mini-games, guilds, marketplace, future platform support), technical debt policy (acceptable vs forbidden, refactoring/deprecation/migration rules), 40-question engineering checklist (covering architecture, performance, maintainability, scalability, UX, brand, animation, accessibility, security, testing), development workflow (feature planning, branch strategy, implementation order, code review, testing, documentation, deployment, release process), and 9 engineering principles (longevity, readability, consistency, emotional experience, simplicity, scalability with long-term/emotional/simplicity/documentation/brand tests) (June 29, 2026)
- **UI Production Guide v1.0** — Definitive Design System Bible defining the complete production system for every UI component: design system philosophy (10 core principles, 6 banned anti-patterns), visual hierarchy system (primary/secondary/tertiary focus, eye movement, attention budget), layout system (desktop/tablet/mobile grids, container widths, margins, safe areas, whitespace philosophy), 4px spacing system (complete scale from 2px to 96px, internal/external/section/component spacing, visual rhythm), radius system (7 tokens from 12px to 50%, element-specific radii for buttons/cards/dialogs/popups/avatars/images/pet canvas), elevation system (6 shadow levels with warm brown tones, border usage rules, floating z-hierarchy, glass and blur usage, time-of-day lighting interaction), complete color application rules (allowed/forbidden zones per color, primary/secondary/warning/success/info/disabled/hover/pressed/selected/focus states, background hierarchy), typography application (heading/body/label/caption/button/counter/number/XP/level/coin/pet name/dialog specifications), iconography system (6 size tokens, stroke weight rules, filled vs outline, pixel icons, emoji usage, illustration/navigation/status icons), button system (primary/secondary/ghost/icon/FAB/danger/success/loading/disabled with complete visual specs, sizing scale, spacing rules, animation timing), card system (8 card types with composition rules, spacing, padding, animation), navigation system (top/bottom/side navigation, tab bars, segment controls, breadcrumbs, back navigation, page transitions), modal system (dialogs/sheets/bottom sheets/confirmation/reward/evolution/achievement/mission/level-up popups with animation timing and hierarchy), HUD system (pet/XP/food/mood/coins/notifications/mission tracker/temporary overlays), scanner UI (camera frame, overlay, corner brackets, laser, flash, scanning feedback, success/failure flows, transitions), forms (inputs/dropdowns/selectors/checkboxes/switches/sliders with validation/error/success states), lists and collections (inventory/product list/achievement grid/mission list/furniture collection/category layout/pagination/infinite scrolling), motion system (duration scale, easing curves, spring physics, hover/click/open/close/appear/disappear/floating/idle animations, micro interactions, particle integration), responsive rules (desktop/tablet/mobile/ultra-wide/landscape/portrait, scaling behavior, priority changes), accessibility rules (contrast ratios, touch targets, keyboard navigation, reduced motion, readable typography, screen reader considerations), empty states (structure, illustration, mascot behavior, microcopy, actions), loading states (skeletons, progress indicators, pet animations, timing, transitions), error states (visual hierarchy, mascot reaction, recovery actions, warm messages), reward presentation (XP/food/evolution/achievements/missions/daily rewards, visual hierarchy, animation sequencing), Home Hub blueprint (screen composition, proportions, spacing, hierarchy, HUD placement, interaction flow, camera framing, idle state, feeding sequence, evolution presentation), 25-question component checklist, and design system evolution rules (what may evolve, what must never change, ten-year test, versioning) (June 30, 2026)
- **Mascot Production Guide v1.0** — Complete technical production specification defining pixel art specifications (48×48 base grid, export resolutions, upscaling rules), silhouette rules (head/body/ear/tail/leg/paw/eye proportions), shape language (rounded forms, soft geometry, forbidden sharp angles), color production (full palette with hex values for fur, shadows, highlights, eyes, nose, ears, paws, outlines), pixel shading rules (lighting direction, cluster theory, anti-banding, forbidden techniques), animation production (25 animation types with exact frame counts and timing), expression library production (12 expressions with pixel-level drawing instructions), SVG production rules (structure, grouping, naming, transforms), sprite sheet organization (folder structure, naming convention, frame numbering), 10-stage asset pipeline (concept through iteration), 30-question quality control checklist, and future expansion rules (seasonal outfits, accessories, furniture, new animations, new species) (June 30, 2026)
- **Brand Book v1.0** — Complete brand identity document defining brand philosophy and mission, immutable brand values, comprehensive brand voice (writing style, tone, vocabulary, microcopy, notifications, empty states, loading messages, error messages, success messages, greeting messages, farewell messages, push notification philosophy), brand personality metaphors, logo philosophy, color identity with emotional reasoning, material language (surfaces, shadows, lighting), typography identity, illustration identity, environmental identity (skies, clouds, indoor environments, furniture, weather, time of day), mascot usage guidelines, marketing identity (store listings, website, social media, press), screenshot guidelines, merchandise philosophy (plushies, stickers, pins, apparel, posters, packaging), future expansion guidelines, brand evolution rules (what may evolve vs what must never change), and 20-question brand review checklist (June 30, 2026)
- **Character Bible v2.0** — Complete character identity document defining mascot vision, core identity, detailed personality (likes, dislikes, fears, habits, daily routine, emotional states), relationship philosophy (attachment development, absence reactions), comprehensive body language system (ears, tail, eyes, breathing, movement), expression library (15 emotional states with full attribute breakdown), animation bible (80+ animations categorized by type), evolution philosophy (Baby through Elder stages with emotional descriptions), strict art rules (silhouette, proportions, shading, pixel density), future customization rules (accessories, hats, scarves, costumes), dialogue philosophy (no-words communication system), 10 immutable emotional design principles, future scalability guidelines, and mandatory character review checklist (June 30, 2026)
- **Player Experience Document v1.0** — Experience design bible defining emotional pillars, player journey, daily experience loop, companion philosophy, interaction philosophy, return experience, reward philosophy, ethical design principles, audio experience, and experience checklist (June 30, 2026)
- **Art Direction Research v1.0** — Visual strategy document with reference analysis, Scan Chan visual identity, visual DNA composition, mascot redesign strategy, UI evolution plan, and Character Bible preparation (June 30, 2026)
- **Visual Design Document v2.0** — Comprehensive design bible covering design philosophy, art direction, color system, typography, UI component language, layout philosophy, animation language, illustration guidelines, accessibility, and future expansion (June 30, 2026)

### Changed

- **Sprint 0 foundation cleanup** - Quarantined legacy v1 routes, APIs, components, state, product UI, mascot prototype, and reward utilities under legacy namespaces while preserving current public URLs and app behavior. Added architecture-aligned component category folders, route-group skeleton folders, domain type files, minimal Zustand store boundaries, `public/audio/` asset placement, `.env.example`, and explicit Guest/Arashu Prisma client boundaries to prepare the repository for the Scan Chan v2 foundation rebuild.
- **Sprint 1.1 architecture boundaries** - Added v2 domain boundary folders, empty Zustand store shells, provider boundaries, service interfaces, repository interfaces, asset placeholders, API placeholders, and barrel exports for pet, game, scanner, UI, inventory, profile, settings, and shared domains without implementing gameplay or final UI.

---

## [1.0.0] — 2026-06-29

### Added

- Initial release as "Barcode Hunter" / "Barcode Adventure"
- Barcode scanning with react-zxing
- Product registration and management
- Daily missions system
- Achievement system
- XP and level progression
- Guest Mode (localStorage-based)
- Arashu Mode (Supabase authentication)
- Scan history tracking
- Product collection
- Statistics dashboard
- Responsive mobile-first design

### Changed

- Renamed project to "Scan Chan" (June 29, 2026)
- Updated all branding, metadata, and UI text
- Changed localStorage key from `barcode-hunter-player-state` to `scan-chan-player-state`

### Fixed

- Edit Product link routing to correct page
- Level progress bar calculation formula
- Exit button preserving Guest mode state
- Search input debouncing for API optimization
- Consolidated duplicated utility functions

---

## Version History

| Version | Date | Summary |
|---------|------|---------|
| 1.0.0 | 2026-06-29 | Initial release (as Scan Chan) |
| Pre-1.0 | Various | Development under "Barcode Hunter" name |

---

**Document End**
