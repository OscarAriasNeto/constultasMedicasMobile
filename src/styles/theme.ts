const theme = {
  colors: {
    primary: '#3CA65B',
    secondary: '#88D498',
    accent: '#F2C94C',
    background: '#F9F9F9',
    surface: '#FFFFFF',
    white: '#FFFFFF',
    text: '#333333',
    textSecondary: '#4F4F4F',
    border: '#D6EBD8',
    shadow: 'rgba(60, 166, 91, 0.2)',
    error: '#E63946',
    success: '#2ECC71',
    warning: '#F2994A',
    info: '#3CA4E6',
  },
  typography: {
    title: {
      fontSize: 28,
      fontWeight: '700' as const,
    },
    subtitle: {
      fontSize: 18,
      fontWeight: '600' as const,
    },
    body: {
      fontSize: 16,
      fontWeight: '400' as const,
    },
    caption: {
      fontSize: 14,
      fontWeight: '400' as const,
    },
    button: {
      fontSize: 16,
      fontWeight: '600' as const,
      letterSpacing: 0.5,
    },
  },
  spacing: {
    xsmall: 4,
    small: 8,
    medium: 16,
    large: 24,
    xlarge: 32,
  },
  radii: {
    small: 8,
    medium: 16,
    large: 24,
    pill: 999,
  },
};

export type AppTheme = typeof theme;

export default theme;
