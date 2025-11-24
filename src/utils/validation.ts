/**
 * Validation utility functions
 */

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string): boolean => {
  // At least 6 characters
  return password.length >= 6;
};

export const validateUsername = (username: string): boolean => {
  // At least 3 characters, alphanumeric and underscore only
  const usernameRegex = /^[a-zA-Z0-9_]{3,}$/;
  return usernameRegex.test(username);
};

export const validateRequired = (value: string): boolean => {
  return value.trim().length > 0;
};

/**
 * Form validation errors
 */
export interface ValidationErrors {
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  firstName?: string;
  lastName?: string;
}

export const validateLoginForm = (username: string, password: string): ValidationErrors => {
  const errors: ValidationErrors = {};

  if (!validateRequired(username)) {
    errors.username = 'Username is required';
  }

  if (!validateRequired(password)) {
    errors.password = 'Password is required';
  }

  return errors;
};

export const validateRegisterForm = (
  username: string,
  email: string,
  password: string,
  confirmPassword: string,
  firstName: string,
  lastName: string
): ValidationErrors => {
  const errors: ValidationErrors = {};

  if (!validateRequired(firstName)) {
    errors.firstName = 'First name is required';
  }

  if (!validateRequired(lastName)) {
    errors.lastName = 'Last name is required';
  }

  if (!validateRequired(username)) {
    errors.username = 'Username is required';
  } else if (!validateUsername(username)) {
    errors.username = 'Username must be at least 3 characters (letters, numbers, underscore)';
  }

  if (!validateRequired(email)) {
    errors.email = 'Email is required';
  } else if (!validateEmail(email)) {
    errors.email = 'Invalid email format';
  }

  if (!validateRequired(password)) {
    errors.password = 'Password is required';
  } else if (!validatePassword(password)) {
    errors.password = 'Password must be at least 6 characters';
  }

  if (!validateRequired(confirmPassword)) {
    errors.confirmPassword = 'Please confirm your password';
  } else if (password !== confirmPassword) {
    errors.confirmPassword = 'Passwords do not match';
  }

  return errors;
};
