import { ProductRepositoryImpl } from '../data/ProductRepositoryImpl';
import { GetProductsUseCase } from '../domain/useCases/GetProductsUseCase';

const productRepository = new ProductRepositoryImpl();

export const productUseCases = {
  getProducts: new GetProductsUseCase(productRepository),
};
