# Scan Chan — Technical Roadmap

**Version**: 1.0  
**Last Updated**: June 30, 2026  
**Status**: Planning Phase  
**Document Type**: Development Timeline & Technical Milestones

---

## Table of Contents

- [1. Overview](#1-overview)
- [2. Current State Assessment](#2-current-state-assessment)
- [3. Phase 1: Foundation (Weeks 1-4)](#3-phase-1-foundation-weeks-1-4)
- [4. Phase 2: Pet System (Weeks 5-8)](#4-phase-2-pet-system-weeks-5-8)
- [5. Phase 3: Core Gameplay (Weeks 9-12)](#5-phase-3-core-gameplay-weeks-9-12)
- [6. Phase 4: Polish & Launch (Weeks 13-16)](#6-phase-4-polish--launch-weeks-13-16)
- [7. Post-Launch Roadmap](#7-post-launch-roadmap)
- [8. Technical Debt Management](#8-technical-debt-management)

---

## 1. Overview

This document outlines the technical implementation plan for transforming Scan Chan from its current state into the v2.0 virtual pet experience defined in the Game Design Document.

### 1.1 Development Philosophy

- **Ship incrementally** — each phase delivers playable functionality
- **Validate early** — test emotional impact with real users
- **Maintain quality** — no feature ships without polish
- **Document everything** — decisions are recorded before implementation

### 1.2 Success Metrics

| Phase | Success Criteria |
|-------|------------------|
| Foundation | Database separation, auth flow, pet data structure |
| Pet System | Pet renders, stats update, basic animations work |
| Core Gameplay | Full loop functional, scanning feeds pet, missions work |
| Launch | Production-ready, all critical paths tested, performance targets met |

---

## 2. Current State Assessment

### 2.1 Existing Infrastructure

| Component | Status | Reuse? |
|-----------|--------|--------|
| Next.js App Router | Functional | Yes |
| Prisma + PostgreSQL | Functional | Modify |
| Supabase Auth | Functional | Yes |
| Barcode Scanning | Functional | Yes |
| Product Database | Functional | Modify |
| Zustand State | Functional | Redesign |
| UI Components | Functional | Redesign |

### 2.2 Required Changes

**Database**:
- Separate Guest and Arashu databases
- Add pet state tables
- Add memory/history tables
- Add achievement tracking

**State Management**:
- Redesign around pet-centric state
- Implement stat decay over time
- Persistent progression

**UI/UX**:
- Complete visual overhaul
- Pet as central element
- Cozy aesthetic

---

## 3. Phase 1: Foundation (Weeks 1-4)

### 3.1 Week 1-2: Database Architecture

**Goals**:
- Design pet data schema
- Implement mode separation at database level
- Migrate existing product data

**Deliverables**:
- [ ] Pet model with stats, personality, evolution stage
- [ ] Memory model for scan history
- [ ] Achievement model with unlock tracking
- [ ] Separate connection pools for Guest/Arashu
- [ ] Migration scripts for existing data

### 3.2 Week 3: Authentication & Mode Selection

**Goals**:
- Redesign mode selection flow
- Implement mode-specific routing
- Secure Arashu mode access

**Deliverables**:
- [ ] Mode selection screen
- [ ] Guest mode flow (no auth required)
- [ ] Arashu mode flow (Supabase auth)
- [ ] Mode-aware API middleware
- [ ] Feature flag system for Arashu exclusives

### 3.3 Week 4: State Architecture

**Goals**:
- Design pet state structure
- Implement stat decay calculations
- Set up persistent storage

**Deliverables**:
- [ ] Pet state store design
- [ ] Stat decay system (time-based)
- [ ] Offline progression handling
- [ ] State synchronization logic

---

## 4. Phase 2: Pet System (Weeks 5-8)

### 4.1 Week 5: Pet Rendering

**Goals**:
- Create pet display component
- Implement sprite system
- Basic idle animations

**Deliverables**:
- [ ] Pet sprite system (stage-based)
- [ ] Idle animation loop
- [ ] Stat-to-visual mapping
- [ ] Mood expression system

### 4.2 Week 6: Pet Stats

**Goals**:
- Implement all five core stats
- Stat decay over real time
- Stat interaction logic

**Deliverables**:
- [ ] Hunger system
- [ ] Mood system
- [ ] Energy system
- [ ] Affection system
- [ ] Curiosity system
- [ ] Stat interaction effects

### 4.3 Week 7: Pet Personality

**Goals**:
- Track care patterns
- Calculate personality traits
- Manifest personality visually

**Deliverables**:
- [ ] Care pattern tracking
- [ ] Personality calculation algorithm
- [ ] Visual personality indicators
- [ ] Behavior variation based on personality

### 4.4 Week 8: Pet Memory

**Goals**:
- Record scan events as memories
- Categorize memory types
- Memory scrapbook UI

**Deliverables**:
- [ ] Memory recording system
- [ ] Memory categorization
- [ ] Scrapbook/gallery view
- [ ] First Feed, Favorites, Milestones

---

## 5. Phase 3: Core Gameplay (Weeks 9-12)

### 5.1 Week 9: Scanning Integration

**Goals**:
- Connect barcode scanning to pet feeding
- Implement product-to-stat effects
- Product category system

**Deliverables**:
- [ ] Scan → feed pipeline
- [ ] Category-based stat effects
- [ ] New product detection
- [ ] Favorite product tracking

### 5.2 Week 10: XP & Progression

**Goals**:
- Implement XP system
- Level calculation
- Evolution stage transitions

**Deliverables**:
- [ ] XP earning logic
- [ ] Level progression formula
- [ ] Evolution stage system
- [ ] Evolution event animations

### 5.3 Week 11: Daily Missions

**Goals**:
- Mission generation system
- Mission tracking
- Mission rewards

**Deliverables**:
- [ ] Daily mission generator
- [ ] Mission progress tracking
- [ ] Reward distribution
- [ ] Mission refresh logic

### 5.4 Week 12: Achievements

**Goals**:
- Achievement tracking
- Unlock detection
- Celebration events

**Deliverables**:
- [ ] Achievement definition system
- [ ] Unlock condition checker
- [ ] Achievement popup UI
- [ ] Achievement gallery

---

## 6. Phase 4: Polish & Launch (Weeks 13-16)

### 6.1 Week 13: UI Polish

**Goals**:
- Final visual design implementation
- Animation polish
- Sound design integration

**Deliverables**:
- [ ] Complete UI overhaul
- [ ] All animations polished
- [ ] Sound effects integrated
- [ ] Responsive design verified

### 6.2 Week 14: Testing & QA

**Goals**:
- End-to-end testing
- Performance optimization
- Bug fixes

**Deliverables**:
- [ ] Full E2E test suite
- [ ] Performance benchmarks met
- [ ] Critical bugs resolved
- [ ] Edge cases handled

### 6.3 Week 15: Deployment Preparation

**Goals**:
- Production deployment setup
- Monitoring & logging
- Documentation finalization

**Deliverables**:
- [ ] Production deployment pipeline
- [ ] Error monitoring setup
- [ ] Documentation updated
- [ ] Launch checklist complete

### 6.4 Week 16: Launch

**Goals**:
- Public release
- Initial user feedback
- Hotfix capability

**Deliverables**:
- [ ] v2.0 released
- [ ] Feedback collection system
- [ ] Hotfix process ready
- [ ] Launch retrospective planned

---

## 7. Post-Launch Roadmap

### 7.1 Month 1-2: Stabilization

- Monitor performance metrics
- Address user feedback
- Bug fixes and optimization
- Balance adjustments based on data

### 7.2 Month 3-4: First Content Update

- Mini-games (Catch the Fish, Memory Match)
- Seasonal event system
- Additional decorations

### 7.3 Month 5-6: Social Features

- Pet sharing
- Gift system
- Community challenges

### 7.4 Month 7-12: Expansion

- Multi-pet system
- Pet jobs/adventures
- Advanced customization

---

## 8. Technical Debt Management

### 8.1 Current Technical Debt

| Item | Priority | Plan |
|------|----------|------|
| Duplicated serializeScanLog | Low | Consolidate during Phase 3 |
| Missing error boundaries | High | Add in Phase 4 |
| No rate limiting | Medium | Add in Phase 4 |
| State migration incomplete | Medium | Address in Phase 1 |

### 8.2 Debt Prevention

- Write tests alongside features
- Document decisions immediately
- Review code during each phase
- Refactor when touching related code

---

**Document Status**: This roadmap is a living document. Timelines will be adjusted based on actual velocity and discoveries during development.

**Document End**
