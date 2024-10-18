import { emailRegex, passwordRegex } from "./constants";

export function validateUserCredentials(formData: {
  email: string;
  password: string;
  confirmPassword: string;
}): string {
  if (!formData.email || !formData.password || !formData.confirmPassword) {
    return "Please fill out all fields.";
  }

  if (formData.password !== formData.confirmPassword) {
    return "The passwords do not match."
  }

  const isValidEmail = emailRegex.test(formData.email);
  if (!isValidEmail) {
    return "Email is not valid.";
  }

  const isValidPassword = passwordRegex.test(formData.password);
  if (!isValidPassword) {
    return "Password is not valid.";
  }

  return "";
}
