import { Router } from "express";

import { listProducts, getProduct, createProduct, 
        updateProducts, deleteProduct} from "../controllers/products";

// import { newProduct, validIdProduct, upProduct } from "../validator/productValid"

const productRoutes = Router();

productRoutes.get("/", listProducts);
productRoutes.get("/:id", getProduct);
productRoutes.post("/", createProduct);
productRoutes.put("/", updateProducts);
productRoutes.delete("/", deleteProduct);
// productRoutes.post("/", newProduct, createProduct);
// productRoutes.put("/", upProduct, updateProducts);
// productRoutes.delete("/", validIdProduct, deleteProduct);

export default productRoutes;
