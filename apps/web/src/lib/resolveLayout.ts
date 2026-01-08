import * as Presets from "@zodiac/presets";

export function resolveLayout(layoutName: string) {
  const layoutMap: Record<string, React.ComponentType<any>> = {
    LayoutThemeA: Presets.LayoutThemeA,
  };

  const layout = layoutMap[layoutName];
  if (!layout) {
    console.warn(`Unknown layout: ${layoutName}`);
    return null;
  }

  return layout;
}
