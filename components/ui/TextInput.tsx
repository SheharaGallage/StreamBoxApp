import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useThemeColor } from '@/hooks/use-theme-color';
import { useAppSelector } from '@/store/hooks';
import { Feather } from '@expo/vector-icons';
import React from 'react';
import { TextInput as RNTextInput, StyleSheet, Text, TextInputProps, View } from 'react-native';

interface CustomTextInputProps extends TextInputProps {
  label?: string;
  error?: string;
  icon?: keyof typeof Feather.glyphMap;
  secureTextEntry?: boolean;
  showPasswordToggle?: boolean;
  onTogglePassword?: () => void;
}

export function TextInput({
  label,
  error,
  icon,
  secureTextEntry,
  showPasswordToggle,
  onTogglePassword,
  style,
  ...props
}: CustomTextInputProps) {
  const textColor = useThemeColor({}, 'text');
  const colorScheme = useColorScheme();
  const themeMode = useAppSelector((state) => state.theme.mode);
  const isDark = themeMode === 'dark' || (themeMode === 'auto' && colorScheme === 'dark');

  return (
    <View style={styles.container}>
      {label && (
        <Text style={[styles.label, { color: textColor }]}>{label}</Text>
      )}
      <View style={styles.inputContainer}>
        {icon && (
          <Feather
            name={icon}
            size={20}
            color={Colors[isDark ? 'dark' : 'light'].icon}
            style={styles.icon}
          />
        )}
        <RNTextInput
          style={[
            styles.input,
            {
              color: textColor,
              backgroundColor: isDark ? Colors.dark.background : '#f5f5f5',
              borderColor: error
                ? '#ef4444'
                : isDark
                  ? '#333'
                  : '#e0e0e0',
            },
            icon && styles.inputWithIcon,
            showPasswordToggle && styles.inputWithToggle,
            style,
          ]}
          placeholderTextColor={Colors[isDark ? 'dark' : 'light'].icon}
          secureTextEntry={secureTextEntry}
          {...props}
        />
        {showPasswordToggle && onTogglePassword && (
          <Feather
            name={secureTextEntry ? 'eye-off' : 'eye'}
            size={20}
            color={Colors[isDark ? 'dark' : 'light'].icon}
            style={styles.passwordToggle}
            onPress={onTogglePassword}
          />
        )}
      </View>
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  icon: {
    position: 'absolute',
    left: 12,
    zIndex: 1,
  },
  input: {
    flex: 1,
    height: 50,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderRadius: 8,
    fontSize: 16,
  },
  inputWithIcon: {
    paddingLeft: 44,
  },
  inputWithToggle: {
    paddingRight: 44,
  },
  passwordToggle: {
    position: 'absolute',
    right: 12,
    zIndex: 1,
  },
  error: {
    color: '#ef4444',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
});

