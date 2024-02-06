import express from "express";
import userController from "../controllers/user_controller";
import validateBody from "../middlewares/users/validateUserBody";

const router = express.Router();

router.get("/user/:id", userController.getUser);

router.get("/user", userController.getUsers);

router.put("/user/:id", validateBody, userController.updatedUser);

router.delete("/user/:id", userController.deletedUser);

export default router;
