import { Appearance } from 'react-native';

const colorScheme = Appearance.getColorScheme();

export const theme = {
  isDark: colorScheme === 'dark',
  colors: {
    background: colorScheme === 'dark' ? '#0F172A' : '#F8FAFC',
    card: colorScheme === 'dark' ? '#1E293B' : '#FFFFFF',
    text: colorScheme === 'dark' ? '#F1F5F9' : '#1E293B',
    subtext: colorScheme === 'dark' ? '#94A3B8' : '#64748B',
    primary: '#3B82F6',
    green: '#16A34A',
    red: '#DC2626',
  },
};
