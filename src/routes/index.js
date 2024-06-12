import express from "express";
import userRouter from "./userRoutes";
import authRouter from "./authRoutes";
import autenticateToken from "../middlewares/auth/checkToken";
import productRouter from "./productRoutes"
import productAlertRouter from "./productAlertRoutes"
import bidRouter from "./bidRoutes"


const router = express.Router();

router.use(authRouter);

router.use(autenticateToken);

router.use(userRouter);

router.use(productRouter);

router.use(productAlertRouter);

router.use(bidRouter);

export default router;
