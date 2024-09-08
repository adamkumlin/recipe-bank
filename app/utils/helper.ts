export function validateUserCredentials(
  username: string | undefined,
  password: string | undefined
): string[] {
  const errors: string[] = [];
  if (!username) {
    errors.push("Username cannot be empty.");
  }

  if (!password) {
    errors.push("Password cannot be empty.");
  }

  if (password && (password.length < 8 || password.length > 40)) {
    errors.push("Password has to be between 8 and 40 characters long.");
  }

  return errors;
}
