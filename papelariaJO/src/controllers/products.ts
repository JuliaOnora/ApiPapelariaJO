import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

import { ProductsDto } from "../domain/dtos/products";

import { CreateProductUseCase } from "../useCases/product/createProduct";
import { ListProductUseCase } from "../useCases/product/listProducts";
import { GetProductUseCase } from "../useCases/product/getProduct";
import { UpdateProductUseCase } from "../useCases/product/updateProduct";
import { DeleteProductUseCase } from "../useCases/product/deleteProduct";
// const vr = require("express-validators");


const productsRoutes = Router();
const prisma = new PrismaClient();


export async function listProducts(req: Request, res: Response) {
    const useCase = new ListProductUseCase();
    const listProduct = await useCase.handle();

    return res.status(200).json(listProduct);
};


interface GetParams{
    id: number
};

export async function getProduct (req: Request<GetParams>, res: Response) {
	const { id } = req.params;

    const useCase = new GetProductUseCase();
    const getProduct = await useCase.handle(id);

    if (!getProduct){
        return res.status(404).json({
            message: "Product not found"});
    }
    
    return res.status(200).json(getProduct);
};


export async function createProduct (req: Request <{}, {}, ProductsDto>, res: Response){
    const product = req.body;

    // const errors = vr.validationResults(req);
    // if (!errors.isEmpty()){
    //         return res.status(400).json({errors: errors.array()});
    // }

    while (!product.name || !product.value){
        return res.status(404).json({
            field: 'name',
            message: "Invalid blanks for Product"});
    }

    const useCase = new CreateProductUseCase();
    const createdProduct = await useCase.handle(product);
    
    return res.json(createdProduct);

};

interface PutParams{
    id: number
};

export async function updateProducts (req: Request <PutParams, {}, Omit<ProductsDto, "id">>, res: Response){
    const { id } = req.params;
    const productData = req.body;

    const idProductUseCase = new GetProductUseCase();
    const getProduct = await idProductUseCase.handle(id);

    // const errors = vr.validationResults(req);
    // if (!errors.isEmpty()){
    //         return res.status(400).json({errors: errors.array()});
    // }

    if (!getProduct){
        return res.status(404).json({
            message: "Product not Found to update!"});
    };

    // Permite atualização somente do valor e da descrição
    const useCase = new UpdateProductUseCase();
    const createdProduct = await useCase.handle({id, 
        name: productData.name, 
        brand: productData.brand, 
        value: productData.value, 
        description: productData.description} );

    return res.status(200).json(createdProduct);
};


interface DeleteParams{
    id: number
}
 
export async function deleteProduct (req: Request<DeleteParams>, res: Response) {
    const { id } = req.params;
    const productIndex = await prisma.products.findFirst({ // Nessa linha, referenciamos a tabela
        where: {
            id: {
                equals: Number(id)
            }
        }
    })

    // const errors = vr.validationResults(req);
    // if (!errors.isEmpty()){
    //         return res.status(400).json({errors: errors.array()});
    // }
    
    if (!productIndex){ // undefined é falsy
        return res.status(404).json({
            message: "Product not found to delete"
        });
    }

    const useCase = new DeleteProductUseCase();
    await useCase.handle(id);

    return res.json({
        message: "Product deleted successfully"
    });
};
// function validationResults(req: Request<{}, {}, ProductsDto, import("qs").ParsedQs, Record<string, any>>) {
//     throw new Error("Function not implemented.");
// }

