import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, RefreshControl, ScrollView, StyleSheet, View } from 'react-native';

import { MovieCard } from '@/components/MovieCard';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchPopularMovies, fetchTrendingMovies } from '@/store/slices/movieSlice';
import { Feather } from '@expo/vector-icons';

type MovieListType = 'trending' | 'popular';

/**
 * Home Screen
 * Displays list of movies from TMDB API
 */
export default function HomeScreen() {
  const dispatch = useAppDispatch();
  const colorScheme = useColorScheme();
  const themeMode = useAppSelector((state) => state.theme.mode);
  const { movies, isLoading, error } = useAppSelector((state) => state.movie);
  const [listType, setListType] = useState<MovieListType>('trending');
  const [refreshing, setRefreshing] = useState(false);

  const isDark = themeMode === 'dark' || (themeMode === 'auto' && colorScheme === 'dark');

  useEffect(() => {
    loadMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listType]);

  useEffect(() => {
    if (error) {
      Alert.alert('Error', error, [{ text: 'OK' }]);
    }
  }, [error]);

  const loadMovies = async () => {
    try {
      if (listType === 'trending') {
        await dispatch(fetchTrendingMovies()).unwrap();
      } else {
        await dispatch(fetchPopularMovies()).unwrap();
      }
    } catch (err) {
      console.error('Error loading movies:', err);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadMovies();
    setRefreshing(false);
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <ThemedText type="title" style={styles.headerTitle}>
        {listType === 'trending' ? 'Trending Movies' : 'Popular Movies'}
      </ThemedText>
      
      <View style={styles.toggleContainer}>
        <View style={styles.toggleButton}>
          <Feather
            name="trending-up"
            size={18}
            color={listType === 'trending' ? Colors.light.tint : Colors[isDark ? 'dark' : 'light'].icon}
            onPress={() => setListType('trending')}
          />
          <ThemedText
            style={[
              styles.toggleText,
              listType === 'trending' && { color: Colors.light.tint, fontWeight: '600' },
            ]}
            onPress={() => setListType('trending')}
          >
            Trending
          </ThemedText>
        </View>
        
        <View style={styles.toggleButton}>
          <Feather
            name="star"
            size={18}
            color={listType === 'popular' ? Colors.light.tint : Colors[isDark ? 'dark' : 'light'].icon}
            onPress={() => setListType('popular')}
          />
          <ThemedText
            style={[
              styles.toggleText,
              listType === 'popular' && { color: Colors.light.tint, fontWeight: '600' },
            ]}
            onPress={() => setListType('popular')}
          >
            Popular
          </ThemedText>
        </View>
      </View>
    </View>
  );

  if (isLoading && movies.length === 0) {
    return (
      <ThemedView style={styles.container}>
        {renderHeader()}
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.light.tint} />
          <ThemedText style={styles.loadingText}>Loading movies...</ThemedText>
        </View>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} tintColor={Colors.light.tint} />
        }
        showsVerticalScrollIndicator={false}
      >
        {renderHeader()}

        {error && movies.length === 0 && (
          <View style={styles.errorContainer}>
            <Feather name="alert-circle" size={48} color={Colors[isDark ? 'dark' : 'light'].icon} />
            <ThemedText type="subtitle" style={styles.errorTitle}>
              Failed to load movies
            </ThemedText>
            <ThemedText style={styles.errorMessage}>
              {error}
            </ThemedText>
            <ThemedText
              style={styles.retryButton}
              onPress={loadMovies}
            >
              Tap to retry
            </ThemedText>
          </View>
        )}

        {movies.length > 0 && (
          <View style={styles.moviesList}>
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </View>
        )}

        {!isLoading && movies.length === 0 && !error && (
          <View style={styles.emptyContainer}>
            <Feather name="film" size={48} color={Colors[isDark ? 'dark' : 'light'].icon} />
            <ThemedText type="subtitle">No movies found</ThemedText>
          </View>
        )}

        {isLoading && movies.length > 0 && (
          <View style={styles.loadingMore}>
            <ActivityIndicator size="small" color={Colors.light.tint} />
          </View>
        )}
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  header: {
    marginBottom: 20,
  },
  headerTitle: {
    marginBottom: 16,
  },
  toggleContainer: {
    flexDirection: 'row',
    gap: 16,
  },
  toggleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  toggleText: {
    fontSize: 14,
  },
  moviesList: {
    gap: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 48,
  },
  loadingText: {
    marginTop: 16,
    opacity: 0.7,
  },
  loadingMore: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 48,
  },
  errorTitle: {
    marginTop: 16,
    marginBottom: 8,
  },
  errorMessage: {
    textAlign: 'center',
    opacity: 0.7,
    marginBottom: 16,
    paddingHorizontal: 32,
  },
  retryButton: {
    color: Colors.light.tint,
    fontWeight: '600',
    marginTop: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 48,
    opacity: 0.5,
  },
});
