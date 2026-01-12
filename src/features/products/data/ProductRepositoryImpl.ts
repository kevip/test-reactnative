import { Product } from '../domain/entities/Product';
import { ProductRepository } from '../domain/repositories/ProductRepository';

export class ProductRepositoryImpl implements ProductRepository {
  async getProducts(limit: number): Promise<Product[]> {
    const res = await fetch(`https://dummyjson.com/products?limit=${limit}`);
    const data = await res.json();
    return data.products;
  }
}
