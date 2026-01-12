import { Product } from '../entities/Product';
import { ProductRepository } from '../repositories/ProductRepository';

export class GetProductsUseCase {
  constructor(private productRepo: ProductRepository) {}

  async execute(limit: number = 30): Promise<Product[]> {
    return this.productRepo.getProducts(limit);
  }
}
