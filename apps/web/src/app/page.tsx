"use client";

import { resolveLayout } from "@/lib/resolveLayout";
import { resolvePreset } from "@/lib/resolvePreset";
import ariesTheme from "@/mocks/themes/aries.json";

const HOST = process.env.THEME_KEY || "aries";

export default function HomePage() {
  // Get layout component based on theme configuration
  const Layout = resolveLayout("ThemeA");

  // Get header component from layoutSlots
  const HeaderComponent = resolvePreset(
    "navbar",
    ariesTheme.layoutSlots.Header
  );

  // Get page components
  const homePage = ariesTheme.pages.find((page) => page.path === "/");
  const HeroComponent = homePage?.components.Hero
    ? resolvePreset("hero", homePage.components.Hero)
    : null;
  const Section1Component = homePage?.components.Section1
    ? resolvePreset("home", homePage.components.Section1)
    : null;
  const Section2Component = homePage?.components.Section2
    ? resolvePreset("home", homePage.components.Section2)
    : null;

  return (
    <div>
      {HeaderComponent && (
        <HeaderComponent
          logo="Aries"
          items={[
            { label: "Home", href: "/" },
            { label: "About", href: "/about" },
            { label: "Contact", href: "/contact" },
          ]}
          ctaText="Get Started"
          ctaLink="/get-started"
        />
      )}

      {HeroComponent && (
        <HeroComponent
          title="Welcome to Aries"
          subtitle="Bold, dynamic, and ready to take action"
          ctaText="Explore More"
          ctaLink="/explore"
          imageUrl="/images/aries-hero.jpg"
        />
      )}

      {Section1Component && (
        <Section1Component
          title="Our Features"
          description="Discover what makes Aries unique"
          items={[
            {
              title: "Bold Design",
              description: "Eye-catching and modern aesthetics",
              link: "/features/design",
            },
            {
              title: "Fast Performance",
              description: "Lightning-fast page loads",
              link: "/features/performance",
            },
            {
              title: "Easy Customization",
              description: "Tailor everything to your needs",
              link: "/features/customization",
            },
          ]}
          columns={3}
        />
      )}

      {Section2Component && (
        <Section2Component
          title="Get Started Today"
          description="Join thousands of satisfied users"
        />
      )}
    </div>
  );
}
