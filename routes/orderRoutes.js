import express from "express";
const router = express.Router();

import {
  getOrdersController,
  getAllOrdersController,
  createOrderController,
  orderStatusController,
} from "../controllers/orderController.js";

import { requiredSignIn, isAdmin } from "../middleware/authMiddleware.js";

// create order controller
router.post("/create-orders", createOrderController);

// get orders ---- users----
router.get("/orders", requiredSignIn, getOrdersController);

// get All orders ---Admin---
router.get("/all-orders", requiredSignIn, isAdmin, getAllOrdersController);

// change order status ---- Admin----
router.put("/order-status/:orderId", requiredSignIn, isAdmin, orderStatusController);

export default router;
