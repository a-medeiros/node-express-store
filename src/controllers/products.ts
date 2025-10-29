import type { Request, Response } from "express"
import ProductRepository from "../repositories/ProductRepository.js"
import { updateProductService } from "../services/product/updateProductService.js"

const getProducts = async (req: Request, res: Response) => {
  const productRepo = new ProductRepository()
  const products = await productRepo.findAll()
  
  res.status(200).json(products)
}

const getProductById = async (req: Request, res: Response) => {
  const { id } = req.params

  if (!id) {
    return res.status(400).json({ message: "Product ID is required" })
  }

  const productRepo = new ProductRepository()
  const product = await productRepo.findById(id)

  if (!product) {
    return res.status(404).json({ message: "Product not found" })
  }

  res.status(200).json({ id: product.id, name: product.name, price: product.price, imageUrl: product.imageUrl })
}

const createProduct = async (req: Request, res: Response) => {
  const { name, price } = req.body
  const productRepo = new ProductRepository()

  const product = await productRepo.create(name, price, null)

  res.status(201).json({ id: product.id, name: product.name, price: product.price, imageUrl: null })
}

const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params
  const { name, price } = req.body
  const file = req.file

  if (!id) {
    return res.status(400).json({ message: "Product ID is required" })
  }

  const updatedProduct = await updateProductService(id, name, price, file)

  res.status(200).json({ id: updatedProduct.id, name: updatedProduct.name, price: updatedProduct.price, imageUrl: updatedProduct.imageUrl })
}

const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params

  if (!id) {
    return res.status(400).json({ message: "Product ID is required" })
  }

  const productRepo = new ProductRepository()
  const product = await productRepo.findById(id)

  if (!product) {
    return res.status(404).json({ message: "Product not found" })
  }

  const deletedProduct = await productRepo.delete(id)

  if (!deletedProduct) {
    return res.status(404).json({ message: "Something went wrong" })
  }

  res.status(200).json({ message: "Product deleted" })
}

export { getProducts, createProduct, getProductById, updateProduct, deleteProduct }
