import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Storage, STORAGE_KEYS } from '@/utils/storage';

/**
 * User interface
 */
export interface User {
  id: number;
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
  image?: string;
}

/**
 * Auth state interface
 */
interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

/**
 * Initial state
 */
const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

/**
 * Login credentials interface
 */
export interface LoginCredentials {
  username: string;
  password: string;
}

/**
 * Register data interface
 */
export interface RegisterData {
  username: string;
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

/**
 * Dummy login API call
 * Using dummyjson.com for authentication
 */
export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials: LoginCredentials, { rejectWithValue }) => {
    try {
      // Using dummyjson.com/auth/login endpoint
      const response = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: credentials.username,
          password: credentials.password,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Login failed');
      }

      const data = await response.json();
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Login failed');
    }
  }
);

/**
 * Dummy register API call
 * Using dummyjson.com/users/add endpoint
 */
export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData: RegisterData, { rejectWithValue }) => {
    try {
      // Using dummyjson.com/users/add endpoint
      const response = await fetch('https://dummyjson.com/users/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: userData.username,
          email: userData.email,
          password: userData.password,
          firstName: userData.firstName || userData.username,
          lastName: userData.lastName || '',
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Registration failed');
      }

      const data = await response.json();
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Registration failed');
    }
  }
);

/**
 * Load user from storage on app start
 */
export const loadUserFromStorage = createAsyncThunk(
  'auth/loadUser',
  async () => {
    try {
      const [user, token] = await Promise.all([
        Storage.getItem<User>(STORAGE_KEYS.USER_DATA),
        Storage.getItem<string>(STORAGE_KEYS.AUTH_TOKEN),
      ]);

      return { user, token };
    } catch (error) {
      return { user: null, token: null };
    }
  }
);

/**
 * Auth slice
 */
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
      // Clear storage
      Storage.removeItem(STORAGE_KEYS.USER_DATA);
      Storage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Login
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.token = action.payload.token || `token_${Date.now()}`;
        state.isAuthenticated = true;
        state.error = null;

        // Save to storage
        Storage.setItem(STORAGE_KEYS.USER_DATA, action.payload);
        Storage.setItem(STORAGE_KEYS.AUTH_TOKEN, state.token);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.isAuthenticated = false;
      });

    // Register
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.token = `token_${Date.now()}`;
        state.isAuthenticated = true;
        state.error = null;

        // Save to storage
        Storage.setItem(STORAGE_KEYS.USER_DATA, action.payload);
        Storage.setItem(STORAGE_KEYS.AUTH_TOKEN, state.token);
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.isAuthenticated = false;
      });

    // Load user from storage
    builder
      .addCase(loadUserFromStorage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loadUserFromStorage.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload.user && action.payload.token) {
          state.user = action.payload.user;
          state.token = action.payload.token;
          state.isAuthenticated = true;
        }
      })
      .addCase(loadUserFromStorage.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;

