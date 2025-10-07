import express from "express"
import { getProductById, updateProduct } from "../controllers/products.js"

const router = express.Router()

router.get("/:id", getProductById)
router.put("/:id", updateProduct)

export default router