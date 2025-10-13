import express from "express"
import { deleteProduct, getProductById, updateProduct } from "../controllers/products.js"

const router = express.Router()

router.get("/:id", getProductById)
router.put("/:id", updateProduct)
router.delete("/:id", deleteProduct)

export default router