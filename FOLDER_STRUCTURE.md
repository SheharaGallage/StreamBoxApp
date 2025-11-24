# StreamBox App - Folder Structure Documentation

## Overview

This document describes the professional folder structure implemented for the StreamBox movie app. The structure follows industry best practices and React Native conventions for better code quality and maintainability.

## Project Structure

```
StreamBoxApp/
├── app/                           # Expo Router routing files (minimal)
│   ├── (auth)/
│   │   ├── login.tsx             # Routes to src/screens/auth/LoginScreen
│   │   └── register.tsx          # Routes to src/screens/auth/RegisterScreen
│   ├── (tabs)/
│   │   ├── _layout.tsx           # Tab navigation layout
│   │   ├── index.tsx             # Routes to src/screens/tabs/HomeScreen
│   │   ├── search.tsx            # Routes to src/screens/tabs/SearchScreen
│   │   ├── favorites.tsx         # Routes to src/screens/tabs/FavoritesScreen
│   │   └── profile.tsx           # Routes to src/screens/tabs/ProfileScreen
│   ├── movie/
│   │   └── [id].tsx              # Routes to src/screens/movie/MovieDetailsScreen
│   ├── _layout.tsx               # Root layout with Redux Provider
│   └── modal.tsx                 # Example modal screen
│
├── src/                          # Main application source code
│   ├── components/               # Reusable UI components
│   │   ├── CategoryRow.tsx       # Horizontal movie list component
│   │   └── MovieCard.tsx         # Individual movie card component
│   │
│   ├── constants/                # App constants and configuration
│   │   ├── Config.ts             # API keys and endpoints
│   │   └── theme.ts              # Theme colors and styles
│   │
│   ├── hooks/                    # Custom React hooks
│   │   └── useTheme.ts           # Theme management hook
│   │
│   ├── navigation/               # Navigation wrapper components
│   │   └── (empty - reserved for future navigation logic)
│   │
│   ├── redux/                    # Redux state management
│   │   ├── slices/
│   │   │   ├── authSlice.ts      # Authentication state
│   │   │   ├── favoritesSlice.ts # Favorites management
│   │   │   ├── moviesSlice.ts    # Movies data
│   │   │   └── themeSlice.ts     # Theme preferences
│   │   ├── hooks.ts              # Typed Redux hooks
│   │   └── store.ts              # Store configuration
│   │
│   ├── screens/                  # Screen components (actual UI logic)
│   │   ├── auth/
│   │   │   ├── LoginScreen.tsx   # Login screen implementation
│   │   │   └── RegisterScreen.tsx # Register screen implementation
│   │   ├── tabs/
│   │   │   ├── HomeScreen.tsx    # Home/browse screen
│   │   │   ├── SearchScreen.tsx  # Search functionality
│   │   │   ├── FavoritesScreen.tsx # Favorites list
│   │   │   └── ProfileScreen.tsx # User profile and settings
│   │   └── movie/
│   │       └── MovieDetailsScreen.tsx # Movie details view
│   │
│   ├── services/                 # API and storage services
│   │   ├── api/
│   │   │   ├── auth.ts           # Authentication API
│   │   │   └── tmdb.ts           # TMDB API integration
│   │   └── storage/
│   │       └── asyncStorage.ts   # Local storage utilities
│   │
│   ├── types/                    # TypeScript type definitions
│   │   └── index.ts              # Shared types and interfaces
│   │
│   └── utils/                    # Utility functions
│       ├── helpers.ts            # General helper functions
│       └── validation.ts         # Form validation logic
│
├── assets/                       # Static assets
│   └── images/                   # Image files
│
├── components/                   # Default Expo components
│   ├── themed-text.tsx
│   ├── themed-view.tsx
│   └── haptic-tab.tsx
│
├── hooks/                        # Default Expo hooks
│   ├── use-color-scheme.ts
│   └── use-theme-color.ts
│
├── constants/                    # Default Expo constants
│   └── theme.ts
│
└── scripts/                      # Build and utility scripts
    └── reset-project.js

```

## Key Design Decisions

### 1. Separation of Concerns

- **app/ folder**: Contains only Expo Router routing configuration (minimal, 3-5 lines per file)
- **src/screens/ folder**: Contains actual screen implementation with full UI logic
- **Benefits**: Clear separation between routing and business logic, easier testing, better code organization

### 2. Redux Naming Convention

- **Renamed**: `src/store/` → `src/redux/`
- **Reason**: Industry standard naming convention. "Redux" is more explicit than "store"
- **All imports updated**: Changed from `@/src/store/*` to `@/src/redux/*` throughout the codebase

### 3. Screen Organization

- **auth/**: Authentication-related screens (login, register)
- **tabs/**: Main tab navigation screens (home, search, favorites, profile)
- **movie/**: Movie-specific screens (details)
- **Benefits**: Logical grouping, scalable structure for future screens

### 4. Components Architecture

- **Root-level components/**: Expo default UI components (ThemedView, ThemedText, HapticTab)
- **src/components/**: Custom app-specific components (MovieCard, CategoryRow)
- **Benefits**: Clear distinction between framework components and app components

### 5. Services Layer

- **api/**: External API integrations (TMDB, Auth)
- **storage/**: Local data persistence (AsyncStorage)
- **Benefits**: Centralized API logic, easy to mock for testing

## File Import Examples

### Routing File Pattern (app/)

```tsx
// app/(tabs)/index.tsx
import HomeScreen from "@/src/screens/tabs/HomeScreen";

export default HomeScreen;
```

### Screen File Pattern (src/screens/)

```tsx
// src/screens/tabs/HomeScreen.tsx
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import { fetchTrendingMovies } from "@/src/redux/slices/moviesSlice";
import CategoryRow from "@/src/components/CategoryRow";
// ... rest of imports

export default function HomeScreen() {
  // Full screen implementation here
}
```

### Component File Pattern (src/components/)

```tsx
// src/components/MovieCard.tsx
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import { addFavorite, removeFavorite } from "@/src/redux/slices/favoritesSlice";
// ... component implementation
```

## Migration Summary

### Changes Made:

1. ✅ Created `src/screens/` directory with subdirectories (auth, tabs, movie)
2. ✅ Created `src/navigation/` directory (reserved for future use)
3. ✅ Renamed `src/store/` → `src/redux/`
4. ✅ Moved all screen implementations from `app/` to `src/screens/`
5. ✅ Updated all routing files in `app/` to simple import/export
6. ✅ Updated all imports from `@/src/store/` to `@/src/redux/` in:
   - All screen files (7 files)
   - app/\_layout.tsx
   - src/components/MovieCard.tsx
   - src/hooks/useTheme.ts

### Files Created:

- src/screens/auth/LoginScreen.tsx (232 lines)
- src/screens/auth/RegisterScreen.tsx (250 lines)
- src/screens/tabs/HomeScreen.tsx (165 lines)
- src/screens/tabs/SearchScreen.tsx (379 lines)
- src/screens/tabs/FavoritesScreen.tsx (231 lines)
- src/screens/tabs/ProfileScreen.tsx (233 lines)
- src/screens/movie/MovieDetailsScreen.tsx (320 lines)

### Benefits of This Structure:

1. **Code Quality**: Clear separation of concerns, follows React Native best practices
2. **Maintainability**: Easy to locate files, logical grouping of related code
3. **Scalability**: Simple to add new screens, components, or features
4. **Testing**: Easier to unit test screens independently from routing
5. **Collaboration**: Team members can quickly understand project organization
6. **Industry Standard**: Follows conventions used in professional React Native projects

## Next Steps for Enhancement:

1. **Add navigation wrappers** in `src/navigation/`:

   - AuthNavigator.tsx
   - TabNavigator.tsx
   - RootNavigator.tsx

2. **Add screen-specific components**:

   - src/components/screens/home/ (components only used in HomeScreen)
   - src/components/screens/search/ (components only used in SearchScreen)

3. **Add test files**:

   - src/screens/**tests**/
   - src/components/**tests**/
   - src/redux/**tests**/

4. **Add documentation**:
   - Component PropTypes documentation
   - API service documentation
   - Redux state shape documentation
