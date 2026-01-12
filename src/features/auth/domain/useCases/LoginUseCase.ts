import { User } from '../entities/User';
import { AuthRepository } from '../repositories/AuthRepository';

export class LoginUseCase {
  constructor(private authRepo: AuthRepository) {}

  async execute(username: string, password: string): Promise<User> {
    const user = await this.authRepo.login(username, password);
    await this.authRepo.saveAuth(user);
    return user;
  }
}
