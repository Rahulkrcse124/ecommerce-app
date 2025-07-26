import Razorpay from "razorpay";
import shortid from "shortid";
import crypto from "crypto";
import dotenv from "dotenv";
import orderModel from "../models/orderModel.js";

dotenv.config();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

// STEP 1: CREATE ORDER
export const createRazorpayOrder = async (req, res) => {
  try {
    const { amount } = req.body;
    const options = {
      amount: amount * 100, // Razorpay expects paise
      currency: "INR",
      receipt: shortid.generate(),
    };
    const order = await razorpay.orders.create(options);
    res.status(200).json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Order creation failed" });
  }
};

// payment

export const verifyAndSaveOrder = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, cart } =
      req.body;

    if (!req.user || !req.user._id) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const newOrder = new orderModel({
      products: cart.map((item) => item._id),
      payment: {
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
        success: true,
      },
      buyer: req.user._id, // ✅ Use authenticated user's ID
    });

    await newOrder.save();

    res.status(201).json({
      success: true,
      message: "Order saved successfully",
      order: newOrder,
    });
  } catch (error) {
    console.error("Error saving verified order:", error);
    res.status(500).json({
      success: false,
      message: "Order saving failed",
      error,
    });
  }
};
