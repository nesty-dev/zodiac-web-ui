import { Button } from '@zodiac/ui';

export interface MinimalProps {
  title: string;
  subtitle?: string;
  ctaText?: string;
  ctaLink?: string;
}

/**
 * Minimal Hero Preset
 * Clean, minimal hero with centered text.
 */
export function Minimal({ title, subtitle, ctaText, ctaLink }: MinimalProps) {
  return (
    <section className="hero hero--minimal">
      <div className="hero__content">
        <h1 className="hero__title">{title}</h1>
        {subtitle && <p className="hero__subtitle">{subtitle}</p>}
        {ctaText && ctaLink && (
          <Button variant="outline" onClick={() => window.location.href = ctaLink}>
            {ctaText}
          </Button>
        )}
      </div>
    </section>
  );
}
