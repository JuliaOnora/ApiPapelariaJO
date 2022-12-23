import { Router } from "express";

import { listPurchase, getPurchase, createPurchase,
    updatePurchase, deletePurchase } from "../controllers/purchase";

const purchaseRoutes = Router();

purchaseRoutes.get("/", listPurchase);
purchaseRoutes.get("/:userId", getPurchase);
purchaseRoutes.post("/", createPurchase);
purchaseRoutes.put("/:userId/:productId", updatePurchase);
purchaseRoutes.delete("/:userId/:productId", deletePurchase);

export default purchaseRoutes;

