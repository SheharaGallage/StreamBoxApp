import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import 'react-native-reanimated';
import { Provider } from 'react-redux';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { store } from '@/src/store';
import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
import { loadStoredAuth } from '@/src/store/slices/authSlice';
import { loadFavorites } from '@/src/store/slices/favoritesSlice';

function RootNavigator() {
  const colorScheme = useColorScheme();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const segments = useSegments();
  const { isAuthenticated, isLoading } = useAppSelector((state) => state.auth);
  const [isNavigationReady, setIsNavigationReady] = useState(false);

  useEffect(() => {
    // Load stored authentication on app start
    dispatch(loadStoredAuth());
    dispatch(loadFavorites());
  }, []);

  useEffect(() => {
    // Wait for navigation to be ready
    const timer = setTimeout(() => {
      setIsNavigationReady(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isNavigationReady || isLoading) return;

    const inAuthGroup = segments[0] === '(auth)';

    if (!isAuthenticated && !inAuthGroup) {
      // Redirect to login
      router.replace('/(auth)/login');
    } else if (isAuthenticated && inAuthGroup) {
      // Redirect to home
      router.replace('/(tabs)');
    }
  }, [isAuthenticated, segments, isNavigationReady, isLoading]);

  if (isLoading || !isNavigationReady) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
        <ActivityIndicator size="large" color="#2196F3" />
      </View>
    );
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}

export default function RootLayout() {
  return (
    <Provider store={store}>
      <RootNavigator />
    </Provider>
  );
}
