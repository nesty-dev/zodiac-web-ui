import { ReactNode } from "react";

export type Theme1LayoutProps = {
  Header?: ReactNode;
  children?: ReactNode;
};

export function Theme1Layout({ Header, children }: Theme1LayoutProps) {
  return (
    <div className="theme1-layout min-h-screen flex flex-col">
      {/* Header */}
      {Header && (
        <header className="theme1-header sticky top-0 z-50">{Header}</header>
      )}

      {/* Main */}
      <main className="theme1-main flex-1">{children}</main>
    </div>
  );
}
