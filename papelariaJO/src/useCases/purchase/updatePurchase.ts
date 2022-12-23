import { PrismaClient, Purchase } from "@prisma/client";

import { PurchaseDto } from "../../domain/dtos/purchase";

const prisma = new PrismaClient();

export class UpdatePurchaseUseCase{
    constructor() {}

    async handle(purchase: PurchaseDto, newQty: number): Promise<Purchase>{
        const updatedPurchase = await prisma.purchase.update({
            data: {
                qty: newQty
            }, where: {
                id: purchase.id
                }
            }
        )

        return updatedPurchase;
    }
}