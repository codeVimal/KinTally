import React, { createContext, useContext } from 'react';
import { useColorScheme } from 'react-native';
import { useSettings } from './useSettings';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const systemTheme = useColorScheme(); // 'light' or 'dark'
  const { settings } = useSettings();

  const isDark = settings.darkMode === 'system'
    ? systemTheme === 'dark'
    : settings.darkMode === 'dark';

  const theme = {
    dark: isDark,
    background: isDark ? '#0f172a' : '#ffffff',
    card: isDark ? '#1e293b' : '#f8fafc',
    text: isDark ? '#f8fafc' : '#1e293b',
    subtext: isDark ? '#94a3b8' : '#64748b',
    primaryColor: settings.primaryColor || '#3b82f6',
  };

  return (
    <ThemeContext.Provider value={{ theme, isDark }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
