# Zodiac Platform Architecture

## Overview

This document describes the architecture and data flow of the Zodiac Platform monorepo.

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                         ZODIAC PLATFORM                              │
└─────────────────────────────────────────────────────────────────────┘

┌───────────────────────────┐           ┌───────────────────────────┐
│   apps/backoffice         │           │      apps/web             │
│   (Admin / Builder)       │           │  (Public + Preview)       │
├───────────────────────────┤           ├───────────────────────────┤
│                           │           │                           │
│  • Theme Editor           │           │  • /[zodiac] route        │
│  • Component Picker       │           │  • /preview route         │
│  • Configuration UI       │           │  • Theme resolver         │
│                           │  opens    │  • Component resolver     │
│  ┌─────────────────┐     │  ───────> │  • Page renderer          │
│  │ Preview Button  │     │  preview  │                           │
│  └─────────────────┘     │    URL    │                           │
│                           │           │                           │
│  Does NOT render UI       │           │  Renders ALL UI           │
│  directly                 │           │                           │
└───────────────────────────┘           └───────────────────────────┘
            │                                       │
            │ uses contracts                        │ uses all packages
            │                                       │
            └───────────────┬───────────────────────┘
                            │
                            ▼
            ┌───────────────────────────────────────────┐
            │          packages/                        │
            ├───────────────────────────────────────────┤
            │                                           │
            │  ┌────────────┐  ┌────────────┐          │
            │  │    ui/     │  │ presets/   │          │
            │  │ (atoms,    │  │ (hero,     │          │
            │  │ molecules, │◄─│  home,     │          │
            │  │ organisms) │  │  navbar)   │          │
            │  └────────────┘  └────────────┘          │
            │                                           │
            │  ┌────────────┐  ┌────────────┐          │
            │  │  styles/   │  │ contracts/ │          │
            │  │ (CSS vars, │  │ (types,    │          │
            │  │  tokens,   │  │  schemas)  │          │
            │  │  themes)   │  └────────────┘          │
            │  └────────────┘                           │
            │                                           │
            └───────────────────────────────────────────┘
```

## Data Flow

### 1. Theme Configuration Flow

```
┌──────────────┐
│ Back Office  │ Admin configures theme
└──────┬───────┘
       │
       │ saves to
       ▼
┌──────────────┐
│  API / DB    │ Stores theme config JSON
└──────┬───────┘
       │
       │ fetches
       ▼
┌──────────────┐
│   apps/web   │ Applies data-theme attribute
│              │ <html data-theme="aries" data-mode="light">
└──────┬───────┘
       │
       │ CSS variables applied
       ▼
┌──────────────┐
│ packages/    │ Theme CSS loaded
│ styles       │ --color-primary: #dc2626;
└──────────────┘
```

### 2. Page Composition Flow

```
┌──────────────┐
│ Back Office  │ Admin selects components
└──────┬───────┘ (hero: "Editorial", home: "Grid")
       │
       │ saves to
       ▼
┌──────────────┐
│  API / DB    │ Stores page composition JSON
└──────┬───────┘ {components: [{type: "hero", variant: "Editorial"}]}
       │
       │ fetches
       ▼
┌──────────────┐
│   apps/web   │ Resolves components by semantic name
│              │ resolvePreset("hero", "Editorial")
└──────┬───────┘
       │
       │ imports
       ▼
┌──────────────┐
│ packages/    │ Returns HeroEditorial component
│ presets      │ <HeroEditorial {...props} />
└──────────────┘
```

### 3. Preview Flow

```
┌──────────────┐
│ Back Office  │ User clicks "Preview Editorial Hero"
└──────┬───────┘
       │
       │ opens URL
       ▼
┌──────────────────────────────────────────────────────┐
│ http://localhost:3000/preview?                       │
│   type=hero&variant=Editorial&props={...}            │
└──────────────────────────────────────────────────────┘
       │
       ▼
┌──────────────┐
│   apps/web   │ /preview route
│              │ Parses query params
│              │ Resolves component
│              │ Renders in isolation
└──────────────┘
```

## Component Resolution

### Semantic Names → Components

```typescript
// Back Office sends:
{
  "type": "hero",
  "variant": "Editorial"
}

// apps/web resolves:
import { HeroEditorial } from '@zodiac/presets';

// Component tree:
packages/presets/src/hero/Editorial.tsx
  └─> imports from packages/ui
      └─> styled by packages/styles
```

## Key Principles

### 1. Single Source of Truth

- **apps/web** is the ONLY place that renders UI
- **packages/ui** and **packages/presets** contain component definitions
- **apps/backoffice** NEVER duplicates UI rendering

### 2. Data-Driven Architecture

- Themes configured via JSON → Applied via CSS variables
- Pages composed via JSON → Resolved to React components
- Separation between configuration (JSON) and rendering (React)

### 3. Type Safety

- **packages/contracts** defines all data structures
- Used by both apps/web and apps/backoffice
- Ensures API contract compliance

### 4. Semantic Naming

- Components selected by semantic names ("Editorial", "Grid")
- NOT by file paths or technical identifiers
- Makes back office UI user-friendly

### 5. CSS Variable Theming

- Themes defined in pure CSS
- Applied via `data-theme` attribute
- No JavaScript required for theme switching
- Supports light/dark modes via `data-mode`

## Package Dependencies

```
apps/web
  ├─> @zodiac/ui
  ├─> @zodiac/presets
  │     └─> @zodiac/ui
  └─> @zodiac/contracts

apps/backoffice
  └─> @zodiac/contracts

packages/presets
  └─> @zodiac/ui

packages/ui
  (no internal dependencies)

packages/styles
  (CSS only, no dependencies)

packages/contracts
  (types only, no dependencies)
```

## API Contract Example

### Theme Config API

```typescript
// GET /api/themes/:zodiac
{
  "zodiac": "aries",
  "theme": "aries",
  "mode": "light",
  "layout": "Theme1",
  "tokens": {
    "colors": {
      "primary": "#dc2626"
    }
  }
}
```

### Page Composition API

```typescript
// GET /api/pages/:zodiac
{
  "pageId": "aries-home",
  "zodiac": "aries",
  "components": [
    {
      "type": "hero",
      "variant": "Editorial",
      "props": {
        "title": "Welcome to Aries",
        "subtitle": "Bold and Fiery",
        "ctaText": "Explore",
        "ctaLink": "/about"
      }
    },
    {
      "type": "home",
      "variant": "Grid",
      "props": {
        "title": "Features",
        "items": [...]
      }
    }
  ]
}
```

## Routing Structure

### apps/web Routes

```
/                          → Home/landing page
/[zodiac]                  → Dynamic zodiac page
                              (aries, taurus, gemini, etc.)
/preview                   → Preview mode for Back Office
  ?type=hero
  &variant=Editorial
  &props={...}
```

### apps/backoffice Routes

```
/                          → Dashboard
/themes                    → Theme editor
/components                → Component picker
```

## Environment Variables

### apps/web

```env
NEXT_PUBLIC_API_URL=http://localhost:4000
```

### apps/backoffice

```env
NEXT_PUBLIC_API_URL=http://localhost:4000
NEXT_PUBLIC_WEB_URL=http://localhost:3000
```

## Deployment Strategy

```
┌─────────────────┐     ┌─────────────────┐
│  apps/web       │     │ apps/backoffice │
│  → Vercel       │     │ → Vercel        │
│  (Public)       │     │ (Private/Auth)  │
└─────────────────┘     └─────────────────┘

┌─────────────────────────────────────────┐
│  packages/                              │
│  → Published to private npm or          │
│     bundled with apps                   │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│  API / Database                         │
│  → Separate service                     │
└─────────────────────────────────────────┘
```
