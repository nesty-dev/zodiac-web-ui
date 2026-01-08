import * as Presets from "@zodiac/presets";

export function resolvePreset(componentName: string) {
  const presetMap: Record<string, React.ComponentType<any>> = {
    HeroEditorial: Presets.HeroEditorial,
    HeroMinimal: Presets.HeroMinimal,
    HeroSplit: Presets.HeroSplit,
    HomeGrid: Presets.HomeGrid,
    HomeMinimal: Presets.HomeMinimal,
    NavbarPrimary: Presets.NavbarPrimary,
    NavbarCompact: Presets.NavbarCompact,
  };

  const component = presetMap[componentName];
  if (!component) {
    console.warn(`Unknown component: ${componentName}`);
    return null;
  }

  return component;
}
