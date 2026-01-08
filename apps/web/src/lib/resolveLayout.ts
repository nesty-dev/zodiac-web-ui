import { LayoutThemeA } from "@zodiac/prestes";

export function resolveLayout(layoutName: string) {
  const layoutMap: Record<string, React.ComponentType<any>> = {
    LayoutThemeA: LayoutThemeA,
  };

  const layout = layoutMap[layoutName];
  if (!layout) {
    console.warn(`Unknown layout: ${layoutName}`);
    return null;
  }

  return layout;
}
