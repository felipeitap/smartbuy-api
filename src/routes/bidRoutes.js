import express from "express";
import bidController from "../controllers/bid_controller";



const router = express.Router();

router.get("/bid/:id", bidController.getBid);

router.get("/bid", bidController.getBids);

router.post("/bid", bidController.addBid);

router.put("/bid/:id", bidController.rejectBid);

router.delete("/bid/:id", bidController.cancelBid);

export default router;
