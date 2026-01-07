import aries from "@/mocks/themes/aries.json";
import taurus from "@/mocks/themes/taurus.json";

export function loadTheme(key: string) {
  switch (key) {
    case "taurus":
      return taurus;
    case "aries":
    default:
      return aries;
  }
}
