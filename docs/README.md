# Scan Chan Documentation

Welcome to the official documentation for **Scan Chan** — a cozy virtual pet game where barcode scanning is how you feed your cat.

---

## Documentation Structure

| Document | Description | Status |
|----------|-------------|--------|
| [GAME_DESIGN_DOCUMENT.md](./GAME_DESIGN_DOCUMENT.md) | Master design reference — gameplay philosophy, pet system, progression, retention | **Complete** |
| [VISUAL_DESIGN_DOCUMENT.md](./VISUAL_DESIGN_DOCUMENT.md) | Design bible — art direction, color system, typography, component language, animation, layout | **Complete** |
| [PLAYER_EXPERIENCE_DOCUMENT.md](./PLAYER_EXPERIENCE_DOCUMENT.md) | Experience design bible — emotional pillars, player journey, companion philosophy, ethical design | **Complete** |
| [ART_DIRECTION_RESEARCH.md](./ART_DIRECTION_RESEARCH.md) | Visual strategy — reference analysis, visual DNA, mascot redesign, UI evolution | **Complete** |
| [CHARACTER_DESIGN_DOCUMENT.md](./CHARACTER_DESIGN_DOCUMENT.md) | **Character Bible** — mascot identity, personality, body language, expression library, animation bible, evolution philosophy, art rules, emotional design principles | **Complete** |
| [BRAND_BOOK.md](./BRAND_BOOK.md) | **Brand Book** — brand philosophy, voice, personality, color identity, material language, typography, illustration, environmental identity, mascot usage, marketing, merchandise, brand evolution | **Complete** |
| [MASCOT_PRODUCTION_GUIDE.md](./MASCOT_PRODUCTION_GUIDE.md) | **Mascot Production Guide** — pixel art specs, silhouette rules, shape language, color production, shading rules, animation production, expression library, SVG rules, sprite sheet organization, asset pipeline, quality control | **Complete** |
| [UI_PRODUCTION_GUIDE.md](./UI_PRODUCTION_GUIDE.md) | **UI Production Guide** — Design System Bible: layout, spacing, radius, elevation, color application, typography, iconography, buttons, cards, navigation, modals, HUD, scanner, forms, lists, motion, responsive, accessibility, empty/loading/error states, rewards, Home Hub blueprint | **Complete** |
| [PROJECT_ARCHITECTURE.md](./PROJECT_ARCHITECTURE.md) | **Project Architecture** — Engineering blueprint: architecture philosophy, folder structure, application layers, route architecture, component architecture, state management, database architecture, API architecture, scan/feeding/evolution pipelines, asset pipeline, animation architecture, performance strategy, error handling, offline strategy, security strategy, logging, testing strategy, coding standards, scalability roadmap, technical debt policy, engineering checklist, development workflow, engineering principles | **Complete** |
| [TECHNICAL_ROADMAP.md](./TECHNICAL_ROADMAP.md) | Development timeline, phases, milestones | Planning |
| [IMPLEMENTATION_PLAN.md](./IMPLEMENTATION_PLAN.md) | Technical architecture, database design, API specifications | Planning |
| [CHANGELOG.md](./CHANGELOG.md) | Version history and notable changes | Active |
| [FUTURE_IDEAS.md](./FUTURE_IDEAS.md) | Feature ideas, expansion concepts, rejected ideas | Brainstorming |

---

## Documentation Standards

### Documentation as Source of Truth

Documentation is **not optional**. It is the foundation of the project.

**Rules**:

1. **Every significant decision must be documented** — gameplay, UI, UX, architecture, features, balancing, technical
2. **Update documentation before considering tasks complete** — code and docs ship together
3. **Never allow documentation to become outdated** — discrepancies must be resolved immediately
4. **If a change affects multiple documents, update all affected documents**
5. **Keep documentation synchronized with implementation** throughout the entire development lifecycle
6. **Use Markdown best practices** and maintain consistent formatting

### When to Create New Documents

Create a new document when:

- A new system is introduced that doesn't fit existing documents
- A document becomes too large (> 1000 lines)
- A topic requires dedicated focus (e.g., Sound Design Document, Marketing Plan)

New documents should:

- Be placed in the `/docs` folder
- Follow the same Markdown standards
- Be linked from this README
- Include a Table of Contents

### Markdown Standards

- Use `#` for document title (only once per document)
- Use `##` for major sections
- Use `###` for subsections
- Use tables for structured data
- Use bullet lists for collections of items
- Use code blocks for technical specifications
- Include horizontal rules (`---`) between major sections
- End documents with `**Document End**`

---

## Quick Reference

### Core Design Principles

1. **The Pet Comes First** — Every decision serves the pet
2. **Scanning = Feeding = Love** — Physical act mirrors emotional act
3. **Absence Has Weight** — Pet misses player warmly, never guilt-trips
4. **Growth is Visible and Meaningful** — Time invested shows
5. **Cozy, Never Stressful** — No fail states, comfort gaming
6. **The Physical World Matters** — Real products, real connection

### Emotional Pillars

Comfort · Warmth · Companionship · Tenderness · Delight · Peace · Nostalgia · Pride

*Every feature must serve at least one pillar. See [PLAYER_EXPERIENCE_DOCUMENT.md](./PLAYER_EXPERIENCE_DOCUMENT.md).*

### The Five Pet Stats

| Stat | Decay Rate | Recovery |
|------|------------|----------|
| Hunger | -5/hour | +15-30 per scan |
| Mood | -3/hour | +10 new products, +5 favorites |
| Energy | -2/hour (awake) | +10/hour (sleeping) |
| Affection | -1/day | +5 per scan, min 25 |
| Curiosity | -4/hour | +20 new barcodes |

### Evolution Stages

| Stage | Level Range | Duration |
|-------|-------------|----------|
| Kitten | 1-5 | ~1-2 weeks |
| Young Cat | 6-15 | ~1-2 months |
| Adult Cat | 16-35 | ~3-6 months |
| Wise Cat | 36-60 | ~6-12 months |
| Legendary Cat | 61-100 | 1-2+ years |

### Mode Separation

| Aspect | Guest Mode | Arashu Mode |
|--------|------------|-------------|
| Database | Public | Private |
| Auth | None | Supabase |
| State | localStorage | Server-synced |
| Features | Standard | Standard + Exclusive |

---

## Document Maintenance Checklist

When making changes:

- [ ] Update GAME_DESIGN_DOCUMENT.md if gameplay changes
- [ ] Update VISUAL_DESIGN_DOCUMENT.md if visual design changes
- [ ] Update PLAYER_EXPERIENCE_DOCUMENT.md if emotional direction changes
- [ ] Update ART_DIRECTION_RESEARCH.md if visual strategy changes
- [ ] Update CHARACTER_DESIGN_DOCUMENT.md if pet behavior, personality, animation, or any mascot-related content changes
- [ ] Update BRAND_BOOK.md if brand identity, voice, marketing, merchandise, or visual language changes
- [ ] Update MASCOT_PRODUCTION_GUIDE.md if mascot production specs, animation specs, or asset pipeline changes
- [ ] Update UI_PRODUCTION_GUIDE.md if UI components, layout, spacing, motion, or any design system specification changes
- [ ] Update PROJECT_ARCHITECTURE.md if architecture, folder structure, state management, API design, pipelines, or engineering standards change
- [ ] Update TECHNICAL_ROADMAP.md if timeline changes
- [ ] Update IMPLEMENTATION_PLAN.md if architecture changes
- [ ] Update CHANGELOG.md with version changes
- [ ] Update FUTURE_IDEAS.md with new ideas or status changes
- [ ] Verify all internal links still work

---

## Contributing to Documentation

When adding new content:

1. Determine which document is most appropriate
2. Check if similar content already exists (avoid duplication)
3. Add to the Table of Contents if adding new sections
4. Follow the Markdown standards defined above
5. Verify internal links work
6. Update this README if adding a new document

---

**Scan Chan will remember you. Will you remember Scan Chan?**
