export interface NavItem {
  label: string;
  href: string;
}

export interface CompactProps {
  logo?: string;
  items: NavItem[];
}

/**
 * Compact Navbar Preset
 * Minimal, compact navbar.
 */
export function Compact({ logo, items }: CompactProps) {
  return (
    <nav className="navbar navbar--compact">
      {logo && <div className="navbar__logo">{logo}</div>}
      <ul className="navbar__items">
        {items.map((item, index) => (
          <li key={index} className="navbar__item">
            <a href={item.href} className="navbar__link">
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
