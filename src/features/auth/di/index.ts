import { AuthRepositoryImpl } from '../data/AuthRepositoryImpl';
import { GetStoredAuthUseCase } from '../domain/useCases/GetStoredAuthUseCase';
import { LoginUseCase } from '../domain/useCases/LoginUseCase';
import { LogoutUseCase } from '../domain/useCases/LogoutUseCase';

const authRepository = new AuthRepositoryImpl();

export const authUseCases = {
  login: new LoginUseCase(authRepository),
  logout: new LogoutUseCase(authRepository),
  getStoredAuth: new GetStoredAuthUseCase(authRepository),
};
