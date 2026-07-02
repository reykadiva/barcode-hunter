# Scan Chan — Visual Design Document

**Version**: 2.0  
**Last Updated**: June 30, 2026  
**Status**: Active — Single Source of Truth for Visual Decisions  
**Document Type**: Design Bible & Art Direction Reference

---

## Table of Contents

- [1. Design Philosophy](#1-design-philosophy)
  - [1.1 Overall Vision](#11-overall-vision)
  - [1.2 Emotional Goals](#12-emotional-goals)
  - [1.3 Cozy-First Philosophy](#13-cozy-first-philosophy)
  - [1.4 Companion-First Philosophy](#14-companion-first-philosophy)
  - [1.5 Anti-Dashboard Philosophy](#15-anti-dashboard-philosophy)
  - [1.6 Anti-SaaS Philosophy](#16-anti-saas-philosophy)
  - [1.7 Anti-AI-Slop Principles](#17-anti-ai-slop-principles)
- [2. Art Direction](#2-art-direction)
  - [2.1 Visual Mood](#21-visual-mood)
  - [2.2 Atmosphere](#22-atmosphere)
  - [2.3 Lighting](#23-lighting)
  - [2.4 Depth](#24-depth)
  - [2.5 Composition](#25-composition)
  - [2.6 Shape Language](#26-shape-language)
  - [2.7 Decorative Language](#27-decorative-language)
- [3. Color System](#3-color-system)
  - [3.1 Primary Colors](#31-primary-colors)
  - [3.2 Secondary Colors](#32-secondary-colors)
  - [3.3 Accent Colors](#33-accent-colors)
  - [3.4 Background Palettes](#34-background-palettes)
  - [3.5 Semantic Colors](#35-semantic-colors)
  - [3.6 Dark Mode Strategy](#36-dark-mode-strategy)
  - [3.7 Emotional Color Usage](#37-emotional-color-usage)
- [4. Typography](#4-typography)
  - [4.1 Font Families](#41-font-families)
  - [4.2 Type Scale](#42-type-scale)
  - [4.3 Hierarchy Rules](#43-hierarchy-rules)
  - [4.4 Number Styling](#44-number-styling)
  - [4.5 Special Typography](#45-special-typography)
- [5. UI Component Language](#5-ui-component-language)
  - [5.1 Buttons](#51-buttons)
  - [5.2 Cards](#52-cards)
  - [5.3 Panels](#53-panels)
  - [5.4 Popups & Modals](#54-popups--modals)
  - [5.5 Navigation](#55-navigation)
  - [5.6 Tabs](#56-tabs)
  - [5.7 Inputs](#57-inputs)
  - [5.8 Progress Bars](#58-progress-bars)
  - [5.9 Badges](#59-badges)
  - [5.10 Notifications](#510-notifications)
  - [5.11 HUD Elements](#511-hud-elements)
- [6. Layout Philosophy](#6-layout-philosophy)
  - [6.1 Whitespace](#61-whitespace)
  - [6.2 Layering](#62-layering)
  - [6.3 Spacing System](#63-spacing-system)
  - [6.4 Rounded Corners](#64-rounded-corners)
  - [6.5 Grid Philosophy](#65-grid-philosophy)
  - [6.6 Visual Hierarchy](#66-visual-hierarchy)
- [7. Animation Language](#7-animation-language)
  - [7.1 Animation Philosophy](#71-animation-philosophy)
  - [7.2 Easing & Timing](#72-easing--timing)
  - [7.3 Interaction Animations](#73-interaction-animations)
  - [7.4 Page Transitions](#74-page-transitions)
  - [7.5 Pet Animations](#75-pet-animations)
  - [7.6 Event Animations](#76-event-animations)
  - [7.7 Particle Systems](#77-particle-systems)
- [8. Illustration Guidelines](#8-illustration-guidelines)
  - [8.1 Illustration Style](#81-illustration-style)
  - [8.2 Background Style](#82-background-style)
  - [8.3 Decorative Elements](#83-decorative-elements)
  - [8.4 Environmental Assets](#84-environmental-assets)
  - [8.5 Icons](#85-icons)
  - [8.6 Emoji Usage](#86-emoji-usage)
- [9. Accessibility](#9-accessibility)
  - [9.1 Readability](#91-readability)
  - [9.2 Contrast](#92-contrast)
  - [9.3 Touch Targets](#93-touch-targets)
  - [9.4 Motion Reduction](#94-motion-reduction)
- [10. Design Principles](#10-design-principles)
- [11. Future Expansion](#11-future-expansion)

---

## 1. Design Philosophy

### 1.1 Overall Vision

> Scan Chan lives in a world that feels like a warm memory — pixel-perfect, softly lit, and inviting.

Every pixel on screen exists to serve one purpose: making the player feel that their companion is real, present, and worth caring for. The visual language never draws attention to itself. It breathes quietly beneath the pet, amplifying emotion without demanding focus.

Scan Chan is **not an app**. It is a **place** — a room where a small creature lives and waits for you.

### 1.2 Emotional Goals

Every visual decision must support these target feelings:

| Emotion | How Visuals Create It |
|---------|----------------------|
| **Warmth** | Warm color temperature, soft gradients, golden-hour lighting |
| **Safety** | Rounded shapes, enclosed spaces, gentle boundaries |
| **Nostalgia** | Pixel art references, muted saturation, analog texture |
| **Tenderness** | Small scale, oversized eyes on the pet, soft shadows |
| **Calm** | Generous whitespace, slow animations, low visual density |
| **Delight** | Surprise particles, bounce on interaction, color shifts |

### 1.3 Cozy-First Philosophy

Before asking "Does this look good?", ask "Does this feel cozy?"

Cozy means:

- Nothing is sharp or aggressive
- Nothing competes for attention
- Nothing feels rushed or urgent
- Every element feels like it belongs
- The space feels lived-in, not sterile

If a visual element creates tension — a harsh color, a sharp corner, a cramped layout — it fails the cozy test and must be softened.

### 1.4 Companion-First Philosophy

The pet is the emotional and visual center of every screen. Everything else exists in relation to the pet.

- The pet is the **largest** interactive element on the main screen
- UI chrome **frames** the pet, never obscures it
- Colors in the environment **complement** the pet's palette
- Animation **draws the eye toward** the pet during idle states
- When the pet moves, the room subtly responds

### 1.5 Anti-Dashboard Philosophy

Scan Chan is not a dashboard. It must never resemble one.

**Banned patterns**:

- Dense data grids
- Sidebar navigation with 10+ items
- Multi-column layouts with competing information
- Charts and graphs as primary UI elements
- Status panels that dominate the screen
- Tabular data as the focal point

Stats exist, but they are ambient — felt rather than read. A player should understand how Scan Chan feels by looking at the cat, not by reading a number.

### 1.6 Anti-SaaS Philosophy

Scan Chan is not a productivity tool, a SaaS platform, or a business application.

**Banned patterns**:

- Sharp-edged cards with thin borders
- Gray-on-gray text hierarchies
- Enterprise color schemes (corporate blue, sterile white)
- Dense icon grids with labels
- Dropdown-heavy navigation
- "Settings" pages that look like admin panels
- Feature-flag-driven UI clutter

The interface should feel handcrafted, like a storybook illustration with interactive elements — not like a settings panel that happens to have a cat in it.

### 1.7 Anti-AI-Slop Principles

AI-generated UI tends toward predictable patterns. Scan Chan actively resists them.

**Recognize and avoid**:

- **Generic gradient cards** with centered text and a drop shadow
- **Identical rounded rectangles** arranged in a perfect grid
- **Purple-to-blue gradients** as a default "modern" palette
- **Overuse of glassmorphism** without purpose
- **Cookie-cutter hero sections** with heading + subtitle + two buttons
- **Inter or Roboto** as the only typeface
- **Tailwind defaults** without customization
- **Identical spacing** everywhere — no rhythm, no hierarchy
- **Emoji as decoration** scattered without intent

Instead:

- Make intentional asymmetry where it serves the layout
- Use whitespace as a design element, not leftover space
- Choose colors for emotional impact, not trend compliance
- Let the pixel-art pet be the most visually rich element
- Design every screen as if it were a page in a storybook

---

## 2. Art Direction

### 2.1 Visual Mood

The world of Scan Chan feels like a **Sunday afternoon in late autumn** — golden light through curtains, a warm drink nearby, a cat curled up on a cushion.

Key mood words:

- **Warm** — never cold, never sterile
- **Soft** — never harsh, never sharp
- **Inviting** — every screen feels like it welcomes you
- **Intimate** — the world is small and personal
- **Lived-in** — nothing is perfect; everything has character

### 2.2 Atmosphere

The atmosphere should feel like a room, not a webpage.

- **Ambient warmth**: Subtle golden/amber overlay on backgrounds
- **Air particles**: Occasional floating dust motes in light beams
- **Gentle depth**: Background elements are slightly blurred or faded
- **Organic imperfection**: Slight asymmetry in layouts, nothing perfectly centered

The room where Scan Chan lives should feel like a real place the player is visiting — not a white void with UI elements floating in it.

### 2.3 Lighting

Lighting is the single most important atmospheric element.

**Primary light source**: Warm, soft, directional — as if sunlight enters from the upper-left corner of the screen.

**Lighting rules**:

| Element | Lighting Treatment |
|---------|-------------------|
| Pet | Soft rim light on upper edges, warm ambient fill |
| Cards/Panels | Subtle top-light gradient (brighter top, warmer bottom) |
| Buttons | Inner highlight on top edge, soft shadow below |
| Room background | Time-of-day aware (morning gold, afternoon amber, evening blue) |
| Overlays/Modals | Dimmed warm background, focused light on content |

**Dynamic lighting** (future):

- Morning: Warm gold, long soft shadows
- Afternoon: Bright, neutral warmth
- Evening: Deep amber, shorter shadows
- Night: Cool blue-purple, moonlight glow
- Rainy: Muted, diffused, gray-warm

### 2.4 Depth

The screen should feel layered, like looking through a window into a room.

**Three depth layers**:

1. **Background** (farthest): Room walls, window, decorations. Slightly desaturated, warm-toned, soft focus.
2. **Midground** (pet's layer): Scan Chan, furniture, interactive objects. Full color, sharp pixel art, most detail.
3. **Foreground** (closest): UI elements, HUD, notifications. Slightly elevated, soft shadow to float above the scene.

Depth is communicated through:

- **Shadow softness** (deeper shadows = closer to viewer)
- **Color saturation** (more saturated = closer)
- **Scale** (larger = closer)
- **Blur** (background blur for depth separation)

### 2.5 Composition

Screens follow a **visual gravity** system:

- The **pet** occupies the center-to-lower-center of the screen (where a cat would naturally sit)
- **UI elements** float at the edges — top for status, bottom for actions
- **Empty space** is generous around the pet
- **Information** is grouped into soft clusters, not scattered

The composition should feel like a painting, not a wireframe. The eye should naturally travel: pet → room details → UI elements → back to pet.

### 2.6 Shape Language

**Dominant shape**: Circle and rounded rectangle.

Shape rules:

| Element | Shape |
|---------|-------|
| Buttons | Fully rounded (pill shape) or large radius |
| Cards | Large radius (16-32px), soft edges |
| Panels | Large radius, slight overlap with neighboring elements |
| Icons | Rounded stroke, filled with soft gradients |
| Progress bars | Rounded ends, no sharp edges |
| Badges | Pill shape or circle |
| Avatars | Circle |
| Borders | Rounded everywhere — zero sharp corners |

**Banned shapes**: Sharp rectangles, pointed elements, angular decorations, hard-edge dividers.

### 2.7 Decorative Language

Decorative elements add character without adding information.

**Approved decorative elements**:

- Pixel-art plants, books, and objects in the room
- Soft floating particles (hearts, sparkles, dust motes)
- Gentle gradient washes behind content areas
- Subtle texture overlays (paper grain, fabric weave)
- Hand-drawn style dividers (wavy lines, dotted paths)
- Small pixel-art icons used as embellishments

**Banned decorative elements**:

- Geometric abstract patterns (too corporate)
- Neon glow effects (too cyberpunk)
- 3D rendered elements (breaks pixel-art cohesion)
- Stock illustration style (too generic)
- Gradient mesh blobs without purpose (AI slop)

---

## 3. Color System

### 3.1 Primary Colors

The primary palette establishes warmth and identity.

| Name | Hex | Usage |
|------|-----|-------|
| **Honey** | `#F5A623` | Primary action buttons, key highlights, XP indicators |
| **Honey Light** | `#FFD580` | Hover states, soft highlights |
| **Honey Dark** | `#C4841D` | Active/pressed states, deep accents |
| **Cream** | `#FFF8F0` | Page backgrounds, card fills |
| **Warm White** | `#FFFDF9` | Elevated surfaces, popover backgrounds |

**Honey** is the signature color. It communicates warmth, care, and the golden-hour atmosphere that defines Scan Chan's world. It replaces the "tech blue" that dominates most applications.

### 3.2 Secondary Colors

Secondary colors support the primary palette and add variety.

| Name | Hex | Usage |
|------|-----|-------|
| **Rose** | `#F472B6` | Affection indicators, love-related UI, hearts |
| **Rose Light** | `#FBC4DE` | Soft backgrounds for affection content |
| **Sage** | `#86EFAC` | Positive states, success indicators, curiosity |
| **Sage Dark** | `#4ADE80` | Active positive states |
| **Sky** | `#67E8F9` | Energy indicators, information, links |
| **Sky Dark** | `#22D3EE` | Active information states |

### 3.3 Accent Colors

Used sparingly for emphasis and special moments.

| Name | Hex | Usage |
|------|-----|-------|
| **Sunbeam** | `#FDE047` | Achievements, celebrations, rare highlights |
| **Lavender** | `#C4B5FD` | Night mode tinting, sleep states, wisdom |
| **Coral** | `#FB923C` | Urgency (gentle), attention, hunger low |
| **Petal** | `#FDA4AF` | Gentle warnings, mood indicators |

### 3.4 Background Palettes

Backgrounds set the emotional tone for every screen.

**Light Mode (Default)**:

| Layer | Color | Notes |
|-------|-------|-------|
| Base | `#FFF8F0` (Cream) | Warm, never pure white |
| Surface | `#FFFDF9` (Warm White) | Cards, elevated areas |
| Subtle | `#FEF3E2` | Alternate sections, gentle separation |
| Mesh | Gradient blend | Organic, multi-point radial gradients |

**Mesh Gradient Philosophy**: Backgrounds use soft, overlapping radial gradients in warm tones to create an organic, non-uniform feel. These should shift subtly, never creating harsh boundaries. Colors: cream, soft peach, light rose, pale sky, warm amber — all at low opacity (30-40%).

### 3.5 Semantic Colors

Colors that communicate meaning.

| Meaning | Color | Hex |
|---------|-------|-----|
| Success / Positive | Sage | `#86EFAC` |
| Information / Neutral | Sky | `#67E8F9` |
| Affection / Love | Rose | `#F472B6` |
| Energy / Active | Sky Dark | `#22D3EE` |
| Warning / Low stat | Coral | `#FB923C` |
| Error / Critical | Muted Red | `#F87171` |
| Hunger | Honey | `#F5A623` |
| Mood | Rose | `#F472B6` |
| Energy | Sky | `#67E8F9` |
| Affection | Rose Dark | `#EC4899` |
| Curiosity | Sage | `#86EFAC` |

**Rule**: Semantic colors must be consistent across the entire application. Hunger is always Honey. Affection is always Rose. Never swap semantic colors for variety.

### 3.6 Dark Mode Strategy

Dark mode is not a simple color inversion. It is a **nighttime atmosphere**.

**Dark mode approach**:

| Layer | Light Mode | Dark Mode |
|-------|-----------|-----------|
| Base background | Cream `#FFF8F0` | Deep Indigo `#1A1625` |
| Surface | Warm White `#FFFDF9` | Soft Night `#252038` |
| Primary (Honey) | `#F5A623` | Warm Gold `#E8A84C` (slightly desaturated) |
| Text primary | Dark Brown | Warm Off-White `#F5F0E8` |
| Text secondary | Muted Brown | Muted Warm `#A09888` |
| Borders | Warm Gray | Soft Night `#352F45` |

**Atmosphere shift**: In dark mode, the lighting changes from golden-hour to moonlight. The room should feel like a cozy nighttime scene — warm lamp light against dark walls. The pet's sprite should have a subtle warm glow, as if near a lamp.

**Not pure black**: Never use `#000000` as a background. The darkest allowed color is `#1A1625` (Deep Indigo) — it maintains warmth even in darkness.

### 3.7 Emotional Color Usage

Colors shift subtly based on Scan Chan's emotional state. This is ambient — the player should feel it, not consciously notice it.

| Pet State | Color Influence |
|-----------|----------------|
| Happy | Background warms slightly, more golden tones |
| Content | Neutral warmth, balanced palette |
| Sad | Slightly cooler, desaturated, blue-shifted |
| Sleepy | Purple-lavender tint, dimmed brightness |
| Excited | Slightly more saturated, brighter highlights |
| Hungry | Subtle warm-coral undertone |
| Curious | Slightly more saturated greens and cyans |

These shifts are subtle — no more than 10-15% adjustment in hue or saturation. The goal is subconscious atmosphere, not obvious color changes.

---

## 4. Typography

### 4.1 Font Families

| Role | Font | Weight Range | Rationale |
|------|------|-------------|-----------|
| **Headings** | Fredoka | 400, 500, 600, 700 | Rounded, friendly, warm. Feels handcrafted without being childish. |
| **Body** | Nunito | 400, 500, 600, 700, 800 | Clean, highly readable, warm terminals. Pairs naturally with Fredoka. |
| **Pixel / Special** | *To be selected* | — | Used only for evolutions, achievements, and special events. Should evoke 8-bit/16-bit era. |
| **Monospace** | *Only for barcode display* | — | If barcodes are shown, use a clean mono font. Never for general UI text. |

**Why Fredoka + Nunito**: Both families share rounded terminals and warm proportions. Fredoka provides personality for headings; Nunito provides readability for body text. Together they create a cohesive, friendly voice that avoids both corporate sterility and childish chaos.

**Font rules**:

- Never use system fonts (Arial, Helvetica, Times) — they break the crafted feeling
- Never use generic "modern" sans-serifs (Inter, Roboto, SF Pro) — they feel like SaaS
- Limit to 2 font families in any single screen (3 only for special events with pixel font)
- Font weight changes should be meaningful (bold = emphasis, not decoration)

### 4.2 Type Scale

A harmonious scale based on a 1.25 ratio (Major Third).

| Token | Size | Line Height | Usage |
|-------|------|-------------|-------|
| `text-xs` | 12px | 16px | Captions, timestamps, fine print |
| `text-sm` | 14px | 20px | Secondary text, labels, metadata |
| `text-base` | 16px | 24px | Body text, descriptions, default |
| `text-lg` | 20px | 28px | Lead text, prominent descriptions |
| `text-xl` | 24px | 32px | Section headers, card titles |
| `text-2xl` | 32px | 40px | Page titles, hero text |
| `text-3xl` | 40px | 48px | Special emphasis, landing page |
| `text-4xl` | 48px | 56px | Logo text, rare celebratory text |

**Scale rules**:

- Never go below 12px — anything smaller is unreadable on mobile
- Body text must be at least 16px for comfortable reading
- Headings should use the heading font (Fredoka)
- Line heights increase with font size for comfortable reading

### 4.3 Hierarchy Rules

| Level | Font | Weight | Size | Color |
|-------|------|--------|------|-------|
| H1 (Page Title) | Fredoka | 700 | 32-40px | Primary text |
| H2 (Section) | Fredoka | 600 | 24-32px | Primary text |
| H3 (Subsection) | Fredoka | 500 | 20-24px | Primary text |
| Body | Nunito | 400-600 | 16px | Primary text |
| Caption | Nunito | 400-500 | 12-14px | Secondary text (muted) |
| Label | Nunito | 600-700 | 12-14px | Uppercase optional, muted |

**Hierarchy through weight and color, not just size**. Two elements at the same size can have clear hierarchy if one is bold/primary and the other is regular/muted.

### 4.4 Number Styling

Numbers require special treatment because they carry gameplay significance.

| Context | Style | Notes |
|---------|-------|-------|
| XP gains | Fredoka, Bold, Honey color | "+25 XP" feels celebratory |
| Level display | Fredoka, Bold, larger size | Level is a milestone |
| Stat values (if shown) | Nunito, SemiBold | Clean, readable |
| Counts (items, streaks) | Fredoka, Medium | Friendly, not clinical |
| Dates/timestamps | Nunito, Regular, muted | Informational, low emphasis |
| Barcode numbers | Monospace | Only context where mono is allowed |

**Number rules**:

- Never use tabular figures for decorative numbers
- XP gains should always feel like a reward — use color and weight
- Raw numbers (stats) should be de-emphasized — ambient, not dominant

### 4.5 Special Typography

**Evolution announcements**: Pixel font (when selected), large size, centered, with glow or shadow effect. The text should feel momentous.

**Achievement unlocks**: Pixel font for the achievement name, Fredoka for the description. Celebration particles around text.

**Pet speech/thought bubbles**: Nunito, italic, slightly smaller than body. Feels whispered or thought, not spoken.

**Empty states**: Fredoka, warm weight, centered. The text should feel like a gentle invitation, not an error.

---

## 5. UI Component Language

### 5.1 Buttons

Buttons are the primary interaction points. They should feel inviting to touch.

**Primary Button**:

- Shape: Fully rounded (pill)
- Fill: Honey (`#F5A623`) with inner top highlight
- Shadow: Soft drop shadow (warm brown, 8-12px blur) + inset bottom shadow for depth
- Text: Fredoka, SemiBold, white or dark brown
- Hover: Brightness +10%, slight scale (1.02)
- Active: Translate down 2-4px, shadow shrinks (press feeling)

**Secondary Button**:

- Shape: Fully rounded (pill)
- Fill: Transparent with 2px border (Honey or Rose)
- Shadow: Minimal or none
- Text: Fredoka, Medium, border color
- Hover: Light fill (10% opacity of border color)

**Ghost Button**:

- Shape: Rounded rectangle (12-16px radius)
- Fill: None
- Shadow: None
- Text: Nunito, SemiBold, muted text color
- Hover: Subtle background (5% opacity)

**Icon Button**:

- Shape: Circle
- Fill: Surface color or transparent
- Shadow: Minimal
- Icon: 20-24px, rounded stroke
- Hover: Light background fill

**Button rules**:

- Primary actions get Primary buttons — one per screen maximum
- All tappable elements must feel pressable (shadow + active state)
- Never use sharp-edged buttons
- Never use flat buttons without any visual affordance

### 5.2 Cards

Cards contain grouped content. They should feel like soft cushions, not rigid containers.

**Standard Card**:

- Shape: Rounded rectangle (24-32px radius)
- Fill: Surface color (Warm White `#FFFDF9`)
- Border: 1px warm white or very subtle warm gray (low opacity)
- Shadow: Soft, warm shadow (12-20px blur, low opacity, warm brown tint)
- Inner highlight: Subtle top-edge gradient (white at 60% opacity, 4px)
- Padding: Generous (24-32px internal)

**Interactive Card** (tappable):

- All of the above, plus:
- Hover: Slight lift (translateY -2px), shadow increases
- Active: Slight press (translateY +1px), shadow decreases

**Card rules**:

- Cards should never feel like spreadsheet cells
- Maximum 2-3 cards visible at once on mobile
- Cards should have generous internal whitespace
- Never stack more than 4 cards vertically without a section break
- Card content should be scannable in 2 seconds

### 5.3 Panels

Panels are larger containers for major content sections.

**Standard Panel**:

- Shape: Rounded rectangle (32px radius, larger than cards)
- Fill: Cream or subtle gradient
- Border: None (rely on background contrast)
- Shadow: Very soft, large blur (20-30px, very low opacity)
- Padding: 32-48px internal

**Panel rules**:

- Panels define major page sections
- Panels should feel like rooms within a room
- Never nest panels more than 2 levels deep
- Use background color shifts instead of borders to separate panels

### 5.4 Popups & Modals

Popups appear when the player needs focused information or a decision.

**Modal Overlay**:

- Background: Darkened warm overlay (black at 40% opacity with warm tint)
- Animation: Fade in (200ms), then content scales up with bounce

**Modal Content**:

- Shape: Large rounded rectangle (32px radius)
- Fill: Warm White
- Shadow: Large, soft, warm (30px blur)
- Max width: 400-500px on desktop, 90% viewport on mobile
- Padding: 32-40px

**Toast Notifications**:

- Shape: Pill or rounded rectangle (16px radius)
- Fill: Surface color with semantic left border
- Position: Top-right on desktop, top-center on mobile
- Animation: Slide in from edge, fade out on dismiss
- Auto-dismiss: 4 seconds

### 5.5 Navigation

Navigation should feel like moving through rooms, not clicking links.

**Main Navigation** (bottom bar on mobile, side on desktop):

- Shape: Rounded container (20px radius)
- Fill: Surface color with soft shadow
- Items: Icon + short label
- Active state: Honey background pill, icon fills with color
- Inactive state: Muted color, no background

**Navigation rules**:

- Maximum 5 items in main navigation
- Icons should be custom pixel-art style or rounded stroke
- Active page should be immediately obvious
- Navigation should never compete with the pet for attention

**Back Navigation**:

- Soft rounded button, left-pointing arrow or chevron
- Positioned top-left
- Label optional ("Back" or section name)

### 5.6 Tabs

Tabs organize content within a section.

**Tab Bar**:

- Shape: Rounded container (pill shape, 999px radius)
- Fill: Muted background (Subtle cream)
- Active tab: Filled pill (surface color with shadow)
- Inactive tab: Transparent, muted text
- Text: Fredoka, Medium
- Animation: Smooth sliding indicator (200ms ease-out)

**Tab rules**:

- Maximum 5 tabs per group
- Tabs should be scannable at a glance
- Active tab must be clearly distinguishable
- Never use underline-only tabs (too SaaS)

### 5.7 Inputs

Text inputs should feel warm and approachable.

**Text Input**:

- Shape: Rounded rectangle (16px radius)
- Fill: Surface color or white
- Border: 2px warm gray (light)
- Focus: Border transitions to Honey, soft outer glow
- Placeholder: Muted text, Nunito Italic
- Padding: 12-16px horizontal, 10-14px vertical

**Search Input**:

- All of the above, plus:
- Search icon on left (muted color)
- Clear button on right (appears when filled)
- Slightly larger padding

**Input rules**:

- Never use sharp-edged inputs
- Focus state should feel warm, not clinical (no blue outline)
- Labels should be above inputs, not floating inside
- Error state: Coral border, gentle message below

### 5.8 Progress Bars

Progress bars communicate growth and achievement. They should feel alive.

**Standard Progress Bar**:

- Shape: Fully rounded (pill) container
- Track: Muted background (Subtle cream)
- Fill: Gradient (Honey to Honey Light) with subtle shimmer animation
- Height: 8-12px for standard, 4-6px for inline
- Animation: Fill animates smoothly (500ms ease-out), shimmer on completion

**Stat Bars** (for pet stats):

- Each stat has its semantic color as the fill
- Background is a muted version of the same color (20% opacity)
- Height: 6-8px
- Optional: Tiny icon on the left representing the stat

**Progress bar rules**:

- Always rounded — never flat ends
- Fill should animate when values change
- Consider subtle particle burst at 100%

### 5.9 Badges

Badges communicate status, category, or counts.

**Status Badge**:

- Shape: Pill (999px radius)
- Fill: Semantic color at 15% opacity
- Text: Semantic color, Nunito Bold, small (12px)
- Padding: 4-8px horizontal, 2-4px vertical

**Count Badge**:

- Shape: Circle
- Fill: Rose or Coral
- Text: White, Fredoka Bold, centered
- Size: 20-24px minimum

**Achievement Badge**:

- Shape: Circle or shield
- Fill: Gradient (Sunbeam to Honey)
- Border: Subtle golden border
- Icon: Pixel-art icon inside
- Shadow: Warm glow

### 5.10 Notifications

Notifications inform without alarming.

**In-App Notification**:

- Shape: Rounded card (20px radius)
- Fill: Surface color
- Left accent: 4px semantic color bar
- Icon: Relevant icon, 24px
- Text: Title (Fredoka Medium) + description (Nunito Regular)
- Animation: Slide in from top, settle with soft bounce

**XP Popup**:

- Shape: Small pill floating near the pet
- Fill: Honey at 90% opacity
- Text: "+XX XP" in Fredoka Bold, white
- Animation: Float up from pet, fade out after 1.5s

### 5.11 HUD Elements

HUD elements provide ambient game state without dominating the screen.

**Level Indicator**:

- Position: Top area, near pet
- Format: Circular badge with level number
- Fill: Honey gradient
- Text: Fredoka Bold, white
- Optional: Ring around it showing XP progress

**Streak Counter**:

- Position: Top area
- Format: Flame icon + number
- Style: Fredoka Medium, Honey/warm color

**HUD rules**:

- HUD elements must be compact and ambient
- Never allow HUD to exceed 15% of screen real estate
- HUD should fade or dim when not relevant
- All HUD elements use the rounded, warm visual language

---

## 6. Layout Philosophy

### 6.1 Whitespace

Whitespace is not empty space. It is the room where the pet breathes.

**Whitespace rules**:

- The pet's immediate area should have at least 40-60px of clear space on all sides
- Between sections: 32-48px minimum
- Between cards: 16-24px minimum
- Inside cards: 24-32px padding minimum
- Text blocks: 16-24px between paragraphs

**The golden rule**: When in doubt, add more whitespace. A page that feels "too empty" is almost always better than a page that feels "too full."

### 6.2 Layering

The screen is organized into clear visual layers:

| Layer | Z-Position | Content |
|-------|-----------|---------|
| Background | 0 | Room, wall, window, ambient decor |
| Environment | 1 | Furniture, objects, plants |
| Pet | 2 | Scan Chan (always prominent) |
| Foreground | 3 | UI overlays, HUD, navigation |
| Overlays | 4 | Modals, popups, toasts |

**Layer rules**:

- The pet is always on layer 2 and never obscured by layer 3
- HUD elements float above but never cover the pet
- Modals dim everything below layer 4

### 6.3 Spacing System

A consistent spacing scale based on 4px units.

| Token | Value | Usage |
|-------|-------|-------|
| `space-1` | 4px | Tight gaps (icon to text) |
| `space-2` | 8px | Small gaps (badge padding) |
| `space-3` | 12px | Inline spacing |
| `space-4` | 16px | Default gap between elements |
| `space-5` | 20px | Between related groups |
| `space-6` | 24px | Card internal padding |
| `space-8` | 32px | Between sections |
| `space-10` | 40px | Between major sections |
| `space-12` | 48px | Page-level section breaks |
| `space-16` | 64px | Top/bottom page margins |

### 6.4 Rounded Corners

Everything in Scan Chan is rounded. This is non-negotiable.

| Element | Radius |
|---------|--------|
| Buttons | 999px (pill) |
| Small badges | 999px (pill) |
| Inputs | 16px |
| Cards | 24-32px |
| Panels | 32px |
| Modals | 32px |
| Images | 16-24px |
| Progress bars | 999px (pill) |
| Tabs container | 999px (pill) |
| Avatar | 50% (circle) |

**Corner rules**:

- No element should have a radius below 12px
- Larger containers get larger radii
- The relationship is proportional: bigger element = rounder corners

### 6.5 Grid Philosophy

**Mobile-first**: Single column, 16-20px edge margins, generous vertical spacing.

**Tablet**: Two columns maximum for content areas, pet remains centered and prominent.

**Desktop**: Content centered in a max-width container (640-768px). The pet's room fills the center. Side panels are allowed only for supplementary information.

**Grid rules**:

- Never use a 12-column grid for layout — it leads to dashboard thinking
- Prefer single-column flow with max-width constraints
- Two columns only when content naturally pairs (e.g., stats side by side)
- The pet's area is never part of the grid — it defines the grid

### 6.6 Visual Hierarchy

Every screen should answer within 1 second: "What is the most important thing here?"

**Hierarchy tools** (in order of strength):

1. **Size** — the largest element is the most important
2. **Color** — Honey draws the eye first
3. **Weight** — bold text over regular
4. **Position** — center and top attract attention
5. **Motion** — animated elements draw the eye
6. **Contrast** — light against dark, saturated against muted

**Hierarchy rules**:

- The pet is always the strongest visual element
- Only one element per screen should use Honey as a fill color (primary action)
- Secondary information should be muted (lower opacity, smaller, lighter weight)
- Never have two elements competing for the same level of attention

---

## 7. Animation Language

### 7.1 Animation Philosophy

Animation in Scan Chan is **alive but gentle**. Nothing snaps. Nothing jolts. Everything moves with the ease of a lazy afternoon.

**Core animation principles**:

- **Organic**: Movement follows natural curves, not linear paths
- **Anticipated**: Elements prepare before moving (subtle scale-back before pop)
- **Settled**: Elements arrive with a soft overshoot, then rest
- **Purposeful**: Every animation communicates something — no decoration-only motion
- **Respectful**: All animations honor `prefers-reduced-motion`

### 7.2 Easing & Timing

| Animation Type | Duration | Easing | Character |
|---------------|----------|--------|-----------|
| Micro (hover, focus) | 100-150ms | `ease-out` | Quick, responsive |
| Small (button press, toggle) | 150-250ms | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Bouncy, playful |
| Medium (card open, panel slide) | 250-400ms | `cubic-bezier(0.22, 1, 0.36, 1)` | Smooth, confident |
| Large (page transition, modal) | 400-600ms | `cubic-bezier(0.22, 1, 0.36, 1)` | Graceful, unhurried |
| Celebratory (evolution, achievement) | 600-1500ms | Custom per event | Memorable, theatrical |

**Timing rules**:

- Nothing should animate faster than 100ms (imperceptible)
- Nothing should animate slower than 1500ms (feels broken)
- Interactive feedback (hover, click) must respond within 150ms
- The pet's idle animations run on longer cycles (3-6 seconds)

### 7.3 Interaction Animations

**Hover**:

- Cards: Slight lift (translateY -2px) + shadow increase, 150ms ease-out
- Buttons: Brightness +10% + subtle scale (1.02), 100ms ease-out
- Links: Color transition to Honey, 100ms ease
- Icons: Subtle rotation or scale (1.1), 150ms ease-out

**Click/Press**:

- Buttons: Translate down 2-4px, shadow decrease, 100ms ease-in
- Cards: Slight press (translateY +1px), 100ms ease-in
- Interactive elements: Quick scale (0.97), 80ms ease-in, then release with bounce

**Open**:

- Cards expanding: Scale from 0.95 to 1 with soft bounce, opacity 0 to 1, 300ms
- Dropdowns: Scale-Y from 0.9 to 1, origin top, opacity 0 to 1, 200ms

**Close**:

- Scale to 0.95, opacity 1 to 0, 200ms ease-in
- Never hard-disappear — always fade or shrink

### 7.4 Page Transitions

Page transitions should feel like walking between rooms, not teleporting.

**Standard transition**:

- Outgoing page: Fade to 90% opacity, 150ms
- Incoming page: Fade from 0 to 100% + subtle translateY (8px to 0), 300ms ease-out
- Overlap: 50ms crossfade

**Scanner transition**:

- Unique animation for entering the scanner
- Room dims, spotlight effect on camera area
- Camera view slides up from bottom (mobile) or expands from center (desktop)
- Duration: 500ms

**Return from scanner**:

- Camera view slides back / shrinks
- Room brightens
- Pet appears with welcome-back animation

### 7.5 Pet Animations

The pet is the most animated element. Its movements define the game's personality.

**Idle animations** (continuous, looping):

| State | Animation | Duration | Notes |
|-------|-----------|----------|-------|
| Breathing | Gentle scale oscillation (1.0 to 1.02) | 3-4s | Always running, subtle |
| Blinking | Eye close for 2 frames | Random interval | Every 3-8 seconds |
| Tail wag | Slow side-to-side | 2-3s | When content or happy |
| Ear twitch | Quick ear rotation | Random interval | Every 10-20 seconds |
| Yawn | Full yawn sequence | 4s | When energy is low |
| Stretch | Full body stretch | 3s | After waking |
| Pounce | Quick forward hop | 0.5s | When curious and energetic |
| Nap | Curled up, slow breathing | Continuous | When sleeping |

**Reaction animations** (triggered by player):

| Trigger | Animation | Duration |
|---------|-----------|----------|
| Player opens app | Look up, ears perk, approach | 1-2s |
| Feed (scan) | Sniff, eat, happy reaction | 2-3s |
| Pet interaction | Purr, lean into touch | 1-2s |
| New product | Curious investigation, tentative sniff | 2-3s |
| Favorite product | Immediate excitement, bounce | 1-2s |

### 7.6 Event Animations

Major game events deserve special animation treatment.

**Level Up**:

- Pet glows briefly (golden shimmer, 500ms)
- Level number floats up from pet with bounce
- Particle burst (sparkles radiating outward)
- Duration: 1000ms total

**Evolution**:

- Full-screen event sequence
- Pet silhouette grows and transforms
- Light burst at climax
- New form revealed with sparkle shower
- Duration: 3-5 seconds
- This should feel like the most magical moment in the game

**Achievement Unlocked**:

- Badge slides in from top with bounce
- Golden shimmer on the badge
- Particle trail (sparkles)
- Duration: 800ms + 3s display

**Feeding (scan result)**:

- Product icon appears near pet
- Pet approaches and sniffs
- Eating animation
- Hearts or sparkles float up
- XP popup floats away
- Duration: 2-3s total

### 7.7 Particle Systems

Particles add life and magic to the world.

| Particle Type | Trigger | Appearance | Behavior |
|--------------|---------|------------|----------|
| Hearts | High affection interaction | Small pixel hearts, Rose color | Float up, fade out |
| Sparkles | Achievement, evolution | Golden star shapes, Sunbeam color | Burst outward, twinkle |
| ZZZ | Sleeping | Small "z" letters, Lavender color | Float up in wave pattern |
| Dust motes | Ambient | Tiny circles, warm white | Slow drift, random |
| XP orbs | Scanning | Small glowing circles, Honey color | Float up toward level indicator |
| Musical notes | Happy mood | Small note icons, Sage color | Float and bounce gently |
| Steam | Hot food scanned | Wispy shapes, white/gray | Rise and dissipate |

**Particle rules**:

- Particles should never obscure the pet
- Maximum 8-12 particles on screen at once
- Particles are small (8-16px) and subtle
- Always honor reduced-motion preferences (replace with static icons or disable)

---

## 8. Illustration Guidelines

### 8.1 Illustration Style

All custom illustrations follow the **Cozy Pixel Realism** style:

- Pixel-art base with modern polish
- Warm color palette (see Color System)
- Soft outlines (dark warm brown, not black)
- Limited color palette per illustration (4-6 colors maximum)
- Slight dithering for gradients (pixel-art technique)
- Visible but subtle texture (not flat fills)

**Illustration categories**:

| Category | Style | Detail Level |
|----------|-------|-------------|
| Pet sprites | 64x64 base pixel art | High — most detailed element |
| Room objects | 32x32 to 64x64 pixel art | Medium — readable, not intricate |
| Icons | 16x16 to 32x32 pixel art | Low — clear silhouette at small size |
| Decorations | 16x16 to 48x48 pixel art | Low to Medium |
| Background elements | Painted/soft, not pixel art | Low — atmospheric, blurred |

**Style rules**:

- Pet sprites are the highest-detail pixel art in the game
- Room objects are less detailed to avoid competing with the pet
- Background elements are soft-painted to create depth contrast with pixel art
- Never mix pixel-art and non-pixel-art for interactive elements

### 8.2 Background Style

The room background sets the stage for Scan Chan's life.

**Background approach**:

- Painted/soft style (not pixel art) to create depth contrast
- Warm, slightly desaturated compared to foreground elements
- Gentle gradient from warmer (bottom) to cooler (top)
- Window or light source creates natural lighting direction
- Subtle texture overlay (paper grain or watercolor feel)

**Background rules**:

- Background should never be pure white
- Background should never be a flat color fill
- Mesh gradients or soft painted textures are preferred
- The background is the "wall" of Scan Chan's room — it should feel like a real space

### 8.3 Decorative Elements

Small decorative elements add personality without cluttering.

**Approved decorative elements**:

- Pixel-art plants (potted, hanging, small succulents)
- Pixel-art books, mugs, cushions
- Soft cloud shapes in backgrounds
- Small star/sparkle accents
- Gentle dotted or wavy line dividers
- Seasonal decorations (pumpkins, snowflakes, flowers)

**Decorative rules**:

- Decorative elements should be sparse — 3-5 per screen maximum
- They should feel like they belong in the room, not pasted on
- Never use decorative elements to fill empty space — whitespace is intentional
- Seasonal decorations should be subtle, not overwhelming

### 8.4 Environmental Assets

Objects that exist in Scan Chan's room.

**Asset categories**:

| Category | Examples | Unlock Method |
|----------|----------|---------------|
| Furniture | Cat bed, shelf, desk, lamp | Level progression |
| Toys | Ball of yarn, mouse toy, feather wand | Achievement unlocks |
| Food items | Bowl, treats, water fountain | Scanning milestones |
| Seasonal | Tree, wreath, lantern | Seasonal events |
| Personal | Photo frame, scrapbook | Memory milestones |

**Asset style**: Pixel art, 32x32 to 64x64 base, consistent with pet sprite quality. Each asset should feel handcrafted and belong to the same world as Scan Chan.

### 8.5 Icons

Icons should be warm, rounded, and slightly playful.

**Icon style options** (choose one and stay consistent):

1. **Rounded stroke**: 2px stroke, rounded terminals, warm brown color
2. **Soft filled**: Solid fill with subtle gradient, rounded shapes
3. **Pixel-art**: Small pixel icons matching the game's pixel aesthetic

**Icon rules**:

- All icons must be recognizable at 16x16px
- Stroke-based icons use rounded terminals only
- Icons should use semantic colors when communicating meaning
- Never use sharp, angular, or corporate-style icons
- Custom icons should be designed, not taken from generic icon libraries without modification

### 8.6 Emoji Usage

Emoji should be used intentionally, never decoratively.

**Approved emoji usage**:

- In pet thought/speech bubbles (cat-appropriate expressions)
- In memory/achievement descriptions (to add warmth)
- In toast messages (to add personality)

**Banned emoji usage**:

- As section headers or navigation icons (use custom icons instead)
- Scattered as decoration without purpose
- In large quantities on any single screen
- As replacements for proper icon design

---

## 9. Accessibility

### 9.1 Readability

**Text rules**:

- Minimum body text size: 16px
- Minimum contrast ratio for body text: 4.5:1
- Minimum contrast ratio for large text (18px+): 3:1
- Line length should not exceed 65 characters on desktop
- Line height should be at least 1.5x the font size for body text
- Never use all-caps for more than 3 words in a row (labels only)

**Readability rules**:

- Text on colored backgrounds must pass contrast checks
- Text over images requires a backdrop (overlay or shadow)
- Never place body text directly on mesh gradients without a card/panel surface

### 9.2 Contrast

**Color contrast targets**:

| Element | Minimum Ratio |
|---------|--------------|
| Body text on background | 4.5:1 |
| Heading text on background | 4.5:1 |
| Large text (18px+) on background | 3:1 |
| Interactive element borders | 3:1 |
| Icon on background | 3:1 |
| Text on buttons | 4.5:1 |

**Contrast rules**:

- The warm cream background provides natural high contrast with dark brown text
- Never use low-contrast text for important information
- Muted/secondary text can be lower contrast but must remain legible
- Semantic colors on light backgrounds should be checked individually

### 9.3 Touch Targets

This is a mobile-first game. Touch targets must be generous.

**Touch target rules**:

- Minimum touch target: 44x44px (Apple HIG standard)
- Preferred touch target for primary actions: 48x48px or larger
- Minimum spacing between touch targets: 8px
- Buttons should feel large and inviting, not cramped
- Navigation items should be easy to tap without precision

**Touch target rules for the pet**:

- Tapping the pet should be easy and forgiving
- The pet's interactive area should be larger than the visible sprite
- Pet interaction should feel like petting, not clicking a button

### 9.4 Motion Reduction

All animations must respect `prefers-reduced-motion`.

**Reduced motion strategy**:

| Animation Type | Full Motion | Reduced Motion |
|---------------|------------|----------------|
| Page transitions | Fade + slide | Instant or fade only |
| Hover effects | Lift + shadow | Color change only |
| Pet idle | Breathing, blinking, tail | Static or minimal breathing |
| Particles | Floating, bursting | Static icons or disabled |
| Evolution | Full sequence | Static before/after |
| Level up | Particle burst | Badge update only |
| Popups | Scale + bounce | Fade only |

**Reduced motion rules**:

- The game must be fully functional and enjoyable with all motion disabled
- Pet idle animations should still have a subtle breathing cycle (if any motion is retained)
- Information should never be communicated only through animation

---

## 10. Design Principles

These principles govern every visual decision in Scan Chan. When in doubt, return here.

1. **The pet is always the visual center.** Every screen is designed around Scan Chan. UI frames the pet; it never competes with it.

2. **UI supports the pet instead of competing with it.** Buttons, panels, and text exist to serve the companion relationship. They are the stage, not the performer.

3. **Every page should immediately communicate warmth.** Before the player reads any text or processes any data, they should feel: "This is a cozy place."

4. **Avoid enterprise dashboard layouts.** No dense grids, no sidebar navigation, no data-heavy panels. This is a home, not an office.

5. **Avoid excessive information density.** If a screen has too much information, the pet gets lost. When in doubt, remove elements.

6. **Whitespace is a design element, not leftover space.** Generous spacing creates calm. Cramped layouts create anxiety.

7. **Colors communicate emotion, not just information.** Honey means warmth. Rose means love. Sky means energy. Every color has a purpose.

8. **Rounded everywhere.** The world of Scan Chan has no sharp edges. Every shape, every corner, every border is soft and approachable.

9. **Animation is life, but gentle life.** Things move, breathe, and respond — but never rush, snap, or startle.

10. **Consistency creates trust.** The same visual language applies everywhere. Buttons always look like buttons. Cards always look like cards. The player should never have to learn a new visual pattern.

11. **Every element earns its place.** If a visual element doesn't serve the pet, the player, or the atmosphere, it doesn't belong.

12. **Mobile-first means touch-first.** Every interactive element should feel good to tap. Large targets, satisfying press animations, generous spacing.

13. **The room feels lived-in.** Nothing is sterile. Nothing is perfectly aligned. Small imperfections make the space feel real and personal.

14. **Dark mode is nighttime, not inverted.** Dark mode creates a cozy nighttime atmosphere, not a color-flipped version of light mode.

15. **Special moments deserve special treatment.** Evolutions, achievements, and milestones should feel visually distinct from everyday interactions. They are memories being made.

---

## 11. Future Expansion

The visual language must scale gracefully to future features.

### 11.1 Furniture & Room Customization

- New furniture assets must match the existing pixel-art style
- Each furniture piece needs a 32x32 or 64x64 sprite
- Room layout should use a soft grid for placement
- Furniture should cast subtle shadows consistent with the lighting direction

### 11.2 Pet Room

- The room is the main stage for Scan Chan
- Room should have a clear "floor" area where the pet walks
- Walls should support decorations (shelves, frames, windows)
- Lighting in the room should shift with time of day

### 11.3 Events & Seasonal Themes

- Seasonal themes change the color palette subtly, not dramatically
- Spring: More greens, flower decorations, brighter palette
- Summer: Warm golden tones, sun effects, tropical decorations
- Autumn: Deep amber, falling leaves, cozy additions
- Winter: Cool blues with warm accents, snow effects, warm lighting
- Each season adds 5-10 decorative assets and adjusts the mesh gradient

### 11.4 Mini Games

- Mini-game UI should use the same component language (rounded, warm)
- Game-specific elements can be more playful but never break the visual system
- Mini-game screens should feel like a "play area" within the room
- Transitions into/out of mini-games should feel natural

### 11.5 Collections

- Collection views (scrapbook, pantry, gallery) must use the card system
- Items in collections should have consistent presentation
- Empty collection slots should feel inviting ("come fill me") not sad
- Collection progress should be visible but ambient

### 11.6 Social Features

- Friend profiles should use the same card language
- Pet visiting should feel like entering another room (same transition language)
- Gift-sending should use the feeding animation as a base
- Social features should never introduce new visual patterns

---

**Document Status**: This is the active visual design bible for Scan Chan. All UI/UX decisions must align with this document. When visual decisions are made during development, this document must be updated before implementation is considered complete.

**Document End**
