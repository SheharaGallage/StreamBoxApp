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
import { clearError, registerUser } from '@/store/slices/authSlice';
import { registerSchema, type RegisterFormData } from '@/utils/validation';

export default function RegisterScreen() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { isLoading, error, isAuthenticated } = useAppSelector((state) => state.auth);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
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
      Alert.alert('Registration Failed', error, [
        {
          text: 'OK',
          onPress: () => dispatch(clearError()),
        },
      ]);
    }
  }, [error, dispatch]);

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const { confirmPassword, ...registerData } = data;
      await dispatch(registerUser(registerData)).unwrap();
      // Navigation will happen automatically via useEffect
    } catch (err) {
      // Error is handled by Redux and shown in useEffect
      console.error('Registration error:', err);
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
              Create Account
            </ThemedText>
            <ThemedText style={styles.subtitle}>
              Sign up to start exploring movies
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
                  placeholder="Choose a username"
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
              name="email"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  label="Email"
                  icon="mail"
                  placeholder="Enter your email"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={errors.email?.message}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              )}
            />

            <View style={styles.nameRow}>
              <View style={styles.nameField}>
                <Controller
                  control={control}
                  name="firstName"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      label="First Name (Optional)"
                      placeholder="First name"
                      value={value || ''}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      error={errors.firstName?.message}
                      autoCapitalize="words"
                    />
                  )}
                />
              </View>

              <View style={styles.nameField}>
                <Controller
                  control={control}
                  name="lastName"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      label="Last Name (Optional)"
                      placeholder="Last name"
                      value={value || ''}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      error={errors.lastName?.message}
                      autoCapitalize="words"
                    />
                  )}
                />
              </View>
            </View>

            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  label="Password"
                  icon="lock"
                  placeholder="Create a password"
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

            <Controller
              control={control}
              name="confirmPassword"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  label="Confirm Password"
                  icon="lock"
                  placeholder="Confirm your password"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={errors.confirmPassword?.message}
                  secureTextEntry={!showConfirmPassword}
                  showPasswordToggle
                  onTogglePassword={() => setShowConfirmPassword(!showConfirmPassword)}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              )}
            />

            <Button
              title="Sign Up"
              onPress={handleSubmit(onSubmit)}
              loading={isLoading}
              fullWidth
              style={styles.submitButton}
            />

            <View style={styles.footer}>
              <ThemedText style={styles.footerText}>Already have an account? </ThemedText>
              <Link href="/(auth)/login" asChild>
                <ThemedText type="link" style={styles.link}>
                  Sign In
                </ThemedText>
              </Link>
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
    paddingTop: 48,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
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
  nameRow: {
    flexDirection: 'row',
    gap: 12,
  },
  nameField: {
    flex: 1,
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
});
