import { ThemedView } from '@/components/themed-view';
import CategoryRow from '@/src/components/CategoryRow';
import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
import {
  fetchPopularMovies,
  fetchTrendingMovies,
  fetchUpcomingMovies,
} from '@/src/store/slices/moviesSlice';
import { Movie } from '@/src/types';
import React, { useEffect } from 'react';
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { router } from 'expo-router';

export default function HomeScreen() {
  const dispatch = useAppDispatch();
  const { trending, popular, upcoming, isLoading, error } = useAppSelector(
    (state) => state.movies
  );
  const [refreshing, setRefreshing] = React.useState(false);

  const loadMovies = async () => {
    await Promise.all([
      dispatch(fetchTrendingMovies()),
      dispatch(fetchPopularMovies()),
      dispatch(fetchUpcomingMovies()),
    ]);
  };

  useEffect(() => {
    loadMovies();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadMovies();
    setRefreshing(false);
  };

  const handleMoviePress = (movie: Movie) => {
    // Navigate to movie details
    router.push(`/movie/${movie.id}` as any);
  };

  if (isLoading && !refreshing && trending.length === 0) {
    return (
      <ThemedView style={styles.centered}>
        <ActivityIndicator size="large" color="#2196F3" />
        <Text style={styles.loadingText}>Loading movies...</Text>
      </ThemedView>
    );
  }

  if (error) {
    return (
      <ThemedView style={styles.centered}>
        <Text style={styles.errorText}>Error: {error}</Text>
        <Text style={styles.errorSubtext}>Pull down to retry</Text>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>StreamBox</Text>
        <Text style={styles.headerSubtitle}>Discover amazing movies</Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        <CategoryRow title="Trending Now" movies={trending} onMoviePress={handleMoviePress} />
        <CategoryRow title="Popular" movies={popular} onMoviePress={handleMoviePress} />
        <CategoryRow title="Upcoming" movies={upcoming} onMoviePress={handleMoviePress} />
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  scrollView: {
    flex: 1,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
    marginTop: 12,
  },
  errorText: {
    fontSize: 16,
    color: '#ff4444',
    textAlign: 'center',
    paddingHorizontal: 40,
  },
  errorSubtext: {
    fontSize: 14,
    color: '#999',
    marginTop: 8,
  },
});
