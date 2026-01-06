# Migration Guide: Monorepo Refactor

## Overview

This document outlines the steps to migrate from the current single-app structure to the new monorepo architecture.

## Current Structure (Old)

```
zodiac-web-ui/
├── src/
│   ├── app/
│   ├── components/
│   ├── layouts/
│   ├── lib/
│   ├── mock/
│   ├── styles/
│   └── types/
├── public/
└── package.json
```

## New Structure (Monorepo)

```
zodiac-web-ui/
├── apps/
│   ├── web/
│   └── backoffice/
├── packages/
│   ├── ui/
│   ├── prestes/
│   ├── styles/
│   └── contracts/
└── package.json (monorepo root)
```

## Migration Steps

### Phase 1: Completed ✅

Created the new monorepo structure with:

- Root configuration (pnpm-workspace.yaml, turbo.json)
- apps/web (Next.js public website)
- apps/backoffice (Admin panel)
- packages/ui (Base UI components)
- packages/prestes (Preset components)
- packages/styles (Design tokens and themes)
- packages/contracts (Shared types and schemas)

### Phase 2: Content Migration (TODO)

#### Move Components

**From**: `src/components/`
**To**:

- `packages/ui/src/atoms/` - Base UI components
- `packages/prestes/src/` - Page-level presets

**Actions**:

1. Review each component in `src/components/`
2. Determine if it's a base UI component or preset
3. Move to appropriate package
4. Update imports

#### Move Layouts

**From**: `src/layouts/`
**To**: Either `packages/ui/src/organisms/` or keep in `apps/web/src/layouts/`

**Actions**:

1. Review Theme1Layout.tsx and Theme2Layout.tsx
2. If generic, move to packages/ui
3. If app-specific, keep in apps/web

#### Move Styles

**From**: `src/styles/`
**To**: `packages/styles/`

**Actions**:

1. Merge existing `styles/theme/` with new `packages/styles/`
2. Convert to CSS variables if not already
3. Ensure theme files match zodiac structure

#### Move Lib Files

**From**: `src/lib/`
**To**: `apps/web/src/lib/`

**Actions**:

1. Keep resolvers in apps/web
2. Move utilities that are reusable to packages if needed

#### Move Mock Data

**From**: `src/mock/`
**To**: `apps/web/src/mock/` or root-level `mock/`

#### Move Types

**From**: `src/types/`
**To**: `packages/contracts/src/`

**Actions**:

1. Review and merge with new contracts
2. Remove duplicates

### Phase 3: Update Imports (TODO)

After moving files, update all imports:

**Old**:

```typescript
import { Button } from "@/components/atoms/Button";
```

**New**:

```typescript
import { Button } from "@zodiac/ui";
```

### Phase 4: Update Configuration (TODO)

1. Remove old dependencies from root package.json (now in apps/web)
2. Update paths in tsconfig.json files
3. Update ESLint configurations
4. Update any build scripts

### Phase 5: Install Dependencies (TODO)

```bash
bun install
```

This will install all dependencies for all workspaces.

### Phase 6: Test & Verify (TODO)

1. Run dev mode: `bun dev`
2. Verify apps/web works: http://localhost:3000
3. Verify apps/backoffice works: http://localhost:3001
4. Check all imports resolve correctly
5. Run linting: `bun run lint`
6. Run builds: `bun run build`

## Old Files to Remove/Archive

After successful migration:

- `src/` directory (move to archive or delete)
- Old `package.json` dependencies (merged into apps/web)
- Old config files if duplicated

## Rollback Plan

If migration fails:

1. Keep a git branch with old structure
2. Can revert to old structure if needed
3. Test thoroughly before deleting old code

## Benefits of New Structure

1. **Clear Separation**: Apps vs. shared packages
2. **Reusability**: Packages can be shared across multiple apps
3. **Scalability**: Easy to add new apps or packages
4. **Type Safety**: Shared contracts ensure consistency
5. **Build Optimization**: Turbo caches and parallelizes builds
6. **Team Collaboration**: Clear ownership boundaries

## Notes

- The new structure is now in place alongside the old one
- Old `src/` directory still exists and can be referenced
- Migration can be done incrementally
- Test each phase before proceeding to the next
