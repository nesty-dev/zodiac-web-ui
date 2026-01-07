import * as HeroPresets from "@zodiac/prestes/hero";
import * as HomePresets from "@zodiac/prestes/home";
import * as NavBarPresets from "@zodiac/prestes/navbar";

import { LayoutThemeA } from "@zodiac/prestes/layout";

const HERO_MAP = {
  Editorial: HeroPresets.Editorial,
  Minimal: HeroPresets.Minimal,
};

const HOME_MAP = {
  Grid: HomePresets.Grid,
  Minimal: HomePresets.Minimal,
};

const NAVBAR_MAP = {
  Primary: NavBarPresets.Primary,
  Compact: NavBarPresets.Compact,
};

export function resolveTheme(theme: any) {
  if (!theme || !Array.isArray(theme.pages)) {
    return {
      Layout: LayoutThemeA,
      props: { children: null },
    };
  }

  const page = theme.pages[0];

  const HeaderComponent = NAVBAR_MAP[theme.layoutSlots?.Header];

  const HeroComponent = HERO_MAP[page.components?.Hero];

  const Section1Component = HOME_MAP[page.components?.Section1];

  const Section2Component = HOME_MAP[page.components?.Section2];

  return {
    Layout: LayoutThemeA,
    props: {
      Header: HeaderComponent && <HeaderComponent />,
      children: (
        <>
          {HeroComponent && <HeroComponent />}
          {Section1Component && <Section1Component />}
          {Section2Component && <Section2Component />}
        </>
      ),
    },
  };
}
