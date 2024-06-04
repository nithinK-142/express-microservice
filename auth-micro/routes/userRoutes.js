import { Router } from "express";
import UserController from "../controllers/UserController.js";

const router = Router();

router.get("/getUser/:id", UserController.getUser);

export default router;
