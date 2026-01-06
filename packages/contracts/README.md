# Contracts Package

Shared type definitions and JSON schemas for the Zodiac platform.

## Contents

- `theme.types.ts` - Theme configuration types
- `page.types.ts` - Page composition types
- `theme.schema.json` - Theme configuration JSON schema
- `page.schema.json` - Page composition JSON schema

## Usage

```typescript
import { ThemeConfig, PageComposition } from '@zodiac/contracts';
```

## Purpose

This package ensures type safety and consistency across:
- apps/web (public website)
- apps/backoffice (admin panel)
- API contracts
