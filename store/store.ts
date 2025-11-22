import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import movieReducer from './slices/movieSlice';
import themeReducer from './slices/themeSlice';

/**
 * Redux store configuration
 */
export const store = configureStore({
  reducer: {
    auth: authReducer,
    movie: movieReducer,
    theme: themeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

