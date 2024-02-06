import express from "express";
import authController from "../controllers/auth_controller";
import validateBody from "../middlewares/users/validateUserBody";

const router = express.Router();

router.get("/auth", authController.login);

router.post("/auth", validateBody, authController.newAuth);

export default router;
