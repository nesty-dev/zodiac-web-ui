import { LayoutThemeA } from "@zodiac/prestes";

export function resolveLayout(layoutName: string) {
  const layoutMap: Record<string, React.ComponentType<any>> = {
    ThemeA: LayoutThemeA,
    // Add more layouts as they become available
  };

  const layout = layoutMap[layoutName];
  if (!layout) {
    console.warn(`Unknown layout: ${layoutName}`);
    return null;
  }

  return layout;
}
