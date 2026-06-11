import { useState, useCallback } from 'react';

/**
 * Custom hook for syncing React state with localStorage.
 * Reads from localStorage on mount, writes on every update.
 *
 * @param {string} key          - The localStorage key
 * @param {*}      defaultValue - Fallback value if key doesn't exist
 * @returns {[*, Function]} Tuple of [value, setValue]
 */
export const useLocalStorage = (key, defaultValue) => {
  // Initialize from localStorage (runs once on mount)
  const [value, setValue] = useState(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored !== null ? JSON.parse(stored) : defaultValue;
    } catch {
      return defaultValue;
    }
  });

  // Wrapped setter that also persists to localStorage
  const set = useCallback(
    (newValue) => {
      setValue((prev) => {
        // Support functional updates like useState
        const resolved = typeof newValue === 'function' ? newValue(prev) : newValue;
        try {
          localStorage.setItem(key, JSON.stringify(resolved));
        } catch (e) {
          console.error('localStorage write failed:', e);
        }
        return resolved;
      });
    },
    [key]
  );

  return [value, set];
};
