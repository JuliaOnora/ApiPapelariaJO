import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class DeletePurchaseUseCase{
    constructor() {}

    async handle(id: string) {
        await prisma.purchase.delete({
            where: {
                id: id
            }
        })

    }
}