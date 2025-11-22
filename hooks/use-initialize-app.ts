import { useEffect, useState } from 'react';
import { useAppDispatch } from '@/store/hooks';
import { loadUserFromStorage } from '@/store/slices/authSlice';
import { loadThemeFromStorage } from '@/store/slices/themeSlice';
import { setFavorites } from '@/store/slices/movieSlice';
import { Storage, STORAGE_KEYS } from '@/utils/storage';

/**
 * Hook to initialize app data from storage
 */
export function useInitializeApp() {
  const dispatch = useAppDispatch();
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Load theme from storage first
        const savedTheme = await Storage.getItem<'light' | 'dark' | 'auto'>(STORAGE_KEYS.THEME);
        if (savedTheme) {
          dispatch(loadThemeFromStorage(savedTheme));
        }

        // Load user from storage
        await dispatch(loadUserFromStorage());

        // Load favorites from storage
        const savedFavorites = await Storage.getItem<number[]>(STORAGE_KEYS.FAVORITES);
        if (savedFavorites && savedFavorites.length > 0) {
          dispatch(setFavorites(savedFavorites));
        }
      } catch (error) {
        console.error('Error initializing app:', error);
      } finally {
        setIsInitialized(true);
      }
    };

    initializeApp();
  }, [dispatch]);

  return isInitialized;
}

