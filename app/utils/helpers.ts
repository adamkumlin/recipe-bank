export function sanitizeUserName(userName: string): string {
    const sanitized = userName.replace(" ", "_");
    return sanitized;
}