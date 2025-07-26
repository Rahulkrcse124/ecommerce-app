import express from "express";
import {
  createRazorpayOrder,
  verifyAndSaveOrder,
} from "../controllers/paymentController.js";
import { requiredSignIn } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create-order", createRazorpayOrder);
router.post("/verify-order", requiredSignIn, verifyAndSaveOrder);

export default router;
