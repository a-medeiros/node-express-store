import express from "express";
import { prisma } from "./prisma.js"

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World");
})

app.get("/products", async (req, res) => {
  const products = await prisma.product.findMany();
  res.json(products);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
