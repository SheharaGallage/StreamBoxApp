import { useTheme } from '@/src/hooks/useTheme';
import { Movie } from '@/src/types';
import React, { useMemo } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import MovieCard from './MovieCard';

interface CategoryRowProps {
  title: string;
  movies: Movie[];
  onMoviePress: (movie: Movie) => void;
}

export default function CategoryRow({ title, movies, onMoviePress }: CategoryRowProps) {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  
  if (movies.length === 0) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <FlatList
        data={movies}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.cardWrapper}>
            <MovieCard movie={item} onPress={() => onMoviePress(item)} />
          </View>
        )}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const createStyles = (theme: any) => StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: theme.text,
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingVertical: 4,
  },
  cardWrapper: {
    marginRight: 16,
  },
});
