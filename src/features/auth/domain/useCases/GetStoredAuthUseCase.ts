import { User } from '../entities/User';
import { AuthRepository } from '../repositories/AuthRepository';

export class GetStoredAuthUseCase {
  constructor(private authRepo: AuthRepository) {}

  async execute(): Promise<User | null> {
    return this.authRepo.getStoredAuth();
  }
}
