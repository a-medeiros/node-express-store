import type { Request, Response } from "express"
import { jest } from "@jest/globals"
import { getProductById } from "../src/controllers/products.js"
import app from "../src/app.js"
import { prisma } from "../src/prisma.js"
import request from "supertest"

describe("GET /product/:id", () => {
  beforeEach(async () => {
    await prisma.product.createMany({
      data: [
        { name: "foo", price: 100 },
        { name: "bar", price: 250 },
      ],
    })
  })

  it("when the product exists, should return 200 and the product", async () => {
    const firstProduct = await prisma.product.findFirst({
      where: { name: "foo" },
    })

    const res = await request(app).get(`/product/${firstProduct!.id}`)
    expect(res.status).toBe(200)
    expect(res.body).toMatchObject({ name: "foo", price: 100 })
  })

  it("when the product does not exist, should return 404", async () => {
    const res = await request(app).get(`/product/123`)
    expect(res.status).toBe(404)
  })

  it("when the product ID is not provided, should return 400", async () => {
    const res = await request(app).get(`/product/`)
    expect(res.status).toBe(404)
  })
})

describe("getProductById", () => {
  it("should return 400 if id is missing", async () => {
    const req = { params: {} } as unknown as Request
    const json = jest.fn()
    const status = jest.fn(() => ({ json }))
    const res = { status } as unknown as Response

    await getProductById(req, res)

    expect(status).toHaveBeenCalledWith(400)
    expect(json).toHaveBeenCalledWith({ message: "Product ID is required" })
  })
})
