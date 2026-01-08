# Zodiac Platform Monorepo

A monorepo for the Zodiac-themed platform with multiple themed websites, shared UI components, and an admin back office.

## Architecture Overview

This monorepo follows a **data-driven, single-source-of-truth** architecture where:

- **UI rendering logic exists in ONE place only** (apps/web and shared packages)
- **Back Office does NOT duplicate UI rendering** - it configures and previews
- **Page composition is data-driven** through JSON from API
- **Components are selected by semantic names**, not file paths

## 🚀 Tech Stack

- **Framework:** [Next.js](https://nextjs.org) (App Router)
- **Language:** TypeScript
- **Styling:** CSS Variables (Design Tokens)
- **Package Manager:** Bun
- **Build System:** Turbo
- **Linting:** ESLint

## 📁 Project Structure

```
root/
├─ apps/
│  ├─ web/                # Public website + preview renderer
│  │  ├─ src/
│  │  │  ├─ app/          # Next.js routing, layouts, pages
│  │  │  ├─ lib/          # Theme resolver, data fetch
│  │  │  └─ styles/       # Global styles (imports shared styles)
│  │  └─ package.json
│  │
│  └─ backoffice/         # Admin / Theme Builder
│     ├─ src/
│     │  ├─ app/          # Admin pages
│     │  └─ features/     # Theme editor, component pickers
│     └─ package.json
│
├─ packages/
│  ├─ ui/                 # Base UI components (Design System)
│  │  ├─ src/
│  │  │  ├─ atoms/        # Button, Input, etc.
│  │  │  ├─ molecules/    # Card, etc.
│  │  │  └─ organisms/    # Header, etc.
│  │  └─ index.ts
│  │
│  ├─ presets/            # Page-level preset components
│  │  ├─ hero/            # Editorial, Minimal, Split
│  │  ├─ home/            # Grid, Minimal
│  │  ├─ navbar/          # Primary, Compact
│  │  └─ index.ts
│  │
│  ├─ styles/             # Design tokens & themes (CSS only)
│  │  ├─ base/            # Core design tokens
│  │  ├─ zodiacs/         # Zodiac-specific themes
│  │  └─ index.css
│  │
│  └─ contracts/          # Shared schemas & types
│     ├─ theme.types.ts
│     └─ page.types.ts
│
├─ pnpm-workspace.yaml
├─ turbo.json
└─ package.json
```

## Apps

### apps/web

Public-facing website and preview renderer.

**Responsibilities:**

- Routing (`/[zodiac]`, `/preview`)
- Fetches theme JSON from API
- Resolves and renders layouts and preset components
- Applies `data-theme` and `data-mode` to `<html>`

### apps/backoffice

Admin panel for configuring themes and selecting components.

**Responsibilities:**

- Theme configuration UI
- Component picker
- Opens preview URLs from apps/web
- Does NOT render public UI directly

## Packages

### packages/ui

Base UI component library (Design System).

- No routing, no API calls, no theme logic
- Pure presentational components

### packages/presets

Page-level preset components (sections).

- Can import from `@zodiac/ui`
- Selected via semantic names (e.g., "Editorial", "Grid")
- Presentational only

### packages/styles

CSS-only design tokens and themes.

- Core design tokens via CSS variables
- Zodiac-specific themes (aries, taurus, gemini)
- Light/dark mode support

### packages/contracts

Shared type definitions and JSON schemas.

- Ensures type safety across apps
- Defines API contracts

## 🛠️ Getting Started

### Prerequisites

- Node.js >= 18.0.0
- Bun >= 1.0.0

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd zodiac-web-ui
```

2. Install dependencies:

```bash
bun install
```

### Development

Start all apps in development mode:

```bash
bun dev
```

Or run specific app:

```bash
cd apps/web && bun dev        # Public website (port 3000)
cd apps/backoffice && bun dev # Back office (port 3001)
```

### Build

Create production builds:

```bash
bun run build
```

### Linting

Run linting:

```bash
bun run lint
```

## Key Concepts

### Theme Configuration

Themes are configured via JSON and applied using CSS variables:

```typescript
{
  "zodiac": "aries",
  "theme": "aries",
  "mode": "light",
  "layout": "Theme1"
}
```

Applied to HTML:

```html
<html data-theme="aries" data-mode="light"></html>
```

### Page Composition

Pages are composed from preset components via JSON:

```typescript
{
  "pageId": "aries-home",
  "zodiac": "aries",
  "components": [
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

### Component Resolution

Components are resolved by semantic names:

```typescript
// apps/web/src/lib/resolvePresets.ts
resolvePresets("hero", "Editorial"); // Returns HeroEditorial component
```

### Preview Mode

Back Office opens preview URLs to see changes:

```typescript
// apps/backoffice
openPreview("hero", "Editorial", props);
// Opens: http://localhost:3000/preview?type=hero&variant=Editorial
```

## Best Practices

1. **Single Source of Truth**: All UI rendering happens in apps/web and shared packages
2. **Separation of Concerns**: Back Office configures, web renders
3. **Type Safety**: Use `@zodiac/contracts` for shared types
4. **Semantic Naming**: Components selected by semantic names, not file paths
5. **Data-Driven**: Page composition comes from JSON/API
6. **CSS Variables**: Themes managed via CSS custom properties
7. **Presentational Components**: Keep components pure and reusable

## Next Steps

- [ ] Implement layout resolver
- [ ] Implement preset resolver
- [ ] Implement API integration
- [ ] Build theme editor UI
- [ ] Build component picker UI
- [ ] Add more zodiac themes
- [ ] Add more preset components
- [ ] Set up CI/CD pipeline

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Turborepo Documentation](https://turbo.build/repo/docs)
- [Bun Documentation](https://bun.sh/docs)
- [Bun Workspaces](https://bun.sh/docs/install/workspaces)

## 🚢 Deployment

The easiest way to deploy this Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## 📝 License

This project is open source and available under the [MIT License](LICENSE).
