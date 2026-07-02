# Scan Chan — Game Design Document

**Version**: 2.0  
**Last Updated**: June 30, 2026  
**Status**: Foundation for v2.0 Development  
**Document Type**: Master Design Reference

---

## Table of Contents

- [1. Executive Summary](#1-executive-summary)
  - [1.1 The Vision](#11-the-vision)
  - [1.2 The Core Fantasy](#12-the-core-fantasy)
  - [1.3 Target Audience](#13-target-audience)
  - [1.4 Platform Philosophy](#14-platform-philosophy)
- [2. Core Design Principles](#2-core-design-principles)
- [3. Visual Philosophy](#3-visual-philosophy)
  - [3.1 Art Direction](#31-art-direction)
  - [3.2 UI Philosophy](#32-ui-philosophy)
  - [3.3 Environmental Storytelling](#33-environmental-storytelling)
- [4. Emotional Goals](#4-emotional-goals)
  - [4.1 Intended Emotions](#41-intended-emotions)
  - [4.2 Emotions to Avoid](#42-emotions-to-avoid)
  - [4.3 The Emotional Contract](#43-the-emotional-contract)
- [5. The Pet System](#5-the-pet-system)
  - [5.1 Who is Scan Chan?](#51-who-is-scan-chan)
  - [5.2 Personality System](#52-personality-system)
  - [5.3 Memory System](#53-memory-system)
- [6. Pet Stats & Needs](#6-pet-stats--needs)
  - [6.1 Hunger](#61-hunger)
  - [6.2 Mood](#62-mood)
  - [6.3 Energy](#63-energy)
  - [6.4 Affection](#64-affection)
  - [6.5 Curiosity](#65-curiosity)
  - [6.6 Stat Interactions](#66-stat-interactions)
  - [6.7 Visual Communication](#67-visual-communication)
- [7. Evolution Stages](#7-evolution-stages)
  - [7.1 Stage 1: Kitten](#71-stage-1-kitten-level-1-5)
  - [7.2 Stage 2: Young Cat](#72-stage-2-young-cat-level-6-15)
  - [7.3 Stage 3: Adult Cat](#73-stage-3-adult-cat-level-16-35)
  - [7.4 Stage 4: Wise Cat](#74-stage-4-wise-cat-level-36-60)
  - [7.5 Stage 5: Legendary Cat](#75-stage-5-legendary-cat-level-61-100)
  - [7.6 Evolution Events](#76-evolution-events)
- [8. The Gameplay Loop](#8-the-gameplay-loop)
  - [8.1 Core Loop (Single Session)](#81-core-loop-single-session)
  - [8.2 Daily Loop](#82-daily-loop)
  - [8.3 Weekly Loop](#83-weekly-loop)
  - [8.4 Monthly Loop](#84-monthly-loop)
- [9. Why Barcode Scanning Matters](#9-why-barcode-scanning-matters)
  - [9.1 The Problem with Traditional Pet Games](#91-the-problem-with-traditional-pet-games)
  - [9.2 The Scan Chan Solution](#92-the-scan-chan-solution)
  - [9.3 The Emotional Bridge](#93-the-emotional-bridge)
  - [9.4 The Collection Fantasy](#94-the-collection-fantasy)
- [10. XP & Progression Design](#10-xp--progression-design)
  - [10.1 XP Philosophy](#101-xp-philosophy)
  - [10.2 XP Sources](#102-xp-sources)
  - [10.3 The Level Curve](#103-the-level-curve)
  - [10.4 Daily XP Caps](#104-daily-xp-caps)
  - [10.5 Bonus XP Events](#105-bonus-xp-events)
- [11. Daily Missions Philosophy](#11-daily-missions-philosophy)
  - [11.1 Mission Design Principles](#111-mission-design-principles)
  - [11.2 Mission Categories](#112-mission-categories)
  - [11.3 Mission Refresh](#113-mission-refresh)
  - [11.4 Mission Rewards](#114-mission-rewards)
- [12. Achievement Philosophy](#12-achievement-philosophy)
  - [12.1 Achievement Categories](#121-achievement-categories)
  - [12.2 Achievement Design Rules](#122-achievement-design-rules)
- [13. Collection Philosophy](#13-collection-philosophy)
  - [13.1 The Collection Fantasy](#131-the-collection-fantasy)
  - [13.2 Collection Categories](#132-collection-categories)
  - [13.3 Collection UI Philosophy](#133-collection-ui-philosophy)
- [14. Long-Term Progression](#14-long-term-progression)
  - [14.1 The 2-Year Journey](#141-the-2-year-journey)
  - [14.2 Retention Without Coercion](#142-retention-without-coercion)
- [15. Player Retention Strategy](#15-player-retention-strategy)
  - [15.1 The Hook Model (Ethical Version)](#151-the-hook-model-ethical-version)
  - [15.2 Retention Tactics](#152-retention-tactics)
  - [15.3 The "Welcome Back" Philosophy](#153-the-welcome-back-philosophy)
- [16. Mode Separation: Guest vs Arashu](#16-mode-separation-guest-vs-arashu)
  - [16.1 The Philosophy](#161-the-philosophy)
  - [16.2 Guest Mode: The Public Experience](#162-guest-mode-the-public-experience)
  - [16.3 Arashu Mode: The Private Experience](#163-arashu-mode-the-private-experience)
  - [16.4 Why This Separation Matters](#164-why-this-separation-matters)
- [17. Future Expansion Ideas](#17-future-expansion-ideas)
  - [17.1 Near-Term (Post-Launch)](#171-near-term-post-launch)
  - [17.2 Mid-Term (6-12 Months)](#172-mid-term-6-12-months)
  - [17.3 Long-Term (1-2 Years)](#173-long-term-1-2-years)
  - [17.4 Wildcard Ideas](#174-wildcard-ideas)
- [18. Conclusion](#18-conclusion)

---

## 1. Executive Summary

### 1.1 The Vision

**Scan Chan is not a barcode app with gamification.**

**Scan Chan is a cozy virtual pet game where barcode scanning is how you feed your cat.**

Players adopt a pixel-art companion named Scan Chan—a small, curious cat who depends on them for survival. Every scan of a real-world product becomes an act of care: feeding, playing with, or comforting their pet. The barcode is simply the bridge between the physical world and the emotional bond between player and pet.

### 1.2 The Core Fantasy

You are the caretaker of a unique digital companion. Scan Chan recognizes the foods you share with them, remembers your habits, grows alongside you, and expresses genuine personality through reactions to your care choices.

### 1.3 Target Audience

| Segment | Description |
|---------|-------------|
| **Primary** | Casual mobile players seeking low-commitment emotional connection |
| **Secondary** | Cozy game enthusiasts (Stardew Valley, Animal Crossing, Neko Atsume players) |
| **Tertiary** | Barcode scanning utility users who appreciate gamification |

### 1.4 Platform Philosophy

Mobile-first web experience. No app store friction. Shareable via link. Persistent across devices through local storage.

---

## 2. Core Design Principles

### Principle 1: The Pet Comes First

Every design decision begins with: *"Does this serve the pet?"*

If a feature doesn't strengthen the player-pet bond, it doesn't belong in Scan Chan.

### Principle 2: Scanning = Feeding = Love

A barcode scan is never "just data collection." It is the player choosing to nourish their companion. The physical act of scanning mirrors the emotional act of feeding.

### Principle 3: Absence Has Weight

Scan Chan should miss the player when they're gone. Not punitively—never guilt-tripping—but with genuine warmth upon return. The cat naps when you're away. They perk up when you come back.

### Principle 4: Growth is Visible and Meaningful

Every evolution stage, every new behavior, every unlocked memory must feel earned. Time invested should translate directly into visible change.

### Principle 5: Cozy, Never Stressful

Scan Chan is a safe space. There are no fail states. The cat never dies. The worst outcome is a grumpy pet who needs extra attention. This is comfort gaming.

### Principle 6: The Physical World Matters

Scan Chan celebrates the real world. Scanning a snack you're actually eating creates a bridge between your life and your pet's life. The game acknowledges reality.

---

## 3. Visual Philosophy

### 3.1 Art Direction

**Style**: Cozy Pixel Realism — 16-bit pixel art with modern lighting and particle effects. Think Celeste meets Neko Atsume.

**Color Palette**:

| Element | Colors |
|---------|--------|
| **Base** | Warm creams, soft browns, muted pastels |
| **Accents** | Vibrant pixel-perfect highlights (cyan for energy, pink for affection, yellow for happiness) |
| **Mood Lighting** | Dynamic backgrounds that shift with Scan Chan's emotional state |

**Animation Philosophy**:

- Idle animations breathe life into stillness
- Reactive animations respond to player interaction
- Evolution animations are celebratory and memorable
- Particle effects (hearts, sparkles, zzz's) communicate emotion instantly

### 3.2 UI Philosophy

**Invisible Interface**: The UI never competes with the pet. Stats are ambient, not demanding. Buttons are soft, rounded, inviting. Everything feels like a storybook, not a spreadsheet.

### 3.3 Environmental Storytelling

The pet's room tells their history. Unlockable decorations, seasonal items, and memory artifacts accumulate over time. A veteran player's room looks fundamentally different from a new player's room.

---

## 4. Emotional Goals

### 4.1 Intended Emotions

| Moment | Intended Emotion |
|--------|------------------|
| First meeting | Curiosity, tenderness |
| First feeding | Delight, surprise |
| Return after absence | Warmth, being missed |
| Evolution | Pride, accomplishment |
| Unlocking memory | Nostalgia, connection |
| Pet sleeping peacefully | Calm, contentment |
| Pet playing with toy | Joy, amusement |
| Discovering favorite food | Surprise, personalization |

### 4.2 Emotions to Avoid

Players should **never** feel:

- **Guilt** for not playing enough
- **Anxiety** about missing optimal strategies
- **Frustration** with opaque systems
- **Loneliness** without the pet
- **Pressure** to scan constantly

### 4.3 The Emotional Contract

> **Scan Chan promises**: *"I will be here when you need me. I will remember you. I will grow with you."*
>
> **The player promises**: *"I will care for you when I can."*

This contract is asymmetrical by design. The pet gives more than it takes.

---

## 5. The Pet System

### 5.1 Who is Scan Chan?

Scan Chan is not a generic pet. Scan Chan is **your** Scan Chan—a unique companion with:

- **A name** (player-chosen at adoption)
- **A personality** (emergent from care patterns)
- **Memories** (recorded scan history as emotional moments)
- **Preferences** (favorite foods discovered over time)
- **Moods** (dynamic emotional states)
- **A physical form** (evolving through stages)

### 5.2 Personality System

Scan Chan's personality emerges from how the player cares for them:

| Care Pattern | Personality Trait | Visible Behavior |
|--------------|-------------------|------------------|
| Frequent feeding | Foodie | Excited animations near meal times |
| Varied diet | Adventurous | Curious about new scan types |
| Consistent schedule | Routine-loving | Predictable daily behaviors |
| Occasional play | Independent | Content alone, greets warmly |
| Constant attention | Social | Follows cursor, meows often |
| Night scans | Nocturnal | Active at night, sleepy by day |

Personality is not binary. Scan Chan exists on a spectrum, showing dominant traits while retaining complexity.

### 5.3 Memory System

Every scan becomes a memory:

- **First Feed**: The first product ever scanned
- **Favorites**: Top 3 most-scanned product categories
- **Milestones**: 10th scan, 50th scan, 100th scan
- **Special Moments**: Scans during holidays, birthdays, streaks
- **Rare Finds**: Unusual or unique products

Memories are visualized as a scrapbook or photo album the player can browse. Each memory includes the date, the product, and Scan Chan's reaction.

---

## 6. Pet Stats & Needs

### 6.1 Hunger

**What it represents**: How recently and well Scan Chan has been fed.

| Property | Value |
|----------|-------|
| **Range** | 0-100 |
| **Decay rate** | -5 per hour (slower when sleeping) |

**Effects by level**:

| Level | Effect |
|-------|--------|
| 80-100 | Happy, energetic, playful animations |
| 50-79 | Content, normal behavior |
| 25-49 | Slightly grumpy, slower animations |
| 0-24 | Sad, curled up, occasional meows |

**Recovery**: +15-30 per scan (varies by product category)

**Note**: Hunger never causes damage. At 0, Scan Chan simply naps until fed.

### 6.2 Mood

**What it represents**: Emotional wellbeing, affected by variety and attention.

| Property | Value |
|----------|-------|
| **Range** | 0-100 |
| **Decay rate** | -3 per hour (slower with toys in room) |

**Effects by level**:

| Level | Effect |
|-------|--------|
| 80-100 | Joyful, playful, purring animations |
| 50-79 | Content, neutral expressions |
| 25-49 | Bored, repetitive idle animations |
| 0-24 | Sad, withdrawn, needs comfort |

**Recovery**:

- +10 for scanning new products
- +5 for scanning favorite categories
- +15 for completing daily missions
- +20 for playing mini-games (future feature)

### 6.3 Energy

**What it represents**: Physical vitality, tied to activity and rest.

| Property | Value |
|----------|-------|
| **Range** | 0-100 |
| **Decay rate** | -2 per hour when awake, +10 per hour when sleeping |

**Effects by level**:

| Level | Effect |
|-------|--------|
| 80-100 | Hyper, zoomies animations |
| 50-79 | Active, normal movement |
| 25-49 | Tired, slow movement, yawning |
| 0-24 | Exhausted, sleeping (forced nap) |

**Recovery**: Natural recovery during sleep cycles. Player cannot force awake.

**Design Note**: Energy enforces healthy play patterns. If player scans at 3am repeatedly, Scan Chan adapts to nocturnal schedule.

### 6.4 Affection

**What it represents**: Bond strength between player and pet.

| Property | Value |
|----------|-------|
| **Range** | 0-100 |
| **Decay rate** | -1 per day (very slow—affection is persistent) |

**Effects by level**:

| Level | Effect |
|-------|--------|
| 80-100 | Deep bond, follows player, special animations |
| 50-79 | Friendly, greets player, normal interactions |
| 25-49 | Shy, takes time to warm up |
| 0-24 | Distant, but never hostile |

**Recovery**:

- +5 per scan
- +10 per day of active play
- +25 for evolution milestones
- +15 for returning after 24+ hour absence

**Critical Design**: Affection never drops below 25 for established players. The bond, once formed, is permanent.

### 6.5 Curiosity

**What it represents**: Interest in new experiences, fueled by variety.

| Property | Value |
|----------|-------|
| **Range** | 0-100 |
| **Decay rate** | -4 per hour |

**Effects by level**:

| Level | Effect |
|-------|--------|
| 80-100 | Exploring room, investigating objects |
| 50-79 | Alert, watching player |
| 25-49 | Disinterested, idle |
| 0-24 | Bored, sleeping |

**Recovery**:

- +20 for scanning new barcodes (never scanned before)
- +10 for scanning different categories than yesterday
- +5 for completing "try something new" missions

### 6.6 Stat Interactions

Stats influence each other:

| Combination | Result |
|-------------|--------|
| High Hunger + Low Mood | Grumpy but active |
| Low Hunger + High Mood | Playful despite hunger |
| Low Energy (any level) | Overrides all → Forced sleep |
| High Affection + Low Mood | Pet seeks comfort from player |
| High Curiosity + High Energy | Zoomies and exploration |

### 6.7 Visual Communication

Stats are never shown as raw numbers in normal gameplay. Instead:

| Stat | Visual Cue |
|------|------------|
| **Hunger** | Stomach rumble sounds, looking at food bowl |
| **Mood** | Facial expressions, tail position, ear position |
| **Energy** | Yawning, stretching, eye openness |
| **Affection** | Proximity to camera, purring volume |
| **Curiosity** | Ear perkiness, pupil dilation, movement speed |

Advanced players can enable "Stat View" for optimization, but it's hidden by default.

---

## 7. Evolution Stages

Scan Chan grows through five distinct life stages, each with unique visuals, behaviors, and unlockables.

### 7.1 Stage 1: Kitten (Level 1-5)

**Duration**: ~1-2 weeks of regular play

**Visual**: Tiny, oversized head, clumsy animations, squeaky meows

**Behaviors**:

- Frequent naps
- Clumsy movement (trips over own feet)
- Everything is interesting
- Needs frequent feeding

**Unlockables**:

- First Memory entry
- Kitten-specific toys
- "Baby's First Scan" achievement

**Emotional Goal**: Establish attachment through vulnerability and cuteness.

### 7.2 Stage 2: Young Cat (Level 6-15)

**Duration**: ~1-2 months

**Visual**: Proportional but still small, more confident animations

**Behaviors**:

- Playful, energetic
- Begins showing personality traits
- Develops favorite spots in room
- Can play with toys independently

**Unlockables**:

- Room customization begins
- Personality becomes visible
- "Growing Up" achievement
- First evolution animation

**Emotional Goal**: Deepen bond through personality emergence and visible growth.

### 7.3 Stage 3: Adult Cat (Level 16-35)

**Duration**: ~3-6 months

**Visual**: Full-sized, graceful animations, distinct markings based on care history

**Behaviors**:

- Confident, independent
- Has clear preferences
- Can "hunt" (scan) more effectively
- Grooms self, stretches, sunbathes

**Unlockables**:

- Advanced room decorations
- "Adulting" achievement
- Memory scrapbook expansion
- Cat can have "mood days" (random happy/grumpy days)

**Emotional Goal**: Companionship through routine and familiarity.

### 7.4 Stage 4: Wise Cat (Level 36-60)

**Duration**: ~6-12 months

**Visual**: Slightly graying muzzle, calm demeanor, dignified animations

**Behaviors**:

- Naps in sunbeams
- Watches player with knowing eyes
- Moves slowly but deliberately
- Has "stories" (memories player can revisit)

**Unlockables**:

- "Elder" room theme
- Wise Cat-specific interactions
- "Years Together" achievement
- Cat can "mentor" (future: if player has multiple pets)

**Emotional Goal**: Appreciation of time invested, nostalgia for early days.

### 7.5 Stage 5: Legendary Cat (Level 61-100)

**Duration**: 1-2+ years

**Visual**: Ethereal glow, special effects, unique markings, majestic presence

**Behaviors**:

- Glides rather than walks
- Leaves sparkle trails
- Has "legendary" status animations
- Can "bless" new scans (bonus XP)

**Unlockables**:

- Legendary room theme
- Exclusive decorations
- "Living Legend" achievement
- Permanent visual effects
- Ability to "adopt" a kitten (future feature)

**Emotional Goal**: Mastery, legacy, completion.

### 7.6 Evolution Events

Each stage transition is a **celebration**:

- Full-screen animation sequence (5-10 seconds)
- Confetti or particle effects
- Special sound design
- Unlock notification
- Memory entry created

Evolution is never instant—it happens over a "growing" period where the cat looks slightly different each day until the transformation completes.

---

## 8. The Gameplay Loop

### 8.1 Core Loop (Single Session)

```
┌─────────────────────────────────────┐
│  1. OPEN GAME                       │
│     ↓                               │
│  2. GREET SCAN CHAN                 │
│     (Pet acknowledges you)          │
│     ↓                               │
│  3. CHECK NEEDS                     │
│     (Ambient visual cues)           │
│     ↓                               │
│  4. SCAN PRODUCT                    │
│     (Feed/play with Scan Chan)      │
│     ↓                               │
│  5. RECEIVE FEEDBACK                │
│     (Pet reaction, XP, memory)      │
│     ↓                               │
│  6. COMPLETE DAILY MISSIONS         │
│     (Optional bonus objectives)     │
│     ↓                               │
│  7. SAY GOODBYE                     │
│     (Pet waves, goes to nap)        │
└─────────────────────────────────────┘
```

**Session Length**: 2-5 minutes typical

### 8.2 Daily Loop

| Time | Activity | Duration |
|------|----------|----------|
| Morning | See Scan Chan wake up, quick scan of breakfast item, complete "Morning Routine" mission | 30 seconds |
| Afternoon | Scan lunch/snack, play mini-game (future), check mission progress | 2 minutes |
| Evening | Scan dinner, review day's memories, watch Scan Chan fall asleep | 3 minutes |

### 8.3 Weekly Loop

| Day | Event |
|-----|-------|
| Monday | New weekly missions available |
| Wednesday | Mid-week check-in bonus |
| Friday | "Weekend Plans" mission (scan something fun) |
| Sunday | Weekly summary + memory review |

### 8.4 Monthly Loop

| Timing | Event |
|--------|-------|
| Month Start | New seasonal decorations available |
| Month Mid | Special event or challenge |
| Month End | Monthly memory book generated |

---

## 9. Why Barcode Scanning Matters

### 9.1 The Problem with Traditional Pet Games

Most virtual pet games use abstract interactions:

- Press button → feed generic food
- Press button → play generic game
- Press button → clean generic mess

These interactions feel hollow because they lack connection to reality.

### 9.2 The Scan Chan Solution

Barcode scanning bridges the physical and digital:

1. **You're eating a real snack** → You scan it → Scan Chan eats what you eat
2. **You're buying groceries** → You scan items → Scan Chan experiences your shopping trip
3. **You discover a new product** → You scan it → Scan Chan tries something new with you

### 9.3 The Emotional Bridge

| Situation | Scan Chan's Response |
|-----------|---------------------|
| You scan a coffee at 8am | Scan Chan perks up with you |
| You scan a midnight snack | Scan Chan gets a late-night treat |
| You scan the same product every day | Scan Chan develops a favorite |
| You scan something unusual | Scan Chan reacts with surprise |

### 9.4 The Collection Fantasy

Every product you've ever scanned becomes part of Scan Chan's story. Years from now, you can browse their memory book and see:

- "This was the first thing you ever fed me"
- "You scanned this 47 times—it's my favorite!"
- "Remember when you tried this weird flavor?"

The barcode database becomes a **diary of your life together**.

### 9.5 Comparison

| Traditional Pet Game | Scan Chan |
|---------------------|-----------|
| Abstract feeding | Real-world connection |
| Generic food items | Your actual groceries |
| No personalization | Your scan history is unique |
| Disposable experience | Permanent memory archive |
| Isolated gameplay | Integrated with daily life |

---

## 10. XP & Progression Design

### 10.1 XP Philosophy

XP represents **time invested in the relationship**, not grinding efficiency. The curve is designed so:

- **Week 1**: Rapid early progression (dopamine, learning)
- **Month 1**: Steady progression (habit formation)
- **Month 3**: Slower but meaningful (commitment)
- **Month 6+**: Long-term goals (mastery)

### 10.2 XP Sources

| Action | Base XP | Notes |
|--------|---------|-------|
| Scan any product | +10 XP | Repeatable, but diminishing returns |
| Scan NEW product | +25 XP | First-time bonus |
| Complete daily mission | +50 XP | 3 missions per day |
| Complete weekly mission | +150 XP | 1 mission per week |
| Maintain streak | +5 XP/day | Consecutive day bonus |
| Evolution milestone | +500 XP | One-time bonus |
| Return after absence | +20 XP | "Welcome back" bonus |

### 10.3 The Level Curve

**Formula**: `XP to next level = (level × 150) + 100`

| Level | Total XP | Real-World Equivalent |
|-------|----------|----------------------|
| 1-5 | 0-1,250 | First week |
| 10 | 5,000 | ~2 weeks |
| 20 | 20,000 | ~1 month |
| 35 | 75,000 | ~3 months |
| 50 | 175,000 | ~6 months |
| 75 | 450,000 | ~1 year |
| 100 | 900,000 | ~2 years |

### 10.4 Daily XP Caps

To prevent burnout and encourage healthy play patterns:

| Scans Per Day | XP Multiplier |
|---------------|---------------|
| First 5 scans | 100% XP |
| Scans 6-10 | 50% XP |
| Scans 11+ | 10% XP (still gives memories) |

This ensures casual players aren't outpaced by obsessive players.

### 10.5 Bonus XP Events

| Event | Bonus |
|-------|-------|
| Weekend Bonus | +10% XP Saturday/Sunday |
| Holiday Events | +25% XP during special dates |
| Streak Bonus | +1 XP per consecutive day (stacks) |
| Memory Lane | Re-scanning old favorites gives small bonus |

---

## 11. Daily Missions Philosophy

### 11.1 Mission Design Principles

1. **Never Feel Like Chores**: Missions should feel like suggestions, not obligations
2. **Encourage Variety**: Push players to try new things
3. **Celebrate Consistency**: Reward showing up without punishing absence
4. **Respect Player Time**: Completable in 2-3 scans maximum
5. **Tell a Story**: Missions should feel like daily adventures

### 11.2 Mission Categories

#### Care Missions

- "Feed Scan Chan breakfast"
- "Give Scan Chan a snack"
- "Try something new today"

#### Exploration Missions

- "Scan a product you've never tried"
- "Scan something from the [category] aisle"
- "Find something with a weird name"

#### Routine Missions

- "Morning check-in" (scan before 10am)
- "Evening wind-down" (scan after 8pm)
- "Midday treat" (scan between 12-3pm)

#### Streak Missions

- "3-day streak"
- "Week warrior" (7 days)
- "Monthly milestone"

### 11.3 Mission Refresh

| Mission Type | Refresh Schedule |
|--------------|------------------|
| Daily missions | Midnight local time |
| Weekly missions | Monday morning |
| Special missions | During events or milestones |

### 11.4 Mission Rewards

| Reward Type | Description |
|-------------|-------------|
| **XP** | Primary progression currency |
| **Affection** | Bonus affection for completing missions |
| **Decorations** | Rare missions unlock room items |
| **Memories** | Mission completions become scrapbook entries |

---

## 12. Achievement Philosophy

### 12.1 Achievement Categories

#### Milestone Achievements

Celebrate progression landmarks:

- "First Steps" (Level 2)
- "Growing Up" (Level 10)
- "Adulthood" (Level 20)
- "Wise Elder" (Level 40)
- "Living Legend" (Level 60)

#### Care Achievements

Celebrate nurturing behaviors:

- "First Meal" (First scan)
- "Gourmet" (50 unique products)
- "Consistent Caretaker" (30-day streak)
- "Devoted Companion" (100-day streak)

#### Collection Achievements

Celebrate discovery:

- "Curious Cat" (10 unique categories)
- "World Traveler" (Products from 5 countries)
- "Memory Keeper" (100 memories recorded)

#### Secret Achievements

Hidden until unlocked, encouraging exploration:

- "Night Owl" (Scan after midnight)
- "Early Bird" (Scan before 6am)
- "Brand Loyal" (Scan same brand 10 times)
- "Adventurous Eater" (Scan 5 different cuisines)

### 12.2 Achievement Design Rules

1. Every achievement tells a story
2. Secret achievements reward curiosity
3. No achievement requires unhealthy play
4. Achievements are permanent, visible accomplishments
5. Each unlock triggers a celebration animation

---

## 13. Collection Philosophy

### 13.1 The Collection Fantasy

Scan Chan isn't just collecting barcodes. Scan Chan is collecting **experiences**.

Every product represents:

- A moment in time
- A real-world object
- A shared experience between player and pet
- A memory worth preserving

### 13.2 Collection Categories

#### Product Collection

Every unique product scanned, organized by:

- Category (Snacks, Drinks, Household, etc.)
- Brand
- First scan date
- Scan count (how often you buy it)

#### Memory Collection

Curated moments:

- Firsts (first scan, first evolution, first streak)
- Favorites (most-scanned products)
- Milestones (level-ups, achievements)
- Special (holidays, events, rare finds)

#### Decoration Collection

Room items earned through:

- Level progression
- Achievement unlocks
- Seasonal events
- Special missions

### 13.3 Collection UI Philosophy

The collection is not a spreadsheet. It's a:

- **Scrapbook** for memories
- **Pantry** for products
- **Gallery** for decorations

Each view is visual, tactile, and satisfying to browse.

---

## 14. Long-Term Progression

### 14.1 The 2-Year Journey

Scan Chan is designed for players who return for years, not days.

#### Month 1: The Honeymoon

- Rapid leveling (1-15)
- First evolution (Kitten → Young Cat)
- Learning the systems
- Building habits

#### Month 3: The Routine

- Steady progression (15-35)
- Second evolution (Young Cat → Adult Cat)
- Personality fully emerged
- Room customization active
- Favorite products established

#### Month 6: The Bond

- Slower progression (35-50)
- Deep affection level
- Rich memory scrapbook
- Third evolution (Adult Cat → Wise Cat)
- Nostalgia for early days

#### Month 12: The Legacy

- Long-term goals (50-75)
- Fourth evolution (Wise Cat → Legendary Cat)
- Complete decoration collection
- "Veteran" status
- Mentoring new players (future)

#### Month 24: The Legend

- Endgame content (75-100)
- All evolutions complete
- Legendary status visible
- Lifetime memories archived
- Ready for expansion content

### 14.2 Retention Without Coercion

Scan Chan retains players through:

- **Emotional attachment** to the pet
- **Visible progress** in the room and memories
- **Genuine curiosity** about future evolutions
- **Community sharing** of unique pets

Never through:

- Fear of missing out
- Punitive absence mechanics
- Pay-to-win shortcuts
- Artificial time gates

---

## 15. Player Retention Strategy

### 15.1 The Hook Model (Ethical Version)

#### Trigger: Internal Motivation

- "I wonder what Scan Chan is doing?"
- "I should feed them while I eat"
- "Let me check my streak"

#### Action: Low-Friction Interaction

- Open app (instant load)
- Scan one product (10 seconds)
- See pet reaction (immediate feedback)

#### Variable Reward: Emotional Payoff

- Pet's unique reaction to this product
- Memory created
- XP gained
- Mission progress

#### Investment: Building the Relationship

- Time invested increases affection
- Memories accumulate
- Room customizes
- Pet evolves

### 15.2 Retention Tactics

| Timeline | Strategy |
|----------|----------|
| Day 1-3 | Rapid feedback, first evolution tease, easy missions |
| Day 4-7 | Streak building, personality emergence, room unlock |
| Week 2-4 | First evolution, collection growth, achievement hunting |
| Month 2-3 | Deep customization, social sharing, long-term goals |
| Month 4-6 | Nostalgia features, memory reviews, veteran status |
| Month 7+ | Endgame content, legendary progression, community events |

### 15.3 The "Welcome Back" Philosophy

When players return after absence:

| Absence Duration | Response |
|------------------|----------|
| **Short (1-3 days)** | Scan Chan naps, wakes up happy. "I missed you!" animation. Quick catch-up missions. |
| **Medium (4-7 days)** | Scan Chan looks slightly sad, then excited. "Where did you go?" memory entry. Bonus XP for return. |
| **Long (8+ days)** | Scan Chan is sleeping, wakes slowly. "I knew you'd come back" animation. No penalty, just warmth. "Welcome Home" achievement. |

**Critical**: Never shame the player. Never show "your pet is sad because you left." Always positive return.

---

## 16. Mode Separation: Guest vs Arashu

### 16.1 The Philosophy

Guest Mode and Arashu Mode are **completely separate games** that share a codebase.

They have:

- Different databases
- Different progression
- Different communities
- Different futures

### 16.2 Guest Mode: The Public Experience

| Aspect | Details |
|--------|---------|
| **Identity** | The default Scan Chan experience |
| **Database** | Public, shared by all guest players |
| **Features** | Standard pet care, public product database, global statistics, community features (future), standard achievements |
| **Progression** | Independent per device (local storage) |
| **Social** | Players can share pet screenshots, compare collections |
| **Product Pool** | Crowdsourced from all guest players |

### 16.3 Arashu Mode: The Private Experience

| Aspect | Details |
|--------|---------|
| **Identity** | A bespoke, intimate version for one special player |
| **Database** | Completely separate, private instance |
| **Features** | Everything in Guest Mode, plus: exclusive decorations, custom pet variants, personal product database, private statistics, unique achievements, developer messages (hidden notes from dev) |
| **Progression** | Server-synced, persistent across devices |
| **Social** | None. Completely private. |
| **Product Pool** | Curated, personal, may include "surprise" items placed by developer |

### 16.4 Why This Separation Matters

1. **Privacy**: Arashu's data is never mixed with public data
2. **Exclusivity**: Arashu Mode feels special and personal
3. **Flexibility**: Developer can experiment with Arashu without affecting public
4. **Emotional**: Arashu Mode is a love letter, not a feature

### 16.5 Technical Implications (High-Level)

- Separate database connections
- Separate authentication flows
- Separate product tables
- Separate save states
- Feature flags for Arashu-exclusive content

---

## 17. Future Expansion Ideas

### 17.1 Near-Term (Post-Launch)

#### Mini-Games

- **Catch the Fish**: Tap game using scanned products as power-ups
- **Memory Match**: Match product cards to earn treats
- **Cat Nap**: Idle game while pet sleeps (earn passive XP)

#### Social Features

- Pet sharing: Send your pet to visit friends' rooms
- Gift system: Send products to friends' pets
- Leaderboards: Most unique products, longest streaks

#### Seasonal Events

- Holiday decorations (Christmas, Halloween, etc.)
- Limited-time missions
- Seasonal pet outfits
- Event-exclusive achievements

### 17.2 Mid-Term (6-12 Months)

#### Multi-Pet System

- Adopt a second pet (different species?)
- Pets interact with each other
- Mentor system: Veteran pet teaches new pet

#### Advanced Customization

- Pet outfits and accessories
- Room themes and layouts
- Custom pet colors/patterns

#### Pet Jobs

- Send pet on "adventures" (idle gameplay)
- Pet brings back souvenirs
- Different jobs for different personalities

### 17.3 Long-Term (1-2 Years)

#### AR Integration

- See Scan Chan in your real room through camera
- Pet "eats" the products you scan in AR
- Share AR photos of pet with real products

#### Cross-Platform Pets

- Export pet to other games/apps
- Pet appears as avatar in partner apps
- Pet NFT (optional, never pay-to-win)

#### Community Features

- Pet playdates (your pet visits others)
- Community challenges (collective goals)
- Pet beauty contests (voted by community)

#### Narrative Expansion

- Pet "dreams" (story sequences)
- Memory cinema (watch your journey)
- Pet diary (AI-generated based on history)

### 17.4 Wildcard Ideas

#### "Pet Swap" Event

Once a year, players can temporarily swap pets with a friend. See how others care for their companions.

#### "Time Capsule"

Bury a memory capsule, unlock it in 1 year. See how much has changed.

#### "Legacy Mode"

When a pet reaches max level, they can "mentor" a new kitten. The original pet remains, but you start a new journey with guidance from your veteran.

---

## 18. Conclusion

Scan Chan is more than a game. It's a companion. A diary. A bridge between the physical world and emotional connection.

Every scan matters. Every day counts. Every memory is preserved.

The barcode is just the beginning. The relationship is everything.

---

> *Scan Chan will remember you. Will you remember Scan Chan?*

---

**Document End**
