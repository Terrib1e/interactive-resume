// src/lib/cache.ts
interface CacheItem<T> {
  data: T;
  timestamp: number;
  expiry: number;
}

export function createCache<T>(ttl: number = 5 * 60 * 1000) {
  // Default 5 minutes
  const cache = new Map<string, CacheItem<T>>();

  return {
    get: (key: string): T | null => {
      const item = cache.get(key);
      if (!item) return null;

      const now = Date.now();
      if (now - item.timestamp > item.expiry) {
        cache.delete(key);
        return null;
      }

      return item.data;
    },

    set: (key: string, data: T, customTtl?: number): void => {
      cache.set(key, {
        data,
        timestamp: Date.now(),
        expiry: customTtl || ttl,
      });
    },

    delete: (key: string): void => {
      cache.delete(key);
    },

    clear: (): void => {
      cache.clear();
    },
  };
}

// Create a GitHub cache instance
export const githubCache = createCache<any>(30 * 60 * 1000); // 30 minutes
