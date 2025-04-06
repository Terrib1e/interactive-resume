// src/hooks/use-local-storage.ts
import { useState, useEffect } from 'react';

type StorageValue<T> = T | null;

export function useLocalStorage<T>(key: string, initialValue: T): [StorageValue<T>, (value: T) => void, () => void] {
  // Function to get stored value from localStorage
  const readValue = (): StorageValue<T> => {
    if (typeof window === 'undefined') {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  };

  // State to store the value
  const [storedValue, setStoredValue] = useState<StorageValue<T>>(readValue);

  // Function to update stored value and localStorage
  const setValue = (value: T) => {
    if (typeof window === 'undefined') {
      console.warn(`Tried setting localStorage key "${key}" even though environment is not a browser`);
      return;
    }

    try {
      // Save state
      setStoredValue(value);
      // Save to localStorage
      window.localStorage.setItem(key, JSON.stringify(value));
      // Dispatch a custom event so other instances of useLocalStorage can update
      window.dispatchEvent(new Event('local-storage'));
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  };

  // Function to remove the item from localStorage
  const removeValue = () => {
    if (typeof window === 'undefined') {
      return;
    }

    try {
      // Remove from localStorage
      window.localStorage.removeItem(key);
      // Reset state
      setStoredValue(null);
      // Dispatch a custom event
      window.dispatchEvent(new Event('local-storage'));
    } catch (error) {
      console.warn(`Error removing localStorage key "${key}":`, error);
    }
  };

  // Listen for changes to localStorage
  useEffect(() => {
    const handleStorageChange = () => {
      setStoredValue(readValue());
    };

    // Listen to updates from other instances of useLocalStorage
    window.addEventListener('local-storage', handleStorageChange);
    // Listen to changes from other documents
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('local-storage', handleStorageChange);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return [storedValue, setValue, removeValue];
}
