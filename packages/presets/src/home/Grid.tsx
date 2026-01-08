export interface GridItem {
  title: string;
  description: string;
  imageUrl?: string;
  link?: string;
}

export interface GridProps {
  title?: string;
  items: GridItem[];
  columns?: 2 | 3 | 4;
}

/**
 * Grid Home Preset
 * Grid layout for displaying multiple items.
 */
export function Grid({ title, items, columns = 3 }: GridProps) {
  return (
    <section className="home home--grid">
      {title && <h2 className="home__title">{title}</h2>}
      <div className={`home__grid home__grid--${columns}`}>
        {items.map((item, index) => (
          <div key={index} className="home__item">
            {item.imageUrl && (
              <img src={item.imageUrl} alt={item.title} className="home__image" />
            )}
            <h3 className="home__item-title">{item.title}</h3>
            <p className="home__item-description">{item.description}</p>
            {item.link && <a href={item.link} className="home__link">Learn more</a>}
          </div>
        ))}
      </div>
    </section>
  );
}
