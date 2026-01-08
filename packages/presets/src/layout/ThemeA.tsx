import { ReactNode } from "react";

export type ThemeAProps = {
  Header?: ReactNode;
  children?: ReactNode;
};

export function ThemeA({ Header, children }: ThemeAProps) {
  return (
    <div className="themeA-layout min-h-screen flex flex-col">
      {/* Header */}
      {Header && (
        <header className="themeA-header sticky top-0 z-50">{Header}</header>
      )}

      {/* Main */}
      <main className="themeA-main flex-1">{children}</main>
    </div>
  );
}
