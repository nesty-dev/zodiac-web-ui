import { ReactNode } from "react";

export interface HeaderProps {
  children?: ReactNode;
  logo?: ReactNode;
  navigation?: ReactNode;
}

/**
 * Header component - Base UI organism
 */
export function Header({ logo, navigation, children }: HeaderProps) {
  return (
    <header className="header">
      {logo && <div className="header__logo">{logo}</div>}
      {navigation && <nav className="header__nav">{navigation}</nav>}
      {children}
    </header>
  );
}
