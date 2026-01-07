import { Button } from "@zodiac/ui";

export interface NavItem {
  label: string;
  href: string;
}

export interface PrimaryProps {
  logo?: string;
  items: NavItem[];
}

export function Primary({ logo, items }: PrimaryProps) {
  return (
    <nav className="navbar navbar--primary">
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
