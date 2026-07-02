<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

<!-- BEGIN:documentation-policy -->
# Documentation Policy

All project documentation lives in the `/docs` folder. Documentation is the single source of truth.

**Rules**:

1. Every significant gameplay, UI, UX, architecture, feature, balancing, or technical decision must be reflected in documentation.
2. Update documentation **before** considering any task complete — code and docs ship together.
3. Never allow documentation to become outdated. Resolve discrepancies immediately.
4. If a change affects multiple documents, update all affected documents.
5. Keep documentation synchronized with implementation throughout the entire development lifecycle.
6. Use Markdown best practices with consistent formatting across all documents.

**Core Documents**:

| Document | Purpose |
|----------|---------|
| `docs/GAME_DESIGN_DOCUMENT.md` | Master GDD — gameplay philosophy, pet system, progression |
| `docs/VISUAL_DESIGN_DOCUMENT.md` | Art direction, color, typography, animation |
| `docs/PLAYER_EXPERIENCE_DOCUMENT.md` | **Mandatory reference** — emotional pillars, companion philosophy, ethical design |
| `docs/ART_DIRECTION_RESEARCH.md` | **Mandatory reference** — visual strategy, mascot design, UI evolution |
| `docs/CHARACTER_DESIGN_DOCUMENT.md` | **Mandatory reference** — Character Bible: mascot identity, personality, behavior, animation, art rules, emotional design |
| `docs/BRAND_BOOK.md` | **Mandatory reference** — Brand identity: voice, color, typography, material language, illustration, marketing, merchandise |
| `docs/MASCOT_PRODUCTION_GUIDE.md` | **Mandatory reference** — Mascot production: pixel specs, animation, expressions, SVG, asset pipeline, quality control |
| `docs/UI_PRODUCTION_GUIDE.md` | **Mandatory reference** — UI Production Guide: Design System Bible, layout, spacing, radius, elevation, color, typography, components, motion, responsive, accessibility, Home Hub blueprint |
| `docs/PROJECT_ARCHITECTURE.md` | **Mandatory reference** — Project Architecture: engineering blueprint, folder structure, application layers, route/component/state/database/API architecture, pipelines, performance, security, testing, coding standards |
| `docs/TECHNICAL_ROADMAP.md` | Development timeline and milestones |
| `docs/IMPLEMENTATION_PLAN.md` | Technical architecture and specifications |
| `docs/CHANGELOG.md` | Version history |
| `docs/FUTURE_IDEAS.md` | Feature ideas and expansion concepts |
| `docs/README.md` | Documentation index and standards |

**Mandatory Reference Rules**:
1. Before implementing any gameplay feature, UI change, animation, sound, or interaction, you MUST consult `docs/PLAYER_EXPERIENCE_DOCUMENT.md` and verify the feature passes the Experience Checklist defined within.
2. Before making any visual change (UI redesign, mascot modification, illustration, icon, animation, layout), you MUST consult `docs/ART_DIRECTION_RESEARCH.md` and verify alignment with the visual DNA, identity principles, and UI evolution strategy.
3. Before creating any asset, animation, interaction, marketing material, or design involving the mascot, you MUST consult `docs/CHARACTER_DESIGN_DOCUMENT.md` and verify the work passes the Character Checklist defined within. Never contradict the Character Bible.
4. Before writing any copy, designing any marketing material, choosing colors, defining typography, creating merchandise, or making any brand-level decision, you MUST consult `docs/BRAND_BOOK.md` and verify the work passes the Brand Checklist defined within. Never contradict the Brand Book.
5. Before producing any mascot sprite, animation frame, expression, accessory, or exported asset, you MUST consult `docs/MASCOT_PRODUCTION_GUIDE.md` and verify the asset passes the Production Checklist defined within. Never deviate from the production specifications.
6. Before designing, building, or modifying any UI component, layout, interaction pattern, animation, form, navigation, modal, HUD element, or screen composition, you MUST consult `docs/UI_PRODUCTION_GUIDE.md` and verify the component passes the Component Checklist defined within. Never deviate from the Design System specifications.
7. Before creating any new file, folder, store, API route, component category, or architectural pattern, you MUST consult `docs/PROJECT_ARCHITECTURE.md` and verify the change passes the Engineering Checklist defined within. Never deviate from the architecture specifications.
8. If a feature conflicts with the emotional pillars, ethical design principles, or brand identity, it must be redesigned before proceeding.

When a new system or feature is introduced, determine whether it belongs in an existing document or whether a new document should be created inside `/docs`.
<!-- END:documentation-policy -->
