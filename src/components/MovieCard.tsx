import { TMDBService } from '@/src/services/api/tmdb';
import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
import { addFavorite, removeFavorite } from '@/src/store/slices/favoritesSlice';
import { Movie } from '@/src/types';
import { Feather } from '@expo/vector-icons';
import React from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface MovieCardProps {
  movie: Movie;
  onPress: () => void;
}

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 48) / 2; // 2 columns with padding

export default function MovieCard({ movie, onPress }: MovieCardProps) {
  const dispatch = useAppDispatch();
  const { favoriteIds } = useAppSelector((state) => state.favorites);
  const isFavorite = favoriteIds.includes(movie.id);

  const handleFavoriteToggle = () => {
    if (isFavorite) {
      dispatch(removeFavorite(movie.id));
    } else {
      dispatch(addFavorite(movie.id));
    }
  };

  const posterUrl = TMDBService.getImageUrl(movie.poster_path, 'POSTER_MEDIUM');
  const rating = movie.vote_average.toFixed(1);

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: posterUrl }} style={styles.poster} resizeMode="cover" />
        
        {/* Favorite Button */}
        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={handleFavoriteToggle}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
          <Feather
            name="heart"
            size={20}
            color={isFavorite ? '#ff4444' : '#fff'}
            fill={isFavorite ? '#ff4444' : 'transparent'}
          />
        </TouchableOpacity>

        {/* Rating Badge */}
        <View style={styles.ratingBadge}>
          <Feather name="star" size={12} color="#FFD700" />
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

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    marginBottom: 20,
  },
  imageContainer: {
    width: '100%',
    height: CARD_WIDTH * 1.5,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#e0e0e0',
    position: 'relative',
  },
  poster: {
    width: '100%',
    height: '100%',
  },
  favoriteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 20,
    padding: 6,
  },
  ratingBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  info: {
    marginTop: 8,
    gap: 4,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1a1a1a',
    lineHeight: 18,
  },
  releaseDate: {
    fontSize: 12,
    color: '#666',
  },
});
