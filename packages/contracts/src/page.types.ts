/**
 * Page Composition Types
 * Defines the structure of page composition data (JSON from API).
 */

/**
 * Component types available for composition
 */
export type ComponentType = 'hero' | 'home' | 'navbar' | 'footer' | 'section';

/**
 * Variant names for each component type
 */
export type HeroVariant = 'Editorial' | 'Minimal' | 'Split';
export type HomeVariant = 'Grid' | 'Minimal';
export type NavbarVariant = 'Primary' | 'Compact';

/**
 * Generic component definition in page composition
 */
export interface ComponentDefinition {
  /** Component type (hero, navbar, etc.) */
  type: ComponentType;
  
  /** Semantic variant name */
  variant: string;
  
  /** Component-specific props */
  props?: Record<string, any>;
  
  /** Optional component ID for tracking */
  id?: string;
}

/**
 * Page composition configuration
 * Array of components to render on a page
 */
export interface PageComposition {
  /** Page identifier */
  pageId: string;
  
  /** Zodiac sign this page belongs to */
  zodiac: string;
  
  /** List of components to render */
  components: ComponentDefinition[];
  
  /** Page metadata */
  metadata?: {
    title?: string;
    description?: string;
    [key: string]: any;
  };
}

/**
 * Hero component props
 */
export interface HeroProps {
  title: string;
  subtitle?: string;
  ctaText?: string;
  ctaLink?: string;
  imageUrl?: string;
  imagePosition?: 'left' | 'right';
}

/**
 * Home section props
 */
export interface HomeSectionProps {
  title?: string;
  description?: string;
  imageUrl?: string;
  items?: Array<{
    title: string;
    description: string;
    imageUrl?: string;
    link?: string;
  }>;
  columns?: 2 | 3 | 4;
}

/**
 * Navbar props
 */
export interface NavbarProps {
  logo?: string;
  items: Array<{
    label: string;
    href: string;
  }>;
  ctaText?: string;
  ctaLink?: string;
}
