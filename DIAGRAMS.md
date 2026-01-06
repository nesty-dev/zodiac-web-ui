# Visual Architecture Diagrams

## Monorepo Structure

```
┌─────────────────────────────────────────────────────────────────┐
│                         ROOT WORKSPACE                           │
│                      (bun workspace / turbo)                     │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌─────────────────────────┐    ┌────────────────────────────┐ │
│  │         APPS            │    │       PACKAGES             │ │
│  ├─────────────────────────┤    ├────────────────────────────┤ │
│  │                         │    │                            │ │
│  │  ┌─────────────────┐   │    │  ┌──────────────────────┐ │ │
│  │  │   apps/web      │   │    │  │   packages/ui        │ │ │
│  │  │  (Next.js)      │◄──┼────┼──│  (Components)        │ │ │
│  │  │  Port: 3000     │   │    │  │  Atoms/Molecules     │ │ │
│  │  │  Public Site    │   │    │  │  Organisms           │ │ │
│  │  └─────────────────┘   │    │  └──────────────────────┘ │ │
│  │           │             │    │           ▲                │ │
│  │           │             │    │           │                │ │
│  │           ▼             │    │  ┌────────┴──────────────┐ │
│  │  ┌─────────────────┐   │    │  │  packages/prestes     │ │ │
│  │  │ apps/backoffice │   │    │  │  (Page Presets)       │ │ │
│  │  │  (Next.js)      │◄──┼────┼──│  Hero/Home/Navbar     │ │ │
│  │  │  Port: 3001     │   │    │  └───────────────────────┘ │ │
│  │  │  Admin Panel    │   │    │                            │ │
│  │  └─────────────────┘   │    │  ┌───────────────────────┐ │ │
│  │                         │    │  │  packages/styles      │ │ │
│  └─────────────────────────┘    │  │  (CSS Variables)      │ │ │
│                                  │  │  Tokens & Themes      │ │ │
│                                  │  └───────────────────────┘ │ │
│                                  │                            │ │
│                                  │  ┌───────────────────────┐ │ │
│                                  │  │  packages/contracts   │ │ │
│                                  │  │  (Types & Schemas)    │ │ │
│                                  │  └───────────────────────┘ │ │
│                                  │                            │ │
│                                  └────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

## Data Flow - Page Rendering

```
┌──────────────┐
│   Browser    │
│              │
└──────┬───────┘
       │
       │ 1. Request /aries
       ▼
┌──────────────────────────────────────┐
│         apps/web (Next.js)           │
├──────────────────────────────────────┤
│                                      │
│  ┌────────────────────────────────┐ │
│  │  /app/[zodiac]/layout.tsx      │ │
│  │  - Fetch theme config          │ │
│  │  - Apply data-theme attribute  │ │
│  └────────────┬───────────────────┘ │
│               │                      │
│               ▼                      │
│  ┌────────────────────────────────┐ │
│  │  /app/[zodiac]/page.tsx        │ │
│  │  - Fetch page composition      │ │
│  └────────────┬───────────────────┘ │
│               │                      │
│               ▼                      │
│  ┌────────────────────────────────┐ │
│  │  lib/resolvePreset.ts          │ │
│  │  - Map semantic name           │ │
│  │  - Return component            │ │
│  └────────────┬───────────────────┘ │
└───────────────┼──────────────────────┘
                │
                ▼
     ┌──────────────────────┐
     │  packages/prestes    │
     │  - HeroEditorial     │
     │  - NavbarPrimary     │
     │  - HomeGrid          │
     └──────────┬───────────┘
                │
                ▼
     ┌──────────────────────┐
     │  packages/ui         │
     │  - Button            │
     │  - Card              │
     └──────────┬───────────┘
                │
                ▼
     ┌──────────────────────┐
     │  packages/styles     │
     │  - CSS Variables     │
     │  - Theme colors      │
     └──────────────────────┘
```

## Component Resolution Flow

```
┌─────────────────────────────────────────────────────────┐
│                    API Response                          │
├─────────────────────────────────────────────────────────┤
│  {                                                       │
│    "pageId": "aries-home",                              │
│    "zodiac": "aries",                                   │
│    "components": [                                       │
│      {                                                   │
│        "type": "hero",          ◄───────────┐          │
│        "variant": "Editorial"    ◄──────┐   │          │
│      }                                   │   │          │
│    ]                                     │   │          │
│  }                                       │   │          │
└──────────────────────────────────────────┼───┼──────────┘
                                           │   │
                                           │   │
                ┌──────────────────────────┘   │
                │                              │
                ▼                              │
┌───────────────────────────────────────┐      │
│    resolvePreset(type, variant)       │      │
├───────────────────────────────────────┤      │
│                                       │      │
│  const componentMap = {               │      │
│    hero: {                            │◄─────┘
│      Editorial: HeroEditorial,       │
│      Minimal: HeroMinimal,           │
│      Split: HeroSplit                │
│    },                                 │
│    navbar: { ... },                  │
│    home: { ... }                     │
│  }                                    │
│                                       │
│  return componentMap[type][variant]  │
└───────────────┬───────────────────────┘
                │
                ▼
┌───────────────────────────────────────┐
│      HeroEditorial Component          │
├───────────────────────────────────────┤
│  function Editorial({ title, ... }) { │
│    return (                           │
│      <section>                        │
│        <h1>{title}</h1>              │
│        <Button>CTA</Button>          │
│      </section>                       │
│    )                                  │
│  }                                    │
└───────────────────────────────────────┘
```

## Theme System Flow

```
┌─────────────────────────────────────────────────────────┐
│                  Theme Configuration                     │
├─────────────────────────────────────────────────────────┤
│  {                                                       │
│    "zodiac": "aries",                                   │
│    "theme": "aries",                                    │
│    "mode": "dark"                                       │
│  }                                                       │
└────────────────────────┬────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────┐
│              Apply to HTML element                       │
├─────────────────────────────────────────────────────────┤
│  <html                                                   │
│    data-theme="aries"                                   │
│    data-mode="dark"                                     │
│  >                                                       │
└────────────────────────┬────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────┐
│              CSS Variable Resolution                     │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  /* base/tokens.css */                                  │
│  :root {                                                 │
│    --color-primary: #3b82f6;  ◄── Default              │
│  }                                                       │
│                                                          │
│  /* zodiacs/aries.css */                                │
│  [data-theme="aries"] {                                 │
│    --color-primary: #dc2626;  ◄── Override              │
│  }                                                       │
│                                                          │
│  [data-theme="aries"][data-mode="dark"] {              │
│    --color-background: #450a0a; ◄── Dark mode           │
│  }                                                       │
│                                                          │
└────────────────────────┬────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────┐
│              Component Styling                           │
├─────────────────────────────────────────────────────────┤
│  .button {                                               │
│    background-color: var(--color-primary);              │
│  }                                                       │
│                                                          │
│  Result: #dc2626 (Aries red)                            │
└─────────────────────────────────────────────────────────┘
```

## Back Office Preview Flow

```
┌──────────────────────────────────────────────────────┐
│          apps/backoffice (Port 3001)                 │
├──────────────────────────────────────────────────────┤
│                                                      │
│  ┌────────────────────────────────────────────┐    │
│  │  Component Picker UI                       │    │
│  ├────────────────────────────────────────────┤    │
│  │                                             │    │
│  │  Type: [Hero ▼]                            │    │
│  │  Variant: [Editorial ▼]                    │    │
│  │                                             │    │
│  │  Props:                                     │    │
│  │    title: "Test Hero"                      │    │
│  │    subtitle: "Preview mode"                │    │
│  │                                             │    │
│  │  [Preview Button] ◄─── User clicks         │    │
│  └─────────────┬──────────────────────────────┘    │
│                │                                     │
│                ▼                                     │
│  ┌────────────────────────────────────────────┐    │
│  │  openPreview('hero', 'Editorial', props)   │    │
│  └─────────────┬──────────────────────────────┘    │
└────────────────┼─────────────────────────────────────┘
                 │
                 │ Opens new window
                 ▼
┌──────────────────────────────────────────────────────┐
│         apps/web (Port 3000)                         │
├──────────────────────────────────────────────────────┤
│                                                      │
│  URL: /preview?type=hero&variant=Editorial&props=.. │
│                                                      │
│  ┌────────────────────────────────────────────┐    │
│  │  /app/preview/page.tsx                     │    │
│  ├────────────────────────────────────────────┤    │
│  │  1. Parse query params                     │    │
│  │  2. resolvePreset(type, variant)           │    │
│  │  3. Render component with props            │    │
│  └────────────────────────────────────────────┘    │
│                                                      │
│  Result: Live preview of HeroEditorial              │
└──────────────────────────────────────────────────────┘
```

## Package Dependency Graph

```
                   ┌─────────────┐
                   │ apps/web    │
                   └──────┬──────┘
                          │
         ┌────────────────┼────────────────┐
         │                │                │
         ▼                ▼                ▼
    ┌────────┐      ┌──────────┐    ┌─────────┐
    │ @ui    │      │ @prestes │    │ @styles │
    └────────┘      └────┬─────┘    └─────────┘
                         │
                         ▼
                    ┌────────┐
                    │ @ui    │
                    └────────┘

         ┌───────────────────────────────┐
         │                               │
         ▼                               ▼
    ┌────────────────┐          ┌────────────────┐
    │ apps/web       │          │ apps/backoffice│
    └────────┬───────┘          └────────┬───────┘
             │                           │
             ▼                           ▼
    ┌─────────────────┐         ┌─────────────────┐
    │ @contracts      │         │ @contracts      │
    └─────────────────┘         └─────────────────┘

Legend:
  → imports/depends on
  @ui = packages/ui
  @prestes = packages/prestes
  @styles = packages/styles
  @contracts = packages/contracts
```

## Folder Structure - Detailed

```
zodiac-web-ui/
│
├── apps/
│   ├── web/                          # Public website
│   │   ├── src/
│   │   │   ├── app/
│   │   │   │   ├── layout.tsx        # Root layout
│   │   │   │   ├── page.tsx          # Home page
│   │   │   │   ├── [zodiac]/         # Dynamic routes
│   │   │   │   │   ├── layout.tsx    # Theme applier
│   │   │   │   │   └── page.tsx      # Zodiac page
│   │   │   │   └── preview/          # Preview mode
│   │   │   │       └── page.tsx
│   │   │   ├── lib/
│   │   │   │   ├── resolveLayout.ts     # Layout resolver
│   │   │   │   ├── resolvePreset.ts     # Component resolver
│   │   │   │   ├── fetchThemeConfig.ts  # API: theme
│   │   │   │   └── fetchPageComposition.ts # API: page
│   │   │   └── styles/
│   │   │       └── globals.css          # Global imports
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── next.config.ts
│   │
│   └── backoffice/                   # Admin panel
│       ├── src/
│       │   ├── app/
│       │   │   ├── layout.tsx        # Admin layout
│       │   │   ├── page.tsx          # Dashboard
│       │   │   ├── themes/           # Theme management
│       │   │   │   └── page.tsx
│       │   │   └── components/       # Component management
│       │   │       └── page.tsx
│       │   └── features/
│       │       ├── preview/
│       │       │   └── openPreview.ts   # Preview launcher
│       │       ├── themeEditor/
│       │       │   └── ThemeEditor.tsx  # Theme editor UI
│       │       └── componentPicker/
│       │           └── ComponentPicker.tsx # Component picker UI
│       ├── package.json
│       ├── tsconfig.json
│       └── next.config.ts
│
├── packages/
│   ├── ui/                           # Design system
│   │   ├── src/
│   │   │   ├── atoms/               # Smallest components
│   │   │   │   └── Button/
│   │   │   │       └── index.ts     # Button component
│   │   │   ├── molecules/           # Composed components
│   │   │   │   └── Card/
│   │   │   │       └── index.ts
│   │   │   ├── organisms/           # Complex components
│   │   │   │   └── Header/
│   │   │   │       └── index.ts
│   │   │   └── index.ts             # Main export
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── prestes/                      # Page-level presets
│   │   ├── src/
│   │   │   ├── hero/
│   │   │   │   ├── Editorial.tsx    # Hero variant
│   │   │   │   ├── Minimal.tsx
│   │   │   │   └── Split.tsx
│   │   │   ├── home/
│   │   │   │   ├── Grid.tsx         # Home section
│   │   │   │   └── Minimal.tsx
│   │   │   ├── navbar/
│   │   │   │   ├── Primary.tsx      # Navbar variant
│   │   │   │   └── Compact.tsx
│   │   │   └── index.ts             # Main export
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── styles/                       # CSS design tokens
│   │   ├── base/
│   │   │   └── tokens.css           # Core variables
│   │   ├── zodiacs/
│   │   │   ├── aries.css            # Aries theme
│   │   │   ├── taurus.css           # Taurus theme
│   │   │   └── gemini.css           # Gemini theme
│   │   ├── index.css                # Main entry
│   │   ├── package.json
│   │   └── README.md
│   │
│   └── contracts/                    # Shared types
│       ├── src/
│       │   ├── theme.types.ts       # Theme interfaces
│       │   ├── theme.schema.json    # Theme JSON schema
│       │   ├── page.types.ts        # Page interfaces
│       │   ├── page.schema.json     # Page JSON schema
│       │   └── index.ts             # Main export
│       ├── package.json
│       ├── tsconfig.json
│       └── README.md
│
├── turbo.json                        # Build config
├── package.json                      # Root dependencies (Bun workspace)
├── README.md                         # Main documentation
├── ARCHITECTURE.md                   # Architecture docs
├── MIGRATION.md                      # Migration guide
└── REFACTOR_SUMMARY.md              # This summary
```

---

These diagrams provide a visual understanding of:

1. Overall monorepo structure
2. Data flow during page rendering
3. Component resolution mechanism
4. Theme system operation
5. Preview system workflow
6. Package dependency relationships
7. Detailed folder structure

Use these diagrams as reference when implementing features or onboarding new developers.
