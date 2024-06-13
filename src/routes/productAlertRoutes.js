import express from "express";
import productAlertController from "../controllers/product_alert_controller"



const router = express.Router();

router.get("/alert/confirmed", productAlertController.getConfirmedProductAlerts);

router.get("/alert/:id", productAlertController.getProductAlert);

router.get("/alert", productAlertController.getProductAlerts);

router.post("/alert", productAlertController.addProductAlert);

router.put("/alert/:id", productAlertController.updateProductAlert);

router.delete("/alert/:id", productAlertController.deleteProductAlert);

export default router;
