import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class DeleteProductUseCase{
    constructor() {}

    async handle(id: number) {
        await prisma.products.delete({
            where: {
                id: Number(id)
            }
        })

    }
}