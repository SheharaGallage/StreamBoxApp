import { darkTheme, lightTheme } from '@/src/constants/theme';
import { useAppSelector } from '@/src/redux/hooks';

export const useTheme = () => {
  const { isDarkMode } = useAppSelector((state) => state.theme);
  return isDarkMode ? darkTheme : lightTheme;
};
