import { PrismaClient, Products } from "@prisma/client";

import { ProductsDto } from "../../domain/dtos/products";

const prisma = new PrismaClient();

export class CreateProductUseCase{
    constructor() {}

    async handle(product: Omit<ProductsDto, "id">): Promise<Products>{
        const createdProduct = await prisma.products.create({
            data: {
                name: product.name,
                brand: product.brand,
                value: product.value,
                description: product.description
            },
        });

        return createdProduct;
    }
}