import { PrismaClient, Products } from "@prisma/client";

const prisma = new PrismaClient();

export class GetProductUseCase{
    constructor() {}

    async handle(id: number): Promise<Products | null> {
        const product = await prisma.products.findFirst({
            where: {
                id: {
                    equals: Number(id)
                }
            }
        })

        return product;
    }
}