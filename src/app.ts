import express from "express"
import productsRouter from "./routes/products.js"
import productRouter from "./routes/product.js"

const app = express()

app.use(express.json())

app.use("/products", productsRouter)
app.use("/product", productRouter)

export default app
