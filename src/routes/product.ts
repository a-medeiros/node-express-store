import express from "express"
import multer from 'multer'
import { deleteProduct, getProductById, updateProduct } from "../controllers/products.js"

const upload = multer({ storage: multer.memoryStorage() });

const router = express.Router()

router.get("/:id", getProductById)
router.put("/:id", upload.single('file'), updateProduct)
router.delete("/:id", deleteProduct)

export default router