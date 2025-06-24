import express from "express";
import { createOrder, savePurchase } from "../controller/paymentController.js";
const router = express.Router();

router.post("/order", createOrder);


export default router;
