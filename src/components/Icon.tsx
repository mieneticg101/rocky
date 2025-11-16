import React, { FC, SVGProps } from 'react';

export interface IconProps extends Omit<SVGProps<SVGSVGElement>, 'ref'> {
  /** Icon size in pixels or CSS value */
  size?: number | string;
  /** Icon color */
  color?: string;
  /** Stroke width for outline icons */
  strokeWidth?: number;
  /** Fill color for filled icons */
  fill?: string;
  /** Enable animation */
  animated?: boolean;
  /** Hover animation type */
  hover?: 'lift' | 'scale' | 'rotate' | 'rotate-full' | 'bounce' | 'shake';
  /** Click animation type */
  click?: 'pulse' | 'bounce' | 'rotate';
  /** Loading animation type */
  loading?: 'spin' | 'spin-slow' | 'spin-fast' | 'pulse' | 'bounce' | 'fade';
  /** 2025 effects */
  effect?: 'gradient' | 'glass' | '3d' | 'glow' | 'morph';
  /** Additional CSS classes */
  className?: string;
  /** Style variant */
  variant?: 'outline' | 'filled' | 'duotone' | 'gradient';
}

/**
 * Base Icon Component
 * Modern, accessible icon component with animations and effects
 */
export const Icon: FC<IconProps & { children: React.ReactNode }> = ({
  size = 24,
  color = 'currentColor',
  strokeWidth = 1.5,
  fill = 'none',
  animated = false,
  hover,
  click,
  loading,
  effect,
  className = '',
  variant = 'outline',
  children,
  ...props
}) => {
  // Build class names
  const classes = [
    'rocky-icon',
    hover && `rocky-icon-hover-${hover}`,
    click && `rocky-icon-click-${click}`,
    loading && `rocky-icon-${loading}`,
    effect && `rocky-icon-${effect}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  // Convert size to pixels if it's a number
  const sizeValue = typeof size === 'number' ? `${size}px` : size;

  return (
    <svg
      width={sizeValue}
      height={sizeValue}
      viewBox="0 0 24 24"
      fill={variant === 'filled' ? color : fill}
      stroke={variant === 'filled' ? 'none' : color}
      strokeWidth={variant === 'outline' ? strokeWidth : undefined}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={classes}
      role="img"
      aria-hidden={!props['aria-label']}
      {...props}
    >
      {children}
    </svg>
  );
};

// Example Icon Components

export const IconHome: FC<IconProps> = (props) => (
  <Icon {...props}>
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </Icon>
);

export const IconSearch: FC<IconProps> = (props) => (
  <Icon {...props}>
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </Icon>
);

export const IconMenu: FC<IconProps> = (props) => (
  <Icon {...props}>
    <line x1="4" y1="6" x2="20" y2="6" />
    <line x1="4" y1="12" x2="20" y2="12" />
    <line x1="4" y1="18" x2="20" y2="18" />
  </Icon>
);

export const IconUser: FC<IconProps> = (props) => (
  <Icon {...props}>
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </Icon>
);

export const IconSettings: FC<IconProps> = (props) => (
  <Icon {...props}>
    <circle cx="12" cy="12" r="3" />
    <path d="M12 1v6m0 6v10M1 12h6m6 0h10" />
    <path d="m4.93 4.93 4.24 4.24m5.66 5.66 4.24 4.24M4.93 19.07l4.24-4.24m5.66-5.66 4.24-4.24" />
  </Icon>
);

export const IconBell: FC<IconProps> = (props) => (
  <Icon {...props}>
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </Icon>
);

export const IconHeart: FC<IconProps> = (props) => (
  <Icon {...props}>
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </Icon>
);

export const IconStar: FC<IconProps> = (props) => (
  <Icon {...props}>
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </Icon>
);

export const IconDownload: FC<IconProps> = (props) => (
  <Icon {...props}>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </Icon>
);

export const IconUpload: FC<IconProps> = (props) => (
  <Icon {...props}>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="17 8 12 3 7 8" />
    <line x1="12" y1="3" x2="12" y2="15" />
  </Icon>
);

export default Icon;
