// app/(tabs)/_layout.jsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Tabs } from 'expo-router';

const Tab = createBottomTabNavigator();

export default function TabsLayout() {
  return <Tabs />;
}
