import express from "express";
import { getProfit } from "../controllers/profitController.js";

const router = express.Router();

// GET /api/profit
router.get("/", getProfit);

export default router;
