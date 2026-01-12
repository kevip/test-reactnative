import { User } from '../entities/User';

export interface AuthRepository {
  login(username: string, password: string): Promise<User>;
  logout(): Promise<void>;
  getStoredAuth(): Promise<User | null>;
  saveAuth(user: User): Promise<void>;
  clearAuth(): Promise<void>;
}
