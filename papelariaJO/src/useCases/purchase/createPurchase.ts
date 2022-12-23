import { PrismaClient, Purchase } from "@prisma/client";
import { v4 } from "uuid";

import { PurchaseDto } from "../../domain/dtos/purchase";

const prisma = new PrismaClient();

export class CreatePurchaseUseCase{
    constructor() {}

    async handle(purchase: PurchaseDto): Promise<Purchase>{
        const createdPurchase = await prisma.purchase.create({
            data: {
                id: v4(),
                userId: purchase.userId,
                productId: purchase.productId,
                qty: purchase.qty
            },
        });

        return createdPurchase;
    }
}