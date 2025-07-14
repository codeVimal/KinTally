import { Tabs } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function Layout() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F8FAFC' }}>
      <StatusBar style="dark" />
      <Tabs
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: '#3B82F6',
          tabBarInactiveTintColor: '#94A3B8',
          tabBarStyle: {
            backgroundColor: '#FFFFFF',
            borderTopColor: '#E2E8F0',
            paddingBottom: 6,
            height: 60,
          },
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === 'index') iconName = 'home-outline';
            if (route.name === 'transactions') iconName = 'list-outline';
            if (route.name === 'statistics') iconName = 'stats-chart-outline';

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      />
    </SafeAreaView>
  );
}