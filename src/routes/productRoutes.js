import express from "express";
import productController from "../controllers/products_controller";


const router = express.Router();

router.get("/product/:id", productController.getProduct);

router.get("/product", productController.getProducts);

router.post("/product", productController.addProducts);

router.put("/product/:id", productController.updateProduct);

router.delete("/product/:id", productController.deleteProduct);

export default router;
