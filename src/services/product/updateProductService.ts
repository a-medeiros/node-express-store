import ProductRepository from "../../repositories/ProductRepository.js"
import { s3Upload } from "../s3Upload.js"

export type S3UploadFn = (file: unknown, mime: string) => Promise<string>

export function updateProductFactory({ s3Upload }: { s3Upload: S3UploadFn }) {
  return async (id: string, name: string, price: number, file: unknown) => {
    const productRepo = new ProductRepository()
    const product = await productRepo.findById(id)

    if (!product) throw new Error("Product not found")

    let imageUrl = product.imageUrl

    if (file) {
      imageUrl = await s3Upload(file, "image/jpg")
    }

    const updatedProduct = await productRepo.update(id, name, price, imageUrl)

    return updatedProduct
  }
}

export const updateProductService = updateProductFactory({ s3Upload })
