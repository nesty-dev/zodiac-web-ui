import { ReactNode, HTMLAttributes } from 'react';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  variant?: 'default' | 'bordered' | 'elevated';
}

/**
 * Card component - Base UI molecule
 */
export function Card({
  variant = 'default',
  children,
  className = '',
  ...props
}: CardProps) {
  return (
    <div className={`card card--${variant} ${className}`} {...props}>
      {children}
    </div>
  );
}
