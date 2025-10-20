import type { Product } from "@prisma/client"

export interface IProductRepository {
  findAll(): Promise<Product[]>
  findById(id: string): Promise<Product | null>
  update(id: string, name: string, price: number, imageUrl: string | null): Promise<Product>
  create(name: string, price: number, imageUrl: string | null): Promise<Product>
  delete(id: string): Promise<Product | null>
}
