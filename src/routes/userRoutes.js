import express from "express";
import userController from "../controllers/user_controller";
import validateBody from "../middlewares/validateUserBody";

const router = express.Router();

router.get("/user/:id", userController.getUser);

router.get("/user", userController.getUsers);

router.post("/user", validateBody, userController.newUser);

router.put("/user/:id", validateBody, userController.updatedUser);

router.delete("/user/:id", userController.deletedUser);

export default router;
