import { PrismaClient, Products } from "@prisma/client";

const prisma = new PrismaClient();

export class ListProductUseCase{
    constructor() {}

    async handle(): Promise<Products[]>{
        const listProduct = await prisma.products.findMany();

        return listProduct;
    }
}