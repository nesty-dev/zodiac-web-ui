import { Button } from '@zodiac/ui';

export interface SplitProps {
  title: string;
  subtitle?: string;
  ctaText?: string;
  ctaLink?: string;
  imageUrl?: string;
  imagePosition?: 'left' | 'right';
}

/**
 * Split Hero Preset
 * Split layout with content on one side and image on the other.
 */
export function Split({
  title,
  subtitle,
  ctaText,
  ctaLink,
  imageUrl,
  imagePosition = 'right',
}: SplitProps) {
  return (
    <section className={`hero hero--split hero--split-${imagePosition}`}>
      <div className="hero__content">
        <h1 className="hero__title">{title}</h1>
        {subtitle && <p className="hero__subtitle">{subtitle}</p>}
        {ctaText && ctaLink && (
          <Button variant="primary" onClick={() => window.location.href = ctaLink}>
            {ctaText}
          </Button>
        )}
      </div>
      {imageUrl && (
        <div className="hero__image">
          <img src={imageUrl} alt={title} />
        </div>
      )}
    </section>
  );
}
