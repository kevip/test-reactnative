import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../domain/entities/User';
import { AuthRepository } from '../domain/repositories/AuthRepository';

const KEYS = { TOKEN: '@auth_token', USERNAME: '@username' };

export class AuthRepositoryImpl implements AuthRepository {
  async login(username: string, password: string): Promise<User> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    if (password !== 'password123') throw new Error('Invalid credentials');
    return { username, token: `mock_jwt_${Date.now()}_${username}` };
  }

  async logout(): Promise<void> {}

  async getStoredAuth(): Promise<User | null> {
    const [[, token], [, username]] = await AsyncStorage.multiGet([KEYS.TOKEN, KEYS.USERNAME]);
    return token && username ? { token, username } : null;
  }

  async saveAuth(user: User): Promise<void> {
    await AsyncStorage.multiSet([[KEYS.TOKEN, user.token], [KEYS.USERNAME, user.username]]);
  }

  async clearAuth(): Promise<void> {
    await AsyncStorage.multiRemove([KEYS.TOKEN, KEYS.USERNAME]);
  }
}
