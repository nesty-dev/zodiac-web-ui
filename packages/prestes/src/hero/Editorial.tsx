import { Button } from "@zodiac/ui";

export interface EditorialProps {
  title: string;
  subtitle?: string;
  ctaText?: string;
  ctaLink?: string;
  imageUrl?: string;
}

export function Editorial({
  title,
  subtitle,
  ctaText,
  ctaLink,
  imageUrl,
}: EditorialProps) {
  return (
    <section className="hero hero--editorial">
      <div className="hero__content">
        <h1 className="hero__title">{title}</h1>
        {subtitle && <p className="hero__subtitle">{subtitle}</p>}
        {ctaText && ctaLink && (
          <Button
            variant="primary"
            onClick={() => (window.location.href = ctaLink)}
          >
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
