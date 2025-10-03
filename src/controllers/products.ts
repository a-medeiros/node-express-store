import { prisma } from "../prisma.js"
import type { Request, Response } from "express"

const getProducts = async (req: Request, res: Response) => {
  const products = await prisma.product.findMany()
  res.status(200).json(products)
}

const getProductById = async (req: Request, res: Response) => {
  const { id } = req.params

  if (!id) {
    return res.status(400).json({ message: "Product ID is required" })
  }

  const product = await prisma.product.findUnique({
    where: { id },
  })

  if (!product) {
    return res.status(404).json({ message: "Product not found" })
  }

  res.status(200).json({ id: product.id, name: product.name, price: product.price })
}

const createProduct = async (req: Request, res: Response) => {
  const { name, price } = req.body
  const product = await prisma.product.create({
    data: {
      name,
      price,
    },
  })

  res.status(201).json({ id: product.id, name: product.name, price: product.price })
}

const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params

  if (!id) {
    return res.status(400).json({ message: "Product ID is required" })
  }

  const product = await prisma.product.findUnique({
    where: { id },
  })

  if (!product) {
    return res.status(404).json({ message: "Product not found" })
  }

  const { name, price } = req.body

  const updatedProduct = await prisma.product.update({
    where: { id },
    data: { name, price },
  })

  res.status(200).json({ id: updatedProduct.id, name: updatedProduct.name, price: updatedProduct.price })
}

export { getProducts, createProduct, getProductById, updateProduct }
