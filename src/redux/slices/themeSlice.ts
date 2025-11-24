import { StorageService } from '@/src/services/storage/asyncStorage';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface ThemeState {
  isDarkMode: boolean;
}

const initialState: ThemeState = {
  isDarkMode: false,
};

// Load saved theme preference
export const loadThemePreference = createAsyncThunk(
  'theme/loadPreference',
  async () => {
    const isDark = await StorageService.getThemePreference();
    return isDark;
  }
);

// Save theme preference
export const toggleTheme = createAsyncThunk(
  'theme/toggle',
  async (isDark: boolean) => {
    await StorageService.setThemePreference(isDark);
    return isDark;
  }
);

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadThemePreference.fulfilled, (state, action) => {
        state.isDarkMode = action.payload;
      })
      .addCase(toggleTheme.fulfilled, (state, action) => {
        state.isDarkMode = action.payload;
      });
  },
});

export default themeSlice.reducer;
