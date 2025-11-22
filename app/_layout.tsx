import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import 'react-native-reanimated';
import { Provider } from 'react-redux';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { useInitializeApp } from '@/hooks/use-initialize-app';
import { useAppSelector } from '@/store/hooks';
import { store } from '@/store/store';

export const unstable_settings = {
  anchor: '(tabs)',
};

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const themeMode = useAppSelector((state) => state.theme.mode);
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const isInitialized = useInitializeApp();
  const segments = useSegments();
  const router = useRouter();

  // Handle navigation based on auth state
  useEffect(() => {
    if (!isInitialized) return;

    const inAuthGroup = segments[0] === '(auth)';
    const inTabsGroup = segments[0] === '(tabs)';

    if (!isAuthenticated && !inAuthGroup) {
      // Redirect to login if not authenticated
      router.replace('/(auth)/login');
    } else if (isAuthenticated && inAuthGroup) {
      // Redirect to home if authenticated and on auth screens
      router.replace('/(tabs)');
    }
  }, [isAuthenticated, isInitialized, segments]);

  // Determine theme based on user preference or system
  const currentTheme =
    themeMode === 'auto'
      ? colorScheme === 'dark'
        ? DarkTheme
        : DefaultTheme
      : themeMode === 'dark'
        ? DarkTheme
        : DefaultTheme;

  // Show loading screen while initializing
  if (!isInitialized) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <ThemeProvider value={currentTheme}>
      <Stack>
        <Stack.Screen name="(auth)/login" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)/register" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="movie/[id]"
          options={{
            title: 'Movie Details',
            presentation: 'card',
          }}
        />
      </Stack>
      <StatusBar style={themeMode === 'dark' || (themeMode === 'auto' && colorScheme === 'dark') ? 'light' : 'dark'} />
    </ThemeProvider>
  );
}

export default function RootLayout() {
  return (
    <Provider store={store}>
      <RootLayoutNav />
    </Provider>
  );
}
