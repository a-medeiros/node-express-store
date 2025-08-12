import express from "express";
import productsRouter from "./routes/products.js";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World");
})

app.use("/products", productsRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
