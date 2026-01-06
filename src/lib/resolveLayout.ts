import { Theme1Layout, Theme2Layout } from "@/layouts";

export function resolveLayout(name: string) {
  return {
    theme1: Theme1Layout,
    theme2: Theme2Layout,
  }[name];
}
