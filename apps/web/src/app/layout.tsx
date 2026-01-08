import { loadTheme } from "@/lib/loadTheme";
import { applyStyleOverrides } from "@/lib/applyStyle";
import { resolveLayout } from "@/lib/resolveLayout";
import { resolvePreset } from "@/lib/resolvePreset";

import "../styles/globals.css";

const HOST = process.env.THEME_KEY || "aries";

function LayoutContent({
  theme,
  children,
}: {
  theme: ReturnType<typeof loadTheme>;
  children: React.ReactNode;
}) {
  const Layout = resolveLayout(theme.layout);

  if (Layout) {
    return <Layout>{children}</Layout>;
  }

  return <div>{children}</div>;
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = loadTheme(HOST);
  const styleVars = applyStyleOverrides(theme.style?.overrides);

  return (
    <html
      lang="en"
      data-theme={theme.style?.tokens}
      style={styleVars as React.CSSProperties}
    >
      <body>
        <LayoutContent theme={theme}>{children}</LayoutContent>
      </body>
    </html>
  );
}
