import { Product } from '../entities/Product';

export interface ProductRepository {
  getProducts(limit: number): Promise<Product[]>;
}
