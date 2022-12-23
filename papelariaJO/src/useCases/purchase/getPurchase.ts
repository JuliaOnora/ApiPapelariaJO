import { PrismaClient, Purchase, Products } from "@prisma/client";

const prisma = new PrismaClient();

export class GetPurchaseUseCase{
    constructor() {}

    async handle(userId: string): Promise<(Purchase&{product: Products})[]> {
        const userPurchase = await prisma.purchase.findMany({
            where: {
                userId: {
                    equals: userId
                }
            }, include: {
                product: true
            }
        })

        return userPurchase;
    }
    
    }