import type { Product } from "@prisma/client"
import type { IProductRepository } from "./IProductRepository.js"
import { prisma } from "../prisma.js"
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library"

class ProductRepository implements IProductRepository {
  async findAll(): Promise<Product[]> {
    return prisma.product.findMany({
      take: 10,
    })
  }

  async findById(id: string): Promise<Product | null> {
    return prisma.product.findUnique({ where: { id } })
  }

  async update(id: string, name: string, price: number, imageUrl: string | null): Promise<Product> {
    return prisma.product.update({ where: { id }, data: { name, price, imageUrl } })
  }
  async create(name: string, price: number, imageUrl: string | null): Promise<Product> {
    return prisma.product.create({ data: { name, price, imageUrl } })
  }

  async delete(id: string): Promise<Product | null> {
    try {
      return await prisma.product.delete({ where: { id } })
    } catch (error: unknown) {
      if (error instanceof PrismaClientKnownRequestError && error.code === 'P2025') {
        return null
      }
      throw error
    }
  }
}

export default ProductRepository
