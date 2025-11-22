import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Storage utility functions for AsyncStorage
 */
export const Storage = {
  /**
   * Store data with a key
   */
  async setItem(key: string, value: any): Promise<void> {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (error) {
      console.error('Error storing data:', error);
      throw error;
    }
  },

  /**
   * Retrieve data by key
   */
  async getItem<T>(key: string): Promise<T | null> {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (error) {
      console.error('Error retrieving data:', error);
      return null;
    }
  },

  /**
   * Remove data by key
   */
  async removeItem(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing data:', error);
      throw error;
    }
  },

  /**
   * Clear all data
   */
  async clear(): Promise<void> {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error('Error clearing storage:', error);
      throw error;
    }
  },
};

/**
 * Storage keys constants
 */
export const STORAGE_KEYS = {
  AUTH_TOKEN: '@streambox/auth_token',
  USER_DATA: '@streambox/user_data',
  FAVORITES: '@streambox/favorites',
  THEME: '@streambox/theme',
} as const;

