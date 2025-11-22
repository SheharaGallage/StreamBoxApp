import { Feather } from '@expo/vector-icons';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Button } from '@/components/ui/Button';
import { TextInput } from '@/components/ui/TextInput';
import { Colors } from '@/constants/theme';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { clearError, loginUser } from '@/store/slices/authSlice';
import { loginSchema, type LoginFormData } from '@/utils/validation';

export default function LoginScreen() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { isLoading, error, isAuthenticated } = useAppSelector((state) => state.auth);
  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  // Navigate to home when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.replace('/(tabs)');
    }
  }, [isAuthenticated, router]);

  // Show error alert
  useEffect(() => {
    if (error) {
      Alert.alert('Login Failed', error, [
        {
          text: 'OK',
          onPress: () => dispatch(clearError()),
        },
      ]);
    }
  }, [error, dispatch]);

  const onSubmit = async (data: LoginFormData) => {
    try {
      await dispatch(loginUser(data)).unwrap();
      // Navigation will happen automatically via useEffect
    } catch (err) {
      // Error is handled by Redux and shown in useEffect
      console.error('Login error:', err);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <View style={[styles.iconContainer, { backgroundColor: Colors.light.tint + '20' }]}>
              <Feather name="film" size={48} color={Colors.light.tint} />
            </View>
            <ThemedText type="title" style={styles.title}>
              StreamBox
            </ThemedText>
            <ThemedText style={styles.subtitle}>
              Welcome back! Sign in to continue
            </ThemedText>
          </View>

          <View style={styles.form}>
            <Controller
              control={control}
              name="username"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  label="Username"
                  icon="user"
                  placeholder="Enter your username"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={errors.username?.message}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              )}
            />

            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  label="Password"
                  icon="lock"
                  placeholder="Enter your password"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={errors.password?.message}
                  secureTextEntry={!showPassword}
                  showPasswordToggle
                  onTogglePassword={() => setShowPassword(!showPassword)}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              )}
            />

            <Button
              title="Sign In"
              onPress={handleSubmit(onSubmit)}
              loading={isLoading}
              fullWidth
              style={styles.submitButton}
            />

            <View style={styles.footer}>
              <ThemedText style={styles.footerText}>Don&apos;t have an account? </ThemedText>
              <Link href="/(auth)/register" asChild>
                <ThemedText type="link" style={styles.link}>
                  Sign Up
                </ThemedText>
              </Link>
            </View>

            {/* Test credentials hint */}
            <View style={styles.testCredentials}>
              <ThemedText style={styles.testText}>
                Test: username: &quot;emilys&quot;, password: &quot;emilyspass&quot;
              </ThemedText>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 24,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 48,
  },
  iconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
    opacity: 0.7,
  },
  form: {
    width: '100%',
  },
  submitButton: {
    marginTop: 8,
    marginBottom: 24,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  footerText: {
    fontSize: 14,
  },
  link: {
    fontSize: 14,
    fontWeight: '600',
  },
  testCredentials: {
    marginTop: 24,
    padding: 12,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  testText: {
    fontSize: 12,
    textAlign: 'center',
    opacity: 0.6,
  },
});
