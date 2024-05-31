import express from "express";
import productController from "../controllers/products_controller";
import validateBody from "../middlewares/product/validate_product_body";


const router = express.Router();

router.get("/product/:id", productController.getProduct);

router.get("/product", productController.getProducts);

router.post("/product",validateBody, productController.addProducts);

router.put("/product/:id",validateBody, productController.updateProduct);

router.delete("/product/:id", productController.deleteProduct);

export default router;
