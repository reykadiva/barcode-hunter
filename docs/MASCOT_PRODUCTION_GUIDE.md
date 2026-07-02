# Scan Chan — Mascot Production Guide

**Version**: 1.0  
**Last Updated**: June 30, 2026  
**Status**: Active — Mandatory Reference for All Mascot Asset Production  
**Document Type**: Technical Production Pipeline, Specifications, and Quality Standards

---

> **This document defines exactly HOW the Scan Chan mascot is produced.**  
> It is not a design philosophy document. It is not the Character Bible. It is the technical production specification that any professional pixel artist, illustrator, animator, or AI agent must follow to create mascot assets indistinguishable from official Scan Chan assets.  
>  
> Every mascot sprite, animation, expression, accessory, and exported asset must comply with this document.  
>  
> If an asset does not comply, it does not ship.

---

## Table of Contents

- [1. Production Philosophy](#1-production-philosophy)
- [2. Pixel Art Specifications](#2-pixel-art-specifications)
- [3. Silhouette Rules](#3-silhouette-rules)
- [4. Shape Language](#4-shape-language)
- [5. Color Production](#5-color-production)
- [6. Pixel Shading Rules](#6-pixel-shading-rules)
- [7. Animation Production Rules](#7-animation-production-rules)
- [8. Expression Library Production](#8-expression-library-production)
- [9. SVG Production Rules](#9-svg-production-rules)
- [10. Sprite Sheet Organization](#10-sprite-sheet-organization)
- [11. Asset Pipeline](#11-asset-pipeline)
- [12. Quality Control](#12-quality-control)
- [13. Future Expansion Rules](#13-future-expansion-rules)
- [14. Production Checklist](#14-production-checklist)

---

## 1. Production Philosophy

### 1.1 Why Production Consistency Matters

The Scan Chan mascot is the emotional and visual identity of the entire product. Every player interaction — scanning, feeding, playing, evolving — is mediated through this one character. If the mascot looks different from one screen to the next, from one animation to the next, or from one evolution stage to the next, the illusion of a living companion is broken.

Production consistency means:

- Every frame was drawn with the same grid, the same palette, the same outline weight
- Every animation uses the same timing philosophy, the same easing, the same anticipation
- Every expression shares the same eye shape language, the same ear movement vocabulary, the same tail behavior
- Every exported asset is named, organized, and optimized the same way

The player should never be able to tell that different frames, different expressions, or different animations were produced at different times or by different artists. The mascot must feel like a single coherent character — always.

### 1.2 Why Every Frame Must Feel Handcrafted

The mascot is pixel art. Pixel art is a medium where every single pixel is a deliberate decision. There is no auto-fill, no gradient tool, no blur filter that can hide a lazy choice. At 48×48, the entire mascot is composed of approximately 2,304 pixels. Each one matters.

A handcrafted frame means:

- No pixel is placed without intention
- No anti-aliasing is used to smooth edges (pixel art is crisp by definition)
- No automated tools generate the sprite without human review
- Every outline pixel is placed to define form, not to approximate it
- Every shading pixel serves the lighting direction and the material it represents

The difference between a mascot that feels alive and a mascot that feels like clip art is the intentionality behind every pixel.

### 1.3 Why Personality Is More Important Than Detail

A mascot with 200 shades of fur and no personality is forgettable. A mascot with 3 shades of fur and unmistakable personality is iconic.

The Scan Chan mascot communicates through:

- **Ear position** (9 distinct positions, each with a clear meaning)
- **Tail movement** (12 distinct states, each communicating emotion)
- **Eye shape** (10+ states, from wide to half-closed to closed)
- **Body posture** (sitting, standing, crouching, stretching, sleeping)
- **Timing** (how fast it blinks, how slowly it stretches, how quickly it reacts)

Detail is the polish. Personality is the soul. The production pipeline prioritizes personality first, then applies detail within the constraints of the pixel grid.

---

## 2. Pixel Art Specifications

### 2.1 Canvas Size

The mascot is produced on a **48×48 pixel grid**.

This is the base resolution for all mascot sprites. Every sprite — regardless of pose, expression, or evolution stage — is drawn on this grid.

| Parameter | Value |
|-----------|-------|
| **Base canvas** | 48×48 pixels |
| **Canvas type** | Fixed grid, no sub-pixel placement |
| **Pixel shape** | Square (1:1 aspect ratio) |
| **Coordinate origin** | Top-left corner (0,0) |
| **Grid visibility** | Grid lines visible during production, invisible in export |

### 2.2 Recommended Pixel Grid

The 48×48 grid is divided into functional zones for production consistency:

| Zone | Grid Area | Purpose |
|------|-----------|---------|
| **Head** | Rows 2-22, Columns 10-38 | Face, ears, eyes, nose, mouth |
| **Body** | Rows 22-40, Columns 12-36 | Torso, fur markings, chest |
| **Legs/Paws** | Rows 40-46, Columns 14-22 and 26-34 | Front and rear paws |
| **Tail** | Rows 20-44, Columns 0-12 or 36-48 | Tail (extends beyond body on one side) |
| **Margin** | 2px minimum on all sides | Prevents clipping during animation movement |

These zones are guidelines, not rigid boundaries. The tail and ears may extend into margin space during animation.

### 2.3 Export Resolutions

The base 48×48 sprite is exported at multiple resolutions for different display contexts:

| Export Size | Scale Factor | Usage | Rendering |
|------------|-------------|-------|-----------|
| 48×48 | 1× | Source reference only | Never displayed at native 1× |
| 96×96 | 2× | Small companion, secondary views | `image-rendering: pixelated` |
| 144×144 | 3× | Standard hub view (mobile) | `image-rendering: pixelated` |
| 192×192 | 4× | Standard hub view (desktop) | `image-rendering: pixelated` |
| 288×288 | 6× | Large display, special moments | `image-rendering: pixelated` |
| 384×384 | 8× | Marketing, splash screens | `image-rendering: pixelated` |
| 576×576 | 12× | Print, merchandise reference | Nearest-neighbor scaling |

### 2.4 Upscaling Rules

All upscaling from the 48×48 base must follow these rules:

| Rule | Description |
|------|-------------|
| **Integer scale only** | Scale by whole numbers (2×, 3×, 4×, etc.). Never scale by fractional amounts (1.5×, 2.3×). |
| **Nearest-neighbor interpolation** | Always use nearest-neighbor (pixelated) rendering. Never use bilinear, bicubic, or Lanczos. |
| **No anti-aliasing post-scale** | Never apply anti-aliasing or smoothing after upscaling. The pixel edges must remain crisp. |
| **CSS rendering** | Always apply `image-rendering: pixelated` (or `image-rendering: crisp-edges`) in CSS. |
| **Canvas rendering** | When using `<canvas>`, set `ctx.imageSmoothingEnabled = false`. |

### 2.5 Scaling Rules

The mascot must be displayed at sizes that preserve readability:

| Display Context | Minimum Display Size | Recommended Display Size |
|-----------------|---------------------|-------------------------|
| App icon / favicon | 32×32px | 48×48px |
| Badge / small icon | 48×48px | 64×64px |
| Game hub companion | 128×128px | 192×192px |
| Full room view | 192×192px | 288×288px |
| Special moments | 256×256px | 384×384px |
| Marketing / splash | 384×384px | 576×576px |

**Never display the mascot below 32×32px.** At sizes below 32px, the expression and detail become unreadable.

### 2.6 Aspect Ratio

The mascot sprite is always **1:1 (square)**. The 48×48 canvas is square, and all exports maintain the square aspect ratio.

Some poses (stretching, lying down) may use the canvas asymmetrically, but the canvas itself remains 48×48.

### 2.7 Allowed Resolutions

Only these canvas sizes are permitted for mascot production:

| Canvas | Usage |
|--------|-------|
| **48×48** | Standard mascot sprite (all poses, expressions, stages) |
| **64×64** | Extended poses that require more space (stretching, zoomies) — rare |
| **96×96** | Evolution sequences, special full-body celebrations — very rare |
| **16×16** | Simplified icon-only version (favicon, badges) — derived from 48×48, not independently drawn |
| **32×32** | Simplified icon version (small UI elements) — derived from 48×48, not independently drawn |

### 2.8 Sprite Density

Sprite density refers to how much of the 48×48 canvas is occupied by the mascot.

| State | Density Target | Description |
|-------|---------------|-------------|
| **Sitting** | ~55-65% of canvas | Compact, centered, tail may extend to edge |
| **Standing** | ~50-60% of canvas | Slightly less compact, legs visible |
| **Lying down** | ~65-75% of canvas | Sprawled, uses more horizontal space |
| **Stretching** | ~60-70% of canvas | Extended, uses vertical and horizontal space |
| **Jumping** | ~40-50% of canvas | Elevated in canvas, space below for shadow |

The mascot should never feel cramped against the canvas edges, nor should it float in excessive empty space.

### 2.9 Readable Sizes

The mascot must be **tested at every intended display size** before approval. A sprite that looks excellent at 192px may be illegible at 48px.

**Mandatory test sizes**:

1. 32×32px — Can you identify it as a cat?
2. 64×64px — Can you read the expression?
3. 128×128px — Can you see the detail?
4. 192×192px — Does it look polished?
5. 384×384px — Does it hold up at large scale?

If any test size fails, the sprite must be revised.

---

## 3. Silhouette Rules

### 3.1 The Silhouette Test

Before any sprite is approved, it must pass the silhouette test:

> **Render the sprite as a solid shape (no internal detail, no color, just the outer boundary). Can a viewer immediately identify it as the Scan Chan mascot?**

If the silhouette is ambiguous — if it could be any generic cat shape, any animal, or any blob — the sprite fails and must be revised.

### 3.2 Head Proportions

The head is the most recognizable part of the mascot.

| Parameter | Value |
|-----------|-------|
| **Head height** | 18-20px (of the 48px canvas) |
| **Head width** | 20-22px |
| **Head shape** | Slightly wider than tall — a soft, rounded rectangle |
| **Head-to-body ratio** | ~40% head, ~60% body (slightly idealized cat proportions) |

**Head rules**:

- The head must never be chibi-proportioned (head > 50% of body)
- The head must never be realistic-proportioned (head < 30% of body)
- The head should feel like "a cat, slightly idealized" — recognizable but appealing

### 3.3 Body Proportions

| Parameter | Value |
|-----------|-------|
| **Body height** | 14-16px |
| **Body width** | 16-18px |
| **Body shape** | Compact oval / egg shape when sitting |
| **Chest** | Slightly lighter fur color (suggesting a bib/chest marking) |

### 3.4 Ear Proportions

The ears are a key silhouette identifier.

| Parameter | Value |
|-----------|-------|
| **Ear height** | 6-8px (extending above the head) |
| **Ear width** | 4-5px at base |
| **Ear shape** | Slightly rounded tips — NOT pointed (like Siamese), NOT fully round (like Scottish Fold) |
| **Ear spacing** | 10-12px apart (center to center) |
| **Ear interior** | 1-2px of inner ear color (pink/warm tone), visible from the front |

**Ear silhouette rule**: The ear shape must be distinctive. If the ears were removed from the silhouette, the mascot should still be recognizable — but the ears add immediate identification.

### 3.5 Tail Proportions

The tail is the mascot's emotional semaphore. It must be visible in the silhouette.

| Parameter | Value |
|-----------|-------|
| **Tail length** | 14-18px (from base to tip) |
| **Tail width** | 2-3px at base, tapering to 1-2px at tip |
| **Tail shape at rest** | Gentle curve or curl — never straight, never rigid |
| **Tail position** | Extends to one side of the body (left or right, consistent per sprite set) |

**Tail silhouette rule**: The tail must be visible in the silhouette for sitting and standing poses. When sleeping, the tail wraps around the body and becomes part of the overall compact shape.

### 3.6 Leg Proportions

| Parameter | Value |
|-----------|-------|
| **Front legs** | 4-6px tall, 3-4px wide each |
| **Rear legs** (visible when sitting) | Implied by body shape, not separately drawn in sitting pose |
| **Leg spacing** | 4-6px apart (front legs) |

### 3.7 Paw Proportions

| Parameter | Value |
|-----------|-------|
| **Paw size** | 3-4px wide, 2-3px tall |
| **Paw shape** | Rounded, slightly wider than the leg |
| **Paw detail** | No individual toes drawn at 48×48 — paws are simple rounded shapes |
| **Paw color** | Same as fur or slightly lighter |

### 3.8 Eye Placement

| Parameter | Value |
|-----------|-------|
| **Eye position** | Vertical center of the head (rows 10-14 of the head zone) |
| **Eye spacing** | 6-8px apart (center to center) |
| **Eye size** | 3×3 or 4×4 pixels per eye |
| **Eye composition** | Dark base (2-3 tones darker than fur) + 1 highlight pixel (white or warm white) |
| **Highlight position** | Upper-right pixel of each eye (consistent light source) |

### 3.9 Mouth Placement

| Parameter | Value |
|-----------|-------|
| **Mouth position** | 2-3px below the eyes |
| **Mouth at rest** | NOT drawn — implied by the absence of pixels |
| **Mouth when open** | 2-3px wide, 1-2px tall (small, subtle) |
| **Nose** | 1-2px, centered between eyes, 1px above mouth line |

### 3.10 Balance and Center of Gravity

| Pose | Center of Gravity |
|------|-------------------|
| **Sitting** | Centered horizontally, slightly below vertical center of canvas |
| **Standing** | Centered horizontally, at vertical center |
| **Walking** | Slightly forward (direction of movement) |
| **Sleeping (curled)** | Centered, compact, low in canvas |
| **Jumping** | Elevated in canvas, space below for ground reference |

### 3.11 Readability at Small Sizes

At 32×32px display (the minimum allowed size), the following must remain identifiable:

- The overall cat shape (ears + body + tail)
- That it is facing forward, sideways, or away
- That it is in a general emotional state (alert, relaxed, sleeping)

At 32px, fine details (eye highlights, nose, whiskers) will not be visible. This is acceptable. The silhouette and general posture must carry the identity at this size.

---

## 4. Shape Language

### 4.1 Rounded Forms

Every element of the mascot uses rounded forms. There are no sharp corners anywhere in the mascot's design.

| Element | Shape |
|---------|-------|
| Head | Soft rounded rectangle with generous corner radius |
| Body | Oval / egg shape |
| Ears | Rounded triangles (tips are rounded, not pointed) |
| Eyes | Rounded squares or circles |
| Paws | Rounded rectangles or circles |
| Tail | Smooth curve with rounded tip |
| Nose | Small triangle with rounded corners (1-2px) |

### 4.2 Soft Geometry

The mascot's geometry communicates softness and approachability:

- All transitions between body parts are smooth (no hard edges between head and body)
- The neck area is implied through shading, not outlined
- Limbs connect to the body with soft curves
- The overall form reads as a single continuous shape, not assembled parts

### 4.3 Forbidden Sharp Angles

The following are never permitted in the mascot's design:

- Sharp triangular ear tips
- Angular jaw lines
- Pointed tail tips
- Sharp corners on any body part
- Geometric patterns in fur markings
- Straight-line edges longer than 4px (curves should dominate)

### 4.4 Weight Distribution

The mascot should feel grounded and stable:

- When sitting: weight is distributed evenly, the mascot feels settled
- When standing: weight is slightly forward, suggesting readiness
- When walking: weight shifts naturally with each step
- When sleeping: weight is fully relaxed, the mascot feels heavy and comfortable

### 4.5 Volume Language

The mascot has volume — it is not flat. Volume is communicated through:

- Shading (shadow on one side, highlight on the other)
- Overlap (ears overlap the head edge slightly)
- Perspective hints (front paws slightly larger than rear when standing)
- Tail depth (tail appears to come from behind the body)

### 4.6 Appeal Rules

The mascot's appeal comes from:

- **Proportion**: Slightly idealized cat proportions — not baby, not adult
- **Expression**: Eyes that communicate awareness and warmth
- **Simplicity**: Clean design readable at small sizes
- **Personality**: Distinctive markings, characteristic posture, recognizable tail shape
- **Imperfection**: Slight asymmetry in ear position or tail curl (makes it feel alive, not manufactured)

---

## 5. Color Production

### 5.1 Base Colors

The default mascot palette (calico variant, the primary brand mascot):

| Element | Color Name | Hex | Usage |
|---------|-----------|-----|-------|
| **Primary fur** | Warm Amber | `#C8935A` | Main body fur |
| **White fur** | Cream White | `#FFFFFF` | Chest, face markings, paws |
| **Dark patches** | Warm Brown | `#7B4F2E` | Dark fur patches, markings |
| **Outline** | Dark Warm Brown | `#2D2620` | All outline pixels |

### 5.2 Shadow Colors

Shadow colors are warm — never pure black or pure gray.

| Element | Shadow Color | Hex | Notes |
|---------|-------------|-----|-------|
| **Amber fur shadow** | Deep Amber | `#A07040` | 1-2 tones darker than base |
| **White fur shadow** | Warm Light Gray | `#E8DDD0` | Warm-tinted, never cool gray |
| **Brown patch shadow** | Deep Brown | `#5C3A20` | 1-2 tones darker than base |

### 5.3 Highlight Colors

Highlight colors are warm — never pure white (except eye sparkles).

| Element | Highlight Color | Hex | Notes |
|---------|----------------|-----|-------|
| **Amber fur highlight** | Light Amber | `#DDB070` | 1-2 tones lighter than base |
| **White fur highlight** | Warm White | `#FFF8F0` | Cream-tinted, matches brand Cream |
| **Brown patch highlight** | Warm Medium Brown | `#9B6B42` | 1 tone lighter than base |

### 5.4 Accent Colors

Used for specific details:

| Element | Color | Hex | Notes |
|---------|-------|-----|-------|
| **Cheek blush** | Soft Rose | `#F4A0A0` | 1-2 pixels, happy states only |
| **Collar** | Honey | `#F5A623` | Brand signature color |
| **Collar bell** | Sunbeam | `#FDE047` | 1-2px accent on collar |

### 5.5 Eye Colors

| Element | Color | Hex | Notes |
|---------|-------|-----|-------|
| **Eye base** | Dark Warm Brown | `#3D2B1F` | Main eye fill |
| **Eye highlight** | Warm White | `#FFF8F0` | 1px, upper-right of each eye |
| **Pupil (dilated)** | Near Black | `#1A1210` | For excited/curious states |
| **Pupil (narrow)** | Slit shape | Same as base | For focused/hunting states |

### 5.6 Nose Color

| Element | Color | Hex | Notes |
|---------|-------|-----|-------|
| **Nose** | Soft Pink | `#E8A0A0` | Small, warm pink |
| **Nose highlight** | Light Pink | `#F0C0C0` | Optional, 1px |

### 5.7 Inner Ear Color

| Element | Color | Hex | Notes |
|---------|-------|-----|-------|
| **Inner ear** | Soft Pink | `#E8A0A0` | 1-2px visible from front |
| **Inner ear shadow** | Muted Pink | `#C88888` | Optional depth |

### 5.8 Paw Colors

| Element | Color | Hex | Notes |
|---------|-------|-----|-------|
| **Paw pads** | Soft Pink | `#E8A0A0` | Visible when paws are raised |
| **Paw fur** | Cream White | `#FFFFFF` | Matches chest fur |

### 5.9 Outline Colors

The outline is NEVER pure black (`#000000`).

| Element | Color | Hex | Notes |
|---------|-------|-----|-------|
| **Standard outline** | Dark Warm Brown | `#2D2620` | Default for all outlines |
| **Sleeping outline** | Muted Warm Brown | `#3D3530` | Slightly lighter (suggesting softness) |
| **Shadow outline** | Deep Warm Brown | `#201A15` | For darker fur patches |

### 5.10 Seasonal Palette Adjustments

The base palette shifts subtly with seasons. These shifts are applied as color overlays or palette swaps:

| Season | Adjustment | Method |
|--------|-----------|--------|
| **Spring** | Slightly brighter, +5% saturation | Palette swap |
| **Summer** | Warmer, +5% amber shift | Palette swap |
| **Autumn** | Deeper, richer, +5% brown shift | Palette swap |
| **Winter** | Slightly cooler, lavender hint | Palette swap + overlay |

Seasonal adjustments never change the outline color or eye highlight position.

### 5.11 Rules for Introducing New Colors

When a new color is needed (for accessories, seasonal items, evolution stages):

1. The new color must harmonize with the existing warm palette
2. The new color must not be neon, oversaturated, or cold
3. The new color must have a base, shadow, and highlight variant
4. The new color must be tested against the room environment for contrast
5. The new color must be documented in this section before use
6. No more than 2 new accent colors may be introduced per asset

---

## 6. Pixel Shading Rules

### 6.1 Lighting Direction

The primary light source is always **upper-left** (consistent with the game's room lighting).

| Parameter | Value |
|-----------|-------|
| **Light angle** | 135° (upper-left, casting shadows to lower-right) |
| **Light temperature** | Warm (amber/golden) |
| **Light intensity** | Soft — never harsh, never creating high-contrast shadows |

### 6.2 Shadow Softness

Shadows on the mascot are soft, not hard:

- Shadow edges are defined by a single pixel transition (base → shadow), not a gradient
- Shadow shapes follow the form of the body part they shade
- Shadow size is proportional to the curvature of the form (more curve = wider shadow)
- Shadows never cover more than 30% of any single color area

### 6.3 Highlight Placement

Highlights communicate the direction and quality of light:

- Highlights appear on the **upper-left edges** of rounded forms
- Highlights are 1-2px wide, following the contour of the form
- Highlights are placed consistently — if the head has a highlight on its upper-left, the body should too
- Highlights use the highlight color variant, never pure white (except eye sparkles)

### 6.4 Ambient Light

The mascot exists in a warm room. Ambient light affects the overall tone:

- The side facing the light source (upper-left) is slightly warmer
- The side away from the light source (lower-right) is slightly cooler (but still warm)
- The underside (belly, bottom of paws) receives less light — shadow is slightly deeper

### 6.5 Bounce Light

When the mascot is on a surface (floor, furniture), bounce light from the surface affects the underside:

- Bounce light is a very subtle warm tone on the bottom edges of the sprite
- Bounce light is optional at 48×48 (it may not be visible at this resolution)
- If used, bounce light is 1px along the bottom edge, using a warm tone lighter than the shadow

### 6.6 Anti-Banding

At 48×48, banding (visible stripes in gradients) is a risk when shading large areas. Prevention rules:

- Never use more than 3 tonal values per color area (base, shadow, highlight)
- Never place shadow and highlight pixels adjacent to each other without a base pixel between them
- For larger flat areas (body, head), use cluster shading (see 6.7) rather than smooth gradients
- Never use dithering patterns on the mascot sprite (dithering is for backgrounds only, and only when appropriate)

### 6.7 Cluster Theory

Shading pixels should be placed in clusters, not scattered:

| Correct | Incorrect |
|---------|-----------|
| Shadow pixels grouped along a form edge | Shadow pixels randomly scattered |
| Highlight pixels following a contour | Highlight pixels placed arbitrarily |
| 2-4 pixel clusters that read as a shape | Single isolated pixels that read as noise |

**Rule**: Every shading pixel must be adjacent to at least one other pixel of the same tone. Isolated shading pixels look like noise.

### 6.8 Forbidden Shading Techniques

| Technique | Reason |
|-----------|--------|
| **Pure black shadows** | Breaks warmth, looks harsh |
| **Pure gray shadows** | Looks cold and industrial |
| **Gradient fills** | Not pixel art — pixel art uses flat tones |
| **Anti-aliased edges** | Pixel art must be crisp |
| **Ambient occlusion** | Too complex for 48×48, looks muddy |
| **Specular highlights** | Too realistic for the style |
| **Dithering on mascot** | Dithering is for backgrounds only |
| **More than 3 tonal values** | Becomes muddy and unreadable at small sizes |
| **Colored light from multiple sources** | The room has one light source — upper-left warm |

---

## 7. Animation Production Rules

### 7.1 Frame Count Recommendations

| Animation Type | Frame Count | Notes |
|---------------|-------------|-------|
| **Idle breathing** | 2-4 frames | Subtle rise and fall, looping |
| **Blink** | 3-4 frames | Anticipation → close → open |
| **Tail sway** | 4-6 frames | Smooth oscillation, looping |
| **Walking** | 6-8 frames | Full walk cycle |
| **Running** | 6-8 frames | Faster cycle, more bounce |
| **Eating** | 4-6 frames | Approach → bite → chew → pause |
| **Happy bounce** | 4-6 frames | Squash → stretch → settle |
| **Sleeping** | 2-3 frames | Gentle breathing, looping |
| **Yawning** | 5-7 frames | Open → hold → close |
| **Stretching** | 6-8 frames | Extend → hold → return |
| **Evolution** | 12-20 frames | Glow → transform → reveal |
| **Greeting** | 4-6 frames | Perks up → approaches → settles |
| **Surprised** | 3-5 frames | Flinch → freeze → recover |

### 7.2 Animation Timing

| Parameter | Standard |
|-----------|----------|
| **Frame rate** | 8-12 FPS for pixel art animations |
| **Frame duration** | 83-125ms per frame at 8-12 FPS |
| **Idle animations** | 8 FPS (slower, relaxed) |
| **Action animations** | 12 FPS (faster, responsive) |
| **Celebration animations** | 10 FPS (balanced) |

### 7.3 Idle Breathing

The most important animation — it runs continuously.

| Frame | Description | Duration |
|-------|-------------|----------|
| Frame 1 | Neutral position (baseline) | 200ms |
| Frame 2 | Slight rise (1px body shift up) | 200ms |
| Frame 3 | Peak (1px up from baseline) | 200ms |
| Frame 4 | Return to baseline | 200ms |

**Total cycle**: ~800ms, looping. The breathing is barely noticeable — it should feel subconscious, like the mascot is alive without trying to prove it.

### 7.4 Blink

| Frame | Description | Duration |
|-------|-------------|----------|
| Frame 1 | Eyes open (normal) | Variable (3-5 seconds between blinks) |
| Frame 2 | Eyes half-closed (anticipation) | 50ms |
| Frame 3 | Eyes fully closed | 80ms |
| Frame 4 | Eyes half-open | 50ms |
| Frame 5 | Eyes open (normal) | Resume idle |

**Slow blink variant**: Each frame duration doubled (100ms, 160ms, 100ms). Used for trust/affection moments.

### 7.5 Tail Animation

| State | Frame Count | Speed | Description |
|-------|-------------|-------|-------------|
| Content sway | 4 | Slow (150ms/frame) | Gentle side-to-side, 2-3px range |
| Happy sway | 6 | Medium (100ms/frame) | Wider range, 4-5px, upright |
| Excited | 4 | Fast (60ms/frame) | Rapid vibration, 2-3px, upright |
| Sleepy wrap | 2 | Very slow (300ms/frame) | Tail curling around body |
| Curious | 3 | Medium (120ms/frame) | Tail extending outward, tip twitching |

### 7.6 Sleeping Animation

| Frame | Description | Duration |
|-------|-------------|----------|
| Frame 1 | Curled position, baseline | 400ms |
| Frame 2 | Slight body rise (breathing) | 400ms |
| Frame 3 | Return to baseline | 400ms |

Optional: Small "ZZZ" particle every 5-10 seconds.

### 7.7 Walking Animation

| Frame | Description | Duration |
|-------|-------------|----------|
| Frame 1 | Left front paw forward, right rear forward | 100ms |
| Frame 2 | Body shifts right, tail sways left | 100ms |
| Frame 3 | Right front paw forward, left rear forward | 100ms |
| Frame 4 | Body shifts left, tail sways right | 100ms |
| Frame 5-6 | Transition frames (smooth movement) | 100ms each |
| Frame 7-8 | Return to frame 1 position | 100ms each |

**Total cycle**: ~800ms. The walk should feel measured and confident, not hurried.

### 7.8 Running Animation

Same structure as walking but:

- Frame duration: 60-70ms (faster cycle)
- More bounce: body rises 1-2px on each stride
- Tail streams behind
- Ears slightly back

### 7.9 Eating Animation

| Frame | Description | Duration |
|-------|-------------|----------|
| Frame 1 | Approach item, sniff (head down) | 150ms |
| Frame 2 | Take bite (head dips) | 100ms |
| Frame 3 | Chew (slight head movement) | 150ms |
| Frame 4 | Pause, look up at player | 200ms |
| Frame 5 | Resume eating or walk away | 100ms |
| Frame 6 | Post-meal grooming (licking paw) | 200ms |

### 7.10 Happy Animation

| Frame | Description | Duration |
|-------|-------------|----------|
| Frame 1 | Squash (body compresses slightly) | 80ms |
| Frame 2 | Stretch (body rises, tail up) | 80ms |
| Frame 3 | Settle (return to normal, tail swaying) | 100ms |
| Frame 4 | Purr vibration (subtle body shake) | 150ms |

### 7.11 Sad Animation

The mascot is never truly sad — only mildly disappointed.

| Frame | Description | Duration |
|-------|-------------|----------|
| Frame 1 | Slight body droop (1px down) | 200ms |
| Frame 2 | Ears droop slightly | 200ms |
| Frame 3 | Tail lowers | 200ms |
| Frame 4 | Sigh (body deflates 1px) | 300ms |
| Frame 5 | Return to neutral | 200ms |

### 7.12 Excited Animation

| Frame | Description | Duration |
|-------|-------------|----------|
| Frame 1 | Anticipation (slight crouch) | 80ms |
| Frame 2 | Jump (body rises 3-4px) | 60ms |
| Frame 3 | Peak (ears up, tail vibrating) | 60ms |
| Frame 4 | Land (slight squash) | 80ms |
| Frame 5 | Bounce (smaller rise) | 60ms |
| Frame 6 | Settle | 100ms |

### 7.13 Surprised Animation

| Frame | Description | Duration |
|-------|-------------|----------|
| Frame 1 | Freeze (all movement stops) | 100ms |
| Frame 2 | Flinch (body contracts 1px, ears flatten briefly) | 80ms |
| Frame 3 | Wide eyes (pupils dilate) | 100ms |
| Frame 4 | Cautious recovery (ears return to neutral) | 200ms |
| Frame 5 | Investigation (head tilt, approach) | 200ms |

### 7.14 Stretching Animation

| Frame | Description | Duration |
|-------|-------------|----------|
| Frame 1 | Neutral sitting | 150ms |
| Frame 2 | Front paws extend forward | 150ms |
| Frame 3 | Rear rises, full extension | 200ms |
| Frame 4 | Hold stretch | 300ms |
| Frame 5 | Release, return to sitting | 200ms |
| Frame 6 | Shake (small full-body shake) | 150ms |

### 7.15 Yawning Animation

| Frame | Description | Duration |
|-------|-------------|----------|
| Frame 1 | Eyes droop, head tilts up slightly | 200ms |
| Frame 2 | Mouth opens wide (2-3px) | 150ms |
| Frame 3 | Hold yawn (eyes fully closed) | 300ms |
| Frame 4 | Mouth closes slowly | 200ms |
| Frame 5 | Eyes open, slight head shake | 150ms |

### 7.16 Celebrating Animation

| Frame | Description | Duration |
|-------|-------------|----------|
| Frame 1 | Squash anticipation | 80ms |
| Frame 2 | Jump with tail high | 60ms |
| Frame 3 | Sparkle burst (particles) | 60ms |
| Frame 4 | Land, proud pose | 100ms |
| Frame 5 | Hold proud stance | 200ms |
| Frame 6 | Tail swish, settle | 150ms |

### 7.17 Level Up Animation

| Frame | Description | Duration |
|-------|-------------|----------|
| Frame 1 | Mascot notices something (ears perk) | 150ms |
| Frame 2 | Warm glow appears around mascot | 200ms |
| Frame 3 | Mascot rises slightly (elevated by glow) | 150ms |
| Frame 4 | Sparkle particles burst | 100ms |
| Frame 5 | Mascot lands, proud stance | 200ms |
| Frame 6 | Glow fades, mascot looks at player | 300ms |

### 7.18 Evolution Animation

The most complex and impactful animation.

| Phase | Frames | Duration | Description |
|-------|--------|----------|-------------|
| **Anticipation** | 3-4 | 600ms | Mascot glows, ears forward, body still |
| **Transformation** | 4-6 | 800ms | Bright glow fills sprite, form becomes ambiguous |
| **Reveal** | 3-4 | 600ms | Glow fades, new form visible |
| **Settlement** | 2-3 | 500ms | New form settles, looks at player, tail rises |
| **Celebration** | 3-4 | 600ms | Sparkles, proud stance, slow blink |

**Total**: ~3-4 seconds. The evolution should feel momentous but gentle — not explosive.

### 7.19 Petting Animation

| Frame | Description | Duration |
|-------|-------------|----------|
| Frame 1 | Player cursor touches head area | — |
| Frame 2 | Eyes close (enjoying) | 100ms |
| Frame 3 | Head lowers slightly (leaning into touch) | 150ms |
| Frame 4 | Purr vibration (subtle body shake) | 200ms |
| Frame 5 | Slow blink | 200ms |
| Frame 6 | Return to neutral | 150ms |

### 7.20 Waiting Animation

| Frame | Description | Duration |
|-------|-------------|----------|
| Frame 1 | Sitting upright, tail wrapped | 500ms |
| Frame 2 | Glance toward scan area | 300ms |
| Frame 3 | Return gaze to player | 300ms |
| Frame 4 | Subtle ear rotation (listening) | 400ms |

### 7.21 Thinking Animation

| Frame | Description | Duration |
|-------|-------------|----------|
| Frame 1 | Head tilt to one side | 200ms |
| Frame 2 | Hold tilt, eyes slightly narrowed | 400ms |
| Frame 3 | Ear twitch (single ear) | 150ms |
| Frame 4 | Return to neutral | 200ms |

### 7.22 Looking Around Animation

| Frame | Description | Duration |
|-------|-------------|----------|
| Frame 1 | Head turns left (slow) | 200ms |
| Frame 2 | Hold left, eyes scanning | 300ms |
| Frame 3 | Head turns right (slow) | 200ms |
| Frame 4 | Hold right, eyes scanning | 300ms |
| Frame 5 | Return to center | 200ms |

### 7.23 Rare Idle Animations

These play infrequently (1-3% chance per minute) during extended idle:

| Animation | Frames | Description |
|-----------|--------|-------------|
| **Chase pixel bug** | 8-10 | Small bug crosses screen, mascot chases with paws |
| **Bird watching** | 4-6 | Stares at window area, tail twitching, chirps |
| **Sneeze** | 3-4 | Small sneeze, looks surprised, shakes head |
| **Self-grooming** | 6-8 | Licking paw, cleaning face, meticulous |
| **Shadow play** | 4-6 | Paws at own shadow on the floor |
| **Zoomie** | 6-8 | Sudden burst of speed across screen |
| **Dream (sleeping)** | 2-3 | Paw twitches during sleep |

### 7.24 Secret Animations

| Animation | Trigger Condition | Description |
|-----------|-------------------|-------------|
| **3 AM pose** | App opened at 3:00 AM | Mascot sits in unusual contemplative pose |
| **Long absence greeting** | 1+ month absence | Slow wake, three yawns, cautious approach |
| **Gift giving** | High bond + random | Mascot brings small pixel item to cursor |
| **Night patrol** | App opened 2-4 AM | Mascot walks room perimeter |

### 7.25 Animation Principles

Every animation must follow these principles:

| Principle | Description |
|-----------|-------------|
| **Anticipation** | Before any movement, a small preparatory motion in the opposite direction |
| **Follow-through** | Tail and ears continue moving slightly after the body stops |
| **Ease-in / Ease-out** | Movements start slow, accelerate, then decelerate. Never linear. |
| **Squash and stretch** | Jumps and landings use compression and extension for weight |
| **Overlapping action** | Ears, tail, and body move at slightly different times |
| **Appeal** | Every frame should look good — no awkward in-between poses |
| **Timing** | Faster movements = more energy. Slower movements = more weight. |
| **Staging** | The mascot's action should be clear against the background |

---

## 8. Expression Library Production

This section defines exactly how to draw each expression. Every expression shares the same base body sprite — only the face elements (eyes, mouth, ears) and tail/posture change.

### 8.1 Happy

| Element | Production Spec |
|---------|----------------|
| **Eyes** | Slightly narrowed (reduce eye height by 1px from top). Highlight pixel remains. Shape becomes a gentle crescent. |
| **Mouth** | Not drawn (implied by upward curve of cheek pixels). Optional: 1px upward curve below nose position. |
| **Tail** | Upright with gentle S-curve. Animate with slow sway (section 7.5 content sway). |
| **Ears** | Forward, relaxed. Rotate 1px outward from neutral. |
| **Posture** | Upright sitting or standing. Chest slightly puffed (add 1px to chest width). |
| **Motion** | Occasional purr vibration (shift entire sprite 1px left-right every 300ms). |
| **Emotion readability** | Should read as "content and pleased" at all sizes. |

### 8.2 Sleepy

| Element | Production Spec |
|---------|----------------|
| **Eyes** | Half-closed. Remove top 1-2 rows of eye pixels, replace with fur color. Remaining eye area has drooping shape. |
| **Mouth** | Not drawn. Optional: small open mouth (1×2px) during yawn frames. |
| **Tail** | Low, relaxed, draped along the ground. Minimal animation. |
| **Ears** | Drooping backward. Rotate 2px backward from neutral. |
| **Posture** | Lowered body (shift entire sprite 1px down). Head tilts slightly. |
| **Motion** | Slow breathing (2-frame cycle, 400ms per frame). Occasional yawn overlay. |
| **Emotion readability** | Should read as "drowsy and comfortable" — never distressed. |

### 8.3 Hungry

| Element | Production Spec |
|---------|----------------|
| **Eyes** | Normal open, slightly wider (add 1px to eye height). Alert, scanning. |
| **Mouth** | Not drawn at rest. Optional: slight open (1×1px) when sniffing. |
| **Tail** | Low with occasional twitch (rapid 2-frame twitch every 2-3 seconds). |
| **Ears** | Forward, alert. Slightly more upright than neutral. |
| **Posture** | Upright, oriented toward scan area. Body leans slightly forward. |
| **Motion** | Repeated glances toward scan area (head turn animation, every 3-5 seconds). |
| **Emotion readability** | Should read as "interested and attentive" — never desperate or angry. |

### 8.4 Excited

| Element | Production Spec |
|---------|----------------|
| **Eyes** | Wide open (add 1px to eye height and width). Pupils dilated (expand dark area by 1px). |
| **Mouth** | Slightly open (2×1px, centered below nose). |
| **Tail** | Upright, vibrating (rapid 2-frame oscillation, 60ms per frame). |
| **Ears** | Forward, twitching (rapid 1px rotation on random frames). |
| **Posture** | Elevated (shift body 1-2px up). Slight bounce animation. |
| **Motion** | Small hops (squash-stretch cycle, section 7.12). |
| **Emotion readability** | Should read as "thrilled and energetic" — joyful, not anxious. |

### 8.5 Curious

| Element | Production Spec |
|---------|----------------|
| **Eyes** | Wide open (add 1px to eye height). Bright, focused. |
| **Mouth** | Slightly open (1×1px). |
| **Tail** | Straight out with upward curve at tip. Tip twitches (2-frame animation, 120ms). |
| **Ears** | Forward, rotating (slow ear rotation animation). |
| **Posture** | Leaning forward (shift upper body 1-2px forward). Head tilted (shift head 1px to one side). |
| **Motion** | Head tilt hold with sniffing animation (nose area vibrates subtly). |
| **Emotion readability** | Should read as "intrigued and investigating" — engaged, not confused. |

### 8.6 Embarrassed

| Element | Production Spec |
|---------|----------------|
| **Eyes** | Averted (shift eye highlight to opposite corner). Slightly narrowed. |
| **Mouth** | Not drawn. |
| **Tail** | Wrapped tightly around body (tail curves across front of body). |
| **Ears** | Slightly flattened (rotate 1-2px backward). |
| **Posture** | Slightly crouched (shift body 1px down). Compact. |
| **Motion** | Brief freeze (hold for 500ms), then quick return to neutral. Optional: cheek blush pixels appear briefly. |
| **Emotion readability** | Should read as "shy and briefly self-conscious" — cute, not distressed. |

### 8.7 Sad (Mild Disappointment)

| Element | Production Spec |
|---------|----------------|
| **Eyes** | Slightly drooped (remove 1px from top of eye). Muted appearance. |
| **Mouth** | Not drawn. |
| **Tail** | Low, still, or slow droop. |
| **Ears** | Slightly back (rotate 1px backward from neutral). |
| **Posture** | Slightly lowered (shift body 1px down). |
| **Motion** | Sigh animation (body deflates 1px, then slowly returns). Brief — returns to neutral within 2 seconds. |
| **Emotion readability** | Should read as "mildly disappointed" — never devastated, never guilt-inducing. |

### 8.8 Scared (Startled)

| Element | Production Spec |
|---------|----------------|
| **Eyes** | Very wide (add 1-2px to eye height). Pupils dilated. |
| **Mouth** | Small O shape (1×2px, open). |
| **Tail** | Puffed (increase tail width by 1px on each side). Brief — returns to normal in 1 second. |
| **Ears** | Flat against head (rotate fully backward). Brief — returns to neutral quickly. |
| **Posture** | Crouched (shift body 2px down). Compact. |
| **Motion** | Full-body flinch (1-frame contraction), then freeze, then cautious recovery. |
| **Emotion readability** | Should read as "briefly startled" — recovers quickly, never frightened. |

### 8.9 Relaxed (Peaceful)

| Element | Production Spec |
|---------|----------------|
| **Eyes** | Closed (replace eye pixels with fur color + outline). |
| **Mouth** | Not drawn. |
| **Tail** | Wrapped around body (tail curls in front). |
| **Ears** | Neutral, slightly rotating (slow ear rotation idle). |
| **Posture** | Seated upright, perfectly still. |
| **Motion** | Slow breathing only. This is the most peaceful expression. |
| **Emotion readability** | Should read as "deeply at peace" — meditative, serene. |

### 8.10 Focused

| Element | Production Spec |
|---------|----------------|
| **Eyes** | Narrow (reduce eye height by 1-2px from bottom). Intense. |
| **Mouth** | Not drawn. |
| **Tail** | Still, low, pointing at target. |
| **Ears** | Forward, fixed (no rotation). |
| **Posture** | Low crouch (shift body 2px down). Completely still. |
| **Motion** | No body movement — only eyes track the target (shift eye pixels toward target). |
| **Emotion readability** | Should read as "intensely concentrating" — hunting mode, playful. |

### 8.11 Confused

| Element | Production Spec |
|---------|----------------|
| **Eyes** | Normal open, slightly asymmetric (one eye 1px different from the other). |
| **Mouth** | Not drawn. Optional: slight sideways curve. |
| **Tail** | Question mark shape (upright with hook at tip). |
| **Ears** | One ear forward, one ear back (asymmetric). |
| **Posture** | Head tilted (shift head 2px to one side). |
| **Motion** | Head tilt hold with occasional blink. Small "mrrp?" sound cue. |
| **Emotion readability** | Should read as "puzzled but not distressed" — curious confusion. |

### 8.12 Proud

| Element | Production Spec |
|---------|----------------|
| **Eyes** | Normal open, direct gaze (eyes centered, looking forward). |
| **Mouth** | Not drawn. Optional: slight upward curve. |
| **Tail** | Upright, perfectly still (no sway animation). |
| **Ears** | Forward, upright (slightly more vertical than neutral). |
| **Posture** | Chest puffed (add 1px to chest area). Perfect upright sitting. Head held slightly higher. |
| **Motion** | Minimal — only slow breathing. The stillness IS the pride. |
| **Emotion readability** | Should read as "quietly proud and dignified" — not arrogant, satisfied. |

---

## 9. SVG Production Rules

### 9.1 SVG Philosophy

The Scan Chan mascot is rendered as SVG in the application. The SVG approach provides crisp pixel rendering at any display size, programmatic animation control, and color palette swapping without external image files.

### 9.2 SVG Structure

Every mascot SVG follows this structure:

```xml
<svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
  <g id="mascot-base">
    <g id="body">...</g>
    <g id="tail">...</g>
    <g id="head">
      <g id="ears">...</g>
      <g id="face">
        <g id="eyes">...</g>
        <g id="nose">...</g>
        <g id="mouth">...</g>
      </g>
    </g>
    <g id="legs">...</g>
  </g>
  <g id="accessories">...</g>
  <g id="particles">...</g>
</svg>
```

### 9.3 SVG Optimization

| Rule | Description |
|------|-------------|
| **No inline styles** | Use `fill` and `stroke` attributes directly on elements |
| **Rect elements for pixels** | Each pixel is a `<rect>` with `width="1"` and `height="1"` |
| **Color references** | Use CSS custom properties for palette colors (enables palette swapping) |
| **No transforms on individual pixels** | Transforms apply to groups only |
| **Minimize file size** | Remove metadata, comments, and unnecessary attributes |
| **ViewBox** | Always `viewBox="0 0 48 48"` for standard sprites |

### 9.4 Group Naming

| Group ID | Contents |
|----------|----------|
| `mascot-base` | Root group containing the entire mascot |
| `body` | Torso, chest markings, fur patterns |
| `tail` | All tail pixels (separate group for independent animation) |
| `head` | Head shape, fur markings on head |
| `ears` | Both ears (separate group for ear animation) |
| `ear-left` | Left ear specifically |
| `ear-right` | Right ear specifically |
| `face` | All facial features |
| `eyes` | Both eyes |
| `eye-left` | Left eye specifically |
| `eye-right` | Right eye specifically |
| `nose` | Nose pixels |
| `mouth` | Mouth pixels (when visible) |
| `legs` | All legs and paws |
| `accessories` | Collar, hat, scarf (when equipped) |
| `particles` | Hearts, sparkles, ZZZs (when active) |

### 9.5 Transform Rules

| Transform | Usage | Notes |
|-----------|-------|-------|
| `translate` | Body movement, position changes | Primary movement method |
| `rotate` | Ear rotation, head tilt | Applied to group origin point |
| `scale` | Squash and stretch | Applied symmetrically or on one axis |
| `opacity` | Particle fade-in/fade-out | 0 to 1 transitions |

**Never use**: `skew`, `matrix`, or complex compound transforms on pixel groups.

### 9.6 Animation Compatibility

The SVG structure must support CSS and JavaScript animation:

- Every animatable group must have a unique `id`
- Transform origins must be set explicitly (e.g., ear rotation origin at ear base)
- Animation keyframes should use `transform` properties, not pixel manipulation
- CSS transitions preferred for simple state changes
- JavaScript `requestAnimationFrame` for complex multi-frame animations

### 9.7 File Organization

SVG files are organized by purpose:

```
/src/
  /assets/
    /mascot/
      /base/
        sit.svg
        stand.svg
        sleep.svg
        walk/
          walk-01.svg through walk-08.svg
      /expressions/
        happy.svg
        sleepy.svg
        hungry.svg
        ...
      /accessories/
        collar.svg
        scarf-winter.svg
        ...
      /particles/
        heart.svg
        sparkle.svg
        zzz.svg
```

---

## 10. Sprite Sheet Organization

### 10.1 Folder Structure

```
/mascot-assets/
  /source/                     # Production files (Aseprite, Piskel, etc.)
    /base/                     # Base body sprites per evolution stage
      kitten.aseprite
      young-cat.aseprite
      adult-cat.aseprite
      wise-cat.aseprite
      legendary-cat.aseprite
    /expressions/              # Expression overlays per stage
      kitten-happy.aseprite
      kitten-sleepy.aseprite
      ...
    /animations/               # Animation frame sequences
      /idle/
      /walk/
      /eat/
      ...
    /accessories/              # Accessory sprites
      /collars/
      /hats/
      /scarves/
  /export/                     # Production-ready exports
    /svg/                      # SVG files for web rendering
    /png/                      # PNG exports at various scales
      /1x/                     # 48×48 native
      /2x/                     # 96×96
      /4x/                     # 192×192
      /8x/                     # 384×384
  /reference/                  # Reference sheets
    expression-sheet.png
    animation-sheet.png
    color-palette.png
    silhouette-test.png
```

### 10.2 Naming Convention

All files follow this pattern:

```
{stage}-{pose}-{expression}-{frame}.{ext}
```

| Component | Values | Example |
|-----------|--------|----------|
| **stage** | `kitten`, `young-cat`, `adult-cat`, `wise-cat`, `legendary-cat` | `kitten` |
| **pose** | `sit`, `stand`, `walk`, `sleep`, `stretch`, `eat`, `jump`, `lie` | `sit` |
| **expression** | `neutral`, `happy`, `sleepy`, `hungry`, `excited`, `curious`, `embarrassed`, `sad`, `scared`, `relaxed`, `focused`, `confused`, `proud` | `happy` |
| **frame** | `01` through `99` (zero-padded) | `01` |

**Examples**:
- `kitten-sit-neutral-01.svg`
- `adult-cat-walk-neutral-03.svg`
- `young-cat-sit-happy-01.svg`
- `legendary-cat-sleep-neutral-02.svg`

### 10.3 Animation Folders

Each animation type has its own subfolder:

```
/animations/
  /idle-breathing/
    kitten-sit-neutral-01.svg through 04.svg
  /blink/
    kitten-sit-neutral-blink-01.svg through 04.svg
  /walk/
    kitten-walk-neutral-01.svg through 08.svg
  /eat/
    kitten-eat-neutral-01.svg through 06.svg
  /evolution/
    kitten-evolve-01.svg through 20.svg
```

### 10.4 Frame Numbering

- Frames are numbered sequentially starting from `01`
- Frame `01` is always the first frame of the animation (or the neutral/rest pose)
- Looping animations end with a frame that transitions smoothly back to `01`
- One-shot animations end with a frame that matches the target idle pose

### 10.5 Export Naming

Exported files include the scale factor:

```
kitten-sit-happy-01@2x.png    → 96×96
kitten-sit-happy-01@4x.png    → 192×192
kitten-sit-happy-01.svg       → Vector (resolution-independent)
```

### 10.6 Future Scalability

The naming and folder system must support:

- **New evolution stages**: Add new stage prefix without restructuring
- **New poses**: Add new pose name without conflict
- **New expressions**: Add new expression name without conflict
- **New species**: Add species prefix before stage (e.g., `dog-kitten-sit-neutral-01.svg`)
- **Seasonal variants**: Add season suffix (e.g., `kitten-sit-happy-01-winter.svg`)

---

## 11. Asset Pipeline

### 11.1 Pipeline Stages

Every mascot asset follows this production pipeline in order:

```
Concept → Sketch → Approval → Pixel Pass → Cleanup → Animation → Review → Implementation → QA → Iteration
```

### 11.2 Concept

| Step | Description | Output |
|------|-------------|--------|
| 1 | Define the purpose of the asset (new expression, animation, accessory, evolution stage) | Written brief |
| 2 | Reference the Character Bible for personality alignment | Notes on behavior and emotion |
| 3 | Reference the Art Direction Research for visual alignment | Notes on shape, color, style |
| 4 | Reference this Production Guide for technical specs | Canvas size, palette, grid zones |

### 11.3 Sketch

| Step | Description | Output |
|------|-------------|--------|
| 1 | Draw a rough sketch at 48×48 (or larger, then reduce) | Low-fidelity sketch |
| 2 | Focus on silhouette, proportions, and pose | Shape validation |
| 3 | Test the silhouette (fill with solid color) | Silhouette test result |
| 4 | Verify proportions against section 3 | Proportion check |

### 11.4 Approval

| Step | Description | Output |
|------|-------------|--------|
| 1 | Submit sketch for review against Character Bible | Review notes |
| 2 | Verify the sketch passes the Character Checklist | Checklist result |
| 3 | Verify the sketch passes the Brand Checklist | Checklist result |
| 4 | Approved sketches move to pixel pass | Approved sketch file |

### 11.5 Pixel Pass

| Step | Description | Output |
|------|-------------|--------|
| 1 | Place the sketch on the 48×48 grid | Grid-aligned sketch |
| 2 | Draw outlines using Dark Warm Brown (`#2D2620`) | Outline layer |
| 3 | Fill base colors using the approved palette | Base color layer |
| 4 | Add shadow colors following lighting direction (upper-left) | Shadow layer |
| 5 | Add highlight colors on upper-left edges | Highlight layer |
| 6 | Verify all pixels are intentional (no stray pixels) | Clean sprite |

### 11.6 Cleanup

| Step | Description | Output |
|------|-------------|--------|
| 1 | Remove any stray or orphaned pixels | Clean sprite |
| 2 | Verify outline consistency (1px weight throughout) | Consistent outline |
| 3 | Verify color palette (no unauthorized colors) | Palette-verified sprite |
| 4 | Verify shading direction (all shadows lower-right) | Lighting-verified sprite |
| 5 | Test at all display sizes (32px, 64px, 128px, 192px, 384px) | Size test results |

### 11.7 Animation

| Step | Description | Output |
|------|-------------|--------|
| 1 | Define the animation frame count (section 7) | Frame plan |
| 2 | Draw key frames (first, peak, last) | Key frame sprites |
| 3 | Draw in-between frames | Complete frame set |
| 4 | Test animation at target FPS | Timing test |
| 5 | Verify follow-through on tail and ears | Animation review |
| 6 | Verify easing (no linear movement) | Easing test |

### 11.8 Review

| Step | Description | Output |
|------|-------------|--------|
| 1 | Run the Quality Control checklist (section 12) | QC results |
| 2 | Compare against existing mascot assets for consistency | Consistency check |
| 3 | Verify against Character Bible personality | Personality check |
| 4 | Verify against Brand Book visual identity | Brand check |
| 5 | Get second opinion from another artist or reviewer | Review notes |

### 11.9 Implementation

| Step | Description | Output |
|------|-------------|--------|
| 1 | Export SVG following section 9 rules | SVG file |
| 2 | Export PNG at all required scales | PNG files |
| 3 | Name files following section 10 convention | Named files |
| 4 | Place files in correct folder structure | Organized files |
| 5 | Update sprite references in code | Code integration |
| 6 | Test in the running application | Live test |

### 11.10 QA

| Step | Description | Output |
|------|-------------|--------|
| 1 | Visual test on all target devices | Device test results |
| 2 | Animation test (smooth playback, correct timing) | Animation QA |
| 3 | Interaction test (triggers correctly, transitions smooth) | Interaction QA |
| 4 | Accessibility test (readable at minimum size, sufficient contrast) | Accessibility QA |
| 5 | Regression test (existing animations still work) | Regression QA |

### 11.11 Iteration

If any QA step fails:

1. Document the failure specifically (which test, what was wrong)
2. Return to the appropriate pipeline stage
3. Fix the issue
4. Re-run the failed test
5. Re-run all subsequent tests
6. Document the fix in the asset's production notes

---

## 12. Quality Control

### 12.1 Mandatory QC Checklist

Every mascot asset must pass ALL of the following checks before approval:

#### Readability

| # | Check | Pass Criteria |
|---|-------|---------------|
| 1 | Is the sprite readable at 32×32px display? | Can identify as a cat shape |
| 2 | Is the expression readable at 64×64px display? | Can identify the emotional state |
| 3 | Is the detail visible at 192×192px display? | All shading and detail is clear |
| 4 | Does the sprite hold up at 384×384px display? | No awkward pixel artifacts at large scale |

#### Silhouette

| # | Check | Pass Criteria |
|---|-------|---------------|
| 5 | Does the silhouette pass the recognition test? | Immediately identifiable as Scan Chan |
| 6 | Is the silhouette distinct from generic cat sprites? | Has unique features (ear shape, tail curl, proportions) |
| 7 | Does the silhouette work for this specific pose? | Pose is identifiable from silhouette alone |

#### Emotion

| # | Check | Pass Criteria |
|---|-------|---------------|
| 8 | Is the emotion readable without facial detail? | Body language alone communicates the emotion |
| 9 | Does the emotion match the Character Bible description? | Consistent with section 3.14 of Character Bible |
| 10 | Is the emotion appropriate (never frightening, never aggressive)? | Passes the emotional design principles |

#### Animation Smoothness

| # | Check | Pass Criteria |
|---|-------|---------------|
| 11 | Does the animation play smoothly at target FPS? | No stuttering or jarring transitions |
| 12 | Is there anticipation before sudden movements? | Preparatory motion visible |
| 13 | Is there follow-through on tail and ears? | Secondary motion after primary action |
| 14 | Are easing functions applied (no linear movement)? | Movements accelerate and decelerate |
| 15 | Does the looping animation loop seamlessly? | No visible jump between last and first frame |

#### Pixel Cleanliness

| # | Check | Pass Criteria |
|---|-------|---------------|
| 16 | Are there any stray or orphaned pixels? | No isolated pixels without purpose |
| 17 | Is the outline consistent (1px throughout)? | No double outlines or missing outlines |
| 18 | Are all pixels on the grid (no sub-pixel placement)? | Clean grid alignment |
| 19 | Is there any anti-aliasing? | None — pixel art is crisp |

#### Color Consistency

| # | Check | Pass Criteria |
|---|-------|---------------|
| 20 | Are all colors from the approved palette? | No unauthorized colors used |
| 21 | Are shadows warm (no pure black or gray)? | Shadow colors are warm-toned |
| 22 | Are highlights warm (no pure white except eyes)? | Highlight colors are warm-toned |
| 23 | Is the outline color correct (`#2D2620`)? | Matches specification |
| 24 | Does the palette harmonize with the room environment? | Mascot does not clash with background |

#### Brand Consistency

| # | Check | Pass Criteria |
|---|-------|---------------|
| 25 | Does this pass the Brand Checklist (20 questions)? | All questions pass |
| 26 | Does this pass the Character Checklist (15 questions)? | All questions pass |
| 27 | Would a player recognize this as Scan Chan? | Immediate recognition |
| 28 | Does this feel warm and handcrafted? | Emotional quality check |
| 29 | Is this timeless (no trend-dependent elements)? | No trend references |
| 30 | Is this premium quality (Nintendo/Supercell standard)? | Quality benchmark met |

---

## 13. Future Expansion Rules

### 13.1 Philosophy

The mascot system must grow without breaking identity. Every expansion follows the rules in this section to ensure consistency.

### 13.2 Creating Seasonal Outfits

| Rule | Description |
|------|-------------|
| 1 | The outfit must not alter the mascot's silhouette significantly |
| 2 | The outfit uses at most 2 new accent colors |
| 3 | The outfit is drawn on the same 48×48 grid |
| 4 | The outfit is a separate SVG layer (`accessories` group) |
| 5 | The outfit must be removable (mascot looks complete without it) |
| 6 | The outfit follows the Character Bible customization rules |
| 7 | The outfit is tested with all existing animations |

### 13.3 Creating Accessories

| Rule | Description |
|------|-------------|
| 1 | Maximum 2 accessories at a time |
| 2 | Each accessory occupies no more than 20% of the sprite area |
| 3 | Accessories are placed only on: neck, head, or back |
| 4 | Each accessory has its own SVG file in `/accessories/` |
| 5 | Accessories must not clip through the mascot's body |
| 6 | Accessories animate with the mascot (follow transform groups) |

### 13.4 Creating Furniture Interactions

| Rule | Description |
|------|-------------|
| 1 | The mascot sprite must be adjusted for each furniture interaction (sit on chair, sleep on bed) |
| 2 | The furniture sprite is produced separately at its own grid size |
| 3 | The mascot's position relative to the furniture is defined explicitly (x,y offset) |
| 4 | The mascot's shadow must match the furniture's surface |
| 5 | The interaction must be tested with all expressions |

### 13.5 Creating New Animations

| Rule | Description |
|------|-------------|
| 1 | Define the animation purpose and emotional context |
| 2 | Determine frame count using section 7 recommendations |
| 3 | Draw key frames first, then in-betweens |
| 4 | Test at target FPS |
| 5 | Verify follow-through and easing |
| 6 | Run through full QC checklist |
| 7 | Test transition from and to idle states |

### 13.6 Creating New Emotions

| Rule | Description |
|------|-------------|
| 1 | Define the emotion using the format in section 8 |
| 2 | Verify the emotion does not duplicate an existing expression |
| 3 | Draw the expression on the standard base sprite |
| 4 | Test readability at all display sizes |
| 5 | Verify the emotion passes the Character Bible personality rules |
| 6 | Add to the expression library naming convention |

### 13.7 Creating Future Evolution Stages

| Rule | Description |
|------|-------------|
| 1 | The new stage uses the same 48×48 grid |
| 2 | The new stage follows the head/body ratios defined in the Art Direction Research |
| 3 | The new stage has its own base sprite set (all poses, all expressions) |
| 4 | The new stage's palette is defined and documented |
| 5 | The new stage passes the silhouette test (recognizable as the same character, evolved) |
| 6 | The evolution animation from the previous stage is produced |
| 7 | All existing animations are re-produced for the new stage |

### 13.8 Creating New Species (Future)

| Rule | Description |
|------|-------------|
| 1 | The new species uses the same 48×48 grid |
| 2 | The new species follows the same shape language (rounded, soft, warm) |
| 3 | The new species has its own Character Bible entry |
| 4 | The new species shares the animation skeleton (same pose names, same expression names) |
| 5 | The new species uses the brand color palette |
| 6 | The new species passes the Brand Checklist |
| 7 | The new species is visually distinct from all existing species |

---

## 14. Production Checklist

### 14.1 Mandatory Production Checklist

Every mascot asset — sprite, animation frame, expression, accessory, or export — must pass this checklist before implementation:

| # | Question | Pass Criteria |
|---|----------|---------------|
| 1 | Was this produced on the correct grid (48×48)? | Canvas size verified |
| 2 | Are all colors from the approved palette? | No unauthorized colors |
| 3 | Is the outline warm brown, not black? | `#2D2620` or approved variant |
| 4 | Is the outline consistently 1px? | No double outlines, no gaps |
| 5 | Are shadows warm-toned? | No pure black or pure gray shadows |
| 6 | Are highlights warm-toned? | No pure white highlights (except eyes) |
| 7 | Is there no anti-aliasing? | Crisp pixel edges only |
| 8 | Is there no more than 3 tonal values per color area? | Clean, readable shading |
| 9 | Does the silhouette pass the recognition test? | Immediately identifiable |
| 10 | Is the expression readable at 64×64px? | Emotion is clear |
| 11 | Is the sprite readable at 32×32px? | Cat shape is identifiable |
| 12 | Does the animation use anticipation and follow-through? | Natural movement |
| 13 | Does the animation use easing (no linear motion)? | Smooth acceleration/deceleration |
| 14 | Does the looping animation loop seamlessly? | No visible jump |
| 15 | Are there no stray or orphaned pixels? | Clean sprite |
| 16 | Is the SVG properly structured (section 9)? | Correct groups, naming, transforms |
| 17 | Is the file named correctly (section 10)? | Follows naming convention |
| 18 | Is the file in the correct folder (section 10)? | Correct location |
| 19 | Has the asset been tested at all display sizes? | 32px through 384px verified |
| 20 | Does this pass the Character Checklist? | All 15 questions pass |
| 21 | Does this pass the Brand Checklist? | All 20 questions pass |
| 22 | Does this feel like Scan Chan? | Immediate emotional recognition |
| 23 | Does this feel handcrafted? | Every pixel is intentional |
| 24 | Is this premium quality? | Nintendo/Supercell standard met |
| 25 | Would this still look right in five years? | No trend-dependent elements |

### 14.2 How to Use the Production Checklist

1. Before submitting any mascot asset for implementation, review every question above.
2. If any question fails, the asset must be revised.
3. If an asset fails 5 or more questions, it must be fundamentally reworked.
4. The checklist applies to: base sprites, expression variants, animation frames, accessory sprites, exported SVGs, exported PNGs, and any other mascot-related asset.

### 14.3 Escalation

If a production decision conflicts with this guide:

1. Document the conflict
2. Propose a production method that satisfies both the need and this guide
3. If no alternative exists, this guide takes priority
4. The conflict and resolution are logged for future reference

---

**Document Status**: This document is the definitive production specification for the Scan Chan mascot. Every mascot asset must comply with this document before implementation.

**Document End**

