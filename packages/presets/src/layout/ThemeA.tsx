import { ReactNode } from "react";

export type ThemeAProps = {
  header?: ReactNode;
  children?: ReactNode;
};

export function ThemeA({ header, children }: ThemeAProps) {
  return (
    <div className="themeA-layout min-h-screen flex flex-col">
      {/* Header */}
      {header && (
        <header className="themeA-header sticky top-0 z-50">{header}</header>
      )}

      {/* Main */}
      <main className="themeA-main flex-1">{children}</main>
    </div>
  );
}
