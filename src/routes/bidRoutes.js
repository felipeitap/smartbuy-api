import express from "express";
import bidController from "../controllers/bid_controller";



const router = express.Router();

router.get("/bid/:id", bidController.getBids);

router.get("/bid", bidController.getBid);

router.post("/bid", bidController.addBid);

router.put("/bid/:id", bidController.updateStatus);

router.delete("/bid/:id", bidController.cancelBid);

export default router;
