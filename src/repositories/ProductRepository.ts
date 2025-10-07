import type { Product } from "@prisma/client"
import type { IProductRepository } from "./IProductRepository.js"
import { prisma } from "../prisma.js"

class ProductRepository implements IProductRepository {
  async findAll(): Promise<Product[]> {
    return prisma.product.findMany({
      take: 10,
    })
  }

  async findById(id: string): Promise<Product | null> {
    return prisma.product.findUnique({ where: { id } })
  }
}

export default ProductRepository
