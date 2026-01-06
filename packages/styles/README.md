# Zodiac Styles Package

CSS-only design tokens and themes for the Zodiac platform.

## Features

- Base design tokens (typography, spacing, colors)
- Zodiac-specific themes (aries, taurus, gemini, etc.)
- Light/dark mode support via CSS variables
- No JavaScript dependencies

## Usage

```css
@import "@zodiac/styles/index.css";
```

## Theme Switching

Apply themes using data attributes:

```html
<html data-theme="aries" data-mode="light">
  <!-- Your content -->
</html>
```

## Available Themes

- `aries` - Fiery, bold, energetic
- `taurus` - Earthy, grounded, stable
- `gemini` - Airy, dynamic, communicative
