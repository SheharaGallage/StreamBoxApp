import { useTheme } from '@/src/hooks/useTheme';
import { useAppDispatch, useAppSelector } from '@/src/redux/hooks';
import { addFavorite, removeFavorite } from '@/src/redux/slices/favoritesSlice';
import { TMDBService } from '@/src/services/api/tmdb';
import { Movie } from '@/src/types';
import { Feather } from '@expo/vector-icons';
import React, { useMemo } from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface MovieCardProps {
  movie: Movie;
  onPress: () => void;
}

const { width } = Dimensions.get('window');
const CARD_WIDTH = 150;

export default function MovieCard({ movie, onPress }: MovieCardProps) {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const { favoriteIds } = useAppSelector((state) => state.favorites);
  const isFavorite = favoriteIds.includes(movie.id);
  const styles = useMemo(() => createStyles(theme), [theme]);

  const handleFavoriteToggle = (e: any) => {
    e.stopPropagation();
    if (isFavorite) {
      dispatch(removeFavorite(movie.id));
    } else {
      dispatch(addFavorite(movie.id));
    }
  };

  const posterUrl = TMDBService.getImageUrl(movie.poster_path, 'POSTER_MEDIUM');
  const rating = movie.vote_average.toFixed(1);

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: posterUrl }} style={styles.poster} resizeMode="cover" />
        
        {/* Gradient Overlay */}
        <View style={styles.gradientOverlay} />
        
        {/* Favorite Button */}
        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={handleFavoriteToggle}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
          <Feather
            name="heart"
            size={18}
            color={isFavorite ? '#ff4444' : '#fff'}
            fill={isFavorite ? '#ff4444' : 'transparent'}
          />
        </TouchableOpacity>

        {/* Rating Badge */}
        <View style={styles.ratingBadge}>
          <Feather name="star" size={10} color="#FFD700" fill="#FFD700" />
          <Text style={styles.ratingText}>{rating}</Text>
        </View>
      </View>

      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>
          {movie.title}
        </Text>
        <Text style={styles.releaseDate}>
          {movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const createStyles = (theme: any) => StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    marginBottom: 16,
  },
  imageContainer: {
    width: CARD_WIDTH,
    height: CARD_WIDTH * 1.5,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: theme.border,
    position: 'relative',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  poster: {
    width: '100%',
    height: '100%',
  },
  gradientOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: 'transparent',
  },
  favoriteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 18,
    padding: 8,
    zIndex: 10,
    elevation: 5,
  },
  ratingBadge: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '700',
  },
  info: {
    marginTop: 8,
    gap: 4,
  },
  title: {
    fontSize: 13,
    fontWeight: '600',
    color: theme.text,
    lineHeight: 17,
  },
  releaseDate: {
    fontSize: 11,
    color: theme.textSecondary,
    fontWeight: '500',
  },
});
