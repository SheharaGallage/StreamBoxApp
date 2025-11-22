import { Feather } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet, TouchableOpacity, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { getMoviePosterUrl } from '@/services/api';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { Movie, toggleFavorite } from '@/store/slices/movieSlice';

interface MovieCardProps {
  movie: Movie;
  showStatus?: boolean;
}

/**
 * Movie Card Component
 * Displays movie information in a card format
 */
export function MovieCard({ movie, showStatus = true }: MovieCardProps) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const colorScheme = useColorScheme();
  const themeMode = useAppSelector((state) => state.theme.mode);
  const favorites = useAppSelector((state) => state.movie.favorites);

  const isFavorite = favorites.includes(movie.id);

  const handlePress = () => {
    router.push(`/movie/${movie.id}`);
  };

  const handleFavoritePress = (e: any) => {
    e.stopPropagation();
    dispatch(toggleFavorite(movie.id));
  };

  // Determine status based on release date and popularity
  const getStatus = () => {
    if (!showStatus) return null;
    
    const releaseDate = new Date(movie.release_date);
    const today = new Date();
    const daysDiff = Math.floor((releaseDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

    if (daysDiff > 0) {
      return { label: 'Upcoming', color: '#3b82f6' };
    }
    if (movie.popularity > 100) {
      return { label: 'Popular', color: '#ef4444' };
    }
    if (movie.vote_average > 7) {
      return { label: 'Top Rated', color: '#10b981' };
    }
    return { label: 'Active', color: Colors.light.tint };
  };

  const status = getStatus();
  const posterUrl = getMoviePosterUrl(movie.poster_path);

  return (
    <Pressable onPress={handlePress} style={styles.container}>
      <ThemedView style={styles.card}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: posterUrl }}
            style={styles.poster}
            contentFit="cover"
            transition={200}
            placeholder={{ blurhash: 'LKO2?U%2Tw=w]~RBVZRi};RPxuwH' }}
          />
          {status && (
            <View style={[styles.statusBadge, { backgroundColor: status.color }]}>
              <ThemedText style={styles.statusText}>{status.label}</ThemedText>
            </View>
          )}
          <TouchableOpacity
            style={[styles.favoriteButton, isFavorite && styles.favoriteButtonActive]}
            onPress={handleFavoritePress}
            activeOpacity={0.7}
          >
            <Feather
              name="heart"
              size={20}
              color={isFavorite ? '#ef4444' : '#fff'}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <ThemedText type="defaultSemiBold" style={styles.title} numberOfLines={2}>
            {movie.title}
          </ThemedText>
          
          <ThemedText style={styles.overview} numberOfLines={3}>
            {movie.overview || 'No description available'}
          </ThemedText>

          <View style={styles.footer}>
            <View style={styles.ratingContainer}>
              <Feather name="star" size={14} color="#fbbf24" />
              <ThemedText style={styles.rating}>
                {movie.vote_average.toFixed(1)}
              </ThemedText>
            </View>
            <ThemedText style={styles.year}>
              {new Date(movie.release_date).getFullYear()}
            </ThemedText>
          </View>
        </View>
      </ThemedView>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  card: {
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  imageContainer: {
    width: '100%',
    height: 250,
    position: 'relative',
  },
  poster: {
    width: '100%',
    height: '100%',
  },
  statusBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  statusText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '600',
  },
  favoriteButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  favoriteButtonActive: {
    backgroundColor: 'rgba(239, 68, 68, 0.2)',
  },
  content: {
    padding: 12,
  },
  title: {
    fontSize: 16,
    marginBottom: 8,
    lineHeight: 20,
  },
  overview: {
    fontSize: 13,
    opacity: 0.7,
    marginBottom: 12,
    lineHeight: 18,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  rating: {
    fontSize: 13,
    fontWeight: '600',
  },
  year: {
    fontSize: 13,
    opacity: 0.6,
  },
});

