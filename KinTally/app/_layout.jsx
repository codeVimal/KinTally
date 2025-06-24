import React from 'react';
import { Tabs } from 'expo-router';
import { ThemeProvider } from '../hooks/useTheme';
import { CategoryProvider } from '../hooks/useCategories';
import { SettingsProvider } from '../hooks/useSettings';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../hooks/useTheme';

export default function LayoutWrapper() {
  return (
    <SettingsProvider>
      <ThemeProvider>
        <CategoryProvider>
          <Layout />
        </CategoryProvider>
      </ThemeProvider>
    </SettingsProvider>
  );
}

function Layout() {
  const { theme } = useTheme();

  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: theme.primaryColor,
        tabBarInactiveTintColor: theme.subtext,
        tabBarStyle: {
          backgroundColor: theme.card,
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
          borderTopWidth: 0.2,
          borderTopColor: theme.subtext,
        },
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'index') {
            iconName = 'home';
          } else if (route.name === 'statistics') {
            iconName = 'pie-chart';
          } else if (route.name === 'settings') {
            iconName = 'settings';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    />
  );
}
