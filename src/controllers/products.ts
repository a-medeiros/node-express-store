import { prisma } from "../prisma.js";
import type { Request, Response } from "express";

const getProducts = async (req: Request, res: Response) => {
  const products = await prisma.product.findMany();
  res.json(products);
};

const createProduct = async (req: Request, res: Response) => {
	const { name, price } = req.body;
	const product = await prisma.product.create({
		data: {
			name,
			price,
		},
	});
	
	res.status(201).json(product);
}

export { getProducts, createProduct };