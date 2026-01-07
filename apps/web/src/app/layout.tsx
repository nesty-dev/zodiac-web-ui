import type { Metadata } from "next";

import { loadTheme } from "@/lib/loadTheme";
import { applyStyleOverrides } from "@/lib/applyStyle";

import "../styles/globals.css";

export const metadata: Metadata = {
  title: "Zodiac Platform",
  description: "Zodiac-themed websites",
};

const HOST = process.env.THEME_KEY || "aries";

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
      <body>{children}</body>
    </html>
  );
}
