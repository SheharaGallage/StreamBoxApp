import { Stack } from 'expo-router';
import React from 'react';

/**
 * AuthNavigator
 * Wrapper for authentication-related screens
 * Provides consistent styling and configuration for auth flow
 */
export default function AuthNavigator() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
        contentStyle: { backgroundColor: '#000' },
      }}
    >
      <Stack.Screen
        name="login"
        options={{
          title: 'Login',
        }}
      />
      <Stack.Screen
        name="register"
        options={{
          title: 'Register',
        }}
      />
    </Stack>
  );
}
