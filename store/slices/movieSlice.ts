import { movieService } from '@/services/api';
import { Storage, STORAGE_KEYS } from '@/utils/storage';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

/**
 * Movie interface
 */
export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
}

/**
 * Movie state interface
 */
interface MovieState {
  movies: Movie[];
  favorites: number[]; // Array of movie IDs
  selectedMovie: Movie | null;
  isLoading: boolean;
  error: string | null;
}

/**
 * Initial state
 */
const initialState: MovieState = {
  movies: [],
  favorites: [],
  selectedMovie: null,
  isLoading: false,
  error: null,
};

/**
 * Fetch trending movies async thunk
 */
export const fetchTrendingMovies = createAsyncThunk(
  'movie/fetchTrending',
  async (_, { rejectWithValue }) => {
    try {
      const movies = await movieService.getTrendingMovies();
      return movies;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch trending movies');
    }
  }
);

/**
 * Fetch popular movies async thunk
 */
export const fetchPopularMovies = createAsyncThunk(
  'movie/fetchPopular',
  async (_, { rejectWithValue }) => {
    try {
      const movies = await movieService.getPopularMovies();
      return movies;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch popular movies');
    }
  }
);

/**
 * Fetch movie details async thunk
 */
export const fetchMovieDetails = createAsyncThunk(
  'movie/fetchDetails',
  async (movieId: number, { rejectWithValue }) => {
    try {
      const movie = await movieService.getMovieDetails(movieId);
      return movie;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch movie details');
    }
  }
);

/**
 * Movie slice
 */
const movieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {
    setMovies: (state, action: PayloadAction<Movie[]>) => {
      state.movies = action.payload;
    },
    setSelectedMovie: (state, action: PayloadAction<Movie | null>) => {
      state.selectedMovie = action.payload;
    },
    addToFavorites: (state, action: PayloadAction<number>) => {
      if (!state.favorites.includes(action.payload)) {
        state.favorites.push(action.payload);
        // Persist to storage
        Storage.setItem(STORAGE_KEYS.FAVORITES, state.favorites);
      }
    },
    removeFromFavorites: (state, action: PayloadAction<number>) => {
      state.favorites = state.favorites.filter((id) => id !== action.payload);
      // Persist to storage
      Storage.setItem(STORAGE_KEYS.FAVORITES, state.favorites);
    },
    toggleFavorite: (state, action: PayloadAction<number>) => {
      const movieId = action.payload;
      const index = state.favorites.indexOf(movieId);
      if (index > -1) {
        state.favorites.splice(index, 1);
      } else {
        state.favorites.push(movieId);
      }
      // Persist to storage
      Storage.setItem(STORAGE_KEYS.FAVORITES, state.favorites);
    },
    setFavorites: (state, action: PayloadAction<number[]>) => {
      state.favorites = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Fetch trending movies
    builder
      .addCase(fetchTrendingMovies.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTrendingMovies.fulfilled, (state, action) => {
        state.isLoading = false;
        state.movies = action.payload;
        state.error = null;
      })
      .addCase(fetchTrendingMovies.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Fetch popular movies
    builder
      .addCase(fetchPopularMovies.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPopularMovies.fulfilled, (state, action) => {
        state.isLoading = false;
        state.movies = action.payload;
        state.error = null;
      })
      .addCase(fetchPopularMovies.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Fetch movie details
    builder
      .addCase(fetchMovieDetails.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchMovieDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedMovie = action.payload;
        state.error = null;
      })
      .addCase(fetchMovieDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  setMovies,
  setSelectedMovie,
  addToFavorites,
  removeFromFavorites,
  toggleFavorite,
  setFavorites,
  setLoading,
  setError,
} = movieSlice.actions;

export default movieSlice.reducer;

