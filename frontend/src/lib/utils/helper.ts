import { emailRegex } from './constants';

export function validateUserCredentials(
  formData: {
    email: string;
    password: string;
    confirmPassword?: string;
  },
  isRegister: boolean
): string {
  if (!isRegister) {
    if (!formData.email || !formData.password) {
      return 'Please fill out all fields.';
    }
  } else {
    if (!formData.email || !formData.password || !formData.confirmPassword) {
      return 'Please fill out all fields.';
    }

    if (formData.password !== formData.confirmPassword) {
      return 'The passwords do not match.';
    }
  }

  const isValidEmail = emailRegex.test(formData.email);
  if (!isValidEmail) {
    return 'Email is not valid.';
  }

  const isValidPassword = formData.password.length > 10;
  if (!isValidPassword) {
    return 'Password is too short (10 characters minimum).';
  }

  return '';
}
