import express from "express";
import userController from "../controllers/user_controller";

const router = express.Router()


router.get("/user", userController.getUsers);

router.post("/user", userController.newUser);

router.put("/user/:id", userController.updatedUser);

router.delete("/user/:id", userController.deletedUser);

export default router