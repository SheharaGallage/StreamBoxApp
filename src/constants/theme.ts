export const lightTheme = {
  background: '#f8f9fa',
  cardBackground: '#fff',
  text: '#1a1a1a',
  textSecondary: '#666',
  border: '#f0f0f0',
  primary: '#2196F3',
  error: '#f44336',
  success: '#4caf50',
  warning: '#ff9800',
  purple: '#9c27b0',
  pink: '#e91e63',
  isDarkMode: false,
};

export const darkTheme = {
  background: '#121212',
  cardBackground: '#1e1e1e',
  text: '#ffffff',
  textSecondary: '#b0b0b0',
  border: '#2e2e2e',
  primary: '#64b5f6',
  error: '#ef5350',
  success: '#66bb6a',
  warning: '#ffa726',
  purple: '#ba68c8',
  pink: '#f06292',
  isDarkMode: true,
};

export type Theme = typeof lightTheme;
