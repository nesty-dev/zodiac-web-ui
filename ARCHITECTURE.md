# Architecture Documentation

## Overview

The Zodiac Platform is built on a **data-driven, component-based architecture** where UI rendering is centralized and configuration is decoupled from implementation.

## Core Principles

### 1. Single Source of Truth

- **UI rendering logic exists in ONE place only**
- Shared packages (`@zodiac/ui`, `@zodiac/presets`) contain all components
- `apps/web` is the only renderer
- `apps/backoffice` configures but does NOT render

### 2. Data-Driven Composition

- Pages are composed from JSON configuration
- Components selected by semantic names (e.g., "Editorial", "Grid")
- No hardcoded UI logic - everything is configurable

### 3. Separation of Concerns

- **apps/web**: Public rendering + preview
- **apps/backoffice**: Configuration UI + admin
- **packages/ui**: Base design system
- **packages/presets**: Page-level sections
- **packages/styles**: Pure CSS theming
- **packages/contracts**: Shared types

## Data Flow

```
┌─────────────────┐
│  Back Office    │
│  (Admin Panel)  │
└────────┬────────┘
         │
         │ 1. Configure theme/components
         │    (UI for selecting presets)
         ↓
┌─────────────────┐
│   API / DB      │
│  (Theme Config) │
│  (Page Comp)    │
└────────┬────────┘
         │
         │ 2. Save JSON config
         │
         ↓
┌─────────────────┐
│   apps/web      │
│  (Renderer)     │
├─────────────────┤
│ Fetch JSON      │
│ Resolve Names   │
│ Render UI       │
└─────────────────┘
```

## Component Resolution

### Semantic Naming

Components are identified by **type + variant**:

```typescript
// Type: 'hero'
// Variants: 'Editorial', 'Minimal', 'Split'

resolvePreset("hero", "Editorial");
// → Returns: HeroEditorial from @zodiac/presets
```

### Resolver Flow

```
JSON Config
    ↓
┌───────────────────────┐
│ resolvePreset()       │
│ - Maps semantic names │
│ - Returns component   │
└───────────────────────┘
    ↓
Component Render
```

### Example

**JSON from API**:

```json
{
  "pageId": "aries-home",
  "zodiac": "aries",
  "components": [
    {
      "type": "navbar",
      "variant": "Primary",
      "props": {
        "logo": "Aries",
        "items": [...]
      }
    },
    {
      "type": "hero",
      "variant": "Editorial",
      "props": {
        "title": "Welcome to Aries",
        "subtitle": "Bold and Fiery"
      }
    }
  ]
}
```

**Resolver**:

```typescript
// apps/web/src/lib/resolvePreset.ts
import * as presets from "@zodiac/presets";

export function resolvePreset(type: string, variant: string) {
  const componentMap = {
    hero: {
      Editorial: presets.HeroEditorial,
      Minimal: presets.HeroMinimal,
      Split: presets.HeroSplit,
    },
    navbar: {
      Primary: presets.NavbarPrimary,
      Compact: presets.NavbarCompact,
    },
    home: {
      Grid: presets.HomeGrid,
      Minimal: presets.HomeMinimal,
    },
  };

  return componentMap[type]?.[variant] || null;
}
```

**Rendering**:

```typescript
// apps/web/src/app/[zodiac]/page.tsx
export default async function ZodiacPage({ params }) {
  const composition = await fetchPageComposition(params.zodiac);

  return (
    <>
      {composition.components.map((comp) => {
        const Component = resolvePreset(comp.type, comp.variant);
        return Component ? <Component {...comp.props} /> : null;
      })}
    </>
  );
}
```

## Theme System

### CSS Variables Architecture

```css
/* packages/styles/base/tokens.css */
:root {
  --color-primary: #3b82f6;
  --color-background: #ffffff;
  /* ... */
}

/* packages/styles/zodiacs/aries.css */
[data-theme="aries"] {
  --color-primary: #dc2626; /* Override */
}

[data-theme="aries"][data-mode="dark"] {
  --color-background: #450a0a; /* Dark mode */
}
```

### Theme Application

```typescript
// apps/web/src/app/[zodiac]/layout.tsx
export default async function ZodiacLayout({ params, children }) {
  const themeConfig = await fetchThemeConfig(params.zodiac);

  return (
    <html data-theme={themeConfig.theme} data-mode={themeConfig.mode}>
      <body>{children}</body>
    </html>
  );
}
```

## Preview System

### How It Works

1. **Back Office** provides UI to configure components
2. User clicks "Preview"
3. Opens `apps/web` in new tab: `/preview?type=hero&variant=Editorial&props=...`
4. Preview page resolves and renders component in isolation

### Implementation

**Back Office**:

```typescript
// apps/backoffice/src/features/preview/openPreview.ts
export function openPreview(type: string, variant: string, props?: any) {
  const params = new URLSearchParams({
    type,
    variant,
    ...(props && { props: JSON.stringify(props) }),
  });

  const url = `http://localhost:3000/preview?${params}`;
  window.open(url, "_blank");
}
```

**Web Preview**:

```typescript
// apps/web/src/app/preview/page.tsx
export default function PreviewPage({ searchParams }) {
  const { type, variant, props } = searchParams;
  const parsedProps = props ? JSON.parse(props) : {};

  const Component = resolvePreset(type, variant);

  return Component ? <Component {...parsedProps} /> : null;
}
```

## Package Dependencies

```
apps/web
  ├─ @zodiac/ui
  ├─ @zodiac/presets
  └─ @zodiac/contracts

apps/backoffice
  └─ @zodiac/contracts

packages/presets
  └─ @zodiac/ui

packages/ui
  (no internal dependencies)

packages/styles
  (no dependencies - CSS only)

packages/contracts
  (no dependencies - types only)
```

## Scalability

### Adding New Components

1. Create component in `packages/presets/src/{type}/{Variant}.tsx`
2. Export from `packages/presets/src/index.ts`
3. Add to resolver map in `apps/web/src/lib/resolvePreset.ts`
4. Component automatically available in Back Office picker

### Adding New Themes

1. Create theme file in `packages/styles/zodiacs/{zodiac}.css`
2. Define CSS variables for colors, spacing, etc.
3. Import in `packages/styles/index.css`
4. Theme available via `data-theme="{zodiac}"`

### Adding New Apps

Simply add to `apps/` directory and reference shared packages:

```json
{
  "dependencies": {
    "@zodiac/ui": "workspace:*",
    "@zodiac/presets": "workspace:*"
  }
}
```

## Summary

This architecture provides:

- ✅ Clear separation of concerns
- ✅ Single source of truth for UI
- ✅ Data-driven page composition
- ✅ Type-safe contracts
- ✅ Scalable monorepo structure
- ✅ Independent app deployment
- ✅ Reusable component packages
- ✅ Pure CSS theming
- ✅ Preview system for testing
