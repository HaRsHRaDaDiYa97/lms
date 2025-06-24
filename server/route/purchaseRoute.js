import express from "express";
import {  savePurchase } from "../controller/paymentController.js";
const router = express.Router();

router.post("/save", savePurchase);

export default router;
