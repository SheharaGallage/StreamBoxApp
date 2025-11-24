import { API_CONFIG, IMAGE_SIZES } from '@/src/constants/Config';
import { Movie, MovieDetails, TMDBResponse } from '@/src/types';
import axios from 'axios';

const tmdbApi = axios.create({
  baseURL: API_CONFIG.TMDB_BASE_URL,
  params: {
    api_key: API_CONFIG.TMDB_API_KEY,
  },
});

export const TMDBService = {
  /**
   * Get trending movies
   */
  async getTrendingMovies(timeWindow: 'day' | 'week' = 'week'): Promise<Movie[]> {
    try {
      const response = await tmdbApi.get<TMDBResponse<Movie>>(`/trending/movie/${timeWindow}`);
      return response.data.results;
    } catch (error: any) {
      throw new Error(error.response?.data?.status_message || 'Failed to fetch trending movies');
    }
  },

  /**
   * Get popular movies
   */
  async getPopularMovies(page: number = 1): Promise<Movie[]> {
    try {
      const response = await tmdbApi.get<TMDBResponse<Movie>>('/movie/popular', {
        params: { page },
      });
      return response.data.results;
    } catch (error: any) {
      throw new Error(error.response?.data?.status_message || 'Failed to fetch popular movies');
    }
  },

  /**
   * Get upcoming movies
   */
  async getUpcomingMovies(page: number = 1): Promise<Movie[]> {
    try {
      const response = await tmdbApi.get<TMDBResponse<Movie>>('/movie/upcoming', {
        params: { page },
      });
      return response.data.results;
    } catch (error: any) {
      throw new Error(error.response?.data?.status_message || 'Failed to fetch upcoming movies');
    }
  },

  /**
   * Search movies by query
   */
  async searchMovies(query: string, page: number = 1): Promise<Movie[]> {
    try {
      const response = await tmdbApi.get<TMDBResponse<Movie>>('/search/movie', {
        params: { query, page },
      });
      return response.data.results;
    } catch (error: any) {
      throw new Error(error.response?.data?.status_message || 'Failed to search movies');
    }
  },

  /**
   * Get movie details by ID
   */
  async getMovieDetails(movieId: number): Promise<MovieDetails> {
    try {
      const response = await tmdbApi.get<MovieDetails>(`/movie/${movieId}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.status_message || 'Failed to fetch movie details');
    }
  },

  /**
   * Get full image URL
   */
  getImageUrl(path: string | null, size: keyof typeof IMAGE_SIZES = 'POSTER_MEDIUM'): string {
    if (!path) return 'https://via.placeholder.com/342x513?text=No+Image';
    return `${API_CONFIG.TMDB_IMAGE_BASE_URL}/${IMAGE_SIZES[size]}${path}`;
  },
};
