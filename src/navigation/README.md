# Navigation Module

This folder contains navigation configuration and wrapper components for the StreamBox app.

## Files

### Navigation Components

- **`AuthNavigator.tsx`** - Authentication flow navigation (login, register)
- **`TabNavigator.tsx`** - Main tab navigation with themed icons and styling
- **`RootNavigator.tsx`** - Top-level navigation configuration
- **`index.ts`** - Barrel export for easy importing

### Type Definitions

- **`navigationTypes.ts`** - TypeScript type definitions for navigation params and routes

## Usage

### Importing Navigation Components

```tsx
import { AuthNavigator, TabNavigator, RootNavigator } from "@/src/navigation";
```

### Using in Layouts

These navigators are designed to be used in the `app/` layout files to provide consistent styling and configuration:

```tsx
// app/(auth)/_layout.tsx
import { AuthNavigator } from "@/src/navigation";

export default AuthNavigator;
```

```tsx
// app/(tabs)/_layout.tsx
import { TabNavigator } from "@/src/navigation";

export default TabNavigator;
```

```tsx
// app/_layout.tsx
import { RootNavigator } from "@/src/navigation";

// Use RootNavigator for root-level configuration
```

## Features

### AuthNavigator

- Consistent styling for auth screens
- Slide-from-right animation
- Dark background theme
- No header (custom headers in screens)

### TabNavigator

- Themed tab bar (adapts to light/dark mode)
- Custom icons using Feather icons
- Styled active/inactive states
- Consistent height and spacing

### RootNavigator

- Manages top-level navigation
- Configures modal presentations
- Sets global screen options
- Handles theme-aware styling

## Type Safety

Use the types from `navigationTypes.ts` for type-safe navigation:

```tsx
import { RootStackParamList } from "@/src/navigation/navigationTypes";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

function MyComponent() {
  const navigation = useNavigation<NavigationProp>();

  // Type-safe navigation
  navigation.navigate("movie/[id]", { id: 123 });
}
```

## Customization

### Adding New Tabs

To add a new tab to the main navigation:

1. Add the screen to `app/(tabs)/`
2. Update `TabNavigator.tsx` to add the new tab:

```tsx
<Tabs.Screen
  name="newtab"
  options={{
    title: "New Tab",
    tabBarIcon: ({ color, size }) => (
      <Feather name="icon-name" size={size} color={color} />
    ),
  }}
/>
```

3. Update `TabsParamList` in `navigationTypes.ts`

### Adding New Screens

To add a new screen to the root navigation:

1. Create the screen in appropriate folder
2. Update `RootNavigator.tsx`:

```tsx
<Stack.Screen
  name="newscreen"
  options={
    {
      // screen options
    }
  }
/>
```

3. Update `RootStackParamList` in `navigationTypes.ts`

## Best Practices

1. **Keep navigation logic separate from business logic** - Navigators only configure routing
2. **Use typed navigation** - Import and use types from `navigationTypes.ts`
3. **Consistent theming** - Use the `useTheme` hook for all styling
4. **Meaningful screen names** - Use clear, descriptive names for routes
5. **Document changes** - Update this README when adding new navigation patterns
