import { Appearance } from 'react-native';

const scheme = Appearance.getColorScheme();

export const defaultTheme = {
  isDark: scheme === 'dark',
  fontSize: 16,
  primaryColor: '#3B82F6',
  colors: {
    light: {
      background: '#F8FAFC',
      text: '#1E293B',
      subtext: '#64748B',
      card: '#FFFFFF',
    },
    dark: {
      background: '#0F172A',
      text: '#F1F5F9',
      subtext: '#94A3B8',
      card: '#1E293B',
    },
  },
};
