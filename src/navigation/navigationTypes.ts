/**
 * Navigation Type Definitions
 * Define types for navigation params and routes
 */

export type RootStackParamList = {
  '(auth)': undefined;
  '(tabs)': undefined;
  'movie/[id]': { id: string | number };
  modal: undefined;
};

export type AuthStackParamList = {
  login: undefined;
  register: undefined;
};

export type TabsParamList = {
  index: undefined;
  search: undefined;
  favorites: undefined;
  profile: undefined;
};

export type MovieStackParamList = {
  '[id]': { id: string | number };
};

// Navigation prop types for screens
export type NavigationProps = {
  navigation: any;
  route: any;
};
