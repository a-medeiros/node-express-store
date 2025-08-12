import { prisma } from "../prisma.js";
import type { Request, Response } from "express";

const getProducts = async (req: Request, res: Response) => {
  const products = await prisma.product.findMany();
  res.json(products);
};

export { getProducts };