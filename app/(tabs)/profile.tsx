/**
 * Profile Screen
 * This is a placeholder screen - will be implemented later
 */
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { logout } from '@/store/slices/authSlice';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function ProfileScreen() {
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Profile</ThemedText>
      {user && (
        <ThemedView style={styles.userInfo}>
          <ThemedText>Username: {user.username}</ThemedText>
          <ThemedText>Email: {user.email}</ThemedText>
          {user.firstName && <ThemedText>Name: {user.firstName} {user.lastName}</ThemedText>}
        </ThemedView>
      )}
      <TouchableOpacity style={[styles.logoutButton, { backgroundColor: colors.tint }]} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  userInfo: {
    marginTop: 20,
    marginBottom: 30,
    gap: 10,
  },
  logoutButton: {
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

