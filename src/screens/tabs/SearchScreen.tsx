import MovieCard from '@/src/components/MovieCard';
import { ThemedView } from '@/src/components/themed-view';
import { useTheme } from '@/src/hooks/useTheme';
import { useAppDispatch, useAppSelector } from '@/src/redux/hooks';
import { clearSearchResults, searchMovies } from '@/src/redux/slices/moviesSlice';
import { Movie } from '@/src/types';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useCallback, useMemo, useState } from 'react';
import {
    ActivityIndicator,
    Animated,
    FlatList,
    Keyboard,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

export default function SearchScreen() {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const { searchResults, isLoading } = useAppSelector((state) => state.movies);
  const [searchQuery, setSearchQuery] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const [focusAnim] = useState(new Animated.Value(0));
  const styles = useMemo(() => createStyles(theme), [theme]);

  const handleSearch = useCallback(async () => {
    if (searchQuery.trim().length < 2) return;

    Keyboard.dismiss();
    setHasSearched(true);
    await dispatch(searchMovies(searchQuery.trim()));
  }, [searchQuery, dispatch]);

  const handleClear = () => {
    setSearchQuery('');
    setHasSearched(false);
    dispatch(clearSearchResults());
  };

  const handleMoviePress = (movie: Movie) => {
    router.push(`/movie/${movie.id}` as any);
  };

  const handleFocus = () => {
    Animated.spring(focusAnim, {
      toValue: 1,
      useNativeDriver: false,
      tension: 40,
      friction: 7,
    }).start();
  };

  const handleBlur = () => {
    Animated.spring(focusAnim, {
      toValue: 0,
      useNativeDriver: false,
    }).start();
  };

  const borderColor = focusAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['#e0e0e0', '#2196F3'],
  });

  const renderPopularSearches = () => {
    const popularSearches = ['Avengers', 'Spider-Man', 'Batman', 'Star Wars', 'Inception'];

    return (
      <View style={styles.popularContainer}>
        <Text style={styles.popularTitle}>Popular Searches</Text>
        <View style={styles.popularChips}>
          {popularSearches.map((term) => (
            <TouchableOpacity
              key={term}
              style={styles.chip}
              onPress={() => {
                setSearchQuery(term);
                setHasSearched(true);
                dispatch(searchMovies(term));
              }}>
              <Feather name="trending-up" size={14} color="#2196F3" />
              <Text style={styles.chipText}>{term}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };

  const renderEmptyState = () => {
    if (!hasSearched) {
      return (
        <View style={styles.emptyStateContainer}>
          <View style={styles.iconCircle}>
            <Feather name="search" size={48} color="#2196F3" />
          </View>
          <Text style={styles.emptyTitle}>Discover Movies</Text>
          <Text style={styles.emptySubtitle}>
            Search for your favorite movies and explore thousands of titles
          </Text>
          {renderPopularSearches()}
        </View>
      );
    }

    if (searchResults.length === 0) {
      return (
        <View style={styles.emptyStateContainer}>
          <View style={styles.iconCircle}>
            <Feather name="film" size={48} color="#ff9800" />
          </View>
          <Text style={styles.emptyTitle}>No Results Found</Text>
          <Text style={styles.emptySubtitle}>
            We couldn't find any movies matching "{searchQuery}"
          </Text>
          <TouchableOpacity style={styles.retryButton} onPress={handleClear}>
            <Text style={styles.retryButtonText}>Try Another Search</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return null;
  };

  return (
    <ThemedView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Search</Text>
        <Text style={styles.headerSubtitle}>Find your next favorite movie</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Animated.View style={[styles.searchInputContainer, { borderColor }]}>
          <Feather name="search" size={22} color="#2196F3" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for movies..."
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={handleSearch}
            onFocus={handleFocus}
            onBlur={handleBlur}
            returnKeyType="search"
            autoCapitalize="none"
            autoCorrect={false}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={handleClear} style={styles.clearButton}>
              <View style={styles.clearButtonCircle}>
                <Feather name="x" size={16} color="#666" />
              </View>
            </TouchableOpacity>
          )}
        </Animated.View>
      </View>

      {/* Results Count */}
      {hasSearched && !isLoading && searchResults.length > 0 && (
        <View style={styles.resultsHeader}>
          <Text style={styles.resultsCount}>
            {searchResults.length} {searchResults.length === 1 ? 'result' : 'results'} found
          </Text>
        </View>
      )}

      {/* Loading Indicator */}
      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#2196F3" />
          <Text style={styles.loadingText}>Searching movies...</Text>
        </View>
      )}

      {/* Results */}
      {!isLoading && (
        <FlatList
          data={searchResults}
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
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={renderEmptyState}
          showsVerticalScrollIndicator={false}
        />
      )}
    </ThemedView>
  );
}

const createStyles = (theme: any) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: theme.cardBackground,
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
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: theme.cardBackground,
    borderBottomWidth: 1,
    borderBottomColor: theme.border,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.background,
    borderRadius: 16,
    paddingHorizontal: 16,
    borderWidth: 2,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    height: 52,
    fontSize: 16,
    color: theme.text,
    fontWeight: '500',
  },
  clearButton: {
    padding: 4,
  },
  clearButtonCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: theme.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resultsHeader: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: theme.cardBackground,
  },
  resultsCount: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.primary,
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
    paddingTop: 60,
    paddingHorizontal: 32,
  },
  iconCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: theme.isDarkMode ? '#1e3a5f' : '#f0f7ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  emptyTitle: {
    fontSize: 24,
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
  popularContainer: {
    width: '100%',
    marginTop: 16,
  },
  popularTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.text,
    marginBottom: 16,
  },
  popularChips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: theme.isDarkMode ? '#1e3a5f' : '#E3F2FD',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: theme.isDarkMode ? '#3a5f8f' : '#BBDEFB',
  },
  chipText: {
    fontSize: 14,
    color: theme.isDarkMode ? '#64b5f6' : '#1976D2',
    fontWeight: '600',
  },
  retryButton: {
    backgroundColor: theme.primary,
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 8,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
