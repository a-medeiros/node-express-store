import type { Request, Response } from "express"
import { jest } from "@jest/globals"
import { getProductById, updateProduct } from "../src/controllers/products.js"
import { prisma } from "../src/prisma.js"

describe("getProductById", () => {
  beforeAll(async () => {
    await prisma.product.createMany({
      data: [
        { id: "1", name: "foo", price: 100 },
        { id: "2", name: "bar", price: 250 },
      ],
    })
  })

  afterAll(async () => {
    await prisma.product.deleteMany();
  });

  it("should return 400 if id is missing", async () => {
    const req = { params: {} } as unknown as Request
    const json = jest.fn()
    const status = jest.fn(() => ({ json }))
    const res = { status } as unknown as Response

    await getProductById(req, res)

    expect(status).toHaveBeenCalledWith(400)
    expect(json).toHaveBeenCalledWith({ message: "Product ID is required" })
  })

  it("should return 404 if the product does not exist", async () => {
    const req = { params: { id: "3" } } as unknown as Request
    const json = jest.fn()
    const status = jest.fn(() => ({ json }))
    const res = { status } as unknown as Response
    
    await getProductById(req, res)

    expect(status).toHaveBeenCalledWith(404)
    expect(json).toHaveBeenCalledWith({ message: "Product not found" })
  })

  it("should return 200 and the product", async () => {
    const req = { params: { id: "2" } } as unknown as Request
    const json = jest.fn()
    const status = jest.fn(() => ({ json }))
    const res = { status } as unknown as Response

    await getProductById(req, res)

    expect(status).toHaveBeenCalledWith(200)
    expect(json).toHaveBeenCalledWith({ id: "2", name: "bar", price: 250 })
  })
})

describe("updateProduct", () => {
  beforeAll(async () => {
    await prisma.product.createMany({
      data: [
        { id: "1", name: "foo", price: 100 },
        { id: "2", name: "bar", price: 250 },
      ],
    })
  })

  afterAll(async () => {
    await prisma.product.deleteMany();
  });

  it("should return 400 if id is missing", async () => {
    // mocking request
    const req = { params: {} } as unknown as Request
    // mocking response
    // jest.fn() is a mock function(fake function)
    const json = jest.fn()
    const status = jest.fn(() => ({ json }))
    const res = { status } as unknown as Response

    await updateProduct(req, res)

    expect(status).toHaveBeenCalledWith(400)
    expect(json).toHaveBeenCalledWith({ message: "Product ID is required" })
  })

  it("should return 404 if the product does not exist", async () => {
    const req = { params: { id: "foo" }, body: { name: "foo", price: 100 } } as unknown as Request
    const json = jest.fn()
    const status = jest.fn(() => ({ json }))
    const res = { status } as unknown as Response

    await updateProduct(req, res)

    expect(status).toHaveBeenCalledWith(404)
    expect(json).toHaveBeenCalledWith({ message: "Product not found" })
  })

  it("should return 200 and the updated product", async () => {
    const req = { params: { id: "1" }, body: { name: "fla", price: 50 } } as unknown as Request
    const json = jest.fn()
    const status = jest.fn(() => ({ json }))
    const res = { status } as unknown as Response

    await updateProduct(req, res)

    expect(status).toHaveBeenCalledWith(200)
    expect(json).toHaveBeenCalledWith({ id: "1", name: "fla", price: 50 })
  })
})
