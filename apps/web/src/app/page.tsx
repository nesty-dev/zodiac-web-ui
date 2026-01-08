"use client";

import { resolveLayout } from "@/lib/resolveLayout";
import { resolvePreset } from "@/lib/resolvePreset";
import { loadTheme } from "@/lib/loadTheme";

const themeKey = process.env.NEXT_PUBLIC_THEME_KEY || "aries";

export default function HomePage() {
  // Load theme dynamically based on environment variable
  const theme = loadTheme(themeKey);

  // Get layout component based on theme configuration
  const Layout = resolveLayout(theme.layout);

  // Get page data
  const homePage = theme.pages.find((page) => page.path === "/");

  return (
    <div>
      {/* Render layout slots */}
      {theme.layoutSlots.map((slot) => {
        const Component = resolvePreset(slot.component);
        return Component ? <Component key={slot.name} {...slot.props} /> : null;
      })}

      {/* Render page components */}
      {homePage?.components.map((componentConfig, index) => {
        const Component = resolvePreset(componentConfig.component);
        return Component ? (
          <Component key={index} {...componentConfig.props} />
        ) : null;
      })}
    </div>
  );
}
