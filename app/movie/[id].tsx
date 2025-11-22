/**
 * Movie Details Screen
 * This is a placeholder screen - will be implemented in Day 4
 */
import { StyleSheet, View, Text } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';

export default function MovieDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Movie Details</ThemedText>
      <ThemedText>Movie ID: {id}</ThemedText>
      <ThemedText style={styles.subtitle}>Details will be loaded here</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  subtitle: {
    marginTop: 16,
    opacity: 0.6,
  },
});

