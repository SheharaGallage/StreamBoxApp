import axios from 'axios';
import {
  TMDB_BASE_URL,
  TMDB_API_KEY,
  TMDB_ENDPOINTS,
  TMDB_IMAGE_BASE_URL,
  TMDB_IMAGE_BASE_URL_ORIGINAL,
} from '@/constants/api';
import { Movie } from '@/store/slices/movieSlice';

/**
 * TMDB API client
 */
const tmdbApi = axios.create({
  baseURL: TMDB_BASE_URL,
  params: {
    api_key: TMDB_API_KEY,
  },
});

/**
 * API response interface for TMDB
 */
interface TMDBResponse<T> {
  results: T[];
  page: number;
  total_pages: number;
  total_results: number;
}

/**
 * Movie service functions
 */
export const movieService = {
  /**
   * Get trending movies
   */
  async getTrendingMovies(): Promise<Movie[]> {
    try {
      const response = await tmdbApi.get<TMDBResponse<Movie>>(TMDB_ENDPOINTS.TRENDING);
      return response.data.results;
    } catch (error) {
      console.error('Error fetching trending movies:', error);
      throw error;
    }
  },

  /**
   * Get popular movies
   */
  async getPopularMovies(): Promise<Movie[]> {
    try {
      const response = await tmdbApi.get<TMDBResponse<Movie>>(TMDB_ENDPOINTS.POPULAR);
      return response.data.results;
    } catch (error) {
      console.error('Error fetching popular movies:', error);
      throw error;
    }
  },

  /**
   * Get top rated movies
   */
  async getTopRatedMovies(): Promise<Movie[]> {
    try {
      const response = await tmdbApi.get<TMDBResponse<Movie>>(TMDB_ENDPOINTS.TOP_RATED);
      return response.data.results;
    } catch (error) {
      console.error('Error fetching top rated movies:', error);
      throw error;
    }
  },

  /**
   * Get upcoming movies
   */
  async getUpcomingMovies(): Promise<Movie[]> {
    try {
      const response = await tmdbApi.get<TMDBResponse<Movie>>(TMDB_ENDPOINTS.UPCOMING);
      return response.data.results;
    } catch (error) {
      console.error('Error fetching upcoming movies:', error);
      throw error;
    }
  },

  /**
   * Get movie details by ID
   */
  async getMovieDetails(movieId: number): Promise<Movie> {
    try {
      const response = await tmdbApi.get<Movie>(TMDB_ENDPOINTS.MOVIE_DETAILS(movieId));
      return response.data;
    } catch (error) {
      console.error('Error fetching movie details:', error);
      throw error;
    }
  },

  /**
   * Search movies
   */
  async searchMovies(query: string): Promise<Movie[]> {
    try {
      const response = await tmdbApi.get<TMDBResponse<Movie>>(TMDB_ENDPOINTS.SEARCH, {
        params: { query },
      });
      return response.data.results;
    } catch (error) {
      console.error('Error searching movies:', error);
      throw error;
    }
  },
};

/**
 * Get full image URL for TMDB poster
 */
export const getMoviePosterUrl = (posterPath: string | null): string => {
  if (!posterPath) {
    return 'https://via.placeholder.com/500x750?text=No+Image';
  }
  return `${TMDB_IMAGE_BASE_URL}${posterPath}`;
};

/**
 * Get full image URL for TMDB backdrop
 */
export const getMovieBackdropUrl = (backdropPath: string | null): string => {
  if (!backdropPath) {
    return 'https://via.placeholder.com/1280x720?text=No+Image';
  }
  return `${TMDB_IMAGE_BASE_URL_ORIGINAL}${backdropPath}`;
};

