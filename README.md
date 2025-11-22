# StreamBox App 🎬

A React Native mobile application for browsing trending movies, songs, and podcasts. Built with Expo, React Navigation, Redux Toolkit, and The Movie Database (TMDB) API.

## Features

- 🔐 User Authentication (Login/Register)
- 🎥 Browse Trending and Popular Movies
- ❤️ Add Movies to Favorites
- 🌓 Dark Mode Support
- 📱 Responsive Design
- 💾 Data Persistence (AsyncStorage)

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Expo CLI
- Android Studio (for Android) or Xcode (for iOS)

### Installation

1. Install dependencies

   ```bash
   npm install
   ```

2. Get your TMDB API Key

   - Go to [https://www.themoviedb.org/](https://www.themoviedb.org/)
   - Sign up for a free account
   - Navigate to Settings → API
   - Request an API key (it's free!)
   - Copy your API key

3. Configure API Key

   - Open `constants/api.ts`
   - Replace `YOUR_TMDB_API_KEY_HERE` with your actual API key:

   ```typescript
   export const TMDB_API_KEY = "your_actual_api_key_here";
   ```

4. Start the app

   ```bash
   npm start
   ```

   Or use platform-specific commands:

   ```bash
   npm run android  # For Android
   npm run ios      # For iOS
   npm run web      # For Web
   ```

## Test Credentials

For testing the authentication feature, you can use:

- **Username:** `emilys`
- **Password:** `emilyspass`

Or register a new account using the registration screen.

## Project Structure

```
StreamBoxApp/
├── app/                    # App screens and navigation
│   ├── (auth)/            # Authentication screens
│   ├── (tabs)/            # Main app tabs
│   └── movie/             # Movie details screen
├── components/            # Reusable components
│   ├── ui/               # UI components (Button, TextInput)
│   └── MovieCard.tsx     # Movie card component
├── store/                # Redux store configuration
│   └── slices/           # Redux slices (auth, movie, theme)
├── services/             # API services
├── utils/                # Utility functions
└── constants/            # App constants (theme, API config)
```

## Tech Stack

- **React Native** - Mobile framework
- **Expo** - Development platform
- **TypeScript** - Type safety
- **Redux Toolkit** - State management
- **React Navigation** - Navigation
- **React Hook Form** - Form handling
- **Yup** - Form validation
- **Axios** - HTTP client
- **AsyncStorage** - Local storage
- **TMDB API** - Movie data
- **DummyJSON API** - Authentication

## Available Scripts

- `npm start` - Start Expo development server
- `npm run android` - Run on Android emulator/device
- `npm run ios` - Run on iOS simulator/device
- `npm run web` - Run on web browser
- `npm run lint` - Run ESLint

## Assignment Progress

✅ **Day 1:** Project setup, Redux store, Auth slice, Navigation structure  
✅ **Day 2:** Authentication screens with validation  
✅ **Day 3:** API integration and movie list  
🔲 **Day 4:** Movie details screen and favorites functionality  
🔲 **Day 5:** Dark mode and final polish  
🔲 **Day 6:** Final testing and documentation

## License

This project is created for educational purposes as part of IN3210 Mobile Applications Development course.
