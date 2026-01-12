import { AuthRepository } from '../repositories/AuthRepository';

export class LogoutUseCase {
  constructor(private authRepo: AuthRepository) {}

  async execute(): Promise<void> {
    await this.authRepo.logout();
    await this.authRepo.clearAuth();
  }
}
