import request from "supertest"
import app from "../src/app.js"
import { prisma } from "../src/prisma.js"

beforeEach(async () => {
  await prisma.product.deleteMany();
});

describe("GET /products", () => {
  beforeEach(async () => {
    await prisma.product.createMany({
      data: [
        { name: 'foo', price: 100 },
        { name: 'bar', price: 250 },
      ],
    });
  });

  it("should return 200 and all products", async () => {
    await request(app).get("/products")

    const products = await prisma.product.findMany();

    expect(products).toHaveLength(2);
    expect(products).toMatchObject([{ name: "foo", price: 100 }, { name: "bar", price: 250 }]);
  })
})

describe("POST /products", () => {
  it("should return 201 and the created product", async () => {
    const res = await request(app).post("/products").send({
      name: "Shirt",
      price: 100,
    })
    expect(res.status).toBe(201)
    expect(res.body).toMatchObject({ name: "Shirt", price: 100 });

    const product = await prisma.product.findUnique({
      where: { id: res.body.id },
    });

    expect(product).toMatchObject({ name: "Shirt", price: 100 });
  })
})

describe("GET /products/:id", () => {
  beforeEach(async () => {
    await prisma.product.createMany({
      data: [
        { name: 'foo', price: 100 },
        { name: 'bar', price: 250 },
      ],
    });
  });

  it("when the product exists, should return 200 and the product", async () => {
    const firstProduct = await prisma.product.findFirst({
      where: { name: 'foo' }
    });

    const res = await request(app).get(`/products/${firstProduct!.id}`)
    expect(res.status).toBe(200)
    expect(res.body).toMatchObject({ name: "foo", price: 100 });
  })

  it("when the product does not exist, should return 404", async () => {
    const res = await request(app).get(`/products/123`)
    expect(res.status).toBe(404)
  })
})
