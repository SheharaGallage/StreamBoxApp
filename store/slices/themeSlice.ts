import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Storage, STORAGE_KEYS } from '@/utils/storage';

/**
 * Theme mode type
 */
export type ThemeMode = 'light' | 'dark' | 'auto';

/**
 * Theme state interface
 */
interface ThemeState {
  mode: ThemeMode;
}

/**
 * Initial state - load from storage or default to 'auto'
 */
const getInitialTheme = (): ThemeMode => {
  // This will be loaded asynchronously on app start
  return 'auto';
};

const initialState: ThemeState = {
  mode: getInitialTheme(),
};

/**
 * Theme slice
 */
const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setThemeMode: (state, action: PayloadAction<ThemeMode>) => {
      state.mode = action.payload;
      // Persist to storage
      Storage.setItem(STORAGE_KEYS.THEME, action.payload);
    },
    toggleTheme: (state) => {
      const newMode = state.mode === 'light' ? 'dark' : 'light';
      state.mode = newMode;
      // Persist to storage
      Storage.setItem(STORAGE_KEYS.THEME, newMode);
    },
    loadThemeFromStorage: (state, action: PayloadAction<ThemeMode | null>) => {
      state.mode = action.payload || 'auto';
    },
  },
});

export const { setThemeMode, toggleTheme, loadThemeFromStorage } = themeSlice.actions;
export default themeSlice.reducer;

