export const theme = {
  colors: {
    primary: 'var(--primary)',
    secondary: 'var(--secondary)',
    accent: 'var(--accent)',
    dark: 'var(--dark)',
    light: 'var(--light)',
    danger: 'var(--danger)',
    success: 'var(--success)',
    text: 'var(--text)',
    textLight: 'var(--text-light)',
    background: 'var(--background)',
    shadow: 'var(--shadow)',
  },
  breakpoints: {
    xs: '480px',
    sm: '768px',
    md: '992px',
    lg: '1200px',
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    xxl: '3rem',
  },
  borderRadius: {
    small: '4px',
    medium: '8px',
    large: '12px',
    round: '50%',
  },
  transitions: {
    fast: '0.2s ease',
    medium: '0.3s ease',
    slow: '0.5s ease',
  },
  shadows: {
    small: '0 2px 5px var(--shadow)',
    medium: '0 5px 15px var(--shadow)',
    large: '0 10px 25px var(--shadow)',
  },
};

export type Theme = typeof theme;
