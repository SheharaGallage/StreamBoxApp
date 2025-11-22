/**
 * Favorites Screen
 * This is a placeholder screen - will be implemented in Day 4
 */
import { StyleSheet, View, Text } from 'react-native';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';

export default function FavoritesScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Favorites</ThemedText>
      <ThemedText style={styles.subtitle}>Your favorite movies will appear here</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  subtitle: {
    marginTop: 16,
    opacity: 0.6,
  },
});

