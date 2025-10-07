import type { Product } from "@prisma/client"

export interface IProductRepository {
  findById(id: string): Promise<Product | null>
}
