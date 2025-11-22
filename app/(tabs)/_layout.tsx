import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useAppSelector } from '@/store/hooks';
import { Feather } from '@expo/vector-icons';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const themeMode = useAppSelector((state) => state.theme.mode);
  const user = useAppSelector((state) => state.auth.user);

  // Determine theme
  const isDark = themeMode === 'dark' || (themeMode === 'auto' && colorScheme === 'dark');

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[isDark ? 'dark' : 'light'].tint,
        headerShown: true,
        headerStyle: {
          backgroundColor: Colors[isDark ? 'dark' : 'light'].background,
        },
        headerTintColor: Colors[isDark ? 'dark' : 'light'].text,
        tabBarStyle: {
          backgroundColor: Colors[isDark ? 'dark' : 'light'].background,
        },
        tabBarButton: HapticTab,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          headerTitle: `Welcome, ${user?.firstName || user?.username || 'User'}!`,
          tabBarIcon: ({ color, size }) => (
            <Feather name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: 'Favorites',
          headerTitle: 'My Favorites',
          tabBarIcon: ({ color, size }) => (
            <Feather name="heart" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          headerTitle: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <Feather name="user" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
