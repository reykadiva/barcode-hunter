# Scan Chan — UI Production Guide

**Version**: 1.0  
**Last Updated**: June 30, 2026  
**Status**: Active — Mandatory Reference for All UI Production  
**Document Type**: Design System Bible & UI Production Specification

---

> **This document defines the complete production system for every UI component inside Scan Chan.**  
> It is not another Visual Design Document. It is not another Brand Book. It is not about implementation.  
> It is the single source of truth for how every interface element is produced, sized, spaced, colored, animated, and composed.  
>  
> Every future UI must be built from this document.  
> If a UI element does not conform to this guide, it does not ship.

---

## Table of Contents

- [1. Design System Philosophy](#1-design-system-philosophy)
- [2. Visual Hierarchy](#2-visual-hierarchy)
- [3. Layout System](#3-layout-system)
- [4. Spacing System](#4-spacing-system)
- [5. Radius System](#5-radius-system)
- [6. Elevation System](#6-elevation-system)
- [7. Color Application](#7-color-application)
- [8. Typography Application](#8-typography-application)
- [9. Iconography System](#9-iconography-system)
- [10. Button System](#10-button-system)
- [11. Card System](#11-card-system)
- [12. Navigation System](#12-navigation-system)
- [13. Modal System](#13-modal-system)
- [14. HUD System](#14-hud-system)
- [15. Scanner UI](#15-scanner-ui)
- [16. Forms](#16-forms)
- [17. Lists & Collections](#17-lists--collections)
- [18. Motion System](#18-motion-system)
- [19. Responsive Rules](#19-responsive-rules)
- [20. Accessibility Rules](#20-accessibility-rules)
- [21. Empty States](#21-empty-states)
- [22. Loading States](#22-loading-states)
- [23. Error States](#23-error-states)
- [24. Reward Presentation](#24-reward-presentation)
- [25. Home Hub Blueprint](#25-home-hub-blueprint)
- [26. Component Checklist](#26-component-checklist)
- [27. Design System Evolution](#27-design-system-evolution)

---

## 1. Design System Philosophy

### 1.1 Why the Interface Exists

The Scan Chan interface exists for one reason: to create a warm, quiet space where a small companion lives.

Every UI element — every button, every card, every label, every shadow — exists to support that companion. The interface is not the product. The interface is the room. The pet is the product.

If the interface disappears and the player sees only their cat, sitting in a sunlit room, waiting for them — the design system has succeeded.

### 1.2 How the Interface Supports the Pet

The interface supports the pet through five mechanisms:

| Mechanism | Description |
|-----------|-------------|
| **Framing** | UI elements form a soft border around the pet's space, like the frame of a painting. They never cross into the painting. |
| **Atmosphere** | Backgrounds, gradients, and lighting create the room the pet lives in. The UI paints the walls, the light, the warmth. |
| **Information** | When the player needs to know something — hunger, level, missions — the UI communicates it ambiently, without data panels. |
| **Action** | When the player wants to do something — scan, feed, navigate — the UI provides soft, rounded tools that feel like touching cushions. |
| **Celebration** | When something special happens — evolution, achievement, milestone — the UI steps forward briefly to honor the moment, then retreats. |

### 1.3 Why the UI Should Disappear

The best interface in a companion game is one the player never thinks about.

When a player opens Scan Chan, they should not think "nice UI." They should think "there you are." The interface is the glass of the window — invisible, clean, allowing the view to be the focus.

Every pixel of UI chrome is a pixel that is not the pet. Every element that competes with the pet for attention is an element that weakens the companion bond.

The UI must be present. It must be functional. It must be beautiful. But it must never be the star.

### 1.4 Core Principles

These ten principles govern every UI decision in Scan Chan. When in doubt, return here.

#### Principle 1: Pet First, Always

The pet is the largest, most detailed, most animated element on every screen. If the pet is not the first thing the eye finds, the layout is wrong.

#### Principle 2: Warmth Is the Default

Every color, every shape, every shadow, every transition must feel warm. The player should feel like they are looking at something bathed in afternoon sunlight. Cool colors exist only as contrast or night mode.

#### Principle 3: Softness Everywhere

No sharp corners. No hard edges. No aggressive geometry. Every element has a radius. Every transition has an ease. Every interaction feels like pressing something soft.

#### Principle 4: Less Is More

One beautiful thing beats ten adequate things. One clear action beats five competing buttons. One warm color beats a rainbow. Restraint is the design system's greatest strength.

#### Principle 5: Consistency Creates Trust

Every button behaves the same way. Every card looks like it belongs to the same family. Every animation uses the same easing. The player never has to learn a new pattern. The system teaches once and repeats forever.

#### Principle 6: Information Is Ambient

Stats, numbers, progress — these exist, but they whisper. They do not shout. The player should understand how their pet feels by looking at the cat, not by reading a dashboard. Numbers are secondary to behavior.

#### Principle 7: Motion Is Life, But Gentle Life

Things breathe, float, settle, and respond. Nothing snaps, jolts, or startles. Every animation feels like watching a cat stretch — slow, organic, peaceful.

#### Principle 8: Every Element Earns Its Place

If a UI element does not serve the pet, the player, or the atmosphere, it does not belong. Decoration without purpose is noise. Every element must justify its presence.

#### Principle 9: Mobile-First Means Touch-First

Every interactive element must feel good to tap. Large targets. Satisfying press animations. Generous spacing. The player's thumb should never strain.

#### Principle 10: The Room Feels Lived-In

Nothing is sterile. Nothing is perfectly aligned. Small imperfections, warm shadows, and organic textures make the space feel real and personal. The UI should feel handcrafted, not manufactured.

### 1.5 Anti-Patterns

These patterns are explicitly banned from Scan Chan. If any of these appear in a design, it must be revised.

#### Banned Pattern 1: Dashboard Layouts

No dense data grids. No sidebar navigation with 10+ items. No multi-column layouts with competing information. No charts or graphs as primary UI elements. Scan Chan is a home, not an office.

#### Banned Pattern 2: SaaS Visual Language

No sharp-edged cards with thin borders. No gray-on-gray text hierarchies. No enterprise color schemes (corporate blue, sterile white). No dropdown-heavy navigation. No admin-panel aesthetics.

#### Banned Pattern 3: AI-Generated Defaults

No generic gradient cards with centered text. No identical rounded rectangles in a perfect grid. No purple-to-blue gradients. No overuse of glassmorphism. No cookie-cutter hero sections. No Inter or Roboto as the typeface. No Tailwind defaults without customization. No identical spacing everywhere.

#### Banned Pattern 4: Urgency Mechanics

No countdown timers. No red flashing banners. No "last chance" messaging. No decaying progress bars. No FOMO-inducing visual patterns. The UI never pressures the player.

#### Banned Pattern 5: Pure Black or Pure White

No `#000000` anywhere. No `#FFFFFF` as a background. The darkest allowed color is `#1A1625` (Deep Indigo). The lightest allowed background is `#FFF8F0` (Cream). Everything lives in the warm spectrum.

#### Banned Pattern 6: Competing Focal Points

No screen may have two elements that compete for the same level of attention. If two elements are equally prominent, the layout fails. One element dominates. Everything else supports.

---

## 2. Visual Hierarchy

### 2.1 Primary Focus

The primary focus is always the pet. On every screen where the pet appears — which is most screens — the pet is the largest, most saturated, most animated element. It occupies the center-to-lower-center of the viewport, where a cat would naturally sit on a cushion.

The pet's sprite is rendered at the highest detail level in the entire application. It has the most colors, the most animation frames, and the most visual richness. Nothing else on the screen approaches this level of detail.

### 2.2 Secondary Focus

The secondary focus is the primary action available to the player. On the Home Hub, this is the "Scan" button. On the Scanner screen, this is the camera viewfinder. On the Collection screen, this is the grid of discovered products.

Secondary focus elements use:
- Honey (`#F5A623`) as their dominant color
- Larger size than surrounding elements (but smaller than the pet)
- Position near the bottom of the screen (thumb-reachable on mobile)
- Subtle animation to draw attention (gentle pulse, soft glow)

### 2.3 Tertiary Focus

Tertiary elements include navigation, stats, missions, and supplementary information. They exist at the edges of the screen — top for status, bottom for navigation, sides for supplementary panels on larger screens.

Tertiary elements use:
- Muted colors (lower saturation, lighter weight)
- Smaller sizes
- Reduced opacity or lighter text weight
- Minimal animation (only on state change)

### 2.4 Eye Movement

Every screen follows a predictable eye movement pattern:

**Home Hub**: Pet → Room atmosphere → Primary action (Scan) → HUD elements → Navigation
**Collection**: Featured item → Grid → Filter/Sort → Navigation
**Scanner**: Camera viewfinder → Pet in corner → Status indicators → Cancel button
**Profile**: Pet portrait → Name → Stats → Achievements → Navigation

The eye should always return to the pet. If the eye gets "stuck" on a UI element and does not naturally flow back to the companion, the hierarchy is wrong.

### 2.5 Reading Order

Information is consumed in this order:

1. **Visual** — The pet's appearance and behavior communicate state before any text
2. **Ambient** — Background color, lighting, and particles communicate atmosphere
3. **Iconic** — Small icons near the pet communicate specific stats (food bowl, heart, moon)
4. **Textual** — Labels, numbers, and descriptions are the last resort for communication

This order is intentional. The player should be able to understand their pet's state without reading a single word.

### 2.6 Attention Management

The design system uses a strict attention budget:

| Attention Level | Allowed Elements | Screen Percentage |
|----------------|-----------------|-------------------|
| **High** | Pet, primary action | 40-60% of visual weight |
| **Medium** | Secondary information, cards | 20-30% of visual weight |
| **Low** | Navigation, stats, metadata | 10-20% of visual weight |
| **Ambient** | Background, particles, decorations | 5-10% of visual weight |

No screen may have more than one high-attention element (besides the pet). If a design requires two equally prominent elements, one must be reduced.

---

## 3. Layout System

### 3.1 Desktop Grid

**Container width**: 768px maximum content width, centered in the viewport.

**Column structure**: Single column by default. The pet's room occupies the full container width. Side panels are permitted only for supplementary information (statistics, collection previews) and are limited to 240px width.

**Layout composition**:

```
┌─────────────────────────────────────────────────────┐
│                    Viewport                          │
│  ┌──────────────────────────────────────────────┐   │
│  │          Pet Room (full width)               │   │
│  │                                              │   │
│  │              [Pet Sprite]                    │   │
│  │                                              │   │
│  └──────────────────────────────────────────────┘   │
│  ┌────────────────┐  ┌──────────────────────────┐   │
│  │  Side Panel    │  │  Content Area            │   │
│  │  (optional)    │  │  (missions, collection)  │   │
│  │  240px max     │  │  fills remaining         │   │
│  └────────────────┘  └──────────────────────────┘   │
│  ┌──────────────────────────────────────────────┐   │
│  │          Bottom Navigation (desktop)         │   │
│  └──────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────┘
```

**Side panel rules**:
- Side panels are optional, never mandatory
- When present, they appear on the right side
- Side panels use a subtle background color shift (Subtle cream `#FEF3E2`) to distinguish from the main content
- Side panels never contain primary actions
- Side panels collapse to a bottom section on tablet/mobile

### 3.2 Tablet Grid

**Container width**: 640px maximum content width, centered.

**Column structure**: Single column. The pet's room fills the full width. No side panels. Content stacks vertically below the pet room.

**Layout differences from desktop**:
- No side panels
- Navigation moves to bottom bar
- Cards arrange in 2-column grid where content naturally pairs
- Pet room height increases to use the wider aspect ratio

### 3.3 Mobile Grid

**Container width**: 100% viewport width with 16px edge margins.

**Column structure**: Single column, full-width stacking. The pet room fills the viewport. Content appears below, accessible via scroll.

**Layout composition**:

```
┌──────────────────────────┐
│      Status Bar (OS)     │
├──────────────────────────┤
│   HUD (level, streak)    │
│                          │
│                          │
│      [Pet Sprite]        │
│                          │
│                          │
│   Primary Action (Scan)  │
│                          │
├──────────────────────────┤
│   Bottom Navigation      │
└──────────────────────────┘
```

**Mobile rules**:
- Bottom navigation is mandatory (thumb-reachable)
- Primary action button is bottom-center, above navigation
- HUD elements cluster at the top
- Pet occupies the middle 50-60% of the viewport
- No horizontal scrolling, ever
- Touch targets minimum 44×44px

### 3.4 Container Widths

| Context | Max Width | Notes |
|---------|-----------|-------|
| Page content | 768px | Centered in viewport |
| Pet room | 768px (desktop), 100% (mobile) | Full available width |
| Cards | 400px max | Prevents cards from stretching too wide |
| Modals/Dialogs | 480px max | Centered, with warm overlay |
| Text content | 640px max | Optimal reading width (~65 chars) |
| Forms | 480px max | Centered, comfortable input width |
| Navigation (desktop) | 768px max | Aligned with content container |

### 3.5 Margins

| Context | Value | Notes |
|---------|-------|-------|
| Page edge (mobile) | 16px | Comfortable thumb margin |
| Page edge (tablet) | 24px | More breathing room |
| Page edge (desktop) | 32px | Generous whitespace |
| Card internal | 24-32px | Generous internal breathing |
| Modal internal | 32-40px | Dialogs feel spacious |
| Section top/bottom | 48-64px | Major section separation |

### 3.6 Safe Areas

On devices with notches, rounded corners, or home indicators:

- **Top safe area**: Minimum 44px from top edge for HUD elements
- **Bottom safe area**: Minimum 34px from bottom edge for navigation
- **Side safe areas**: 16px minimum from any edge for interactive elements
- The pet sprite must never be clipped by a safe area boundary

### 3.7 Maximum Readable Width

Text content must never exceed 640px width. This ensures approximately 65 characters per line — the optimal reading width for comfortable comprehension.

Body text containers:
- Desktop: 640px max, centered
- Tablet: 560px max, centered
- Mobile: 100% minus 32px margins (edge padding)

### 3.8 Content Flow

Content flows vertically, like pages in a storybook:

1. **Hero area** — Pet room (always first, always dominant)
2. **Quick actions** — Primary and secondary actions (scan, feed, play)
3. **Status area** — Current missions, recent activity
4. **Collection preview** — Recent discoveries, progress
5. **Navigation** — Always reachable, always at the bottom

Horizontal flow is used only within card grids (collections, achievements) and never for primary navigation.

### 3.9 Whitespace Philosophy

Whitespace is not empty space. It is the room where the pet breathes.

**Whitespace rules**:

- The pet's immediate area: minimum 40-60px clear space on all sides
- Between major sections: 48-64px
- Between cards: 16-24px
- Inside cards: 24-32px padding
- Between text paragraphs: 16-24px
- Around primary action buttons: minimum 24px clear space

**The golden rule**: When in doubt, add more whitespace. A page that feels "too empty" is almost always better than a page that feels "too full." The player should feel the calm of an open room, not the pressure of a crowded one.

**Whitespace is proportional**: Larger elements get more whitespace around them. The pet (the largest element) gets the most. A tiny badge gets the least. This creates a natural rhythm that guides the eye.

---

## 4. Spacing System

### 4.1 The 4px Grid

Every spacing value in Scan Chan is a multiple of 4px. This creates a consistent visual rhythm that the player feels subconsciously as harmony.

No element may be positioned at a non-4px value. Margins, padding, gaps, offsets, and transforms all conform to the 4px grid.

**Exception**: 2px is permitted for tight internal gaps (icon-to-text spacing within a button) and for border widths.

### 4.2 Spacing Scale

| Token | Value | Usage |
|-------|-------|-------|
| `space-0.5` | 2px | Tight internal gaps (icon-to-text within buttons), border widths |
| `space-1` | 4px | Minimum gap (badge padding, tight icon spacing) |
| `space-2` | 8px | Small gaps (between related items, badge padding) |
| `space-3` | 12px | Inline spacing (label to input, icon to label) |
| `space-4` | 16px | Default gap between related elements |
| `space-5` | 20px | Between related groups (card title to card body) |
| `space-6` | 24px | Card internal padding, between card grid items |
| `space-8` | 32px | Between sections, card padding (generous) |
| `space-10` | 40px | Between major sections |
| `space-12` | 48px | Page-level section breaks |
| `space-16` | 64px | Top/bottom page margins (desktop) |
| `space-20` | 80px | Hero section padding |
| `space-24` | 96px | Major page divisions |

### 4.3 Internal Spacing

Internal spacing (inside components) follows a tighter scale:

| Component | Internal Padding | Notes |
|-----------|-----------------|-------|
| Button (large) | 16px vertical, 32px horizontal | Generous, pressable |
| Button (medium) | 12px vertical, 24px horizontal | Standard |
| Button (small) | 8px vertical, 16px horizontal | Compact |
| Card | 24-32px all sides | Spacious, warm |
| Input | 12-16px vertical, 16-20px horizontal | Comfortable |
| Badge | 4-8px vertical, 8-12px horizontal | Compact pill |
| Dialog | 32-40px all sides | Spacious, important |
| Toast | 12-16px vertical, 16-24px horizontal | Quick, compact |
| HUD element | 8-12px internal | Compact, ambient |
| Navigation item | 8-12px vertical, 12-16px horizontal | Tappable |

### 4.4 External Spacing

External spacing (between components) follows the full scale:

| Context | Spacing | Notes |
|---------|---------|-------|
| Between buttons in a group | 12px | Close enough to feel related |
| Between button and content | 24px | Clear separation |
| Between cards in a grid | 16-20px | Grid rhythm |
| Between card and section edge | 16px (mobile), 24px (desktop) | Edge breathing room |
| Between form fields | 16-20px | Scannable forms |
| Between list items | 8-12px | Compact list rhythm |
| Between navigation items | 8-16px | Tappable spacing |

### 4.5 Section Spacing

Sections are separated by generous whitespace:

| Section Type | Spacing | Notes |
|-------------|---------|-------|
| Pet room to content below | 32-48px | Clear transition from pet to UI |
| Between major sections | 48-64px | Breathing room |
| Between subsections | 32-40px | Subtle grouping |
| Page top margin | 64-80px | Grand entrance |
| Page bottom margin | 80-96px | Comfortable end |

### 4.6 Component Spacing

Within a component, spacing creates rhythm:

| Component | Element Spacing | Example |
|-----------|----------------|---------|
| Card with title + body | Title to body: 12px | Clear hierarchy |
| Card with image + text | Image to text: 16px | Visual separation |
| List item with icon + text | Icon to text: 12px | Related but distinct |
| Button with icon + label | Icon to label: 8px | Tight, unified |
| Badge with icon + text | Icon to text: 4px | Compact |
| Navigation with icon + label | Icon to label: 4px | Tight pair |

### 4.7 Visual Rhythm

Visual rhythm is created by alternating between dense and sparse areas:

```
[Sparse]  Pet room — large, open, breathing
[Dense]   Action buttons — clustered, tappable
[Sparse]  Section break — whitespace
[Dense]   Card grid — organized, scannable
[Sparse]  Section break — whitespace
[Dense]   Mission list — organized items
[Sparse]  Page end — generous bottom margin
```

This alternation prevents the page from feeling monotonous (all sparse) or overwhelming (all dense). The eye rests in sparse areas and engages in dense areas.

---

## 5. Radius System

### 5.1 Corner Radius Scale

Everything in Scan Chan is rounded. This is non-negotiable. The world of Scan Chan has no sharp edges.

The radius scale is proportional: larger containers receive larger radii. This creates a natural softness that feels organic rather than geometric.

| Token | Value | Usage |
|-------|-------|-------|
| `radius-sm` | 12px | Small elements: badges, small buttons, tooltips |
| `radius-md` | 16px | Medium elements: inputs, small cards, images |
| `radius-lg` | 24px | Large elements: standard cards, panels |
| `radius-xl` | 32px | Extra-large elements: modals, dialogs, large panels |
| `radius-2xl` | 40px | Maximum containers: full-width section backgrounds |
| `radius-full` | 999px | Pill shapes: buttons, progress bars, tab containers, badges |
| `radius-circle` | 50% | Circles: avatars, icon buttons, level indicators |

### 5.2 Button Radius

All buttons use `radius-full` (999px). This creates the pill shape that is a signature element of the Scan Chan interface.

No button may ever have a radius below 999px. This includes icon buttons (which are circles, using `radius-circle`), primary buttons, secondary buttons, and ghost buttons.

### 5.3 Card Radius

| Card Type | Radius | Notes |
|-----------|--------|-------|
| Standard card | 24px | Default, generous softness |
| Interactive card | 24px | Same as standard |
| Pet card | 32px | Extra softness for the companion |
| Achievement card | 24px | Consistent with standard |
| Mission card | 24px | Consistent with standard |
| Product card | 20px | Slightly tighter for grid density |
| Stat card | 20px | Compact but soft |

### 5.4 Dialog Radius

| Dialog Type | Radius | Notes |
|-------------|--------|-------|
| Standard modal | 32px | Spacious, important |
| Confirmation dialog | 32px | Consistent with modal |
| Bottom sheet | 32px top corners only | Rounded top, flat bottom |
| Reward popup | 32px | Celebratory, soft |
| Evolution popup | 40px | Extra-large for the most special moment |

### 5.5 Popup Radius

| Popup Type | Radius | Notes |
|------------|--------|-------|
| Toast notification | 16px | Compact, quick |
| XP popup | 999px (pill) | Floating near pet |
| Dropdown menu | 20px | Soft, approachable |
| Tooltip | 12px | Small, unobtrusive |
| Context menu | 20px | Consistent with dropdown |

### 5.6 Avatar Radius

All avatars are circles (`radius-circle`, 50%). This applies to:
- Pet portraits
- Player avatars
- Friend avatars (future)
- Any circular image representation

### 5.7 Image Radius

| Image Type | Radius | Notes |
|------------|--------|-------|
| Product image | 16px | Consistent with card content |
| Achievement image | 50% (circle) | Badge-like |
| Room screenshot | 24px | Matches card radius |
| Banner image | 24px | Matches section containers |
| Thumbnail | 12px | Small but soft |

### 5.8 Pet Canvas Radius

The pet's display area uses one of two treatments:

1. **No visible container** (preferred) — The pet sits directly on the room background. No border, no radius, no visible container. The pet's world IS the screen.
2. **Soft vignette** (alternative) — A very large radius (40-48px) with a subtle inner shadow creates a soft frame, like looking through a rounded window.

The pet canvas must never have a visible hard border. If a container is needed, it must blend into the background through color matching and soft shadows.

---

## 6. Elevation System

### 6.1 Shadow Language

Shadows in Scan Chan communicate depth and importance. They are always warm-toned — never gray, never blue, never black. Every shadow uses a warm brown base (`#2D2620`) at low opacity.

Shadows serve three purposes:

1. **Depth** — Communicating which elements are closer to the viewer
2. **Importance** — Elevating elements that need attention
3. **Separation** — Distinguishing overlapping layers without harsh borders

### 6.2 Shadow Levels

| Level | Name | CSS Value | Usage |
|-------|------|-----------|-------|
| 0 | None | No shadow | Background elements, flat surfaces |
| 1 | Subtle | `0 2px 8px rgba(45,38,32,0.06)` | Cards at rest, subtle separation |
| 2 | Low | `0 4px 12px rgba(45,38,32,0.08)` | Interactive cards, slightly elevated |
| 3 | Medium | `0 8px 24px rgba(45,38,32,0.10)` | Buttons, floating elements |
| 4 | High | `0 12px 32px rgba(45,38,32,0.12)` | Modals, dialogs, popups |
| 5 | Highest | `0 20px 48px rgba(45,38,32,0.16)` | Full-screen overlays, evolution popup |

**Shadow rules**:
- Shadows always point downward (light source is upper-left)
- Shadow color is always warm brown, never gray or black
- Shadow opacity never exceeds 0.16 (16%)
- Shadow blur is always generous (minimum 8px)
- No element may have a hard shadow (0 blur)

### 6.3 Border Usage

Borders are used sparingly in Scan Chan. The design system prefers elevation (shadows) and background color shifts to communicate separation.

**When borders are allowed**:
- Input fields (2px warm gray, transitions to Honey on focus)
- Secondary/ghost buttons (2px border as their primary visual)
- Cards that need subtle definition (1px warm white at low opacity)
- Status badges (thin semantic-colored border)

**When borders are banned**:
- Primary buttons (use fill color, not border)
- Panels (use background color shift)
- Between sections (use whitespace)
- Around the pet (never frame the pet with a border)

**Border color rules**:
- Default border: Warm gray `rgba(45,38,32,0.12)`
- Focus border: Honey `#F5A623`
- Active border: Honey Dark `#C4841D`
- Error border: Coral `#FB923C` or Muted Red `#F87171`
- Never use pure gray borders (`#CCCCCC`, `#E0E0E0`)

### 6.4 Floating Hierarchy

The z-axis hierarchy of the application:

| Z-Level | Layer | Elements |
|---------|-------|----------|
| 0 | Background | Room walls, window, ambient decorations |
| 1 | Environment | Furniture, objects, plants |
| 2 | Pet | Scan Chan (always prominent, never obscured) |
| 3 | Foreground UI | HUD elements, navigation, action buttons |
| 4 | Overlays | Modals, popups, toasts, bottom sheets |
| 5 | System | Loading spinners, system notifications |

**Layer rules**:
- The pet is always on layer 2 and is never obscured by layer 3
- HUD elements float above but never cover the pet's face or body
- Modals dim everything below layer 4 with a warm overlay
- Toast notifications appear at layer 5 but are compact and auto-dismiss

### 6.5 Glass Usage

Glassmorphism (frosted glass effect) is used with extreme restraint. It is permitted only in these contexts:

- **Bottom navigation bar** (mobile): Subtle backdrop blur to separate navigation from scrolling content
- **Scanner overlay**: Frosted glass around the viewfinder area
- **Toast notifications**: Subtle glass background for readability over any content

**Glass rules**:
- Blur radius: 12-20px
- Background: Warm white at 60-80% opacity (never pure white)
- Border: 1px warm white at 20% opacity (optional)
- Shadow: Level 1 or 2 warm shadow
- Never use cool-tinted glass (no blue, no purple tint)
- Glass must always have a warm color cast

### 6.6 Blur Usage

Blur is used for depth and focus:

| Context | Blur Amount | Purpose |
|---------|-------------|---------|
| Modal backdrop | 8-12px | Focus attention on dialog |
| Background elements (depth) | 2-4px | Create depth-of-field effect |
| Bottom navigation backdrop | 12-16px | Separate nav from content |
| Scanner non-focus area | 4-8px | Direct attention to viewfinder |
| Toast backdrop | 8-12px | Readability over content |

**Blur rules**:
- Blur is always a warm blur (never cool or neutral)
- Blur must never obscure the pet
- Reduced-motion preference: Replace blur transitions with simple opacity fades

### 6.7 Lighting Interaction

The UI responds to the time-of-day lighting system defined in the Brand Book:

| Time | Shadow Adjustment | Color Cast |
|------|-------------------|------------|
| Morning (6-10 AM) | Longer, softer shadows | Warm gold tint |
| Midday (10 AM-2 PM) | Shorter, brighter shadows | Neutral warmth |
| Afternoon (2-6 PM) | Medium shadows, warm | Amber warmth |
| Evening (6-9 PM) | Longer, deeper shadows | Deep amber |
| Night (9 PM-6 AM) | Very soft, diffused | Cool lavender with warm lamp glow |

Shadows shift subtly with the lighting. In morning, shadows are longer and more visible. At night, shadows are softer and more diffused. This creates a living, breathing interface that feels connected to the real world.

---

## 7. Color Application

### 7.1 Where Every Color Is Allowed

The Scan Chan color palette (defined in the Visual Design Document and Brand Book) is applied with strict intention. Every color has a purpose and a permitted zone.

**Primary colors**:

| Color | Hex | Allowed Usage | Forbidden Usage |
|-------|-----|---------------|-----------------|
| Honey | `#F5A623` | Primary action buttons, key highlights, XP indicators, active navigation, focus states | Background fills, large area fills, text color on light backgrounds |
| Honey Light | `#FFD580` | Hover states, soft highlights, secondary emphasis | Background fills, text color |
| Honey Dark | `#C4841D` | Active/pressed states, deep accents | Text color, large fills |
| Cream | `#FFF8F0` | Page backgrounds, card fills | Text color, outlines |
| Warm White | `#FFFDF9` | Elevated surfaces, popover backgrounds, card fills | Text color |

**Secondary colors**:

| Color | Hex | Allowed Usage | Forbidden Usage |
|-------|-----|---------------|-----------------|
| Rose | `#F472B6` | Affection indicators, love UI, hearts, mood stat | Primary actions, warnings, errors |
| Rose Light | `#FBC4DE` | Soft backgrounds for affection content | Text color |
| Sage | `#86EFAC` | Positive states, success indicators, curiosity stat | Errors, warnings, primary actions |
| Sage Dark | `#4ADE80` | Active positive states, confirmed states | Text on light backgrounds |
| Sky | `#67E8F9` | Energy stat, information, links | Primary actions, warnings |
| Sky Dark | `#22D3EE` | Active information states | Text on light backgrounds |

**Accent colors**:

| Color | Hex | Allowed Usage | Forbidden Usage |
|-------|-----|---------------|-----------------|
| Sunbeam | `#FDE047` | Achievements, celebrations, rare highlights | Common UI elements, backgrounds |
| Lavender | `#C4B5FD` | Night mode tinting, sleep states, wisdom | Primary actions, daytime UI |
| Coral | `#FB923C` | Gentle warnings, attention, low hunger | Errors (use Muted Red), destructive actions |
| Petal | `#FDA4AF` | Gentle mood indicators | Errors, warnings |

### 7.2 Primary Actions

Primary actions use Honey (`#F5A623`) as their fill color.

- **One primary action per screen maximum**
- The primary action is always the most important thing the player can do on that screen
- Text on primary buttons is white or dark brown (`#2D2620`), whichever passes contrast
- Primary buttons use `radius-full` (pill shape)
- Shadow: Level 3 warm shadow

### 7.3 Secondary Actions

Secondary actions use transparent fills with Honey or Rose borders:

- Fill: Transparent
- Border: 2px Honey (`#F5A623`) or Rose (`#F472B6`)
- Text: Same color as border
- No shadow at rest
- Hover: Light fill (10% opacity of border color)

### 7.4 Warnings

Warnings use Coral (`#FB923C`) — gentle, not alarming:

- Warning text: Coral or Dark Coral
- Warning icons: Coral
- Warning backgrounds: Coral at 10% opacity
- Warning borders: Coral at 30% opacity
- Warning messages use warm, reassuring language (never alarming)

### 7.5 Success

Success uses Sage (`#86EFAC`):

- Success text: Sage Dark (`#4ADE80`) on dark backgrounds, dark green on light backgrounds
- Success icons: Sage
- Success backgrounds: Sage at 10% opacity
- Success borders: Sage at 30% opacity

### 7.6 Information

Information uses Sky (`#67E8F9`):

- Info text: Sky Dark (`#22D3EE`) on dark backgrounds, dark teal on light
- Info icons: Sky
- Info backgrounds: Sky at 10% opacity
- Info links: Sky with Honey hover

### 7.7 Disabled

Disabled elements use reduced opacity and desaturated colors:

- Fill: Original color at 30% opacity
- Text: Original color at 40% opacity
- Border: Original color at 20% opacity
- Cursor: not-allowed
- No hover/active states

### 7.8 Hover

Hover states brighten the element slightly:

- Primary buttons: Brightness +10%, subtle scale (1.02)
- Secondary buttons: Light fill appears (10% opacity)
- Cards: Slight lift (translateY -2px), shadow increases to Level 2
- Links: Color transitions to Honey
- Icons: Subtle scale (1.1)
- Duration: 100-150ms ease-out

### 7.9 Pressed

Pressed states create a satisfying "give":

- Primary buttons: Translate down 2-4px, shadow decreases, brightness -5%
- Secondary buttons: Fill increases to 20% opacity
- Cards: Slight press (translateY +1px), shadow decreases
- Interactive elements: Quick scale (0.97), 80ms ease-in
- Duration: 80-100ms ease-in

### 7.10 Selected

Selected states use Honey as the indicator:

- Selected background: Honey at 10% opacity
- Selected border: 2px Honey
- Selected text: Honey Dark or primary text color
- Selected icon: Honey fill
- A subtle left border (4px Honey) can indicate selected items in lists

### 7.11 Focus

Focus states are visible, warm, and never clinical:

- Focus ring: 2px Honey (`#F5A623`) with 4px offset
- Focus glow: Soft Honey outer glow at 20% opacity
- Never use blue focus rings (browser defaults)
- Focus states must be visible in both light and dark modes

### 7.12 Background Hierarchy

Backgrounds create depth through subtle color shifts:

| Layer | Color | Hex | Usage |
|-------|-------|-----|-------|
| Base | Cream | `#FFF8F0` | Page background, never pure white |
| Surface | Warm White | `#FFFDF9` | Cards, elevated areas |
| Subtle | Subtle Cream | `#FEF3E2` | Alternate sections, gentle separation |
| Deep | Warm Beige | `#F5ECD7` | Deeper recessed areas |
| Overlay | Warm dark | `rgba(45,38,32,0.40)` | Modal backdrops |
| Mesh | Gradient blend | Multi-point radial | Organic backgrounds at 30-40% opacity |

**Background rules**:
- The base background is always Cream, never pure white
- Cards sit on Warm White to create subtle elevation
- Alternate sections use Subtle Cream for gentle separation
- Mesh gradients add organic warmth but are used sparingly (hero areas, landing pages)
- Background color shifts subtly with the pet's emotional state (max 10-15% adjustment)

---

## 8. Typography Application

### 8.1 Heading Hierarchy

Headings use Fredoka — rounded, friendly, warm.

| Level | Token | Size | Weight | Line Height | Usage |
|-------|-------|------|--------|-------------|-------|
| H1 | `text-3xl` / `text-4xl` | 40-48px | 700 (Bold) | 48-56px | Page titles (rare — only landing, evolution) |
| H2 | `text-2xl` | 32px | 600 (SemiBold) | 40px | Section headers |
| H3 | `text-xl` | 24px | 600 (SemiBold) | 32px | Subsection headers, card titles |
| H4 | `text-lg` | 20px | 500 (Medium) | 28px | Card subtitles, group headers |

**Heading rules**:
- Headings use the primary text color (Dark Warm Brown `#2D2620`)
- Headings are never ALL CAPS (except very short labels, max 3 words)
- Headings are never underlined
- Letter-spacing is default (Fredoka's natural spacing is warm)
- Headings should feel inviting, not imposing

### 8.2 Body Hierarchy

Body text uses Nunito — clean, readable, warm.

| Level | Token | Size | Weight | Line Height | Usage |
|-------|-------|------|--------|-------------|-------|
| Body Large | `text-lg` | 20px | 400-500 | 28px | Lead text, prominent descriptions |
| Body Default | `text-base` | 16px | 400-500 | 24px | Standard body text, descriptions |
| Body Small | `text-sm` | 14px | 400-500 | 20px | Secondary text, metadata, captions |
| Body Tiny | `text-xs` | 12px | 400-500 | 16px | Timestamps, fine print, badges |

**Body rules**:
- Minimum body text size: 16px (comfortable reading)
- Minimum contrast ratio: 4.5:1 for body text
- Line length: maximum 65 characters on desktop
- Line height: at least 1.5x font size
- Body text uses primary text color for main content, muted color for secondary

### 8.3 Labels

Labels use Nunito with increased weight:

| Label Type | Size | Weight | Case | Color |
|------------|------|--------|------|-------|
| Form label | 14px | 600 (SemiBold) | Sentence | Primary text |
| Card label | 12px | 600 (SemiBold) | Sentence | Muted text |
| Section label | 12-14px | 700 (Bold) | Optional uppercase | Muted or Honey |
| Navigation label | 12px | 600 (SemiBold) | Sentence | Muted (inactive), Primary (active) |
| Button label | 14-16px | 600 (SemiBold) | Sentence | Varies by button type |

### 8.4 Captions

Captions provide supplementary context:

- Size: 12-14px
- Font: Nunito
- Weight: 400-500
- Color: Muted text (`#A09888` or equivalent)
- Style: Italic permitted for poetic or whispered text (pet thought bubbles)

### 8.5 Button Labels

| Button Type | Font | Size | Weight | Color |
|-------------|------|------|--------|-------|
| Primary | Fredoka | 16px | 600 (SemiBold) | White or Dark Brown |
| Secondary | Fredoka | 14-16px | 500 (Medium) | Border color |
| Ghost | Nunito | 14px | 600 (SemiBold) | Muted text |
| Danger | Fredoka | 14-16px | 600 (SemiBold) | White on Muted Red |

### 8.6 Counters

Counters display quantities (items, streaks, notifications):

- Font: Fredoka
- Weight: 600-700 (SemiBold to Bold)
- Size: 14-20px depending on context
- Color: Honey for positive counters, Rose for affection, primary for neutral
- Format: Numbers only, no leading zeros

### 8.7 Numbers

Numbers carry gameplay significance and receive special treatment:

| Context | Font | Weight | Size | Color |
|---------|------|--------|------|-------|
| XP gains | Fredoka | 700 (Bold) | 16-20px | Honey |
| Level display | Fredoka | 700 (Bold) | 24-32px | Honey |
| Stat values | Nunito | 600 (SemiBold) | 14-16px | Semantic color |
| Item counts | Fredoka | 500 (Medium) | 14-16px | Primary text |
| Dates/timestamps | Nunito | 400 (Regular) | 12-14px | Muted text |
| Barcode numbers | Monospace | 400 (Regular) | 14px | Muted text |

### 8.8 XP Display

XP is the most celebratory number in the game:

- **XP gain popup**: Fredoka Bold, 16-20px, Honey color, "+XX XP" format, floats upward from pet
- **XP total**: Fredoka SemiBold, 14px, Honey, displayed near level indicator
- **XP progress bar**: Honey gradient fill on Cream track, fully rounded (pill)
- **XP milestone**: Fredoka Bold, 24px+, Honey with Sunbeam glow, appears during level-up

### 8.9 Levels

Level is a milestone number:

- **Level badge**: Circular, Honey gradient fill, Fredoka Bold white text, 24-32px
- **Level in HUD**: Fredoka SemiBold, 16-20px, Honey
- **Level-up announcement**: Fredoka Bold, 32-40px, Honey with particle effects

### 8.10 Coins

Coins (future currency):

- Font: Fredoka
- Weight: 600 (SemiBold)
- Size: 14-16px
- Color: Honey with a small coin icon prefix
- Format: Number with comma separator for values > 999

### 8.11 Pet Names

Pet names are personal and deserve typographic care:

- Font: Fredoka
- Weight: 500-600 (Medium to SemiBold)
- Size: 16-20px (prominent in HUD), 14px (in lists)
- Color: Primary text color
- Never truncated without ellipsis
- Pet name is always displayed with warmth — never in a clinical list format

### 8.12 Dialogs

Dialog text follows a clear hierarchy:

- **Title**: Fredoka SemiBold, 20-24px, primary color
- **Body**: Nunito Regular, 16px, primary color
- **Secondary text**: Nunito Regular, 14px, muted color
- **Action labels**: Fredoka SemiBold, 14-16px, varies by button type

---

## 9. Iconography System

### 9.1 Icon Sizes

| Size Token | Pixel Size | Usage |
|------------|-----------|-------|
| `icon-xs` | 16px | Inline with text, badges, tiny indicators |
| `icon-sm` | 20px | Navigation items, list item prefixes |
| `icon-md` | 24px | Standard interactive icons, buttons |
| `icon-lg` | 32px | Featured icons, card headers |
| `icon-xl` | 48px | Achievement badges, special moments |
| `icon-2xl` | 64px | Hero illustrations, empty states |

### 9.2 Stroke Weight

Icons use one of two styles, chosen once and applied consistently:

**Style A — Rounded Stroke** (preferred):
- Stroke width: 2px at 24px base
- Line cap: Round
- Line join: Round
- Fill: None (outline only)
- Color: Warm brown (`#2D2620`) or muted brown

**Style B — Pixel Art** (for game-specific icons):
- Grid: 16×16 or 32×32
- Style: Consistent with pet sprite pixel art
- Outline: Dark warm brown (`#2D2620`)
- Fill: Semantic colors where appropriate

**Icon style rules**:
- Choose one style and stay consistent across the entire application
- Navigation icons, action icons, and status icons use the same style
- Pixel-art icons are reserved for game-specific elements (food, toys, furniture)
- Never mix stroke icons and pixel icons in the same context

### 9.3 Filled vs Outline

| Context | Style | Reason |
|---------|-------|--------|
| Navigation (inactive) | Outline | Light, unobtrusive |
| Navigation (active) | Filled | Clear active state |
| Action buttons | Outline with fill on hover | Interactive affordance |
| Status indicators | Filled | Communicates state clearly |
| Stat icons | Filled with semantic color | Communicates stat identity |
| Decorative | Outline | Light, ambient |

### 9.4 Pixel Icons

Pixel-art icons are used for game-specific elements:

| Category | Grid Size | Examples |
|----------|-----------|----------|
| Food items | 16×16 | Fish, milk, cookie, apple |
| Toys | 16×16 | Yarn ball, mouse toy, feather |
| Furniture | 32×32 | Cat bed, shelf, lamp, window |
| Stats | 16×16 | Bowl (hunger), heart (affection), moon (energy), star (mood), magnifier (curiosity) |
| Achievements | 32×32 | Trophy, star, badge, milestone |

**Pixel icon rules**:
- Must be readable at 16×16 display size
- Use the same warm brown outline as the pet sprite
- 2-3 shades per color area (base, shadow, highlight)
- No anti-aliasing
- `image-rendering: pixelated` for crisp display at all sizes

### 9.5 Emoji Usage

Emoji are used with extreme restraint:

**Allowed**:
- In pet thought/speech bubbles (cat-appropriate expressions)
- In memory/achievement descriptions (to add warmth)
- In toast messages (to add personality, maximum 1 emoji)

**Banned**:
- As section headers or navigation icons
- Scattered as decoration without purpose
- In large quantities on any single screen
- As replacements for proper icon design
- In button labels

### 9.6 Illustration Icons

For empty states, onboarding, and special moments, larger illustration-style icons are used:

- Size: 64-128px
- Style: Pixel art, consistent with pet sprite quality
- Palette: Limited (4-6 colors from the main palette)
- Detail: Medium — recognizable but not intricate
- Examples: Empty box, sleeping cat, magnifying glass, trophy shelf

### 9.7 Navigation Icons

Navigation icons must be immediately recognizable:

| Screen | Icon Concept | Style |
|--------|-------------|-------|
| Home | House or paw print | Rounded stroke or pixel |
| Scanner | Camera or barcode | Rounded stroke |
| Collection | Book or scrapbook | Rounded stroke or pixel |
| Achievements | Trophy or star | Rounded stroke or pixel |
| Profile | Cat face or heart | Rounded stroke or pixel |

**Navigation icon rules**:
- Active icon: Filled with Honey color
- Inactive icon: Outline in muted color
- Transition between states: 200ms ease with fill animation
- Icon must be recognizable at 20×20px display size

### 9.8 Status Icons

Status icons communicate pet state at a glance:

| Stat | Icon | Color |
|------|------|-------|
| Hunger | Food bowl | Honey `#F5A623` |
| Mood | Star or smile | Rose `#F472B6` |
| Energy | Moon or lightning | Sky `#67E8F9` |
| Affection | Heart | Rose `#F472B6` |
| Curiosity | Magnifying glass | Sage `#86EFAC` |

**Status icon rules**:
- Size: 16-20px
- Always paired with a small label or bar
- Color matches the stat's semantic color
- Icons are pixel-art style for consistency with the pet

---

## 10. Button System

### 10.1 Primary Button

The primary action button is the most important interactive element in Scan Chan.

**Visual specification**:
- Shape: Pill (`radius-full`, 999px)
- Fill: Honey `#F5A623`
- Shadow: Level 3 warm shadow (`0 8px 24px rgba(45,38,32,0.10)`)
- Inner highlight: Subtle top-edge gradient (white at 30% opacity, 2px)
- Text: Fredoka SemiBold, 16px, white or dark brown
- Minimum width: 160px
- Height: 48-52px (touch-friendly)
- Padding: 16px vertical, 32px horizontal

**States**:
- Rest: As specified above
- Hover: Brightness +10%, scale 1.02, shadow increases slightly
- Pressed: TranslateY +3px, shadow decreases, brightness -5%
- Focus: 2px Honey outer ring with 4px offset
- Disabled: Honey at 30% opacity, no shadow, cursor not-allowed
- Loading: Spinner replaces text, Honey fill maintained

### 10.2 Secondary Button

**Visual specification**:
- Shape: Pill (`radius-full`)
- Fill: Transparent
- Border: 2px Honey `#F5A623` or Rose `#F472B6`
- Shadow: None at rest
- Text: Fredoka Medium, 14-16px, same color as border
- Minimum width: 120px
- Height: 44-48px
- Padding: 12px vertical, 24px horizontal

**States**:
- Rest: As specified
- Hover: Fill appears at 10% opacity of border color
- Pressed: Fill increases to 20% opacity
- Focus: 2px border color outer ring
- Disabled: Border at 20% opacity, text at 40% opacity

### 10.3 Ghost Button

**Visual specification**:
- Shape: Rounded rectangle (12-16px radius)
- Fill: None
- Border: None
- Shadow: None
- Text: Nunito SemiBold, 14px, muted text color
- Minimum width: 80px
- Height: 36-40px
- Padding: 8px vertical, 16px horizontal

**States**:
- Rest: As specified
- Hover: Subtle background (5% opacity of primary text color)
- Pressed: Background increases to 10% opacity
- Focus: 2px Honey outer ring
- Disabled: Text at 30% opacity

### 10.4 Icon Button

**Visual specification**:
- Shape: Circle (`radius-circle`)
- Size: 40-44px (standard), 32-36px (compact)
- Fill: Surface color (`#FFFDF9`) or transparent
- Shadow: Level 1 or none
- Icon: 20-24px, rounded stroke, warm brown color
- Padding: Even on all sides

**States**:
- Rest: As specified
- Hover: Light background fill (10% Honey opacity)
- Pressed: Background increases, slight scale (0.95)
- Focus: 2px Honey outer ring
- Disabled: Icon at 30% opacity

### 10.5 FAB (Floating Action Button)

The FAB is reserved for the single most important action on a screen — typically the Scan button.

**Visual specification**:
- Shape: Circle (`radius-circle`)
- Size: 56-64px
- Fill: Honey `#F5A623`
- Shadow: Level 4 warm shadow (`0 12px 32px rgba(45,38,32,0.12)`)
- Icon: 24-28px, white
- Position: Bottom-center (above bottom navigation), fixed
- Inner highlight: Subtle top gradient

**States**:
- Rest: As specified
- Hover: Scale 1.05, shadow increases
- Pressed: Scale 0.95, shadow decreases, translateY +2px
- Active (scanning): Gentle pulse animation (Honey glow, 2s cycle)

### 10.6 Danger Button

Used only for destructive or irreversible actions (rare in Scan Chan):

**Visual specification**:
- Shape: Pill (`radius-full`)
- Fill: Muted Red `#F87171` (never harsh red)
- Shadow: Level 2 warm shadow
- Text: Fredoka SemiBold, 14-16px, white
- Height: 44-48px

**Usage rules**:
- Danger buttons are rare — Scan Chan avoids destructive actions
- Always paired with a confirmation dialog
- Language is gentle: "Remove" or "Let this go" instead of "Delete"

### 10.7 Success Button

Used for positive confirmations (saving, completing):

**Visual specification**:
- Shape: Pill (`radius-full`)
- Fill: Sage `#86EFAC`
- Shadow: Level 2 warm shadow
- Text: Fredoka SemiBold, 14-16px, dark green or dark brown
- Height: 44-48px

### 10.8 Loading Button

When a button action is in progress:

- Original fill color is maintained
- Text is replaced with a small spinning indicator
- Spinner color: White (on filled buttons) or Honey (on outlined buttons)
- Button width is maintained (does not shrink)
- Button becomes non-interactive until action completes

### 10.9 Disabled Button

- Fill: Original color at 30% opacity
- Text: Original color at 40% opacity
- Shadow: None
- Cursor: not-allowed
- No hover or press states
- Tooltip on hover explaining why disabled (if applicable)

### 10.10 Button Sizing

| Size | Height | Padding V | Padding H | Text Size | Min Width |
|------|--------|-----------|-----------|-----------|-----------|
| Large | 52-56px | 16px | 40px | 18px | 200px |
| Medium | 44-48px | 12px | 28px | 16px | 140px |
| Small | 36-40px | 8px | 20px | 14px | 100px |
| Compact | 28-32px | 6px | 12px | 12px | 80px |

### 10.11 Button Spacing

| Context | Spacing |
|---------|---------|
| Between buttons in a row | 12px |
| Between button and content above | 24px |
| Between button and content below | 24px |
| Between button groups | 32px |
| Between button and card edge | 24px |

### 10.12 Button Animation

All button state transitions use:

- Duration: 100-150ms
- Easing: `ease-out` for hover, `ease-in` for press
- Properties animated: `transform`, `box-shadow`, `background-color`, `color`
- Scale transitions use `cubic-bezier(0.34, 1.56, 0.64, 1)` for a subtle bounce
- All animations respect `prefers-reduced-motion`

---

## 11. Card System

### 11.1 Pet Cards

Pet cards display the companion in a featured context (profile, sharing):

- **Size**: Full container width, minimum height 240px
- **Radius**: 32px
- **Fill**: Warm White `#FFFDF9`
- **Shadow**: Level 2
- **Content**: Pet sprite (centered, large), pet name below, level badge, small stat icons
- **Padding**: 32px all sides
- **Animation**: Pet sprite has idle animations within the card

### 11.2 Mission Cards

Mission cards display daily or weekly objectives:

- **Size**: Full container width (mobile), up to 400px (desktop)
- **Radius**: 24px
- **Fill**: Warm White `#FFFDF9`
- **Shadow**: Level 1
- **Content**: Mission icon (left), title + description (center), progress bar (bottom), reward preview (right)
- **Padding**: 20-24px
- **Layout**: Horizontal arrangement (icon | text | progress | reward)
- **States**:
  - Active: Standard card
  - In Progress: Progress bar partially filled, Sage tint
  - Complete: Sage left border (4px), checkmark icon, slight celebration particle
  - Expired: Muted, reduced opacity (missions never truly expire in Scan Chan — they simply refresh)

### 11.3 Achievement Cards

Achievement cards display milestones:

- **Size**: 160-200px square (grid), or full-width horizontal
- **Radius**: 24px
- **Fill**: Warm White `#FFFDF9`
- **Shadow**: Level 1 (locked), Level 3 with golden glow (unlocked)
- **Content**: Achievement icon/badge (centered, large), title below, description, unlock date
- **States**:
  - Locked: Muted, grayscale icon, lock overlay
  - Recently Unlocked: Golden shimmer animation, Sunbeam glow
  - Unlocked: Full color, golden border accent
  - Featured: Larger card with illustration

### 11.4 Inventory Cards

Inventory cards represent items the player owns:

- **Size**: 100-120px square (dense grid), or 160px (comfortable grid)
- **Radius**: 20px
- **Fill**: Warm White `#FFFDF9`
- **Shadow**: Level 1
- **Content**: Item pixel-art icon (centered), item name below, quantity badge (top-right corner)
- **States**:
  - Default: Standard card
  - Selected: Honey border (2px), subtle Honey glow
  - Empty slot: Dashed border (warm gray), "+" icon, inviting appearance

### 11.5 Product Cards

Product cards represent scanned/discovered products:

- **Size**: 160-200px wide, 180-220px tall
- **Radius**: 20px
- **Fill**: Warm White `#FFFDF9`
- **Shadow**: Level 1
- **Content**: Product illustration (centered, top half), product name, scan count badge, first-scan date
- **States**:
  - Discovered: Full color, interactive
  - Undiscovered: Silhouette, muted, "???" label
  - Favorite: Small heart icon in top-right corner
  - Recently scanned: Subtle Honey glow at bottom edge

### 11.6 Collection Cards

Collection cards group related items (scrapbook pages, category views):

- **Size**: Full container width
- **Radius**: 24px
- **Fill**: Warm White `#FFFDF9`
- **Shadow**: Level 1
- **Content**: Category illustration (left or top), category name, item count, progress indicator
- **Padding**: 24px

### 11.7 Information Cards

Information cards display supplementary content (tips, stories, notifications):

- **Size**: Full container width
- **Radius**: 24px
- **Fill**: Warm White `#FFFDF9` or Subtle Cream `#FEF3E2`
- **Shadow**: Level 1
- **Content**: Icon (left), title + body text (right)
- **Left accent**: 4px semantic color bar (Honey for info, Sage for positive, Rose for affection)
- **Padding**: 20-24px

### 11.8 Statistics Cards

Statistics cards display numerical data:

- **Size**: 140-180px wide (grid layout)
- **Radius**: 20px
- **Fill**: Warm White `#FFFDF9`
- **Shadow**: Level 1
- **Content**: Stat icon (top-left), stat value (large, centered), stat label (below value), trend indicator (optional, bottom-right)
- **Number styling**: Fredoka SemiBold, 24-32px, Honey or semantic color
- **Label styling**: Nunito Regular, 12-14px, muted

### 11.9 Card Composition

Every card follows this structural template:

```
┌────────────────────────────────┐
│  [Optional Image / Icon Area]  │
│                                │
│  Title (Fredoka SemiBold)      │
│  Description (Nunito Regular)  │
│                                │
│  [Optional Action Area]        │
└────────────────────────────────┘
```

**Composition rules**:
- Title is always visible (no hidden titles)
- Description is optional but recommended
- Action area (buttons, links) is at the bottom of the card
- Image/icon area is at the top
- Cards are scannable in 2 seconds
- Content is left-aligned (never centered, except for square grid cards)

### 11.10 Card Spacing

| Context | Value |
|---------|-------|
| Card internal padding | 24-32px |
| Between cards in a grid | 16-20px |
| Between cards in a list | 12-16px |
| Card to section edge | 16px (mobile), 24px (desktop) |
| Between card elements (title to body) | 8-12px |
| Between card elements (body to action) | 16-20px |

### 11.11 Card Animation

| Interaction | Animation | Duration |
|-------------|-----------|----------|
| Card appear | Scale 0.95→1, opacity 0→1, soft bounce | 300ms |
| Card hover (interactive) | TranslateY -2px, shadow Level 1→2 | 150ms |
| Card press | TranslateY +1px, shadow decrease | 100ms |
| Card expand | Scale to full, crossfade content | 400ms |
| Card dismiss | Scale 0.95, opacity 1→0, slide out | 300ms |

---

## 12. Navigation System

### 12.1 Top Navigation

Top navigation is used sparingly in Scan Chan. It appears only on secondary screens (settings, profile editing, collection detail):

**Visual specification**:
- Height: 56-64px
- Background: Transparent or Cream `#FFF8F0`
- Left: Back button (rounded chevron, 40px icon button)
- Center: Page title (Fredoka SemiBold, 18-20px)
- Right: Optional action button (icon button, 40px)
- Shadow: None (or Level 1 on scroll)
- Border: None (or subtle bottom border on scroll)

**Behavior**:
- Appears on scroll for secondary pages
- Fades in/out on scroll direction (appears on scroll up, hides on scroll down)
- Back button always returns to previous screen
- Title truncates with ellipsis if too long

### 12.2 Bottom Navigation

Bottom navigation is the primary navigation method on mobile and tablet:

**Visual specification**:
- Height: 64-72px (touch-friendly)
- Background: Warm White `#FFFDF9` with subtle backdrop blur
- Shadow: Level 3 (elevated above content)
- Border: None (rely on shadow and blur for separation)
- Radius: 20px top corners (optional — creates a floating appearance)
- Items: 3-5 items maximum
- Item layout: Icon (24px) + label (12px) stacked

**Item states**:
- Active: Honey icon fill, Honey label, small Honey dot indicator above icon
- Inactive: Muted brown outline icon, muted label
- Hover (desktop): Subtle Honey background circle behind icon
- Press: Scale 0.9, quick bounce back

**Navigation items** (recommended):

| Slot | Screen | Icon |
|------|--------|------|
| 1 | Home | Paw / House |
| 2 | Scanner | Camera / Barcode |
| 3 | Collection | Book / Album |
| 4 | Achievements | Trophy / Star |
| 5 | Profile | Cat face / Heart |

### 12.3 Side Navigation

Side navigation is permitted only on desktop (viewport > 1024px):

**Visual specification**:
- Width: 200-240px
- Position: Left side
- Background: Subtle Cream `#FEF3E2` or Cream `#FFF8F0`
- Shadow: None (rely on background color shift for separation)
- Items: Icon (20px) + label (14px) side by side
- Padding: 16px horizontal, 12px vertical per item
- Radius: 12px for individual items on hover

**Item states**:
- Active: Honey background pill (12px radius), Honey icon and text
- Inactive: Transparent, muted text
- Hover: Light background (5% Honey opacity)

### 12.4 Tab Bars

Tab bars organize content within a section:

**Visual specification**:
- Shape: Pill container (`radius-full`)
- Fill: Subtle Cream `#FEF3E2`
- Active tab: Filled pill (Warm White `#FFFDF9` with Level 1 shadow)
- Inactive tab: Transparent, muted text
- Text: Fredoka Medium, 14px
- Animation: Sliding indicator (200ms ease-out)
- Maximum: 5 tabs

**Behavior**:
- Tab content transitions with a subtle crossfade (200ms)
- Active tab is clearly distinguishable
- Tabs are never scrollable — if more than 5 items, reorganize content
- Never use underline-only tabs (too SaaS)

### 12.5 Segment Controls

Segment controls toggle between two or three view modes:

**Visual specification**:
- Same as tab bars but smaller
- Text: Nunito SemiBold, 12-14px
- Height: 36-40px
- Usage: Toggling between grid/list, day/week/month, etc.

### 12.6 Breadcrumbs

Breadcrumbs appear on deeply nested screens (rare in Scan Chan):

**Visual specification**:
- Text: Nunito Regular, 14px, muted color
- Separator: Chevron icon (12px, muted)
- Current page: Primary text color, not clickable
- Links: Muted color, Honey on hover
- Maximum: 3 levels deep (if deeper, reorganize navigation)

### 12.7 Back Navigation

**Visual specification**:
- Shape: Rounded button (12px radius) or icon button (circle)
- Icon: Left-pointing chevron or arrow (20px)
- Label: Optional ("Back" or section name)
- Position: Top-left of the page
- Size: 40×40px minimum touch target
- Color: Muted brown, Honey on hover

### 12.8 Page Transitions

Page transitions feel like walking between rooms:

**Standard transition**:
- Outgoing page: Fade to 90% opacity, 150ms
- Incoming page: Fade from 0 to 100% + subtle translateY (8px to 0), 300ms ease-out
- Overlap: 50ms crossfade
- Total duration: 350-450ms

**Scanner transition**:
- Unique animation for entering the scanner
- Room dims, spotlight effect on camera area
- Camera view slides up from bottom (mobile) or expands from center (desktop)
- Duration: 500ms

**Back transition**:
- Reverse of forward transition
- Incoming page slides from left, outgoing slides to right
- Duration: 300ms

---

## 13. Modal System

### 13.1 Dialogs

Standard dialogs appear for focused information or decisions:

**Visual specification**:
- Background: Warm White `#FFFDF9`
- Radius: 32px
- Shadow: Level 4 (`0 12px 32px rgba(45,38,32,0.12)`)
- Max width: 480px
- Padding: 32-40px
- Overlay: Warm dark (`rgba(45,38,32,0.40)`) with 8-12px backdrop blur

**Content structure**:
- Title: Fredoka SemiBold, 20-24px, primary color, centered or left-aligned
- Body: Nunito Regular, 16px, primary color, 16px below title
- Actions: Button row at bottom, 24px below body, right-aligned or centered
- Close button: Icon button (X), top-right corner, optional

**Animation**:
- Appear: Scale 0.95→1, opacity 0→1, soft bounce, 300ms
- Dismiss: Scale 1→0.95, opacity 1→0, 200ms
- Overlay: Fade in/out, 200ms

### 13.2 Sheets

Sheets slide in from the bottom (mobile) or side (desktop):

**Visual specification**:
- Background: Warm White `#FFFDF9`
- Radius: 32px top corners (mobile), 32px left corners (desktop side)
- Shadow: Level 4
- Max height: 80% viewport (mobile)
- Max width: 400px (desktop side)
- Padding: 32px
- Handle: Small pill (40×4px) at top center, warm gray, 16px from top

**Animation**:
- Appear: Slide from bottom/side, 400ms `cubic-bezier(0.22, 1, 0.36, 1)`
- Dismiss: Slide out, 300ms ease-in
- Drag to dismiss: Follow finger, dismiss below 40% threshold

### 13.3 Bottom Sheets

Bottom sheets are the mobile-preferred alternative to dialogs for complex content:

**Content types**:
- Filter/sort options
- Detailed item information
- Settings panels
- Action menus

**Structure**:
- Handle bar (top center)
- Title (Fredoka SemiBold, 18px)
- Content area (scrollable)
- Action buttons (sticky bottom)

### 13.4 Confirmation Dialogs

Confirmation dialogs appear before significant actions:

**Visual specification**:
- Same as standard dialog but more compact
- Max width: 400px
- Padding: 24-32px
- Two buttons: Primary (confirm) and Ghost (cancel)
- Language is gentle: "Are you sure?" → "Yes, let's do it" / "Not now"
- Danger confirmations use Muted Red primary button

### 13.5 Reward Popups

Reward popups celebrate achievements and milestones:

**Visual specification**:
- Background: Warm White with subtle Honey gradient at edges
- Radius: 32px
- Shadow: Level 5 with golden glow
- Max width: 400px
- Content: Reward icon (64px, centered), reward title (Fredoka Bold, 24px), description, "Continue" button
- Particle effects: Sparkles radiating from the icon

**Animation**:
- Appear: Scale 0.8→1.05→1 with bounce, overlay fades in, 500ms
- Icon: Floats in from above, settles with bounce, 600ms (delayed 200ms)
- Particles: Burst outward from icon, 800ms (delayed 400ms)
- Dismiss: Scale to 0.95, fade, 300ms

### 13.6 Evolution Popup

The evolution popup is the most emotionally significant UI moment in Scan Chan:

**Visual specification**:
- Full-screen overlay (not a centered dialog)
- Background: Deep warm dark (`#1A1625`) with golden radial gradient
- The pet's new form appears at center, large and prominent
- Light burst effect behind the pet
- Sparkle shower falling from above
- Text: "Your companion has grown" (Fredoka Bold, 28-32px, Honey/warm white)
- Stage name below: "Young Cat" (Fredoka Medium, 20px)
- Single button: "Continue" (large primary, bottom center)

**Animation sequence** (total 3-5 seconds):
1. Screen dims, pet glows (500ms)
2. Pet silhouette grows and transforms (1000ms)
3. Light burst at climax (500ms)
4. New form revealed with sparkle shower (1000ms)
5. Text fades in (500ms)
6. Button appears (300ms)

### 13.7 Achievement Popup

Achievement popups appear when milestones are reached:

**Visual specification**:
- Position: Top-center of screen
- Background: Warm White `#FFFDF9`
- Radius: 24px
- Shadow: Level 3 with golden glow
- Content: Achievement badge (48px, left), title + description (right), auto-dismiss timer
- Auto-dismiss: 4 seconds
- Dismiss: Slide up, fade out

**Animation**:
- Appear: Slide down from top with bounce, 500ms
- Badge: Golden shimmer, 800ms (delayed 300ms)
- Auto-dismiss: Slide up, fade, 300ms
- Tap: Opens full achievement detail

### 13.8 Mission Popup

Mission completion popup:

**Visual specification**:
- Position: Top-center or center
- Background: Warm White
- Radius: 24px
- Content: Mission icon, completion message, reward preview, XP gain
- Auto-dismiss: 3 seconds
- Animation: Slide in with bounce, XP number floats to HUD, auto-dismiss

### 13.9 Level Up Popup

Level up celebration:

**Visual specification**:
- Full-screen moment (brief, 2-3 seconds)
- Pet glows with golden shimmer
- Level number floats up from pet with bounce
- Particle burst (sparkles radiating outward)
- Text: "Level X" (Fredoka Bold, 32-40px, Honey)
- Auto-dismiss: 3 seconds, tap to dismiss early

### 13.10 Modal Animation Timing

| Modal Type | Appear | Content Delay | Dismiss |
|------------|--------|---------------|---------|
| Standard dialog | 300ms | 0ms | 200ms |
| Bottom sheet | 400ms | 0ms | 300ms |
| Reward popup | 500ms | 200ms | 300ms |
| Evolution popup | 500ms | 500ms (sequence) | 400ms |
| Achievement toast | 500ms | 300ms | 300ms |
| Mission popup | 400ms | 200ms | 300ms |
| Level up | 500ms | 300ms | 300ms |
| Confirmation | 250ms | 0ms | 200ms |

### 13.11 Modal Hierarchy

When multiple modals need to appear, they stack in this order:

1. **Level 1**: Bottom sheet or standard dialog
2. **Level 2**: Confirmation dialog (on top of Level 1)
3. **Level 3**: Toast notification (auto-dismiss, non-blocking)

**Rules**:
- Never show more than 2 overlapping modals
- Achievement toasts queue behind active dialogs
- Evolution popup takes priority over everything
- Each modal has its own overlay layer

---

## 14. HUD System

### 14.1 Pet HUD

The Pet HUD displays the companion's essential state without cluttering the screen. It is ambient — felt rather than read.

**Position**: Near the pet, slightly above and to the right (or left, depending on layout).

**Components**:
- Pet name (Fredoka Medium, 14-16px, primary text color)
- Level badge (circular, Honey gradient, Fredoka Bold, white)
- XP progress ring (thin ring around level badge, Honey fill on Cream track)
- Small mood indicator (single icon, 16px, semantic color)

**Rules**:
- Pet HUD must never obscure the pet's face or body
- Pet HUD fades to 50% opacity after 5 seconds of inactivity
- Pet HUD returns to full opacity on hover/tap
- On mobile, Pet HUD is minimal — just the level badge and name

### 14.2 XP HUD

The XP HUD shows progression toward the next level.

**Position**: Top area, near the pet level badge.

**Visual specification**:
- Format: Level badge + thin XP progress ring
- Ring thickness: 3-4px
- Ring fill: Honey gradient with subtle shimmer
- Ring track: Cream at 30% opacity
- Current XP text: Fredoka SemiBold, 12px, Honey (shown on tap/hover)

**Animation**:
- XP fill animates smoothly on gain (500ms ease-out)
- Shimmer effect on fill completion (1000ms)
- Level-up triggers ring burst animation (sparkles radiating outward)

### 14.3 Food HUD

The Food HUD communicates hunger state ambiently.

**Visual specification**:
- Format: Small food bowl icon (16-20px) + subtle fill indicator
- Position: Near the pet, bottom area
- Color: Honey `#F5A623` when satisfied, Coral `#FB923C` when low
- Animation: Gentle pulse when hunger is low (not urgent, just noticeable)
- Behavior: Pet walks to food bowl location when hungry — visual storytelling replaces HUD

**Rules**:
- Food HUD should be the least visible HUD element
- The pet's behavior (walking to bowl, looking at bowl) is the primary hunger indicator
- The HUD is supplementary, not primary

### 14.4 Mood HUD

The Mood HUD communicates the pet's emotional state.

**Visual specification**:
- Format: Small star or smile icon (16-20px)
- Position: Near the pet
- Color: Rose `#F472B6` when happy, Petal `#FDA4AF` when neutral, muted when low
- Animation: Gentle bounce when mood is high
- Behavior: The pet's expression and body language are the primary mood indicators

### 14.5 Coins

Coin display (future currency):

**Visual specification**:
- Format: Coin icon (16px) + number (Fredoka SemiBold, 14px)
- Position: Top-right corner of screen
- Color: Honey `#F5A623`
- Background: Subtle Cream pill (`#FEF3E2`, `radius-full`)
- Padding: 8px vertical, 12px horizontal

### 14.6 Notifications

In-app notifications appear as toasts:

**Visual specification**:
- Shape: Rounded card (20px radius)
- Fill: Surface color with subtle backdrop blur
- Left accent: 4px semantic color bar
- Icon: 24px, relevant icon
- Text: Title (Fredoka Medium, 14px) + description (Nunito Regular, 14px)
- Position: Top-right (desktop), top-center (mobile)
- Auto-dismiss: 4 seconds
- Max visible: 3 stacked

**Animation**:
- Appear: Slide in from edge, settle with soft bounce, 400ms
- Dismiss: Slide out, fade, 300ms
- Stack: New notifications push existing ones down, 200ms

### 14.7 Mission Tracker

The mission tracker shows active daily missions:

**Visual specification**:
- Position: Bottom-left area (above navigation on mobile)
- Format: Compact card showing 1-3 active missions
- Each mission: Icon (16px) + short title + progress indicator
- Background: Warm White at 90% opacity (slightly transparent)
- Radius: 20px
- Shadow: Level 2

**States**:
- Collapsed: Shows mission count only ("2 missions"), tappable to expand
- Expanded: Shows full mission cards
- Complete: Green checkmark, mission slides out

**Animation**:
- Progress update: Bar fills smoothly, 500ms
- Completion: Checkmark appears with bounce, mission slides out after 2s

### 14.8 Temporary Overlays

Temporary overlays appear for contextual information:

**Tooltip**:
- Background: Dark warm brown (`#2D2620`) at 90% opacity
- Text: Nunito Regular, 14px, warm white
- Radius: 12px
- Arrow: Small triangle pointing to source element
- Auto-dismiss: 3 seconds or on tap
- Max width: 240px

**Contextual hint**:
- Background: Honey at 10% opacity
- Border: 1px Honey at 30% opacity
- Text: Nunito Regular, 14px
- Radius: 16px
- Dismiss: X button (top-right)
- Appears for first-time actions

---

## 15. Scanner UI

### 15.1 Camera Frame

The camera frame is the viewfinder for barcode scanning.

**Visual specification**:
- Shape: Rounded rectangle (24px radius)
- Size: 70-80% of screen width (mobile), 50-60% (desktop)
- Position: Center of screen
- Border: 3px warm white at 80% opacity
- Interior: Live camera feed
- Exterior: Darkened warm overlay (`rgba(45,38,32,0.50)`)

### 15.2 Overlay

The scanner overlay darkens the area outside the viewfinder:

**Visual specification**:
- Fill: `rgba(45,38,32,0.50)` with warm tint (not pure black)
- Blur: 4px backdrop blur (subtle, not heavy)
- Transition: Fades in from the room (500ms)

### 15.3 Corner Brackets

Corner brackets frame the scanning area:

**Visual specification**:
- Shape: L-shaped brackets at each corner
- Length: 24-32px per arm
- Width: 3px
- Color: Honey `#F5A623`
- Radius: 8px at the corner (soft, not sharp)
- Animation: Gentle pulse (opacity 0.7→1→0.7, 2s cycle) while scanning

### 15.4 Animation

Scanner animations:

- **Enter scanner**: Room dims (300ms), camera view slides up from bottom (500ms), brackets fade in (300ms, delayed 200ms)
- **Scanning**: Brackets pulse gently, subtle scan line sweeps vertically through viewfinder
- **Barcode detected**: Brackets snap to barcode outline (200ms), Honey glow appears
- **Success**: Viewfinder flashes Honey (150ms), transitions to result screen
- **Cancel**: Camera view slides down, room brightens (400ms)

### 15.5 Laser

The scan laser is a visual indicator that scanning is active:

**Visual specification**:
- Shape: Horizontal line across viewfinder
- Width: 100% of viewfinder width
- Height: 2px with 8px glow
- Color: Honey `#F5A623` with warm glow
- Animation: Sweeps top-to-bottom, 2s cycle, smooth
- Opacity: 60% at edges, 100% at center

### 15.6 Flash

Flash toggle button:

**Visual specification**:
- Shape: Icon button (circle, 44px)
- Icon: Lightning bolt or flashlight (rounded stroke)
- Position: Top-right of scanner area
- Color: Muted white (inactive), Honey (active)
- Background: Dark warm at 40% opacity

### 15.7 Scanning Feedback

While scanning, visual feedback keeps the player informed:

**States**:
- **Searching**: Brackets pulse, laser sweeps, text: "Looking for a barcode..." (Nunito Regular, 14px, warm white)
- **Detected**: Brackets highlight, laser stops, text: "Found something!" (Fredoka Medium, 16px, Honey)
- **Processing**: Brackets glow, spinner appears, text: "A moment..." (Nunito Italic, 14px)

### 15.8 Success Flow

When a barcode is successfully scanned:

1. Viewfinder flashes Honey (150ms)
2. Product information appears briefly (500ms)
3. Camera view shrinks / slides away (400ms)
4. Room returns, pet appears with welcome-back animation
5. Product icon appears near pet (300ms)
6. Pet approaches, sniffs, eats (2000ms)
7. Hearts/sparkles float up (800ms)
8. XP popup floats away (1500ms)

Total duration: ~5 seconds. The sequence should feel like a small story, not a loading screen.

### 15.9 Failure Flow

When scanning fails:

1. Brackets turn Coral briefly (300ms)
2. Text: "That barcode was a little shy. Try again?" (warm, gentle)
3. Scanner remains active for retry
4. Pet watches curiously from corner (expression: curious/confused)
5. After 3 failures: Offer to cancel with gentle message

### 15.10 Transition Back to Home

Returning from scanner to Home Hub:

1. Camera view slides down / shrinks (400ms)
2. Room brightens from overlay (300ms)
3. Pet appears with greeting animation (500ms)
4. If scan was successful, feeding sequence plays
5. Navigation returns to normal

---

## 16. Forms

### 16.1 Inputs

Text inputs feel warm and approachable:

**Visual specification**:
- Shape: Rounded rectangle (16px radius)
- Fill: Surface color (`#FFFDF9`) or white
- Border: 2px warm gray (`rgba(45,38,32,0.12)`)
- Focus: Border transitions to Honey (`#F5A623`), soft outer glow (Honey at 15% opacity)
- Placeholder: Muted text, Nunito Italic, 16px
- Text: Nunito Regular, 16px, primary color
- Padding: 12-16px vertical, 16-20px horizontal
- Height: 48-52px

**Label**: Above the input, 8px gap. Nunito SemiBold, 14px, primary color.

**States**:
- Default: As specified
- Hover: Border darkens slightly (`rgba(45,38,32,0.20)`)
- Focus: Honey border, soft glow
- Filled: Primary text visible, border returns to default
- Error: Coral border, gentle error message below (Nunito Regular, 14px, Coral)
- Disabled: Input at 50% opacity, not interactive

### 16.2 Dropdowns

Dropdowns use the same visual language as inputs:

**Trigger**:
- Same as text input with a chevron icon on the right
- Chevron rotates 180° when open (200ms ease)

**Menu**:
- Background: Warm White `#FFFDF9`
- Radius: 16px
- Shadow: Level 3
- Max height: 240px (scrollable)
- Item height: 44px minimum
- Item padding: 12px horizontal
- Selected item: Honey background at 10% opacity
- Hover item: Honey background at 5% opacity
- Separator: 1px warm gray at 10% opacity

### 16.3 Selectors

For choosing between options (e.g., pet name, mode selection):

**Card selector**:
- Each option is a card (24px radius, Level 1 shadow)
- Selected card: Honey border (2px), subtle Honey glow
- Unselected card: Standard appearance
- Layout: Grid (2-3 columns) or vertical list

**Pill selector**:
- Options displayed as pills in a row
- Selected pill: Honey fill, white text
- Unselected pill: Transparent, muted border
- Container: Subtle Cream background, pill shape

### 16.4 Checkboxes

Checkboxes feel warm and rounded:

**Visual specification**:
- Shape: Rounded square (6px radius — the smallest allowed radius)
- Size: 20×20px
- Border: 2px warm gray
- Checked: Honey fill, white checkmark (rounded stroke)
- Label: Nunito Regular, 16px, primary color, 12px gap from checkbox
- Touch target: 44×44px (expanded around visible checkbox)

### 16.5 Switches

Toggle switches for binary settings:

**Visual specification**:
- Track: 44×24px, pill shape
- Track off: Warm gray at 20% opacity
- Track on: Honey `#F5A623`
- Knob: 20×20px circle, white, Level 1 shadow
- Animation: Knob slides 200ms ease, track color transitions 200ms
- Label: Nunito Regular, 16px, to the right of switch

### 16.6 Sliders

Sliders for continuous values (volume, brightness):

**Visual specification**:
- Track: Full width, 6px height, pill shape
- Track fill: Honey gradient (left to right)
- Track empty: Warm gray at 15% opacity
- Thumb: 24×24px circle, Honey fill, white border (2px), Level 2 shadow
- Thumb hover: Scale 1.1
- Thumb active: Scale 1.2, Honey glow
- Label: Above the slider
- Value: Displayed to the right of the slider (Fredoka Medium, 14px)

### 16.7 Validation

Form validation is gentle and warm:

**Rules**:
- Validation happens on blur, not on type (never interrupt the player)
- Error messages appear below the input, 8px gap
- Error text: Nunito Regular, 14px, Coral `#FB923C`
- Error language is gentle: "That did not look quite right" instead of "Invalid input"
- Success state: Subtle Sage checkmark icon appears to the right of the input
- Required field indicator: Small asterisk (*) in Coral, with "We need this one" label

### 16.8 Error States

Input error states:

- Border: Coral `#FB923C`
- Error message: Below input, Coral text
- Icon: Small warning circle (16px, Coral) to the right
- Input text is preserved (never clear on error)
- Focus remains on the errored field

### 16.9 Success States

Input success states:

- Border: Returns to default (error cleared)
- Checkmark: Small Sage icon appears briefly (500ms), then fades
- No persistent green border — success is momentary, not permanent

---

## 17. Lists & Collections

### 17.1 Inventory

The inventory is a grid of owned items:

**Grid specification**:
- Columns: 3 (mobile), 4 (tablet), 5-6 (desktop)
- Gap: 12-16px
- Item: Inventory card (see section 11.4)
- Empty slots: Appear inviting (dashed border, "+" icon)
- Sort options: Recently acquired, alphabetical, category, rarity
- Header: "Your Things" (Fredoka SemiBold, 20px) + sort button

### 17.2 Product List

The product list (scrapbook/pantry) displays discovered products:

**Layout**:
- Default view: Grid (2 columns mobile, 3-4 desktop)
- Alternative: List view (full-width cards, horizontal layout)
- Toggle: Segment control (grid/list icons)
- Search: Search input at top (rounded, warm)
- Filters: Category pills (scrollable horizontal row)

**Card content**: Product illustration, name, scan count, favorite indicator

**Empty state**: "An empty shelf. Waiting to be filled with discoveries." + illustration of the pet looking at an empty bowl

### 17.3 Achievement Grid

Achievements displayed as a visual grid:

**Grid specification**:
- Columns: 2 (mobile), 3 (tablet), 4 (desktop)
- Gap: 16-20px
- Card: Achievement card (see section 11.3)
- Locked achievements: Shown but muted (grayscale, lock icon)
- Progress indicator: "X of Y achievements" (Nunito Regular, 14px, muted)

**Categories**: Tabs or pills for filtering (All, Scanning, Care, Collection, Special)

### 17.4 Mission List

Missions displayed as a vertical list:

**Layout**:
- Direction: Vertical stack
- Gap: 12px between items
- Card: Mission card (see section 11.2)
- Sections: "Today" (active missions), "Completed" (today's done), "Weekly" (longer missions)
- Section headers: Fredoka Medium, 16px, Honey

### 17.5 Furniture Collection

Furniture items displayed in a room-like arrangement:

**Layout**:
- Grid: 2 columns (mobile), 3-4 (desktop)
- Card: Large preview image + name + unlock status
- Locked items: Silhouette with unlock requirement text
- Unlocked items: Full color, tappable to preview in room

### 17.6 Category Layout

Categories organize content into groups:

**Layout**:
- Horizontal scrollable pills for category selection
- Active category: Honey fill, white text
- Inactive: Transparent, muted border
- Content area: Grid or list, depending on content type
- Category header: Icon + name (Fredoka SemiBold, 18px)

### 17.7 Pagination

For paginated content:

**Visual specification**:
- Style: "Load more" button (not page numbers)
- Button: Ghost button, centered, "Show more" text
- Loading: Spinner replaces button text
- End state: "That's everything for now" (Nunito Regular, 14px, muted)
- Alternative: Infinite scroll with loading indicator at bottom

### 17.8 Infinite Scrolling

For long lists (scan history, product collection):

**Behavior**:
- Load trigger: 200px from bottom of list
- Loading indicator: Small spinner (20px, Honey) centered, 32px padding
- Batch size: 20 items per load
- Skeleton cards appear while loading (see section 22)
- Scroll position preserved on back navigation

---

## 18. Motion System

### 18.1 Duration

| Category | Duration | Usage |
|----------|----------|-------|
| Instant | 80-100ms | Button press, toggle, quick color changes |
| Micro | 100-150ms | Hover, focus, small state changes |
| Small | 150-250ms | Button release, toggle animation, badge appear |
| Medium | 250-400ms | Card open, panel slide, dropdown |
| Large | 400-600ms | Page transitions, modal appear, sheet slide |
| Celebratory | 600-1500ms | Evolution, achievement, level up |

**Duration rules**:
- Nothing animates faster than 80ms (imperceptible)
- Nothing animates slower than 1500ms (feels broken)
- Interactive feedback (hover, click) must respond within 150ms
- Pet idle animations run on longer cycles (3-6 seconds)

### 18.2 Easing

| Animation Type | Easing | Character |
|---------------|--------|----------|
| Enter / Appear | `cubic-bezier(0.22, 1, 0.36, 1)` | Smooth, confident arrival |
| Exit / Disappear | `ease-in` | Quick departure |
| Bounce | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Playful overshoot |
| Hover | `ease-out` | Quick, responsive |
| Press | `ease-in` | Quick compression |
| Float | `ease-in-out` | Gentle, continuous |
| Spring | Custom spring physics | Organic, natural settling |

**Easing rules**:
- Never use `linear` for UI animations (feels robotic)
- Never use `ease` (generic) — always use a specific curve
- Bounce easing is used sparingly — for celebrations and interactive elements, not for layout shifts
- Page transitions use the smooth enter curve

### 18.3 Spring Physics

For organic, natural-feeling animations:

**Standard spring**:
- Stiffness: 200
- Damping: 20
- Mass: 1
- Usage: Card interactions, button releases, popup appearances

**Gentle spring**:
- Stiffness: 120
- Damping: 18
- Mass: 1
- Usage: Pet movements, idle animations, ambient elements

**Bouncy spring**:
- Stiffness: 300
- Damping: 12
- Mass: 1
- Usage: Celebrations, reward popups, level-up moments

### 18.4 Hover Animations

| Element | Animation | Duration |
|---------|-----------|----------|
| Card | TranslateY -2px, shadow Level 1→2 | 150ms ease-out |
| Button | Brightness +10%, scale 1.02 | 100ms ease-out |
| Link | Color transition to Honey | 100ms ease |
| Icon | Subtle scale 1.1, optional rotation | 150ms ease-out |
| Navigation item | Background circle fades in | 150ms ease-out |
| Avatar | Subtle scale 1.05 | 150ms ease-out |

### 18.5 Click Animations

| Element | Animation | Duration |
|---------|-----------|----------|
| Primary button | TranslateY +3px, shadow decrease | 100ms ease-in |
| Secondary button | Fill opacity increase | 100ms ease-in |
| Card | TranslateY +1px, shadow decrease | 100ms ease-in |
| Icon button | Scale 0.9, bounce back | 80ms ease-in |
| Interactive element | Scale 0.97, release with bounce | 80ms + 150ms |

### 18.6 Open Animations

| Element | Animation | Duration |
|---------|-----------|----------|
| Modal | Scale 0.95→1, opacity 0→1, bounce | 300ms |
| Bottom sheet | Slide from bottom | 400ms |
| Dropdown | ScaleY 0.9→1, opacity 0→1, origin top | 200ms |
| Expansion panel | Height 0→auto, opacity 0→1 | 300ms |
| Tab content | Crossfade, subtle translateX | 200ms |

### 18.7 Close Animations

| Element | Animation | Duration |
|---------|-----------|----------|
| Modal | Scale 1→0.95, opacity 1→0 | 200ms |
| Bottom sheet | Slide to bottom | 300ms |
| Dropdown | ScaleY 1→0.9, opacity 1→0 | 150ms |
| Toast | Slide out + fade | 300ms |
| Tooltip | Fade out | 150ms |

**Rule**: Never hard-disappear. Every element fades or shrinks out.

### 18.8 Appear Animations

| Element | Animation | Duration |
|---------|-----------|----------|
| Card (first render) | Scale 0.95→1, opacity 0→1, bounce | 300ms |
| List item (staggered) | TranslateY 8px→0, opacity 0→1, 50ms stagger | 300ms each |
| Badge | Scale 0.8→1.05→1 | 400ms |
| Page content | Fade in + translateY 8px→0 | 300ms |
| Pet (screen enter) | Walk/slide in from edge, 500ms | 500ms |

### 18.9 Disappear Animations

| Element | Animation | Duration |
|---------|-----------|----------|
| Card (removed) | Scale 1→0.95, opacity 1→0, slide | 300ms |
| List item (removed) | Slide out left, height collapse | 300ms |
| Toast | Slide up, fade | 300ms |
| Pet (screen exit) | Walk to edge, fade | 500ms |

### 18.10 Floating Animations

Ambient floating elements use continuous, gentle animation:

| Element | Animation | Cycle |
|---------|-----------|-------|
| Pet breathing | Scale 1.0→1.02→1.0 | 3-4s |
| Dust motes | Random drift, subtle | 8-15s |
| Particles | Float up, fade out | 2-4s |
| XP orbs | Float up toward level badge | 1.5s |
| Hearts | Float up, slight wave | 2-3s |
| ZZZ | Float up, wave pattern | 3-4s |

### 18.11 Idle Animations

UI idle animations keep the interface feeling alive:

| Element | Animation | Trigger |
|---------|-----------|--------|
| Scan button | Gentle pulse (scale 1→1.03→1) | After 10s idle |
| Mission card | Subtle wiggle | After 30s idle |
| Pet | Full idle behavior set | Continuous |
| Background particles | Continuous drift | Always |
| Level badge | Subtle shimmer | After level change |

### 18.12 Micro Interactions

Small interactions that add delight:

| Interaction | Animation | Notes |
|-------------|-----------|-------|
| Favorite toggle | Heart scales 0.8→1.2→1, fills with Rose | 300ms bounce |
| Checkbox check | Checkmark draws in, checkbox fills | 200ms |
| Switch toggle | Knob slides, track color transitions | 200ms |
| Counter increment | Number scales up briefly | 150ms |
| Progress bar fill | Smooth fill + shimmer at completion | 500ms + 500ms |
| Tab switch | Indicator slides smoothly | 200ms |
| Pull to refresh | Pet stretches, content reloads | Custom |
| Swipe to dismiss | Card slides out, space collapses | 300ms |

### 18.13 Particle Integration

Particles are part of the motion system:

| Particle | Trigger | Animation | Count |
|----------|---------|-----------|-------|
| Hearts | High affection | Float up, fade, slight wave | 3-5 |
| Sparkles | Achievement, evolution | Burst outward, twinkle | 8-12 |
| ZZZ | Sleeping | Float up, wave pattern | 2-3 |
| Dust motes | Ambient | Slow drift, random | 4-6 |
| XP orbs | Scanning | Float toward level badge | 3-5 |
| Musical notes | Happy mood | Float and bounce | 2-4 |
| Steam | Hot food | Rise and dissipate | 3-5 |

**Particle rules**:
- Maximum 12 particles on screen at once
- Size: 8-16px
- Never obscure the pet
- Always honor reduced-motion preferences
- Particles use the warm color palette

---

## 19. Responsive Rules

### 19.1 Desktop (1024px+)

- Container: 768px max width, centered
- Navigation: Side navigation or top navigation
- Layout: Single column with optional side panel
- Pet room: Full container width
- Cards: Grid 3-4 columns
- Modals: Centered, max 480px width
- Scanner: Camera view centered, 50-60% viewport width

### 19.2 Tablet (768px - 1023px)

- Container: 640px max width, centered
- Navigation: Bottom navigation
- Layout: Single column, no side panels
- Pet room: Full container width
- Cards: Grid 2-3 columns
- Modals: Centered, max 480px width
- Scanner: Camera view 70% viewport width

### 19.3 Mobile (320px - 767px)

- Container: 100% with 16px margins
- Navigation: Bottom navigation (mandatory)
- Layout: Single column, full-width stacking
- Pet room: Full viewport width
- Cards: Grid 1-2 columns
- Modals: Bottom sheets preferred, 90% viewport width
- Scanner: Camera view 80-90% viewport width
- FAB: 56px, bottom-center above navigation

### 19.4 Ultra-Wide (1440px+)

- Container: Still 768px max (do not stretch)
- Extra space: Warm background or subtle decorative elements
- Never stretch content to fill ultra-wide screens
- Side decorations: Subtle pixel-art room extensions (optional)

### 19.5 Landscape (Mobile)

- Pet room: Left half of screen
- Controls/HUD: Right half of screen
- Navigation: Side (right) or bottom (narrow)
- Scanner: Camera view fills left portion, controls on right

### 19.6 Portrait (Default)

- All layouts are designed portrait-first
- Vertical stacking is the default flow
- Pet occupies middle 50-60% of viewport height

### 19.7 Scaling Behavior

| Element | Scaling Rule |
|---------|-------------|
| Typography | Fixed sizes (do not scale with viewport) |
| Spacing | Fixed values (4px grid) |
| Cards | Width adjusts, height adjusts to content |
| Pet sprite | Fixed pixel size, rendered at appropriate scale |
| Icons | Fixed pixel sizes per token |
| Buttons | Fixed height, width adjusts to content |
| Navigation | Fixed height, width fills container |
| Modals | Max width fixed, height adjusts to content |
| Images | Scale proportionally within container |

### 19.8 Priority Changes

As screen size decreases, elements are hidden in this priority order (lowest priority hidden first):

1. Decorative elements (ambient particles, background details)
2. Secondary information (streak counter, scan count)
3. Side panels (collapse to below content)
4. Card descriptions (show title only in compact view)
5. Secondary navigation labels (show icons only)
6. Mission tracker (collapse to badge)
7. Pet HUD details (show level badge only)

**Never hidden**: Pet sprite, primary action button, bottom navigation, pet name.

---

## 20. Accessibility Rules

### 20.1 Contrast

| Element | Minimum Contrast Ratio | Notes |
|---------|----------------------|-------|
| Body text on background | 4.5:1 | WCAG AA |
| Heading text on background | 4.5:1 | WCAG AA |
| Large text (18px+) on background | 3:1 | WCAG AA Large |
| Interactive element borders | 3:1 | Visible affordance |
| Icon on background | 3:1 | Recognizable |
| Text on buttons | 4.5:1 | Readable at all sizes |
| Muted/secondary text | 4.5:1 | Still readable |

**Contrast notes**:
- The warm cream background provides natural high contrast with dark brown text
- Semantic colors on light backgrounds must be individually checked
- Never use low-contrast text for important information
- Dark mode contrast ratios follow the same minimums

### 20.2 Touch Targets

| Element | Minimum Size | Preferred Size |
|---------|-------------|---------------|
| Buttons | 44×44px | 48×48px+ |
| Navigation items | 44×44px | 48×48px |
| Icon buttons | 40×40px | 44×44px |
| Links | 44px height minimum | — |
| Checkboxes | 44×44px (touch area) | — |
| Switches | 44px height minimum | — |
| Pet tap area | Larger than visible sprite | 20% larger |

**Touch target rules**:
- Minimum spacing between touch targets: 8px
- Pet tap area is forgiving — feels like petting, not clicking
- All interactive elements are reachable with one thumb on mobile
- FAB is positioned in the thumb zone (bottom-center)

### 20.3 Keyboard Navigation

All interactive elements must be keyboard accessible:

- **Tab order**: Follows visual layout (top-to-bottom, left-to-right)
- **Focus indicator**: 2px Honey ring with 4px offset (visible on all backgrounds)
- **Enter/Space**: Activates buttons, toggles, links
- **Escape**: Closes modals, dropdowns, sheets
- **Arrow keys**: Navigate within tab bars, dropdowns, radio groups
- **Skip navigation**: "Skip to content" link available on first tab press

### 20.4 Reduced Motion

All animations honor `prefers-reduced-motion`:

| Animation Type | Full Motion | Reduced Motion |
|---------------|------------|----------------|
| Page transitions | Fade + slide | Instant or fade only |
| Hover effects | Lift + shadow | Color change only |
| Pet idle | Breathing, blinking, tail | Static or minimal breathing |
| Particles | Floating, bursting | Static icons or disabled |
| Evolution | Full sequence | Static before/after with text |
| Level up | Particle burst | Badge update only |
| Popups | Scale + bounce | Fade only |
| Loading | Spinner | Static indicator |

**Reduced motion rules**:
- The game is fully functional and enjoyable with all motion disabled
- Information is never communicated only through animation
- Pet idle animations retain a subtle breathing cycle if any motion is kept

### 20.5 Readable Typography

- Minimum body text: 16px
- Minimum contrast: 4.5:1
- Maximum line length: 65 characters (desktop)
- Line height: 1.5x font size minimum for body text
- Never all-caps for more than 3 consecutive words
- Text on colored backgrounds must pass contrast checks
- Text over images requires a backdrop

### 20.6 Screen Reader Considerations

- All interactive elements have descriptive `aria-labels`
- Pet state changes are announced via `aria-live` regions
- Images have meaningful `alt` text (not "image" or "icon")
- Form errors are announced when they appear
- Modal open/close traps and releases focus correctly
- Navigation landmarks are used (`nav`, `main`, `aside`)
- Color is never the sole communicator of information

---

## 21. Empty States

### 21.1 Structure

Every empty state follows this composition:

```
[Vertical center of available space]

     [Illustration — 64-128px]
     
     [Title — Fredoka SemiBold, 20px]
     
     [Description — Nunito Regular, 16px, muted]
     
     [Action button — Primary or Ghost, optional]

[Spacing below]
```

### 21.2 Illustration Placement

- Illustration is centered, above the text
- Size: 64-128px depending on context
- Style: Pixel art, consistent with pet sprite quality
- Palette: Limited (4-6 colors from main palette)
- The illustration should feel warm and inviting, not sad or broken

### 21.3 Mascot Behavior

In empty states, the mascot can appear as part of the illustration:
- Looking at the empty space curiously
- Sitting next to the empty area
- Tilting head, as if waiting
- Never looking sad or disappointed about the emptiness

### 21.4 Microcopy

Empty state text is warm, inviting, forward-looking:

| Context | Title | Description |
|---------|-------|-------------|
| No scan history | "No discoveries yet" | "Every scan is a new story. Your companion is curious." |
| No achievements | "No milestones yet" | "Your journey is just beginning. Every scan counts." |
| No products | "An empty shelf" | "Waiting to be filled with discoveries." |
| No missions | "All caught up" | "Your companion is enjoying the quiet." |
| No collection | "A blank scrapbook" | "Your collection starts with a single scan." |
| No furniture | "A simple room" | "New treasures will find their way here." |

### 21.5 Actions

Empty states may include a call to action:

| Context | Action | Type |
|---------|--------|------|
| No scan history | "Scan your first item" | Primary button |
| No achievements | "Start scanning" | Primary button |
| No products | "Begin your story" | Primary button |
| No missions | "Check back tomorrow" | Ghost button |
| No collection | "Scan something" | Primary button |

---

## 22. Loading States

### 22.1 Skeletons

Skeleton screens replace content while loading:

**Visual specification**:
- Shape: Matches the layout of the content being loaded
- Fill: Subtle Cream `#FEF3E2`
- Animation: Gentle shimmer sweep (left to right, 1.5s cycle)
- Radius: Matches the component radius (cards: 24px, badges: 12px)
- No text or icons — just shapes

**Skeleton types**:
- Card skeleton: Rounded rectangle matching card size
- List skeleton: Series of horizontal bars
- Grid skeleton: Grid of rounded rectangles
- Text skeleton: Series of horizontal bars at text width
- Avatar skeleton: Circle

### 22.2 Progress Indicators

**Spinner**:
- Size: 20px (inline), 32px (standalone), 48px (page-level)
- Style: Rounded arc (3/4 circle), 3px stroke
- Color: Honey `#F5A623`
- Track: Warm gray at 15% opacity
- Animation: Smooth rotation, 800ms per revolution
- Background: None (transparent)

**Progress bar**:
- Shape: Pill (999px radius), 8px height
- Track: Subtle Cream `#FEF3E2`
- Fill: Honey gradient with subtle shimmer
- Animation: Smooth fill (500ms ease-out)
- Used for: Known progress (download, upload, XP toward level)

### 22.3 Pet Animations During Loading

While content loads, the pet provides visual entertainment:

| Loading Context | Pet Animation | Duration |
|-----------------|--------------|----------|
| App startup | Stretching, yawning, waking up | 2-3s |
| Data refresh | Looking around curiously | 3-5s |
| Scanner loading | Perking ears, watching | 2-3s |
| Image loading | Sitting patiently, blinking | Continuous |

### 22.4 Timing

| Loading Phase | Duration | What Happens |
|--------------|----------|-------------|
| Instant | 0-200ms | No loading indicator shown |
| Brief | 200-1000ms | Skeleton or spinner appears |
| Extended | 1-3s | Skeleton with shimmer, pet animation |
| Long | 3s+ | Skeleton + warm loading message ("Warming up a cozy spot...") |
| Very long | 10s+ | Skeleton + rotating loading messages + progress indicator |

**Loading messages** (from Brand Book):
- "Warming up a cozy spot..."
- "Your companion is stretching..."
- "Tidying the room..."
- "Almost ready..."

### 22.5 Transitions from Loading

- Skeleton → Content: Content fades in, skeleton fades out, 300ms crossfade
- Spinner → Content: Spinner fades, content appears with subtle bounce, 300ms
- Pet loading animation → Normal: Pet transitions smoothly to idle state, 500ms

---

## 23. Error States

### 23.1 Visual Hierarchy

Error states follow this structure:

```
[Icon — 48-64px, Coral or Muted Red]

[Error title — Fredoka SemiBold, 20px]

[Error description — Nunito Regular, 16px, muted]

[Recovery action — Primary button]

[Secondary action — Ghost button, optional]
```

### 23.2 Mascot Reaction

During errors, the mascot shows a gentle, reassuring reaction:
- Expression: Slightly confused, but not sad or alarmed
- Body language: Tilted head, one ear slightly back
- Position: Near the error message, as if acknowledging the situation
- The pet is never distressed, never blaming the player

### 23.3 Recovery Actions

Every error state provides a clear path forward:

| Error Type | Primary Action | Secondary Action |
|------------|---------------|------------------|
| Network error | "Try again" | "Check connection" |
| Scan failed | "Try again" | "Scan something else" |
| Server error | "Try again later" | "Go home" |
| Invalid input | "Fix it" | Focus on errored field |
| Timeout | "Try again" | "Go back" |
| 404 | "Go home" | — |
| Permission denied | "Enable access" | "Not now" |

### 23.4 Error Messages

Error messages are warm, gentle, and helpful (from Brand Book):

| Error | Message |
|-------|--------|
| Network error | "The connection dropped. Let us try again when things are calmer." |
| Scan failed | "That barcode was a little shy. Try again or scan something else." |
| Server error | "Something went quiet on our end. We will be back in a moment." |
| Invalid input | "That did not look quite right. Could you check it again?" |
| Timeout | "Things are taking longer than expected. Your companion is patient." |
| 404 | "This room seems empty. Let us take you back home." |

**Error message rules**:
- Never blame the player
- Never use technical jargon
- Never use ALL CAPS or exclamation marks
- Always offer a recovery path
- Keep messages brief and warm

---

## 24. Reward Presentation

### 24.1 XP Rewards

**Small XP gain** (from scanning):
- Format: "+XX XP" floating text
- Font: Fredoka Bold, 16-20px, Honey color
- Animation: Floats up from pet, fades out after 1.5s
- Sound: Soft chime (tiny bell)

**Large XP gain** (from milestone):
- Format: "+XX XP" with particle trail
- Font: Fredoka Bold, 24-28px, Honey with Sunbeam glow
- Animation: Floats up with sparkles, pauses briefly, fades
- Sound: Warm two-note melody

### 24.2 Food Rewards

When a product is scanned and becomes food:
1. Product icon appears near pet (300ms)
2. Pet approaches cautiously (500ms)
3. Pet sniffs (300ms)
4. Pet eats with satisfaction (500ms)
5. Hearts or sparkles float up (800ms)
6. XP popup floats away (1500ms)

### 24.3 Evolution Rewards

The most significant reward moment (see section 13.6):
- Full-screen event
- 3-5 second sequence
- Light, particles, transformation
- Single "Continue" button when complete
- This should feel like the most magical moment in the game

### 24.4 Achievement Rewards

- Badge slides in from top with bounce (500ms)
- Golden shimmer on badge (800ms)
- Particle trail sparkles
- Auto-dismiss after 4s
- Tap to view full achievement detail

### 24.5 Mission Completion

- Mission card glows briefly with Sage accent
- Checkmark appears with bounce
- XP number floats to HUD
- Mission card slides to "Completed" section after 2s
- Next mission slides into view

### 24.6 Daily Rewards

Daily login rewards (if implemented):
- Presented as a small gift box near the pet
- Pet interacts with the gift (sniffs, paws at it)
- Tap to open: gift box opens with sparkle
- Reward revealed inside (XP, decoration, item)
- Warm message: "A new day. A small gift for you."

### 24.7 Visual Hierarchy of Rewards

| Reward Level | Visual Treatment | Duration | Sound |
|-------------|-----------------|----------|-------|
| Small (XP) | Floating text | 1.5s | Tiny bell |
| Medium (achievement) | Badge + particles | 4s | Two-note melody |
| Large (evolution) | Full-screen event | 3-5s | Music box / strings |
| Milestone (scrapbook) | Card shimmer | 2s | Soft chime |

### 24.8 Animation Sequencing

Rewards are sequenced to avoid overlap:

1. **Primary reward** plays first (evolution, achievement, XP)
2. **Secondary rewards** queue behind (mission completion, streak update)
3. **HUD updates** happen last (level badge, XP bar, counters)
4. **Minimum gap** between reward animations: 500ms

**Rule**: Never show two reward animations simultaneously. Each moment deserves its own celebration.

---

## 25. Home Hub Blueprint

This is the most important section in the UI Production Guide. The Home Hub is where the player spends the majority of their time. It must be designed with extreme care.

### 25.1 Screen Composition

The Home Hub is a single, unified screen where the pet is always the visual center.

```
┌──────────────────────────────────────────┐
│  [Level Badge]              [Streak]     │ ← HUD (top, ambient)
│  [Pet Name]                             │
│                                          │
│                                          │
│                                          │
│            [Pet Sprite]                  │ ← Pet (center, dominant)
│          (48×48 @ display)              │
│                                          │
│      [Room Environment]                 │ ← Background (atmospheric)
│                                          │
│                                          │
│         [Scan FAB Button]               │ ← Primary action
│                                          │
│  ┌──────────────────────────────────────┐│
│  │  Home  Scan  Collection  Achieve  Me ││ ← Bottom nav
│  └──────────────────────────────────────┘│
└──────────────────────────────────────────┘
```

### 25.2 Proportions

| Zone | Screen Percentage | Content |
|------|-------------------|--------|
| HUD zone (top) | 10-15% | Level badge, pet name, streak counter |
| Pet zone (center) | 50-60% | Pet sprite, room environment, ambient particles |
| Action zone (lower) | 15-20% | Primary action (Scan FAB), secondary actions |
| Navigation zone (bottom) | 10-12% | Bottom navigation bar |

The pet zone must always be the largest zone. If HUD or navigation grows, the pet zone shrinks last.

### 25.3 Spacing

- Top padding (below status bar): 44-56px
- Pet sprite clear space: 40-60px on all sides
- Between HUD elements: 16px
- Between primary action and bottom nav: 16-20px
- Bottom nav height: 64-72px
- Bottom safe area: 34px

### 25.4 Hierarchy

Visual hierarchy of the Home Hub:

1. **Pet sprite** — largest, most detailed, most animated element
2. **Room environment** — atmospheric background that frames the pet
3. **Scan FAB** — the primary action, Honey-colored, bottom-center
4. **Level badge + pet name** — ambient information, top area
5. **Bottom navigation** — always reachable, never dominant
6. **Mission tracker** — compact, bottom-left, expandable on tap
7. **Ambient particles** — dust motes, light effects, atmosphere

### 25.5 HUD Placement

| Element | Position | Behavior |
|---------|----------|----------|
| Level badge | Top-left, 44px from top | Always visible, tappable for XP detail |
| Pet name | Below level badge | Always visible |
| Streak counter | Top-right | Compact (icon + number) |
| Coins (future) | Top-right, below streak | Compact pill |
| Mission tracker | Bottom-left, above nav | Collapsed by default |
| Stat indicators | Near pet (optional) | Ambient icons, fade after 5s |

**HUD rules**:
- HUD elements must never exceed 15% of screen real estate
- HUD fades to 50% opacity after 5s of inactivity
- HUD returns to full opacity on tap/hover
- Pet name and level badge are always subtly visible

### 25.6 Interaction Flow

**Opening the app**:
1. Screen loads with warmth (soft colors, gentle light) — 500ms
2. Pet is wherever it was when the player last left — instant
3. Pet notices the player (ears perk, looks up) — 500ms
4. Pet greets based on absence duration — 1000ms
5. HUD elements fade in — 300ms
6. Home Hub is ready for interaction

**Scanning a product**:
1. Player taps Scan FAB
2. Scanner transition plays (see section 15)
3. Product is scanned
4. Return to Home Hub with feeding sequence (see section 15.8)
5. XP popup, mission update, collection update happen in sequence

**Tapping the pet**:
1. Pet reacts to touch (purr, lean, happy expression) — 500ms
2. Affection particles (hearts) — 800ms
3. Small affection indicator appears briefly — 1500ms

**Checking missions**:
1. Player taps mission tracker
2. Tracker expands with smooth animation — 300ms
3. Active missions visible with progress
4. Tap outside to collapse

### 25.7 Camera Framing

The "camera" of the Home Hub frames the pet like a photograph:

- **Rule of thirds**: Pet sits at the intersection of the lower-third and center
- **Headroom**: Generous space above the pet (the "ceiling" of the room)
- **Ground**: The pet sits on a visible surface (floor, cushion, shelf)
- **Background**: Room walls, window, decorations create depth
- **Lighting**: Upper-left warm light source (consistent with pixel art shading)

### 25.8 Idle State

When the player is not interacting, the Home Hub is alive:

- Pet: Continuous idle animations (breathing, blinking, tail swish, ear twitch)
- Background: Ambient particles (dust motes in light beams)
- Lighting: Shifts subtly with time of day
- Furniture: Subtle idle animations (swinging plant, flickering lamp)
- Window: Light changes, occasional cloud shadow
- HUD: Faded to 50%, unobtrusive

### 25.9 Feeding Sequence

The feeding sequence is the emotional core of the Home Hub:

1. **Product appears** — Small pixel-art icon appears near the pet (300ms)
2. **Pet notices** — Ears perk, head turns toward product (300ms)
3. **Pet approaches** — Walks toward product cautiously (500ms)
4. **Pet sniffs** — Leans in, sniffs product (300ms)
5. **Pet eats** — Eating animation, satisfied expression (500ms)
6. **Pet reacts** — Happy bounce, hearts/sparkles float up (800ms)
7. **XP gain** — "+XX XP" floats up toward level badge (1500ms)
8. **Stat update** — Hunger/mood bars fill subtly (500ms)
9. **Pet settles** — Returns to idle position, content expression (500ms)

Total duration: ~5 seconds. The sequence is never rushed. It should feel like watching a real cat encounter food.

### 25.10 Evolution Presentation

When the pet reaches an evolution threshold:

1. **Anticipation** — Pet glows subtly, ambient particles intensify (1000ms)
2. **Screen dims** — Room darkens, warm golden light focuses on pet (500ms)
3. **Transformation** — Pet silhouette grows and changes shape (1500ms)
4. **Reveal** — Light burst, new form visible, sparkle shower (1000ms)
5. **Recognition** — "Your companion has grown" text fades in (500ms)
6. **New form** — Player sees the evolved pet in full detail (2000ms)
7. **Continue** — Single button to return to normal view
8. **Return** — Screen brightens, room returns, pet settles into new form (500ms)

Total duration: ~7 seconds. This is the most emotionally significant moment in Scan Chan. Every pixel, every particle, every sound must be perfect.

---

## 26. Component Checklist

Every UI component must pass this checklist before implementation. If a component fails more than two checks, it must be redesigned.

### Visual Checks

- [ ] **Is it rounded?** — No sharp corners. Radius proportional to size.
- [ ] **Is it warm?** — Colors are in the warm spectrum. No cool grays, no pure black, no pure white.
- [ ] **Is it consistent?** — Uses the same spacing, radius, shadow, and typography as other components.
- [ ] **Does it breathe?** — Generous whitespace around and within. Not cramped.
- [ ] **Is the hierarchy clear?** — One dominant element, clear secondary, muted tertiary.

### Interaction Checks

- [ ] **Is it tappable?** — Touch target minimum 44×44px.
- [ ] **Does it respond?** — Hover, press, focus states are defined and feel good.
- [ ] **Does it animate?** — Transitions use the correct easing and duration.
- [ ] **Is it accessible?** — Contrast ratios pass. Keyboard navigation works. Screen reader labels exist.
- [ ] **Does it honor reduced motion?** — Alternative to animation is defined.

### Philosophy Checks

- [ ] **Does it serve the pet?** — The component exists to support the companion experience.
- [ ] **Is it ambient?** — Information is felt, not read. The component does not shout.
- [ ] **Is it necessary?** — Removing it would reduce the experience. It earns its place.
- [ ] **Does it feel cozy?** — Looking at it creates a warm, calm feeling.
- [ ] **Would it pass the storybook test?** — It looks like it belongs in a handcrafted storybook, not a dashboard.

### Brand Checks

- [ ] **Does it match the Brand Book?** — Colors, typography, voice, and personality are consistent.
- [ ] **Does it match the Visual Design Document?** — Shape language, depth, composition rules are followed.
- [ ] **Does it avoid banned patterns?** — No dashboard layouts, no SaaS aesthetics, no AI-slop defaults.
- [ ] **Is the microcopy warm?** — Labels, messages, and tooltips use the brand voice.
- [ ] **Does it feel like Scan Chan?** — If you covered the logo, would someone still recognize this as Scan Chan?

### Technical Checks

- [ ] **Is it on the 4px grid?** — All spacing values are multiples of 4.
- [ ] **Is it responsive?** — Defined for mobile, tablet, and desktop.
- [ ] **Is dark mode defined?** — Colors, shadows, and backgrounds have dark mode values.
- [ ] **Are all states designed?** — Default, hover, pressed, focus, disabled, loading, error, success.
- [ ] **Is it implementable?** — A developer can build it from this specification without guessing.

---

## 27. Design System Evolution

### 27.1 What May Evolve

These elements may change over the next 5-10 years as the product grows:

| Element | How It May Evolve | Constraint |
|---------|-------------------|------------|
| Component library | New components added as features expand | Must follow existing spacing, radius, shadow, and color rules |
| Typography scale | Additional sizes added for new contexts | Must maintain Fredoka + Nunito pairing, warm proportions |
| Color palette | New semantic colors added for new stats or features | Must be warm-toned, must have defined usage and forbidden zones |
| Iconography | New icons designed for new features | Must follow existing style (rounded stroke or pixel art) |
| Animation vocabulary | New animations for new interactions | Must use defined easing curves, duration ranges, and particle rules |
| Layout patterns | New layouts for new screens (mini-games, social features) | Must follow single-column-first philosophy, pet-centric hierarchy |
| Dark mode | Deeper nighttime atmosphere, seasonal dark mode variations | Must maintain warm undertones, never pure black |
| Responsive rules | New breakpoints for new devices (foldables, AR glasses) | Must maintain pet-centric composition at every size |
| Seasonal themes | Color shifts, decorations, environmental changes per season | Must be subtle (10-15% palette adjustment), must not overwhelm the pet |
| Material language | New surfaces and textures for expanded environments | Must follow warm material rules (paper, wood, ceramic, felt — never glass, metal, glossy plastic) |
| Merchandise UI | App-to-physical design translation for merchandise | Must follow Brand Book merchandise philosophy |

### 27.2 What Must Never Change

These elements are the DNA of the Scan Chan design system and cannot be altered:

1. **The pet is always the visual center** — No matter how many features are added, the pet dominates every screen
2. **Warmth is the default temperature** — Cool palettes exist only for night mode or contrast
3. **Everything is rounded** — Sharp corners are permanently banned
4. **Information is ambient** — Stats whisper, they never shout
5. **The interface disappears behind the pet** — UI is the frame, not the painting
6. **Honey is the signature color** — The warm golden tone defines the brand
7. **Fredoka + Nunito are the voices** — Typography identity is permanent
8. **Motion is gentle** — Nothing snaps, jolts, or startles
9. **The 4px grid is the foundation** — All spacing derives from this grid
10. **The emotional contract is sacred** — No UI pattern may create guilt, urgency, or anxiety
11. **Dark mode is nighttime, not inverted** — It creates atmosphere, not contrast

### 27.3 The Ten-Year Test

Before making any design system change, ask:

> "Will this decision still feel right in ten years?"

If the answer is yes, proceed. If the answer is "it follows a current trend," reconsider. The design system must age gracefully — like a well-loved storybook, not like a tech startup's landing page.

### 27.4 Versioning

The design system is versioned:

- **Major versions** (2.0, 3.0): Structural changes — new layout philosophy, new component paradigm, new platform support
- **Minor versions** (1.1, 1.2): Additive changes — new components, new icons, new animation patterns
- **Patch versions** (1.0.1, 1.0.2): Corrections — spacing fixes, color adjustments, state clarifications

Every change is documented in CHANGELOG.md and reflected in this guide before implementation begins.

### 27.5 The Evolution Philosophy

The design system evolves like Scan Chan itself — slowly, warmly, with intention. It does not chase trends. It does not redesign for the sake of novelty. It grows richer, deeper, and more refined over time, while its core identity remains unchanged.

A player who opens Scan Chan in ten years should feel the same warmth they felt on day one — even if every component has been rebuilt, every animation refined, and every layout reimagined. The feeling is the constant. The system serves the feeling.

---

**Document Status**: This is the active Design System Bible for Scan Chan. All UI components, layouts, interactions, and compositions must conform to this document. When UI production decisions are made during development, this document must be updated before implementation is considered complete.

**Document End**
