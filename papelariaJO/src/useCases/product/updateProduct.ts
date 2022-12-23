import { PrismaClient, Products } from "@prisma/client";

import { ProductsDto } from "../../domain/dtos/products";

const prisma = new PrismaClient();

export class UpdateProductUseCase{
    constructor() {}

    async handle(product: ProductsDto): Promise<Products>{
        const upProduct = await prisma.products.update({
            data: {
                value: product.value,
                description: product.description
            }, where: {
                id: Number(product.id)
            }
        })

        return upProduct;
    }
}