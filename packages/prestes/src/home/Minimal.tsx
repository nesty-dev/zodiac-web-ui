export interface MinimalProps {
  title: string;
  description: string;
  imageUrl?: string;
}

/**
 * Minimal Home Preset
 * Simple, centered home section with minimal content.
 */
export function Minimal({ title, description, imageUrl }: MinimalProps) {
  return (
    <section className="home home--minimal">
      <div className="home__content">
        <h2 className="home__title">{title}</h2>
        <p className="home__description">{description}</p>
        {imageUrl && (
          <img src={imageUrl} alt={title} className="home__image" />
        )}
      </div>
    </section>
  );
}
