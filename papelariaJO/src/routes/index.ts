import { Router } from "express";
import userRoutes from "./users.routes";
import productsRoutes from "./products.routes";
import purchaseRoutes from "./purchase.routes";

const routes = Router();

routes.use('/products', productsRoutes);
routes.use('/users', userRoutes);
routes.use('/purchase', purchaseRoutes);

export default routes;