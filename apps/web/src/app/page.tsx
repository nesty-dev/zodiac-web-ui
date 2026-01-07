import { resolveTheme } from "@/lib/resolveTheme";

const HOST = process.env.THEME_KEY || "aries";

export default function HomePage() {
  const { Layout, slots } = resolveTheme(HOST);
  return <Layout {...slots} />;
}
