import { Request, Response } from "express";
import { PrismaClient, Products } from "@prisma/client";

import { PurchaseDto } from "../domain/dtos/purchase";

import { CreatePurchaseUseCase } from "../useCases/purchase/createPurchase";
import { ListPurchaseUseCase } from "../useCases/purchase/listPurchase";
import { GetPurchaseUseCase } from "../useCases/purchase/getPurchase";
import { UpdatePurchaseUseCase } from "../useCases/purchase/updatePurchase";
import { DeletePurchaseUseCase } from "../useCases/purchase/deletePurchase";

const prisma = new PrismaClient();

export async function listPurchase (req: Request, res: Response) {
    const useCase = new ListPurchaseUseCase();
    const listPurchase = await useCase.handle();


    return res.status(200).json(listPurchase);
};


interface GetParams{
    userId: string
};

export async function getPurchase (req: Request<GetParams>, res: Response) {
	const { userId } = req.params;

    const useCase = new GetPurchaseUseCase();
    const userPurchase = await useCase.handle(userId);


    if (!userPurchase){
        return res.status(404).json({
            message: "Purchase not found"});
    }

    let total: number = 0;

    for (let i = 0; i < userPurchase.length; i++){
        total += userPurchase[i].qty * Number(userPurchase[i].product.value
            );
    };

    const upList = JSON.parse(JSON.stringify(userPurchase));
    
    
    upList.push({"totalValue": total.toFixed(2)});

    return res.status(200).json(upList);
};



export async function createPurchase (req: Request <{}, {}, PurchaseDto>, res: Response) {
    const purchase = req.body;

    if (!purchase.userId || !purchase.productId || !purchase.qty){
        return res.status(404).json({
            message: "Invalid blanks"});
    }

    const useCase = new CreatePurchaseUseCase();
    const createdPurchase = await useCase.handle(purchase);

    return res.json(createdPurchase);
};

interface PutParams{
    userId: string
    productId: number
};

export async function updatePurchase(req: Request <PutParams, {}, PurchaseDto>, res: Response) {
    const { userId } = req.params;
    const { productId } = req.params;

    const purchaseData = req.body;

    const purchaseIndex = await prisma.purchase.findFirst({
        where: {
            userId: {
                equals: userId
            },
            productId: {
                equals: Number(productId)
            }
        }
    });

    if (!purchaseIndex){
        return res.status(404).json({
            message: "Product not Found to update!"});

    };

    // Permite atualização somente da quantidade de produtos
    const useCase = new UpdatePurchaseUseCase();
    const updatedProduct = await useCase.handle(purchaseIndex, purchaseData.qty);

    return res.status(200).json(updatedProduct);
};


interface DeleteParams{
    userId: string
    productId: number
}

export async function deletePurchase (req: Request<DeleteParams>, res: Response) {
    const { userId } = req.params;
    const { productId } = req.params;

    const purchaseIndex = await prisma.purchase.findFirst({
        where: {
            userId: {
                equals: userId
            },
            productId: {
                equals: Number(productId)
            }
        }
    });

    if (!purchaseIndex){
        return res.status(404).json({
            message: "Purchase not Found to update!"});

    };

    const useCase = new DeletePurchaseUseCase();
    await useCase.handle(purchaseIndex.id);

    return res.json({
        message: "Purchase deleted successfully"
    });
};
