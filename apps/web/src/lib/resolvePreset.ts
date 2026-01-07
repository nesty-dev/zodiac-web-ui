import {
  HeroEditorial,
  HeroMinimal,
  HeroSplit,
  HomeGrid,
  HomeMinimal,
  NavbarPrimary,
  NavbarCompact,
} from "@zodiac/prestes";

export function resolvePreset(componentName: string) {
  const presetMap: Record<string, React.ComponentType<any>> = {
    HeroEditorial,
    HeroMinimal,
    HeroSplit,
    HomeGrid,
    HomeMinimal,
    NavbarPrimary,
    NavbarCompact,
  };

  const component = presetMap[componentName];
  if (!component) {
    console.warn(`Unknown component: ${componentName}`);
    return null;
  }

  return component;
}
