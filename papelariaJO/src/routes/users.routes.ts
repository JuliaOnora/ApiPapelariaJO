import { Router } from "express";

import { listUsers, getUser, createUser, 
        updateUser} from "../controllers/users";

const userRoutes = Router();

userRoutes.get("/", listUsers);
userRoutes.get("/:id", getUser);
userRoutes.post("/", createUser);
userRoutes.put("/", updateUser);

export default userRoutes;

