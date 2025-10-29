import { jest } from "@jest/globals";
import type { Product } from "@prisma/client";

jest.unstable_mockModule("../src/repositories/ProductRepository.js", () => {
  const MockRepo = jest.fn().mockImplementation(() => ({
    findById: jest.fn(async (): Promise<Product | null> => ({ id: "1", name: "old", price: 10, imageUrl: null } as Product)),
    update: jest.fn(async (): Promise<Product> => ({ id: "1", name: "fla", price: 50, imageUrl: "https://example.com/stormtrooper.jpg" } as Product)),
  }));
  return { default: MockRepo };
});

const { updateProductFactory } = await import(
  "../src/services/product/updateProductService.js"
);

describe("updateProductService", () => {
  it("uploads via injected s3Upload and updates the product", async () => {
    const fakeS3Upload = jest.fn(async (): Promise<{ imageUrl: string }> => ({
      imageUrl: "https://example.com/stormtrooper.jpg",
    }));

    const updateProduct = updateProductFactory({ s3Upload: fakeS3Upload });

    const result = await updateProduct("1", "fla", 50, Buffer.from("x"));

    expect(fakeS3Upload).toHaveBeenCalledWith(expect.any(Buffer), "image/jpg");
    expect(result).toEqual({
      id: "1",
      name: "fla",
      price: 50,
      imageUrl: "https://example.com/stormtrooper.jpg",
    });
  });
});
