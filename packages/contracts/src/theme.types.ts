/**
 * Theme Configuration Types
 * Defines the structure of theme configuration data.
 */

export type ZodiacSign = 
  | 'aries' 
  | 'taurus' 
  | 'gemini' 
  | 'cancer' 
  | 'leo' 
  | 'virgo'
  | 'libra' 
  | 'scorpio' 
  | 'sagittarius' 
  | 'capricorn' 
  | 'aquarius' 
  | 'pisces';

export type ThemeMode = 'light' | 'dark';

export type LayoutType = 'Theme1' | 'Theme2' | 'Custom';

/**
 * Main theme configuration object
 */
export interface ThemeConfig {
  /** The zodiac sign this theme is for */
  zodiac: ZodiacSign;
  
  /** The theme name (usually matches zodiac) */
  theme: string;
  
  /** Light or dark mode */
  mode: ThemeMode;
  
  /** Layout type to use */
  layout: LayoutType;
  
  /** Custom design tokens (optional overrides) */
  tokens?: DesignTokens;
}

/**
 * Design tokens that can be customized
 */
export interface DesignTokens {
  colors?: {
    primary?: string;
    primaryHover?: string;
    primaryText?: string;
    secondary?: string;
    secondaryHover?: string;
    secondaryText?: string;
    background?: string;
    surface?: string;
    text?: string;
    textMuted?: string;
    border?: string;
  };
  
  typography?: {
    fontFamilyBase?: string;
    fontFamilyHeading?: string;
    fontSizeBase?: string;
  };
  
  spacing?: {
    [key: string]: string;
  };
}
