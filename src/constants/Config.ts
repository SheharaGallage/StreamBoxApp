export const API_CONFIG = {
  // Dummy Auth API
  AUTH_BASE_URL: 'https://dummyjson.com',
  
  // TMDB API (get your free API key from themoviedb.org)
  TMDB_BASE_URL: 'https://api.themoviedb.org/3',
  TMDB_API_KEY: 'b5df2d4387ec2528a7ac0aa4f5531d52',
  TMDB_IMAGE_BASE_URL: 'https://image.tmdb.org/t/p',
};

export const IMAGE_SIZES = {
  POSTER_SMALL: 'w185',
  POSTER_MEDIUM: 'w342',
  POSTER_LARGE: 'w500',
  BACKDROP_SMALL: 'w300',
  BACKDROP_LARGE: 'w780',
  ORIGINAL: 'original',
};

export const STORAGE_KEYS = {
  AUTH_TOKEN: '@streambox_auth_token',
  USER_DATA: '@streambox_user_data',
  FAVORITES: '@streambox_favorites',
};

export const APP_CONFIG = {
  APP_NAME: 'StreamBox',
  VERSION: '1.0.0',
  ITEMS_PER_PAGE: 20,
};
