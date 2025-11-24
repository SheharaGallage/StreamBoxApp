import { useTheme } from '@/src/hooks/useTheme';
import { useAppDispatch, useAppSelector } from '@/src/redux/hooks';
import { addFavorite, removeFavorite } from '@/src/redux/slices/favoritesSlice';
import { fetchMovieDetails } from '@/src/redux/slices/moviesSlice';
import { TMDBService } from '@/src/services/api/tmdb';
import { formatRuntime } from '@/src/utils/helpers';
import { Feather } from '@expo/vector-icons';
import { Stack, router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useMemo } from 'react';
import {
    ActivityIndicator,
    Dimensions,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

const { width, height } = Dimensions.get('window');

export default function MovieDetailsScreen() {
  const { id } = useLocalSearchParams();
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const { selectedMovie, isLoading, error } = useAppSelector((state) => state.movies);
  const { favoriteIds } = useAppSelector((state) => state.favorites);

  const isFavorite = selectedMovie ? favoriteIds.includes(selectedMovie.id) : false;
  const styles = useMemo(() => createStyles(theme), [theme]);

  useEffect(() => {
    if (id) {
      dispatch(fetchMovieDetails(Number(id)));
    }
  }, [id]);

  const handleFavoriteToggle = () => {
    if (selectedMovie) {
      if (isFavorite) {
        dispatch(removeFavorite(selectedMovie.id));
      } else {
        dispatch(addFavorite(selectedMovie.id));
      }
    }
  };

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <Stack.Screen options={{ headerShown: false }} />
        <ActivityIndicator size="large" color={theme.primary} />
      </View>
    );
  }

  if (error || !selectedMovie) {
    return (
      <View style={styles.centered}>
        <Stack.Screen options={{ headerShown: false }} />
        <Text style={styles.errorText}>Failed to load movie details</Text>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const backdropUrl = TMDBService.getImageUrl(selectedMovie.backdrop_path, 'BACKDROP_LARGE');
  const posterUrl = TMDBService.getImageUrl(selectedMovie.poster_path, 'POSTER_LARGE');

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.backdropContainer}>
          <Image source={{ uri: backdropUrl }} style={styles.backdrop} resizeMode="cover" />
          <View style={styles.backdropGradient} />
          
          <TouchableOpacity style={styles.headerBackButton} onPress={() => router.back()}>
            <Feather name="arrow-left" size={24} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.headerFavoriteButton} onPress={handleFavoriteToggle}>
            <Feather
              name="heart"
              size={24}
              color={isFavorite ? '#ff4444' : '#fff'}
              fill={isFavorite ? '#ff4444' : 'transparent'}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <View style={styles.headerContent}>
            <Image source={{ uri: posterUrl }} style={styles.poster} resizeMode="cover" />
            
            <View style={styles.titleContainer}>
              <Text style={styles.title}>{selectedMovie.title}</Text>
              
              {selectedMovie.tagline ? (
                <Text style={styles.tagline}>{selectedMovie.tagline}</Text>
              ) : null}

              <View style={styles.metaRow}>
                <View style={styles.metaItem}>
                  <Feather name="star" size={16} color="#FFD700" fill="#FFD700" />
                  <Text style={styles.metaText}>{selectedMovie.vote_average.toFixed(1)}</Text>
                </View>
                <View style={styles.metaItem}>
                  <Feather name="calendar" size={14} color="#666" />
                  <Text style={styles.metaText}>
                    {selectedMovie.release_date
                      ? new Date(selectedMovie.release_date).getFullYear()
                      : 'N/A'}
                  </Text>
                </View>
                {selectedMovie.runtime ? (
                  <View style={styles.metaItem}>
                    <Feather name="clock" size={14} color="#666" />
                    <Text style={styles.metaText}>{formatRuntime(selectedMovie.runtime)}</Text>
                  </View>
                ) : null}
              </View>

              {selectedMovie.genres && selectedMovie.genres.length > 0 && (
                <View style={styles.genresContainer}>
                  {selectedMovie.genres.map((genre) => (
                    <View key={genre.id} style={styles.genreBadge}>
                      <Text style={styles.genreText}>{genre.name}</Text>
                    </View>
                  ))}
                </View>
              )}
            </View>
          </View>

          {selectedMovie.status && (
            <View style={styles.section}>
              <View style={styles.statusBadge}>
                <Text style={styles.statusText}>{selectedMovie.status}</Text>
              </View>
            </View>
          )}

          {selectedMovie.overview && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Overview</Text>
              <Text style={styles.overview}>{selectedMovie.overview}</Text>
            </View>
          )}

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Details</Text>
            
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Original Language</Text>
              <Text style={styles.detailValue}>
                {selectedMovie.original_language.toUpperCase()}
              </Text>
            </View>

            {selectedMovie.budget > 0 && (
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Budget</Text>
                <Text style={styles.detailValue}>
                  ${selectedMovie.budget.toLocaleString()}
                </Text>
              </View>
            )}

            {selectedMovie.revenue > 0 && (
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Revenue</Text>
                <Text style={styles.detailValue}>
                  ${selectedMovie.revenue.toLocaleString()}
                </Text>
              </View>
            )}

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Popularity</Text>
              <Text style={styles.detailValue}>{selectedMovie.popularity.toFixed(0)}</Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Vote Count</Text>
              <Text style={styles.detailValue}>{selectedMovie.vote_count.toLocaleString()}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const createStyles = (theme: any) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.background,
  },
  backdropContainer: {
    width: width,
    height: height * 0.35,
    position: 'relative',
  },
  backdrop: {
    width: '100%',
    height: '100%',
  },
  backdropGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
    backgroundColor: theme.isDarkMode ? 'rgba(18, 18, 18, 0.9)' : 'rgba(255, 255, 255, 0.9)',
  },
  headerBackButton: {
    position: 'absolute',
    top: 50,
    left: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 24,
    padding: 8,
  },
  headerFavoriteButton: {
    position: 'absolute',
    top: 50,
    right: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 24,
    padding: 8,
  },
  content: {
    marginTop: -60,
    paddingHorizontal: 16,
  },
  headerContent: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 24,
  },
  poster: {
    width: 120,
    height: 180,
    borderRadius: 12,
    backgroundColor: theme.cardBackground,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: theme.text,
    marginBottom: 4,
  },
  tagline: {
    fontSize: 14,
    fontStyle: 'italic',
    color: theme.textSecondary,
    marginBottom: 12,
  },
  metaRow: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 12,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 14,
    color: theme.textSecondary,
    fontWeight: '500',
  },
  genresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  genreBadge: {
    backgroundColor: theme.isDarkMode ? 'rgba(33, 150, 243, 0.2)' : '#E3F2FD',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  genreText: {
    fontSize: 12,
    color: theme.primary,
    fontWeight: '600',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: theme.text,
    marginBottom: 12,
  },
  statusBadge: {
    backgroundColor: '#4CAF50',
    alignSelf: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  statusText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  overview: {
    fontSize: 15,
    lineHeight: 24,
    color: theme.text,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: theme.border,
  },
  detailLabel: {
    fontSize: 14,
    color: theme.textSecondary,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.text,
  },
  errorText: {
    fontSize: 16,
    color: theme.error,
    marginBottom: 16,
  },
  backButton: {
    backgroundColor: theme.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});
