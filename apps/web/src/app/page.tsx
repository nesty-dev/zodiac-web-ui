"use client";

import { resolveLayout } from "@/lib/resolveLayout";
import { resolvePreset } from "@/lib/resolvePreset";
import ariesTheme from "@/mocks/themes/aries.json";

const HOST = process.env.THEME_KEY || "aries";

export default function HomePage() {
  // Get layout component based on theme configuration
  const Layout = resolveLayout(ariesTheme.layout);

  // Get page data
  const homePage = ariesTheme.pages.find((page) => page.path === "/");

  return (
    <div>
      {/* Render layout slots */}
      {ariesTheme.layoutSlots.map((slot) => {
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
