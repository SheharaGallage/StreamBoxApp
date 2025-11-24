import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import favoritesReducer from './slices/favoritesSlice';
import moviesReducer from './slices/moviesSlice';
import themeReducer from './slices/themeSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    movies: moviesReducer,
    favorites: favoritesReducer,
    theme: themeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
