import * as Hero from "@zodiac/prestes/hero";
import * as Home from "@zodiac/prestes/home";
import * as Header from "@zodiac/prestes/navbar";

import { LayoutThemeA } from "@zodiac/prestes/layout";

export function resolveTheme(theme: any) {
  const page = theme.pages[0]; // ตอนนี้เอา Home หน้าเดียวก่อน

  return {
    Layout: LayoutThemeA,

    slots: {
      Header: Header[theme.layoutSlots.Header],
      Hero: Hero[page.components.Hero],
      Section1: Home[page.components.Section1],
      Section2: Home[page.components.Section2],
    },
  };
}
