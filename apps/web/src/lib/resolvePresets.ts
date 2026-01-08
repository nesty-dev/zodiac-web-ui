import * as Presets from "@zodiac/presets";
import type { ComponentType } from "react";

const PRESET_MAP: Record<string, ComponentType<any>> = {
  HeroEditorial: Presets.HeroEditorial,
  HeroMinimal: Presets.HeroMinimal,
  HeroSplit: Presets.HeroSplit,
  HomeGrid: Presets.HomeGrid,
  HomeMinimal: Presets.HomeMinimal,
};

const NAVBAR_MAP: Record<string, ComponentType<any>> = {
  NavbarPrimary: Presets.NavbarPrimary,
  NavbarCompact: Presets.NavbarCompact,
};

const LAYOUT_MAP: Record<string, ComponentType<any>> = {
  LayoutThemeA: Presets.LayoutThemeA,
};

export function resolveComponent(componentName: string) {
  const component = PRESET_MAP[componentName];

  if (!component) {
    console.warn(`Unknown component: ${componentName}`);
    return null;
  }

  return component;
}

export function resolveNavbar(navbarName: string) {
  const navbar = NAVBAR_MAP[navbarName];

  if (!navbar) {
    console.warn(`Unknown navbar: ${navbarName}`);
    return null;
  }

  return navbar;
}

export function resolveLayout(layoutName: string) {
  const layout = LAYOUT_MAP[layoutName];

  if (!layout) {
    console.warn(`Unknown layout: ${layoutName}`);
    return null;
  }

  return layout;
}
