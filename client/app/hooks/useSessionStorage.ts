"use client";

/**
 * Accepts either a key, or a key and a value.
 *
 * @param key String to get a value from in sessionStorage.
 * @param value String stored in sessionStorage.
 * @returns string.
 *
 **/

export function useSessionStorage(key: string, value: string | null): string {
  if (!key || key === "") {
    throw new Error("Key must have a value.");
  }

  if (value) {
    sessionStorage.setItem(key, value);
    return "";
  }
  const storageValue = sessionStorage.getItem(key);

  if (storageValue) {
    return storageValue;
  }

  return "";
}
