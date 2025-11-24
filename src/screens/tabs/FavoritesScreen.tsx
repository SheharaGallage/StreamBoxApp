import MovieCard from '@/src/components/MovieCard';
import { ThemedView } from '@/src/components/themed-view';
import { useTheme } from '@/src/hooks/useTheme';
import { useAppDispatch, useAppSelector } from '@/src/redux/hooks';
import { fetchFavoriteMovies } from '@/src/redux/slices/favoritesSlice';
import { Movie } from '@/src/types';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
    ActivityIndicator,
    FlatList,
    RefreshControl,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

export default function FavoritesScreen() {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const { favoriteMovies, isLoading } = useAppSelector((state) => state.favorites);
  const [refreshing, setRefreshing] = useState(false);
  const styles = useMemo(() => createStyles(theme), [theme]);

  useEffect(() => {
    dispatch(fetchFavoriteMovies());
  }, [dispatch]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await dispatch(fetchFavoriteMovies());
    setRefreshing(false);
  }, [dispatch]);

  const handleMoviePress = (movie: Movie) => {
    router.push(`/movie/${movie.id}` as any);
  };

  const renderEmptyState = () => (
    <View style={styles.emptyStateContainer}>
      <View style={styles.iconCircle}>
        <Feather name="heart" size={56} color="#e91e63" />
      </View>
      <Text style={styles.emptyTitle}>No Favorites Yet</Text>
      <Text style={styles.emptySubtitle}>
        Start adding movies to your favorites by tapping the heart icon on any movie card
      </Text>
      <TouchableOpacity
        style={styles.exploreButton}
        onPress={() => router.push('/(tabs)' as any)}>
        <Feather name="compass" size={20} color="#fff" />
        <Text style={styles.exploreButtonText}>Explore Movies</Text>
      </TouchableOpacity>
    </View>
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <View>
        <Text style={styles.headerTitle}>My Favorites</Text>
        <Text style={styles.headerSubtitle}>
          {favoriteMovies.length} {favoriteMovies.length === 1 ? 'movie' : 'movies'} saved
        </Text>
      </View>
      {favoriteMovies.length > 0 && (
        <View style={styles.heartBadge}>
          <Feather name="heart" size={20} color="#e91e63" />
        </View>
      )}
    </View>
  );

  if (isLoading && !refreshing) {
    return (
      <ThemedView style={styles.container}>
        {renderHeader()}
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#e91e63" />
          <Text style={styles.loadingText}>Loading your favorites...</Text>
        </View>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      {renderHeader()}
      <FlatList
        data={favoriteMovies}
        numColumns={2}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => (
          <View
            style={[
              styles.movieCardWrapper,
              index % 2 === 0 ? styles.leftColumn : styles.rightColumn,
            ]}>
            <MovieCard movie={item} onPress={() => handleMoviePress(item)} />
          </View>
        )}
        contentContainerStyle={[
          styles.listContent,
          favoriteMovies.length === 0 && styles.emptyListContent,
        ]}
        ListEmptyComponent={renderEmptyState}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#e91e63']}
            tintColor="#e91e63"
          />
        }
      />
    </ThemedView>
  );
}

const createStyles = (theme: any) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: theme.cardBackground,
    borderBottomWidth: 1,
    borderBottomColor: theme.border,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: theme.text,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 15,
    color: theme.textSecondary,
    fontWeight: '400',
  },
  heartBadge: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: theme.isDarkMode ? '#3a2a3f' : '#fce4ec',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
  loadingText: {
    fontSize: 16,
    color: theme.textSecondary,
    fontWeight: '500',
  },
  listContent: {
    padding: 16,
    paddingTop: 12,
  },
  emptyListContent: {
    flexGrow: 1,
  },
  movieCardWrapper: {
    flex: 1,
    paddingBottom: 8,
  },
  leftColumn: {
    paddingRight: 8,
  },
  rightColumn: {
    paddingLeft: 8,
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingTop: 60,
  },
  iconCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: theme.isDarkMode ? '#3a2a3f' : '#fce4ec',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 28,
  },
  emptyTitle: {
    fontSize: 26,
    fontWeight: '700',
    color: theme.text,
    marginBottom: 12,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 15,
    color: theme.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 32,
  },
  exploreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: theme.pink,
    paddingHorizontal: 28,
    paddingVertical: 14,
    borderRadius: 12,
    elevation: 3,
    shadowColor: theme.pink,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  exploreButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
