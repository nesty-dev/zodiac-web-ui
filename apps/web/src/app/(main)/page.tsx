"use client";

import { loadTheme } from "@/lib/loadTheme";
import { resolveComponent } from "@/lib/resolvePresets";

const themeKey = process.env.NEXT_PUBLIC_THEME_KEY || "aries";

export default function HomePage() {
  const theme = loadTheme(themeKey);

  const homePage = theme.pages.find((page) => page.path === "/");

  return (
    <div>
      {homePage?.components.map((componentConfig, index) => {
        const Component = resolveComponent(componentConfig.component);
        return Component ? (
          <Component key={index} {...componentConfig.props} />
        ) : null;
      })}
    </div>
  );
}
