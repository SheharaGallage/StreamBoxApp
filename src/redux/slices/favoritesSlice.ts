import { TMDBService } from '@/src/services/api/tmdb';
import { StorageService } from '@/src/services/storage/asyncStorage';
import { Movie } from '@/src/types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface FavoritesState {
  favoriteIds: number[];
  favoriteMovies: Movie[];
  isLoading: boolean;
  error: string | null;
}

const initialState: FavoritesState = {
  favoriteIds: [],
  favoriteMovies: [],
  isLoading: false,
  error: null,
};

// Async thunks
export const loadFavorites = createAsyncThunk(
  'favorites/load',
  async (_, { rejectWithValue }) => {
    try {
      const favoriteIds = await StorageService.getFavorites();
      return favoriteIds;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const addFavorite = createAsyncThunk(
  'favorites/add',
  async (movieId: number, { rejectWithValue }) => {
    try {
      await StorageService.addFavorite(movieId);
      return movieId;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const removeFavorite = createAsyncThunk(
  'favorites/remove',
  async (movieId: number, { rejectWithValue }) => {
    try {
      await StorageService.removeFavorite(movieId);
      return movieId;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchFavoriteMovies = createAsyncThunk(
  'favorites/fetchMovies',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as { favorites: FavoritesState };
      const { favoriteIds } = state.favorites;
      
      if (favoriteIds.length === 0) return [];
      
      // Fetch movie details for each favorite
      const moviePromises = favoriteIds.map(id => TMDBService.getMovieDetails(id));
      const movies = await Promise.all(moviePromises);
      
      return movies;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Load favorites
    builder
      .addCase(loadFavorites.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loadFavorites.fulfilled, (state, action) => {
        state.isLoading = false;
        state.favoriteIds = action.payload;
      })
      .addCase(loadFavorites.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Add favorite
    builder
      .addCase(addFavorite.fulfilled, (state, action) => {
        if (!state.favoriteIds.includes(action.payload)) {
          state.favoriteIds.push(action.payload);
        }
      })
      .addCase(addFavorite.rejected, (state, action) => {
        state.error = action.payload as string;
      });

    // Remove favorite
    builder
      .addCase(removeFavorite.fulfilled, (state, action) => {
        state.favoriteIds = state.favoriteIds.filter(id => id !== action.payload);
        state.favoriteMovies = state.favoriteMovies.filter(movie => movie.id !== action.payload);
      })
      .addCase(removeFavorite.rejected, (state, action) => {
        state.error = action.payload as string;
      });

    // Fetch favorite movies
    builder
      .addCase(fetchFavoriteMovies.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchFavoriteMovies.fulfilled, (state, action) => {
        state.isLoading = false;
        state.favoriteMovies = action.payload;
      })
      .addCase(fetchFavoriteMovies.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError } = favoritesSlice.actions;
export default favoritesSlice.reducer;
