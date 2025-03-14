export class Service {
  private static instance: Service;

  private constructor() {}

  public static getInstance(): Service {
    if (!Service.instance) {
      Service.instance = new Service();
    }
    return Service.instance;
  }

  /**
   * Stores a value in localStorage under the specified key.
   * @param key - The key under which the value will be stored.
   * @param value - The value to store.
   */
  public setItem<T>(key: string, value: T): void {
    try {
      const serializedValue = JSON.stringify(value);
      localStorage.setItem(key, serializedValue);
    } catch (error) {
      console.error(`Error setting item "${key}" in localStorage:`, error);
    }
  }

  /**
   * Retrieves a value from localStorage by key.
   * @param key - The key of the item to retrieve.
   * @returns The stored value parsed as type T, or null if not found.
   */
  public getItem<T>(key: string): T | null {
    try {
      const serializedValue = localStorage.getItem(key);
      if (serializedValue === null) return null;
      return JSON.parse(serializedValue) as T;
    } catch (error) {
      console.error(`Error getting item "${key}" from localStorage:`, error);
      return null;
    }
  }

  /**
   * Removes the item associated with the specified key from localStorage.
   * @param key - The key of the item to remove.
   */
  public removeItem(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing item "${key}" from localStorage:`, error);
    }
  }

  /**
   * Clears all keys stored in localStorage.
   */
  public clear(): void {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  }
}

// Export the singleton instance.
export const LocalStorageService = Service.getInstance();
