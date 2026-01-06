import { Button } from '@zodiac/ui';

export interface NavItem {
  label: string;
  href: string;
}

export interface PrimaryProps {
  logo?: string;
  items: NavItem[];
  ctaText?: string;
  ctaLink?: string;
}

/**
 * Primary Navbar Preset
 * Full-featured navbar with logo, navigation items, and CTA.
 */
export function Primary({ logo, items, ctaText, ctaLink }: PrimaryProps) {
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
      {ctaText && ctaLink && (
        <Button variant="primary" size="sm" onClick={() => window.location.href = ctaLink}>
          {ctaText}
        </Button>
      )}
    </nav>
  );
}
