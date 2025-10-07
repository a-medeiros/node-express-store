import type { Product } from "@prisma/client"
import type { IProductRepository } from "./IProductRepository.js"
import { prisma } from "../prisma.js"

class ProductRepository implements IProductRepository {
  async findById(id: string): Promise<Product | null> {
    return prisma.product.findUnique({ where: { id } })
  }
}

export default ProductRepository
