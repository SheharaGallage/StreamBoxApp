import { API_CONFIG } from '@/src/constants/Config';
import { AuthResponse, LoginCredentials, RegisterData } from '@/src/types';
import axios from 'axios';

const authApi = axios.create({
  baseURL: API_CONFIG.AUTH_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const AuthService = {
  /**
   * Login user with username and password
   * Uses dummyjson.com auth endpoint
   */
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await authApi.post('/auth/login', credentials);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  },

  /**
   * Register new user
   * Note: dummyjson doesn't have real registration, so we simulate it
   * In a real app, this would call a proper registration endpoint
   */
  async register(data: RegisterData): Promise<AuthResponse> {
    try {
      // For demo purposes, we'll use a dummy user response
      // In production, you'd call a real registration API
      
      // Simulating successful registration
      const mockResponse: AuthResponse = {
        id: Math.floor(Math.random() * 1000),
        username: data.username,
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        gender: '',
        image: '',
        token: 'mock-token-' + Date.now(), // Mock token
      };
      
      // You can also test with dummyjson login after "registration"
      // For now, returning mock data
      return mockResponse;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Registration failed');
    }
  },

  /**
   * Get current user profile
   */
  async getCurrentUser(token: string): Promise<AuthResponse> {
    try {
      const response = await authApi.get('/auth/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to get user');
    }
  },
};
