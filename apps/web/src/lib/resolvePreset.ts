import {
  HeroEditorial,
  HeroMinimal,
  HeroSplit,
  HomeGrid,
  HomeMinimal,
  NavbarPrimary,
  NavbarCompact,
} from "@zodiac/prestes";

export function resolvePreset(componentType: string, variant: string) {
  const presetMap: Record<string, Record<string, React.ComponentType<any>>> = {
    hero: {
      Editorial: HeroEditorial,
      Minimal: HeroMinimal,
      Split: HeroSplit,
    },
    home: {
      Grid: HomeGrid,
      Minimal: HomeMinimal,
    },
    navbar: {
      Primary: NavbarPrimary,
      Compact: NavbarCompact,
    },
  };

  const componentTypeMap = presetMap[componentType.toLowerCase()];
  if (!componentTypeMap) {
    console.warn(`Unknown component type: ${componentType}`);
    return null;
  }

  const component = componentTypeMap[variant];
  if (!component) {
    console.warn(
      `Unknown variant "${variant}" for component type "${componentType}"`
    );
    return null;
  }

  return component;
}
