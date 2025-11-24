import { useTheme } from '@/src/hooks/useTheme';
import { Stack } from 'expo-router';
import React from 'react';

/**
 * RootNavigator
 * Top-level navigation configuration
 * Manages navigation between auth, tabs, and other screens
 */
export default function RootNavigator() {
  const theme = useTheme();

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: theme.background },
        animation: 'fade',
      }}
    >
      {/* Auth Stack */}
      <Stack.Screen
        name="(auth)"
        options={{
          headerShown: false,
        }}
      />

      {/* Main Tab Stack */}
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
        }}
      />

      {/* Movie Details Modal */}
      <Stack.Screen
        name="movie/[id]"
        options={{
          presentation: 'card',
          headerShown: true,
          headerStyle: {
            backgroundColor: theme.background,
          },
          headerTintColor: theme.text,
          headerTitle: '',
          headerBackTitle: 'Back',
        }}
      />

      {/* Other Modals */}
      <Stack.Screen
        name="modal"
        options={{
          presentation: 'modal',
          headerShown: true,
          headerStyle: {
            backgroundColor: theme.background,
          },
          headerTintColor: theme.text,
          headerTitle: 'Modal',
        }}
      />
    </Stack>
  );
}
