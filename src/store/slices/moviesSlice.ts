import { TMDBService } from '@/src/services/api/tmdb';
import { Movie, MovieDetails } from '@/src/types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface MoviesState {
  trending: Movie[];
  popular: Movie[];
  upcoming: Movie[];
  searchResults: Movie[];
  selectedMovie: MovieDetails | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: MoviesState = {
  trending: [],
  popular: [],
  upcoming: [],
  searchResults: [],
  selectedMovie: null,
  isLoading: false,
  error: null,
};

// Async thunks
export const fetchTrendingMovies = createAsyncThunk(
  'movies/fetchTrending',
  async (_, { rejectWithValue }) => {
    try {
      return await TMDBService.getTrendingMovies();
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchPopularMovies = createAsyncThunk(
  'movies/fetchPopular',
  async (_, { rejectWithValue }) => {
    try {
      return await TMDBService.getPopularMovies();
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchUpcomingMovies = createAsyncThunk(
  'movies/fetchUpcoming',
  async (_, { rejectWithValue }) => {
    try {
      return await TMDBService.getUpcomingMovies();
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const searchMovies = createAsyncThunk(
  'movies/search',
  async (query: string, { rejectWithValue }) => {
    try {
      if (!query.trim()) return [];
      return await TMDBService.searchMovies(query);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchMovieDetails = createAsyncThunk(
  'movies/fetchDetails',
  async (movieId: number, { rejectWithValue }) => {
    try {
      return await TMDBService.getMovieDetails(movieId);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSearchResults: (state) => {
      state.searchResults = [];
    },
    clearSelectedMovie: (state) => {
      state.selectedMovie = null;
    },
  },
  extraReducers: (builder) => {
    // Trending movies
    builder
      .addCase(fetchTrendingMovies.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTrendingMovies.fulfilled, (state, action) => {
        state.isLoading = false;
        state.trending = action.payload;
      })
      .addCase(fetchTrendingMovies.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Popular movies
    builder
      .addCase(fetchPopularMovies.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPopularMovies.fulfilled, (state, action) => {
        state.isLoading = false;
        state.popular = action.payload;
      })
      .addCase(fetchPopularMovies.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Upcoming movies
    builder
      .addCase(fetchUpcomingMovies.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUpcomingMovies.fulfilled, (state, action) => {
        state.isLoading = false;
        state.upcoming = action.payload;
      })
      .addCase(fetchUpcomingMovies.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Search movies
    builder
      .addCase(searchMovies.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(searchMovies.fulfilled, (state, action) => {
        state.isLoading = false;
        state.searchResults = action.payload;
      })
      .addCase(searchMovies.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Movie details
    builder
      .addCase(fetchMovieDetails.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchMovieDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedMovie = action.payload;
      })
      .addCase(fetchMovieDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, clearSearchResults, clearSelectedMovie } = moviesSlice.actions;
export default moviesSlice.reducer;
