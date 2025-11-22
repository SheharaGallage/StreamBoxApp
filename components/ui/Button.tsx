import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useAppSelector } from '@/store/hooks';
import React from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: 'primary' | 'secondary' | 'outline';
  loading?: boolean;
  fullWidth?: boolean;
}

export function Button({
  title,
  variant = 'primary',
  loading = false,
  fullWidth = false,
  disabled,
  style,
  ...props
}: ButtonProps) {
  const colorScheme = useColorScheme();
  const themeMode = useAppSelector((state) => state.theme.mode);
  const isDark = themeMode === 'dark' || (themeMode === 'auto' && colorScheme === 'dark');

  const getButtonStyle = () => {
    switch (variant) {
      case 'primary':
        return {
          backgroundColor: Colors.light.tint,
          borderColor: Colors.light.tint,
        };
      case 'secondary':
        return {
          backgroundColor: isDark ? '#333' : '#e0e0e0',
          borderColor: isDark ? '#333' : '#e0e0e0',
        };
      case 'outline':
        return {
          backgroundColor: 'transparent',
          borderColor: Colors.light.tint,
          borderWidth: 2,
        };
      default:
        return {
          backgroundColor: Colors.light.tint,
          borderColor: Colors.light.tint,
        };
    }
  };

  const getTextColor = () => {
    if (variant === 'outline') {
      return Colors.light.tint;
    }
    if (variant === 'secondary') {
      return isDark ? Colors.dark.text : Colors.light.text;
    }
    return '#fff';
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        getButtonStyle(),
        fullWidth && styles.fullWidth,
        (disabled || loading) && styles.disabled,
        style,
      ]}
      disabled={disabled || loading}
      activeOpacity={0.7}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={getTextColor()} />
      ) : (
        <Text style={[styles.buttonText, { color: getTextColor() }]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  fullWidth: {
    width: '100%',
  },
  disabled: {
    opacity: 0.5,
  },
});

