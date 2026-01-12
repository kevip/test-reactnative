import { logger } from './logger';

interface LoginCredentials {
  username: string;
  password: string;
}

interface AuthResponse {
  token: string;
  username: string;
}

/**
 * Auth Service
 * 
 * Mocks a JWT authentication endpoint.
 * In production, this would make real HTTP requests to your backend API.
 */

class AuthService {
  /**
   * Mock login endpoint
   * Simulates API call with 1 second delay
   * Accepts any username with password "password123"
   */
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const endpoint = '/api/auth/login';
    logger.info(`Attempting login for user: ${credentials.username}`);

    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock validation
      if (credentials.password !== 'password123') {
        throw new Error('Invalid credentials');
      }

      // Mock JWT token
      const mockToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.${btoa(
        JSON.stringify({ username: credentials.username, exp: Date.now() + 3600000 })
      )}.mock_signature`;

      const response: AuthResponse = {
        token: mockToken,
        username: credentials.username,
      };

      logger.info('Login successful', { username: credentials.username });
      return response;
    } catch (error) {
      logger.httpError(endpoint, error);
      throw error;
    }
  }

  /**
   * Mock logout endpoint
   */
  async logout(): Promise<void> {
    logger.info('User logged out');
    // In production, you might invalidate the token on the server
  }
}

export const authService = new AuthService();
