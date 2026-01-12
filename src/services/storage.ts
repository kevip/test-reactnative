import AsyncStorage from '@react-native-async-storage/async-storage';
import { logger } from './logger';

/**
 * Storage Service
 * 
 * Uses AsyncStorage - React Native's equivalent to localStorage.
 * AsyncStorage is persistent, unencrypted, key-value storage.
 * 
 * Why AsyncStorage?
 * - Persists data across app restarts
 * - Simple key-value API
 * - Works on both iOS and Android
 * - For sensitive data like tokens, consider using expo-secure-store in production
 */

const STORAGE_KEYS = {
  AUTH_TOKEN: '@auth_token',
  USERNAME: '@username',
};

class StorageService {
  async saveAuthData(token: string, username: string): Promise<void> {
    try {
      await AsyncStorage.multiSet([
        [STORAGE_KEYS.AUTH_TOKEN, token],
        [STORAGE_KEYS.USERNAME, username],
      ]);
      logger.info('Auth data saved to storage');
    } catch (error) {
      logger.error('Failed to save auth data', error);
    }
  }

  async getAuthData(): Promise<{ token: string | null; username: string | null }> {
    try {
      const values = await AsyncStorage.multiGet([
        STORAGE_KEYS.AUTH_TOKEN,
        STORAGE_KEYS.USERNAME,
      ]);
      return {
        token: values[0][1],
        username: values[1][1],
      };
    } catch (error) {
      logger.error('Failed to get auth data', error);
      return { token: null, username: null };
    }
  }

  async clearAuthData(): Promise<void> {
    try {
      await AsyncStorage.multiRemove([STORAGE_KEYS.AUTH_TOKEN, STORAGE_KEYS.USERNAME]);
      logger.info('Auth data cleared from storage');
    } catch (error) {
      logger.error('Failed to clear auth data', error);
    }
  }
}

export const storageService = new StorageService();
