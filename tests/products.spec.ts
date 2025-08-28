import request from "supertest";
import app from '../src/app.js';

describe('GET /products', () => {
	it("should return 200 and all products", async () => {
		const res = await request(app).get('/products');
		expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
	})
})

describe('POST /products', () => {
	it("should return 201 and the created product", async () => {
		const res = await request(app).post('/products').send({
			name: "Product 1",
			price: 100
		});
		expect(res.status).toBe(201);
    expect(res.body.name).toBe("Product 1");
    expect(res.body.price).toBe(100);
	})
})