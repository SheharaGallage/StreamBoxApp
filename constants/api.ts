/**
 * API constants and configuration
 */

// TMDB API Configuration
export const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
export const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';
export const TMDB_IMAGE_BASE_URL_ORIGINAL = 'https://image.tmdb.org/t/p/original';

// TMDB API Key
export const TMDB_API_KEY = 'b5df2d4387ec2528a7ac0aa4f5531d52';

// Dummy JSON API (for authentication)
export const DUMMY_JSON_BASE_URL = 'https://dummyjson.com';

/**
 * TMDB API endpoints
 */
export const TMDB_ENDPOINTS = {
  TRENDING: `${TMDB_BASE_URL}/trending/movie/day`,
  POPULAR: `${TMDB_BASE_URL}/movie/popular`,
  TOP_RATED: `${TMDB_BASE_URL}/movie/top_rated`,
  UPCOMING: `${TMDB_BASE_URL}/movie/upcoming`,
  MOVIE_DETAILS: (id: number) => `${TMDB_BASE_URL}/movie/${id}`,
  SEARCH: `${TMDB_BASE_URL}/search/movie`,
} as const;

/**
 * Dummy JSON API endpoints
 */
export const DUMMY_JSON_ENDPOINTS = {
  LOGIN: `${DUMMY_JSON_BASE_URL}/auth/login`,
  REGISTER: `${DUMMY_JSON_BASE_URL}/users/add`,
} as const;

